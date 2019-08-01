import {ChartType, ScatterChartOptions, ScatterSeriesOptions} from "ag-grid-community";
import {ChartBuilder} from "../../../builder/chartBuilder";
import {ChartProxyParams, UpdateChartParams} from "../chartProxy";
import {CartesianChart} from "../../../../charts/chart/cartesianChart";
import {ScatterSeries} from "../../../../charts/chart/series/scatterSeries";
import {ChartModel} from "../../chartModel";
import {CartesianChartProxy, LineMarkerProperty, LineSeriesProperty} from "./cartesianChartProxy";
import {LineSeries} from "../../../../charts/chart/series/lineSeries";

export class ScatterChartProxy extends CartesianChartProxy<ScatterChartOptions> {

    public constructor(params: ChartProxyParams) {
        super(params);

        this.initChartOptions(ChartType.Scatter, this.defaultOptions());

        this.chart = ChartBuilder.createScatterChart(this.chartOptions);
    }

    public update(params: UpdateChartParams): void {
        if (params.fields.length === 0) {
            this.chart.removeAllSeries();
            return;
        }

        const scatterChart = this.chart as CartesianChart;
        const fieldIds = params.fields.map(f => f.colId);

        const existingSeriesMap: { [id: string]: ScatterSeries } = {};

        const updateSeries = (scatterSeries: ScatterSeries) => {
            const id = scatterSeries.yField as string;
            const seriesExists = fieldIds.indexOf(id) > -1;
            seriesExists ? existingSeriesMap[id] = scatterSeries : scatterChart.removeSeries(scatterSeries);
        };

        scatterChart.series
            .map(series => series as ScatterSeries)
            .forEach(updateSeries);

        const chart = this.chart as CartesianChart;
        if (params.categoryId === ChartModel.DEFAULT_CATEGORY) {
            chart.xAxis.labelRotation = 0;
            this.chartOptions.xAxis.labelRotation = 0;
        } else {
            chart.xAxis.labelRotation = this.chartOptions.xAxis.labelRotation as number;
        }

        const xField = params.categoryId === ChartModel.DEFAULT_CATEGORY ? params.fields[0].colId : params.categoryId;
        const updateFunc = (f: { colId: string, displayName: string }, index: number) => {
            const seriesOptions = this.chartOptions.seriesDefaults as ScatterSeriesOptions;

            const existingSeries = existingSeriesMap[f.colId];
            const scatterSeries = existingSeries ? existingSeries : ChartBuilder.createSeries(seriesOptions) as ScatterSeries;

            if (scatterSeries) {
                scatterSeries.title = f.displayName;
                scatterSeries.data = params.data;
                scatterSeries.xField = xField;
                scatterSeries.yField = f.colId;

                const palette = this.overriddenPalette ? this.overriddenPalette : this.chartProxyParams.getSelectedPalette();

                const fills = palette.fills;
                scatterSeries.fill = fills[index % fills.length];

                const strokes = palette.strokes;
                scatterSeries.stroke = strokes[index % strokes.length];

                if (!existingSeries) {
                    scatterChart.addSeries(scatterSeries);
                }
            }
        };

        if (params.categoryId !== ChartModel.DEFAULT_CATEGORY) {
            params.fields.forEach(updateFunc);
        } else {
            params.fields.slice(1, params.fields.length).forEach(updateFunc);
        }
    }

    public setSeriesProperty(property: LineSeriesProperty | LineMarkerProperty, value: any): void {
        const series = this.getChart().series as LineSeries[];
        series.forEach(s => s[property] = value);

        if (!this.chartOptions.seriesDefaults) {
            this.chartOptions.seriesDefaults = {};
        }
        this.chartOptions.seriesDefaults[property] = value;

        this.raiseChartOptionsChangedEvent();
    }

    public getSeriesProperty(property: LineSeriesProperty | LineMarkerProperty): string {
        return this.chartOptions.seriesDefaults ? `${this.chartOptions.seriesDefaults[property]}` : '';
    }

    public getTooltipsEnabled(): boolean {
        return this.chartOptions.seriesDefaults ? !!this.chartOptions.seriesDefaults.tooltipEnabled : false;
    }

    public getMarkersEnabled(): boolean {
        // markers are always enabled on scatter charts
        return true;
    }

    private defaultOptions(): ScatterChartOptions {

        const showLegend = this.chartProxyParams.categorySelected;
        const xAxisType = this.chartProxyParams.categorySelected ? 'category' : 'number';
        const palette = this.chartProxyParams.getSelectedPalette();

        return {
            background: {
                fill: this.getBackgroundColor()
            },
            padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            },
            legendPosition: 'right',
            legendPadding: 20,
            legend: {
                enabled: true,
                labelFontStyle: undefined,
                labelFontWeight: 'normal',
                labelFontSize: 12,
                labelFontFamily: 'Verdana, sans-serif',
                labelColor: this.getLabelColor(),
                itemPaddingX: 16,
                itemPaddingY: 8,
                markerPadding: 4,
                markerSize: 14,
                markerStrokeWidth: 1
            },
            xAxis: {
                type: xAxisType,
                labelFontStyle: undefined,
                labelFontWeight: 'normal',
                labelFontSize: 12,
                labelFontFamily: 'Verdana, sans-serif',
                labelColor: this.getLabelColor(),
                labelRotation: 0,
                tickColor: 'rgba(195, 195, 195, 1)',
                tickSize: 6,
                tickWidth: 1,
                tickPadding: 5,
                lineColor: 'rgba(195, 195, 195, 1)',
                lineWidth: 1,
                gridStyle: [{
                    stroke: this.getAxisGridColor(),
                    lineDash: [4, 2]
                }]
            },
            yAxis: {
                type: 'number',
                labelFontStyle: undefined,
                labelFontWeight: 'normal',
                labelFontSize: 12,
                labelFontFamily: 'Verdana, sans-serif',
                labelColor: this.getLabelColor(),
                labelRotation: 0,
                tickColor: 'rgba(195, 195, 195, 1)',
                tickSize: 6,
                tickWidth: 1,
                tickPadding: 5,
                lineColor: 'rgba(195, 195, 195, 1)',
                lineWidth: 1,
                gridStyle: [{
                    stroke: this.getAxisGridColor(),
                    lineDash: [4, 2]
                }]
            },
            seriesDefaults: {
                type: 'scatter',
                fills: palette.fills,
                strokes: palette.strokes,
                marker: true,
                markerSize: 6,
                markerStrokeWidth: 1,
                tooltipEnabled: true,
                tooltipRenderer: undefined,
                showInLegend: showLegend,
                title: ''
            }
        };
    }
}