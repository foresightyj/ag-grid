import { ColDef, ColGroupDef } from "../entities/colDef";
import { ColumnGroupChild } from "../entities/columnGroupChild";
import { ColumnState } from "./columnModel";
import { OriginalColumnGroup } from "../entities/originalColumnGroup";
import { ColumnGroup } from "../entities/columnGroup";
import { Column } from "../entities/column";
import { ColumnEventType } from "../events";
export declare class ColumnApi {
    private columnModel;
    sizeColumnsToFit(gridWidth: number): void;
    setColumnGroupOpened(group: OriginalColumnGroup | string, newValue: boolean): void;
    getColumnGroup(name: string, instanceId?: number): ColumnGroup | null;
    getOriginalColumnGroup(name: string): OriginalColumnGroup | null;
    getDisplayNameForColumn(column: Column, location: string | null): string;
    getDisplayNameForColumnGroup(columnGroup: ColumnGroup, location: string): string;
    getColumn(key: any): Column | null;
    applyColumnState(params: ApplyColumnStateParams): boolean;
    getColumnState(): ColumnState[];
    resetColumnState(): void;
    getColumnGroupState(): {
        groupId: string;
        open: boolean;
    }[];
    setColumnGroupState(stateItems: ({
        groupId: string;
        open: boolean;
    })[]): void;
    resetColumnGroupState(): void;
    isPinning(): boolean;
    isPinningLeft(): boolean;
    isPinningRight(): boolean;
    getDisplayedColAfter(col: Column): Column | null;
    getDisplayedColBefore(col: Column): Column | null;
    setColumnVisible(key: string | Column, visible: boolean): void;
    setColumnsVisible(keys: (string | Column)[], visible: boolean): void;
    setColumnPinned(key: string | Column, pinned: string): void;
    setColumnsPinned(keys: (string | Column)[], pinned: string): void;
    getAllColumns(): Column[] | null;
    getAllGridColumns(): Column[];
    getDisplayedLeftColumns(): Column[];
    getDisplayedCenterColumns(): Column[];
    getDisplayedRightColumns(): Column[];
    getAllDisplayedColumns(): Column[];
    getAllDisplayedVirtualColumns(): Column[];
    moveColumn(key: string | Column, toIndex: number): void;
    moveColumnByIndex(fromIndex: number, toIndex: number): void;
    moveColumns(columnsToMoveKeys: (string | Column)[], toIndex: number): void;
    moveRowGroupColumn(fromIndex: number, toIndex: number): void;
    setColumnAggFunc(key: string | Column, aggFunc: string): void;
    setColumnWidth(key: string | Column, newWidth: number, finished?: boolean, source?: ColumnEventType): void;
    setColumnWidths(columnWidths: {
        key: string | Column;
        newWidth: number;
    }[], finished?: boolean, source?: ColumnEventType): void;
    setPivotMode(pivotMode: boolean): void;
    isPivotMode(): boolean;
    getSecondaryPivotColumn(pivotKeys: string[], valueColKey: string | Column): Column | null;
    setValueColumns(colKeys: (string | Column)[]): void;
    getValueColumns(): Column[];
    removeValueColumn(colKey: (string | Column)): void;
    removeValueColumns(colKeys: (string | Column)[]): void;
    addValueColumn(colKey: (string | Column)): void;
    addValueColumns(colKeys: (string | Column)[]): void;
    setRowGroupColumns(colKeys: (string | Column)[]): void;
    removeRowGroupColumn(colKey: string | Column): void;
    removeRowGroupColumns(colKeys: (string | Column)[]): void;
    addRowGroupColumn(colKey: string | Column): void;
    addRowGroupColumns(colKeys: (string | Column)[]): void;
    getRowGroupColumns(): Column[];
    setPivotColumns(colKeys: (string | Column)[]): void;
    removePivotColumn(colKey: string | Column): void;
    removePivotColumns(colKeys: (string | Column)[]): void;
    addPivotColumn(colKey: string | Column): void;
    addPivotColumns(colKeys: (string | Column)[]): void;
    getPivotColumns(): Column[];
    getLeftDisplayedColumnGroups(): ColumnGroupChild[];
    getCenterDisplayedColumnGroups(): ColumnGroupChild[];
    getRightDisplayedColumnGroups(): ColumnGroupChild[];
    getAllDisplayedColumnGroups(): ColumnGroupChild[] | null;
    autoSizeColumn(key: string | Column, skipHeader?: boolean): void;
    autoSizeColumns(keys: (string | Column)[], skipHeader?: boolean): void;
    autoSizeAllColumns(skipHeader?: boolean): void;
    setSecondaryColumns(colDefs: (ColDef | ColGroupDef)[]): void;
    getSecondaryColumns(): Column[] | null;
    getPrimaryColumns(): Column[] | null;
    private cleanDownReferencesToAvoidMemoryLeakInCaseApplicationIsKeepingReferenceToDestroyedGrid;
    columnGroupOpened(group: OriginalColumnGroup | string, newValue: boolean): void;
    hideColumns(colIds: any, hide: any): void;
    hideColumn(colId: any, hide: any): void;
    setState(columnState: ColumnState[]): boolean;
    getState(): ColumnState[];
    resetState(): void;
    getAggregationColumns(): Column[];
    removeAggregationColumn(colKey: (string | Column)): void;
    removeAggregationColumns(colKeys: (string | Column)[]): void;
    addAggregationColumn(colKey: (string | Column)): void;
    addAggregationColumns(colKeys: (string | Column)[]): void;
    setColumnAggFunction(column: Column, aggFunc: string): void;
    getDisplayNameForCol(column: any): string;
    setColumnState(columnState: ColumnState[]): boolean;
}
export interface ApplyColumnStateParams {
    /** The state from `getColumnState` */
    state?: ColumnState[];
    /** Whether column order should be applied */
    applyOrder?: boolean;
    /** State to apply to columns where state is missing for those columns */
    defaultState?: ColumnState;
}
