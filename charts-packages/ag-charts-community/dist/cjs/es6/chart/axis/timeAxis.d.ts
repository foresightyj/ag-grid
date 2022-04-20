import { TimeScale } from "../../scale/timeScale";
import { ChartAxis } from "../chartAxis";
export declare class TimeAxis extends ChartAxis<TimeScale> {
    static className: string;
    static type: "time";
    private datumFormat;
    private datumFormatter;
    constructor();
    private _nice;
    set nice(value: boolean);
    get nice(): boolean;
    set domain(domain: Date[]);
    get domain(): Date[];
    protected onLabelFormatChange(format?: string): void;
    formatDatum(datum: Date): string;
}