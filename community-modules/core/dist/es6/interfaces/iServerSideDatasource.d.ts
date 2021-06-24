// Type definitions for @ag-grid-community/core v25.3.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { RowNode } from "../entities/rowNode";
import { ColumnVO } from "./iColumnVO";
import { ColumnApi } from "../columnController/columnApi";
import { GridApi } from "../gridApi";
import { LoadSuccessParams } from "../rowNodeCache/rowNodeBlock";
export interface IServerSideGetRowsRequest {
    startRow: number;
    endRow: number;
    rowGroupCols: ColumnVO[];
    valueCols: ColumnVO[];
    pivotCols: ColumnVO[];
    pivotMode: boolean;
    groupKeys: string[];
    filterModel: any;
    sortModel: any;
}
export interface IServerSideGetRowsParams {
    request: IServerSideGetRowsRequest;
    parentNode: RowNode;
    successCallback(rowsThisPage: any[], lastRow: number): void;
    success(params: LoadSuccessParams): void;
    failCallback(): void;
    fail(): void;
    api: GridApi;
    columnApi: ColumnApi;
}
export interface IServerSideDatasource {
    getRows(params: IServerSideGetRowsParams): void;
    destroy?(): void;
}