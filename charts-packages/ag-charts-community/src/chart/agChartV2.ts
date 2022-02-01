import {
    AgChartOptions,
    AgCartesianChartOptions,
    AgPolarChartOptions,
    AgHierarchyChartOptions,
    AgCartesianAxisOptions,
    AgChartThemePalette,
    AgLineSeriesOptions,
    AgBarSeriesOptions,
    AgAreaSeriesOptions,
    AgScatterSeriesOptions,
    AgHistogramSeriesOptions,
    AgPieSeriesOptions,
    AgTreemapSeriesOptions,
    AgNumberAxisOptions,
    AgLogAxisOptions,
    AgCategoryAxisOptions,
    AgGroupedCategoryAxisOptions,
    AgTimeAxisOptions,
} from './agChartOptions';
import { CartesianChart } from './cartesianChart';
import { PolarChart } from './polarChart';
import { HierarchyChart } from './hierarchyChart';
import { Caption } from '../caption';
import { Series } from './series/series';
import { AreaSeries } from './series/cartesian/areaSeries';
import { BarSeries } from './series/cartesian/barSeries';
import { HistogramSeries } from './series/cartesian/histogramSeries';
import { LineSeries } from './series/cartesian/lineSeries';
import { ScatterSeries } from './series/cartesian/scatterSeries';
import { PieSeries, PieTitle } from './series/polar/pieSeries';
import { TreemapSeries } from './series/hierarchy/treemapSeries';
import { ChartAxis } from './chartAxis';
import { LogAxis } from './axis/logAxis';
import { NumberAxis } from './axis/numberAxis';
import { CategoryAxis } from './axis/categoryAxis';
import { GroupedCategoryAxis } from './axis/groupedCategoryAxis';
import { TimeAxis } from './axis/timeAxis';
import { Chart } from './chart';
import { SourceEventListener } from '../util/observable';
import { DropShadow } from '../scene/dropShadow';
import { jsonDiff, DELETE, jsonMerge, jsonApply, jsonWalk } from '../util/json';
import { AxesOptionsTypes, SeriesOptionsTypes, DEFAULT_AXES_OPTIONS, DEFAULT_SERIES_OPTIONS, DEFAULT_CARTESIAN_CHART_OPTIONS, DEFAULT_HIERARCHY_CHART_OPTIONS, DEFAULT_POLAR_CHART_OPTIONS, DEFAULT_BAR_CHART_OVERRIDES, DEFAULT_SCATTER_HISTOGRAM_CHART_OVERRIDES } from './agChartV2Defaults';
import { applySeriesTransform } from './agChartV2Transforms';
import { Axis } from '../axis';
import { GroupedCategoryChart } from './groupedCategoryChart';

// TODO: Move these out of the old implementation?
import { AgChart, processSeriesOptions, getChartTheme } from './agChart';

type ChartType = CartesianChart | PolarChart | HierarchyChart;

type ChartOptionType<T extends ChartType> =
    T extends GroupedCategoryChart ? AgCartesianChartOptions :
    T extends CartesianChart ? AgCartesianChartOptions :
    T extends PolarChart ? AgPolarChartOptions :
    T extends HierarchyChart ? AgHierarchyChartOptions :
    never;

type SeriesOptionType<T extends Series> =
    T extends LineSeries ? AgLineSeriesOptions :
    T extends BarSeries ? AgBarSeriesOptions :
    T extends AreaSeries ? AgAreaSeriesOptions :
    T extends ScatterSeries ? AgScatterSeriesOptions :
    T extends HistogramSeries ? AgHistogramSeriesOptions :
    T extends PieSeries ? AgPieSeriesOptions :
    T extends TreemapSeries ? AgTreemapSeriesOptions :
    never;

type AxisOptionType<T extends Axis<any, any>> =
    T extends LogAxis ? AgLogAxisOptions :
    T extends NumberAxis ? AgNumberAxisOptions :
    T extends CategoryAxis ? AgCategoryAxisOptions :
    T extends GroupedCategoryAxis ? AgGroupedCategoryAxisOptions :
    T extends TimeAxis ? AgTimeAxisOptions :
    never;

function optionsType(
    input: { type?: AgChartOptions['type'], series?: { type?: SeriesOptionsTypes['type']}[]}
): NonNullable<AgChartOptions['type']> {
    return input.type || input.series?.[0]?.type || 'cartesian';
}

function isAgCartesianChartOptions(input: AgChartOptions): input is AgCartesianChartOptions {
    const specifiedType = optionsType(input);
    if (specifiedType == null) {
        return true;
    }

    switch (specifiedType) {
        case 'cartesian':
        case 'area':
        case 'bar':
        case 'column':
        case 'groupedCategory':
        case 'histogram':
        case 'line':
        case 'scatter':
            return true;

        default:
            return false;
    }
}

function isAgHierarchyChartOptions(input: AgChartOptions): input is AgHierarchyChartOptions {
    const specifiedType = optionsType(input);
    if (specifiedType == null) {
        return false;
    }

    switch (input.type) {
        case 'hierarchy':
        case 'treemap':
            return true;

        default:
            return false;
    }
}

function isAgPolarChartOptions(input: AgChartOptions): input is AgPolarChartOptions {
    const specifiedType = optionsType(input);
    if (specifiedType == null) {
        return false;
    }

    switch (input.type) {
        case 'polar':
        case 'pie':
            return true;

        default:
            return false;
    }
}

function countArrayElements<T extends any[]|any[][]>(input: T): number {
    let count = 0;
    for (const next of input) {
        if (next instanceof Array) {
            count += countArrayElements(next);
        }
        if (next != null) {
            count++;
        }
    }
    return count;
}

interface PreparationContext {
    colourIndex: number;
    palette: AgChartThemePalette;
}

export abstract class AgChartV2 {
    static create<T extends ChartType>(options: ChartOptionType<T>): T {
        const mergedOptions = AgChartV2.prepareOptions(options);

        const chart = isAgCartesianChartOptions(mergedOptions) ? (mergedOptions.type === 'groupedCategory' ? new GroupedCategoryChart(document) : new CartesianChart(document)) :
            isAgHierarchyChartOptions(mergedOptions) ? new HierarchyChart(document) :
            isAgPolarChartOptions(mergedOptions) ? new PolarChart(document) :
            undefined;

        if (!chart) {
            throw new Error(`AG Charts - couldn\'t apply configuration, check type of options: ${mergedOptions['type']}`);
        }

        return AgChartV2.updateDelta<T>(chart as T, mergedOptions);
    }

    static update<T extends ChartType>(chart: Chart, options: ChartOptionType<T>): T {
        const mergedOptions = AgChartV2.prepareOptions(options);

        if (options.type && options.type !== chart.options.type) {
            chart.destroy();
            return AgChartV2.create(options);
        }

        const deltaOptions = jsonDiff<ChartOptionType<T>>(chart.options as ChartOptionType<T>, mergedOptions, { stringify: ['data']});
        if (deltaOptions == null) {
            return chart as T;
        }

        return AgChartV2.updateDelta<T>(chart as T, deltaOptions);
    }

    static updateDelta<T extends ChartType>(chart: T, update: Partial<ChartOptionType<T>>): T {
        if (update.type == null) {
            update = {...update, type: chart.options.type || optionsType(update)};
        }
        return applyChartOptions(chart, update as ChartOptionType<typeof chart>)
    }

    private static prepareOptions<T extends AgChartOptions>(options: T): T {
        // console.log('user opts', options);

        // Determine type and ensure it's explicit in the options config.
        const type = optionsType(options);
        options = {...options, type };

        const defaultOptions = isAgCartesianChartOptions(options) ? DEFAULT_CARTESIAN_CHART_OPTIONS :
            isAgHierarchyChartOptions(options) ? DEFAULT_HIERARCHY_CHART_OPTIONS :
            isAgPolarChartOptions(options) ? DEFAULT_POLAR_CHART_OPTIONS :
            {};

        const defaultOverrides =
            type === 'bar' ? DEFAULT_BAR_CHART_OVERRIDES :
            type === 'scatter' ? DEFAULT_SCATTER_HISTOGRAM_CHART_OVERRIDES :
            type === 'histogram' ? DEFAULT_SCATTER_HISTOGRAM_CHART_OVERRIDES :
            {};

        const { theme, cleanedTheme, axesThemes, seriesThemes } = AgChartV2.prepareTheme(options);
        const context: PreparationContext = { colourIndex: 0, palette: theme.palette };        
        const mergedOptions = jsonMerge(defaultOptions as T, defaultOverrides, cleanedTheme, options);

        // Special cases where we have arrays of elements which need their own defaults.
        mergedOptions.series = processSeriesOptions(mergedOptions.series || [])
            .map((s: SeriesOptionsTypes) => {
                // TODO: Handle graph/series hierarchy properly?
                const type = s.type || 'line';
                const series = { ...s, type };
                return AgChartV2.prepareSeries(context, series, DEFAULT_SERIES_OPTIONS[type], seriesThemes[type] || {});
            });
        if (isAgCartesianChartOptions(mergedOptions)) {
            (mergedOptions.axes || []).forEach((a, i) => {
                const type = a.type || 'number';
                const axis = { ...a, type };
                // TODO: Handle removal of spurious properties more gracefully.
                const axesTheme = jsonMerge(axesThemes[type], axesThemes[type][a.position || 'unknown'] || {});
                mergedOptions.axes![i] = AgChartV2.prepareAxis(axis, DEFAULT_AXES_OPTIONS[type], axesTheme);
            });
        }

        // Set `enabled: true` for all option objects where the user has provided values.
        jsonWalk(
            options,
            (_, userOpts, mergedOpts) => {
            if (!mergedOpts) { return; }
            if ('enabled' in mergedOpts && userOpts.enabled == null) {
                mergedOpts.enabled = true;
            }
            },
            { skip: ['data'] },
            mergedOptions,
        );

        // Preserve non-cloneable properties.
        mergedOptions.type = type;

        // console.log('prepared opts', mergedOptions);

        return mergedOptions;
    }

    private static prepareTheme<T extends AgChartOptions>(options: T) {
        const theme = getChartTheme(options.theme);
        const themeConfig = theme.getConfig(optionsType(options) || 'cartesian');
        return {
            theme,
            axesThemes: themeConfig['axes'] || {},
            seriesThemes: themeConfig['series'] || {},
            cleanedTheme: jsonMerge(themeConfig, { axes: DELETE, series: DELETE }),
        };
    }

    private static prepareSeries<T extends SeriesOptionsTypes>(context: PreparationContext, input: T, ...defaults: T[]): T {
        const paletteOptions = AgChartV2.calculateSeriesPalette(context, input);

        // Part of the options interface, but not directly consumed by the series implementations.
        const removeOptions = { stacked: DELETE } as T;
        const mergedResult = jsonMerge(...defaults, paletteOptions, input, removeOptions);

        return applySeriesTransform(mergedResult);
    }

    private static calculateSeriesPalette<T extends SeriesOptionsTypes>(context: PreparationContext, input: T): T {
        let paletteOptions: {
            stroke?: string;
            fill?: string;
            fills?: string[];
            strokes?: string[];
            marker?: { fill?: string; stroke?: string; };
            callout?: { colors?: string[]; };
        } = {};

        const { palette: { fills, strokes } } = context;
        
        const inputAny = (input as any);
        let colourCount = countArrayElements(inputAny['yKeys'] || []) || 1; // Defaults to 1 if no yKeys.
        switch (input.type) {
            case 'pie':
                colourCount = Math.max(fills.length, strokes.length);
            case 'area':
            case 'bar':
            case 'column':
                paletteOptions.fills = takeColours(context, fills, colourCount);
                paletteOptions.strokes = takeColours(context, strokes, colourCount);
                break;
            case 'histogram':
                paletteOptions.fill = takeColours(context, fills, 1)[0];
                paletteOptions.stroke = takeColours(context, strokes, 1)[0];
                break;
            case 'scatter':
                paletteOptions.fill = takeColours(context, fills, 1)[0];
            case 'line':
                paletteOptions.stroke = takeColours(context, strokes, 1)[0];
                paletteOptions.marker = {
                    stroke: takeColours(context, strokes, 1)[0],
                    fill: takeColours(context, fills, 1)[0],
                };
                break;
            case 'treemap':
                break;
            case 'ohlc':
            default:
                throw new Error('AG Charts - unknown series type: ' + input.type);
        }
        context.colourIndex += colourCount;

        return paletteOptions as T;
    }

    private static prepareAxis<T extends AxesOptionsTypes>(input: T, ...defaults: T[]): T {
        // Remove redundant theme overload keys.
        const removeOptions = { top: DELETE, bottom: DELETE, left: DELETE, right: DELETE } as any;
        return jsonMerge(...defaults, input, removeOptions);
    }
}

function takeColours(context: PreparationContext, colours: string[], maxCount: number): string[] {
    const result = [];

    for (let count = 0; count < Math.min(maxCount, colours.length); count++) {
        result.push(colours[(count + context.colourIndex) % colours.length]);
    }

    return result;
}

function applyChartOptions<
    T extends CartesianChart | PolarChart | HierarchyChart,
    O extends ChartOptionType<T>,
>(chart: T, options: O): T {
    if (isAgCartesianChartOptions(options)) {
        applyOptionValues(chart, options, { skip: ['type', 'data', 'series', 'axes', 'autoSize', 'listeners', 'theme'] });
    } else if (isAgPolarChartOptions(options)) {
        applyOptionValues(chart, options, { skip: ['type', 'data', 'series', 'autoSize', 'listeners', 'theme'] });
    } else if (isAgHierarchyChartOptions(options)) {
        applyOptionValues(chart, options, { skip: ['type', 'data', 'series', 'autoSize', 'listeners', 'theme'] });
    } else {
        throw new Error(`AG Charts - couldn\'t apply configuration, check type of options and chart: ${options['type']}`);
    }

    let performProcessData = false;
    if (options.series) {
        chart.series = createSeries(options.series);
    }
    if (isAgCartesianChartOptions(options) && options.axes) {
        chart.axes = createAxis(options.axes);
        performProcessData = true;
    }
    if (options.data) {
        chart.data = options.data;
    }

    // Needs to be done last to avoid overrides by width/height properties.
    if (options.autoSize != null) {
        chart.autoSize = options.autoSize;
    }
    if (options.listeners) {
        registerListeners(chart, options.listeners);
    }

    chart.layoutPending = true;
    if (performProcessData) {
        chart.processData();
    }

    chart.options = jsonMerge(chart.options || {}, options);

    return chart;
}

function createSeries(options: AgChartOptions['series']): Series[] {
    const series: Series[] = [];
    const skip: (keyof NonNullable<AgChartOptions['series']>[number])[] = ['listeners'];

    let index = 0;
    for (const seriesOptions of options || []) {
        const path = `series[${index++}]`;
        switch (seriesOptions.type) {
            case 'area':
                series.push(applySeriesValues(new AreaSeries(), seriesOptions, {path, skip}));
                break;
            case 'bar':
            case 'column':
                series.push(applySeriesValues(new BarSeries(), seriesOptions, {path, skip}));
                break;
            case 'histogram':
                series.push(applySeriesValues(new HistogramSeries(), seriesOptions, {path, skip}));
                break;
            case 'line':
                series.push(applySeriesValues(new LineSeries(), seriesOptions, {path, skip}));
                break;
            case 'scatter':
                series.push(applySeriesValues(new ScatterSeries(), seriesOptions, {path, skip}));
                break;
            case 'pie':
                series.push(applySeriesValues(new PieSeries(), seriesOptions, {path, skip}));
                break;
            case 'treemap':
                series.push(applySeriesValues(new TreemapSeries(), seriesOptions, {path, skip}));
                break;
            case 'ohlc':
            default:
                throw new Error('AG Charts - unknown series type: ' + seriesOptions.type);
        }
    }

    series.forEach((next, index) => {
        const listeners = options?.[index]?.listeners;
        if (listeners == null) { return; }
        registerListeners(next, listeners);
    });

    return series;
}

function createAxis(options: AgCartesianAxisOptions[]): ChartAxis[] {
    const axes: ChartAxis[] = [];

    let index = 0;
    for (const axisOptions of options || []) {
        const path = `axis[${index++}]`;
        switch (axisOptions.type) {
            case 'number':
                axes.push(applyAxisValues(new NumberAxis(), axisOptions, {path}));
                break;
            case LogAxis.type:
                axes.push(applyAxisValues(new LogAxis(), axisOptions, {path}));
                break;
            case CategoryAxis.type:
                axes.push(applyAxisValues(new CategoryAxis(), axisOptions, {path}));
                break;
            case GroupedCategoryAxis.type:
                axes.push(applyAxisValues(new GroupedCategoryAxis(), axisOptions, {path}));
                break;
            case TimeAxis.type:
                axes.push(applyAxisValues(new TimeAxis(), axisOptions, {path}));
                break;
            default:
                throw new Error('AG Charts - unknown axis type: ' + axisOptions['type']);
        }
    }

    return axes;
}

function registerListeners<T extends { addEventListener(key: string, cb: SourceEventListener<any>): void }>(
    source: T,
    listeners?: { [K: string]: Function }
) {
    for (const property in listeners) {
        source.addEventListener(property, listeners[property] as SourceEventListener<any>);
    }
}

const JSON_APPLY_OPTIONS: Parameters<typeof jsonApply>[2] = {
    constructors: {
        'title': Caption,
        'subtitle': Caption,
        'shadow': DropShadow,
    },
    allowedTypes: {
        'series[].marker.shape': ['primitive', 'function'],
        'axis[].tick.count': ['primitive', 'class-instance'],
    },
};

function applyOptionValues<T extends ChartType, S extends ChartOptionType<T>>(
    target: T,
    options?: S,
    { skip, path }: { skip?: (keyof T | keyof S)[], path?: string } = {},
): T {
    const applyOpts = {
        ...JSON_APPLY_OPTIONS,
        skip: ['type' as keyof (T|S), ...(skip || [])], 
        ...(path ? { path } : {}),
    };
    return jsonApply<T, any>(target, options, applyOpts);
}

function applySeriesValues<T extends Series, S extends SeriesOptionType<T>>(
    target: T,
    options?: S,
    { skip, path }: { skip?: (keyof T | keyof S)[], path?: string } = {},
): T {
    const ctrs = JSON_APPLY_OPTIONS?.constructors || {};
    const seriesTypeOverrides = {
        constructors: {
            ...ctrs,
            'title': target.type === 'pie' ? PieTitle : ctrs['title'],
        },
    };

    const applyOpts = {
        ...JSON_APPLY_OPTIONS,
        ...seriesTypeOverrides,
        skip: ['type' as keyof (T|S), ...(skip || [])], 
        ...(path ? { path } : {}),
    };
    return jsonApply<T, any>(target, options, applyOpts);
}

function applyAxisValues<T extends Axis<any, any>, S extends AxisOptionType<T>>(
    target: T,
    options?: S,
    { skip, path }: { skip?: (keyof T | keyof S)[], path?: string } = {},
): T {
    const applyOpts = {
        ...JSON_APPLY_OPTIONS,
        skip: ['type' as keyof (T|S), ...(skip || [])], 
        ...(path ? { path } : {}),
    };
    return jsonApply<T, any>(target, options, applyOpts);
}