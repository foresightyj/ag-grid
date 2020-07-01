import { AreaSeriesOptions, CartesianChartOptions, ChartType } from "@ag-grid-community/core";
import { CartesianChart, AgChart, findIndex } from "ag-charts-community";
import { ChartProxyParams, UpdateChartParams } from "../chartProxy";
import { CartesianChartProxy } from "./cartesianChartProxy";

export class AreaChartProxy extends CartesianChartProxy<AreaSeriesOptions> {

    public constructor(params: ChartProxyParams) {
        super(params);

        this.initChartOptions();
        this.recreateChart();
    }

    protected createChart(options: any): CartesianChart {
        const { grouping, parentElement } = this.chartProxyParams;
        const seriesDefaults = this.getSeriesDefaults();
        const marker = { ...seriesDefaults.marker } as any;
        if (marker.type) { // deprecated
            marker.shape = marker.type;
            delete marker.type;
        }

        options = options || this.chartOptions;
        options.autoSize = true;
        options.axes = [{
            ...options.xAxis,
            position: 'bottom',
            type: grouping ? 'groupedCategory' : 'category',
            paddingInner: 1,
            paddingOuter: 0
        }, {
            ...options.yAxis,
            position: 'left',
            type: 'number'
        }];
        options.series = [{
            ...seriesDefaults,
            type: 'area',
            fills: seriesDefaults.fill.colors,
            fillOpacity: seriesDefaults.fill.opacity,
            strokes: seriesDefaults.stroke.colors,
            strokeOpacity: seriesDefaults.stroke.opacity,
            strokeWidth: seriesDefaults.stroke.width,
            marker
        }];

        return AgChart.create(options, parentElement);
    }

    public update(params: UpdateChartParams): void {
        this.chartProxyParams.grouping = params.grouping;

        this.updateAxes();

        const options: any = this.chartOptions;
        options.theme = this.getTheme();

        if (this.chartType === ChartType.Area) {
            // area charts have multiple series
            this.updateAreaChart(params, options);
        } else {
            // stacked and normalized has a single series
            let series: any = options.series && options.series[0];

            if (!series) {
                const seriesDefaults = this.getSeriesDefaults();
                const marker = { ...seriesDefaults.marker } as any;
                if (marker.type) { // deprecated
                    marker.shape = marker.type;
                    delete marker.type;
                }
                series = {
                    ...seriesDefaults,
                    fills: seriesDefaults.fill.colors,
                    fillOpacity: seriesDefaults.fill.opacity,
                    strokes: seriesDefaults.stroke.colors,
                    strokeOpacity: seriesDefaults.stroke.opacity,
                    strokeWidth: seriesDefaults.stroke.width,
                    marker
                };
                options.series = [series];
            }

            series.data = this.transformData(params.data, params.category.id);
            series.xKey = params.category.id;
            series.xName = params.category.name;
            series.yKeys = params.fields.map(f => f.colId);
            series.yNames = params.fields.map(f => f.displayName);
        }

        AgChart.update(this.chart, options, this.chartProxyParams.parentElement);

        this.updateLabelRotation(params.category.id);
    }

    private updateAreaChart(params: UpdateChartParams, options: any): void {
        if (params.fields.length === 0) {
            options.series = [];
            return;
        }

        const allSeries = options.series as any[];
        const fieldIds = params.fields.map(f => f.colId);

        const existingSeriesById = allSeries.reduceRight((map, series, i) => {
            const id = series.yKeys && series.yKeys[0];

            if (fieldIds.indexOf(id) === i) {
                map.set(id, series);
            } else {
                allSeries.splice(i, 1);
            }

            return map;
        }, new Map<string, any>());

        const data = this.transformData(params.data, params.category.id);
        let previousYKey: string | undefined = undefined;

        params.fields.forEach((f, index) => {
            let series = existingSeriesById.get(f.colId);

            if (series) {
                series.data = data;
                series.xKey = params.category.id;
                series.xName = params.category.name;
                series.yKeys = [f.colId];
                series.yNames = [f.displayName];
            } else {
                const seriesDefaults = this.getSeriesDefaults();
                const marker = { ...seriesDefaults.marker } as any;
                if (marker.type) { // deprecated
                    marker.shape = marker.type;
                    delete marker.type;
                }
                series = {
                    ...seriesDefaults,
                    data,
                    xKey: params.category.id,
                    xName: params.category.name,
                    yKeys: [f.colId],
                    yNames: [f.displayName],
                    fillOpacity: seriesDefaults.fill.opacity,
                    strokeOpacity: seriesDefaults.stroke.opacity,
                    strokeWidth: seriesDefaults.stroke.width,
                    marker
                };

                let insertIndex = findIndex(allSeries, series => {
                    return series.yKeys && series.yKeys[0] === previousYKey;
                });
                if (insertIndex >= 0) {
                    insertIndex += 1;
                } else {
                    insertIndex = index;
                }
                allSeries.splice(insertIndex, 0, series);
            }

            previousYKey = series.yKeys[0];
        });
    }

    protected getDefaultOptions(): CartesianChartOptions<AreaSeriesOptions> {
        const options = this.getDefaultCartesianChartOptions() as CartesianChartOptions<AreaSeriesOptions>;

        options.xAxis.label.rotation = 335;

        options.seriesDefaults = {
            ...options.seriesDefaults,
            fill: {
                ...options.seriesDefaults.fill,
                opacity: this.chartType === ChartType.Area ? 0.7 : 1,
            },
            stroke: {
                ...options.seriesDefaults.stroke,
                width: 3,
            },
            marker: {
                shape: 'circle',
                enabled: true,
                size: 6,
                strokeWidth: 1,
            },
            tooltip: {
                enabled: true,
            },
            shadow: this.getDefaultDropShadowOptions(),
        };

        return options;
    }

    private getSeriesDefaults(): any /*InternalAreaSeriesOptions*/ {
        return {
            ...this.chartOptions.seriesDefaults,
            type: 'area',
            normalizedTo: this.chartType === ChartType.NormalizedArea ? 100 : undefined,
        };
    }
}
