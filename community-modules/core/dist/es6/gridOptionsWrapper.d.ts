// Type definitions for @ag-grid-community/core v25.3.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { RowNode } from './entities/rowNode';
import { ChartRef, FillOperationParams, GetChartToolbarItems, GetContextMenuItems, GetMainMenuItems, GetRowNodeIdFunc, GetServerSideStoreParamsParams, GridOptions, IsApplyServerSideTransaction, IsGroupOpenByDefaultParams, IsRowMaster, IsRowSelectable, IsServerSideGroupOpenByDefaultParams, NavigateToNextCellParams, NavigateToNextHeaderParams, PaginationNumberFormatterParams, PostProcessPopupParams, ProcessChartOptionsParams, ProcessDataFromClipboardParams, ServerSideStoreParams, TabToNextCellParams, TabToNextHeaderParams } from './entities/gridOptions';
import { GridApi } from './gridApi';
import { ColDef, ColGroupDef, IAggFunc, SuppressKeyboardEventParams } from './entities/colDef';
import { ColumnApi } from './columnController/columnApi';
import { IViewportDatasource } from './interfaces/iViewportDatasource';
import { IDatasource } from './interfaces/iDatasource';
import { CellPosition } from './entities/cellPosition';
import { IServerSideDatasource } from './interfaces/iServerSideDatasource';
import { CsvExportParams, ProcessCellForExportParams, ProcessHeaderForExportParams } from './interfaces/exportParams';
import { AgEvent } from './events';
import { SideBarDef } from './entities/sideBar';
import { ChartOptions } from './interfaces/iChartOptions';
import { AgChartTheme, AgChartThemeOverrides } from "./interfaces/iAgChartOptions";
import { HeaderPosition } from './headerRendering/header/headerPosition';
import { ExcelExportParams } from './interfaces/iExcelCreator';
export interface PropertyChangedEvent extends AgEvent {
    currentValue: any;
    previousValue: any;
}
export declare class GridOptionsWrapper {
    private static MIN_COL_WIDTH;
    static PROP_HEADER_HEIGHT: string;
    static PROP_GROUP_REMOVE_SINGLE_CHILDREN: string;
    static PROP_GROUP_REMOVE_LOWEST_SINGLE_CHILDREN: string;
    static PROP_PIVOT_HEADER_HEIGHT: string;
    static PROP_SUPPRESS_CLIPBOARD_PASTE: string;
    static PROP_GROUP_HEADER_HEIGHT: string;
    static PROP_PIVOT_GROUP_HEADER_HEIGHT: string;
    static PROP_NAVIGATE_TO_NEXT_CELL: string;
    static PROP_TAB_TO_NEXT_CELL: string;
    static PROP_NAVIGATE_TO_NEXT_HEADER: string;
    static PROP_TAB_TO_NEXT_HEADER: string;
    static PROP_IS_EXTERNAL_FILTER_PRESENT: string;
    static PROP_DOES_EXTERNAL_FILTER_PASS: string;
    static PROP_FLOATING_FILTERS_HEIGHT: string;
    static PROP_SUPPRESS_ROW_CLICK_SELECTION: string;
    static PROP_SUPPRESS_ROW_DRAG: string;
    static PROP_SUPPRESS_MOVE_WHEN_ROW_DRAG: string;
    static PROP_GET_ROW_CLASS: string;
    static PROP_GET_ROW_STYLE: string;
    static PROP_GET_ROW_HEIGHT: string;
    static PROP_POPUP_PARENT: string;
    static PROP_DOM_LAYOUT: string;
    static PROP_FILL_HANDLE_DIRECTION: string;
    static PROP_GROUP_ROW_AGG_NODES: string;
    static PROP_GET_BUSINESS_KEY_FOR_NODE: string;
    static PROP_GET_CHILD_COUNT: string;
    static PROP_PROCESS_ROW_POST_CREATE: string;
    static PROP_GET_ROW_NODE_ID: string;
    static PROP_IS_FULL_WIDTH_CELL: string;
    static PROP_IS_ROW_SELECTABLE: string;
    static PROP_IS_ROW_MASTER: string;
    static PROP_POST_SORT: string;
    static PROP_GET_DOCUMENT: string;
    static PROP_POST_PROCESS_POPUP: string;
    static PROP_DEFAULT_GROUP_SORT_COMPARATOR: string;
    static PROP_PAGINATION_NUMBER_FORMATTER: string;
    static PROP_GET_CONTEXT_MENU_ITEMS: string;
    static PROP_GET_MAIN_MENU_ITEMS: string;
    static PROP_PROCESS_CELL_FOR_CLIPBOARD: string;
    static PROP_PROCESS_CELL_FROM_CLIPBOARD: string;
    static PROP_SEND_TO_CLIPBOARD: string;
    static PROP_PROCESS_TO_SECONDARY_COLDEF: string;
    static PROP_PROCESS_SECONDARY_COL_GROUP_DEF: string;
    static PROP_PROCESS_CHART_OPTIONS: string;
    static PROP_GET_CHART_TOOLBAR_ITEMS: string;
    static PROP_GET_SERVER_SIDE_STORE_PARAMS: string;
    static PROP_IS_SERVER_SIDE_GROUPS_OPEN_BY_DEFAULT: string;
    static PROP_IS_APPLY_SERVER_SIDE_TRANSACTION: string;
    static PROP_IS_SERVER_SIDE_GROUP: string;
    static PROP_GET_SERVER_SIDE_GROUP_KEY: string;
    private readonly gridOptions;
    private readonly columnController;
    private readonly eventService;
    private readonly environment;
    private readonly autoHeightCalculator;
    private propertyEventService;
    private domDataKey;
    private scrollbarWidth;
    private updateLayoutClassesListener;
    private destroyed;
    private agWire;
    private destroy;
    init(): void;
    private checkColumnDefProperties;
    private checkGridOptionsProperties;
    private checkProperties;
    getDomDataKey(): string;
    getDomData(element: Node | null, key: string): any;
    setDomData(element: Element, key: string, value: any): any;
    isRowSelection(): boolean;
    isSuppressRowDeselection(): boolean;
    isRowSelectionMulti(): boolean;
    isRowMultiSelectWithClick(): boolean;
    getContext(): any;
    isPivotMode(): boolean;
    isSuppressExpandablePivotGroups(): boolean;
    getPivotColumnGroupTotals(): string;
    getPivotRowTotals(): string;
    isRowModelInfinite(): boolean;
    isRowModelViewport(): boolean;
    isRowModelServerSide(): boolean;
    isRowModelDefault(): boolean;
    isFullRowEdit(): boolean;
    isSuppressFocusAfterRefresh(): boolean;
    isSuppressBrowserResizeObserver(): boolean;
    isSuppressMaintainUnsortedOrder(): boolean;
    isSuppressClearOnFillReduction(): boolean;
    isShowToolPanel(): boolean;
    getSideBar(): SideBarDef;
    isSuppressTouch(): boolean;
    isApplyColumnDefOrder(): boolean;
    isSuppressRowTransform(): boolean;
    isSuppressColumnStateEvents(): boolean;
    isAllowDragFromColumnsToolPanel(): boolean;
    useAsyncEvents(): boolean;
    isEnableCellChangeFlash(): boolean;
    getCellFlashDelay(): number;
    getCellFadeDelay(): number;
    isGroupSelectsChildren(): boolean;
    isSuppressRowHoverHighlight(): boolean;
    isGroupSelectsFiltered(): boolean;
    isGroupHideOpenParents(): boolean;
    isGroupMultiAutoColumn(): boolean;
    isGroupRemoveSingleChildren(): boolean;
    isGroupRemoveLowestSingleChildren(): boolean;
    isGroupIncludeFooter(): boolean;
    isGroupIncludeTotalFooter(): boolean;
    isGroupSuppressBlankHeader(): boolean;
    isSuppressRowClickSelection(): boolean;
    isSuppressCellSelection(): boolean;
    isSuppressMultiSort(): boolean;
    isMultiSortKeyCtrl(): boolean;
    isGroupSuppressAutoColumn(): boolean;
    isPivotSuppressAutoColumn(): boolean;
    isSuppressDragLeaveHidesColumns(): boolean;
    isSuppressScrollOnNewData(): boolean;
    isRowDragManaged(): boolean;
    isSuppressRowDrag(): boolean;
    isSuppressMoveWhenRowDragging(): boolean;
    isEnableMultiRowDragging(): boolean;
    getDomLayout(): string;
    isSuppressHorizontalScroll(): boolean;
    isSuppressMaxRenderedRowRestriction(): boolean;
    isExcludeChildrenWhenTreeDataFiltering(): boolean;
    isAlwaysShowHorizontalScroll(): boolean;
    isAlwaysShowVerticalScroll(): boolean;
    isDebounceVerticalScrollbar(): boolean;
    isSuppressLoadingOverlay(): boolean;
    isSuppressNoRowsOverlay(): boolean;
    isSuppressFieldDotNotation(): boolean;
    getPinnedTopRowData(): any[] | undefined;
    getPinnedBottomRowData(): any[] | undefined;
    isFunctionsPassive(): boolean;
    isSuppressChangeDetection(): boolean;
    isSuppressAnimationFrame(): boolean;
    getQuickFilterText(): string | undefined;
    isCacheQuickFilter(): boolean;
    isUnSortIcon(): boolean;
    isSuppressMenuHide(): boolean;
    isEnterMovesDownAfterEdit(): boolean;
    isEnterMovesDown(): boolean;
    isUndoRedoCellEditing(): boolean;
    getUndoRedoCellEditingLimit(): number | undefined;
    getRowStyle(): any;
    getRowClass(): string | string[];
    getRowStyleFunc(): Function;
    getRowClassFunc(): (params: any) => string | string[];
    rowClassRules(): {
        [cssClassName: string]: string | ((params: any) => boolean);
    };
    getServerSideStoreType(): string | undefined;
    getServerSideStoreParamsFunc(): ((params: GetServerSideStoreParamsParams) => ServerSideStoreParams) | undefined;
    getCreateChartContainerFunc(): ((params: ChartRef) => void) | undefined;
    getPopupParent(): HTMLElement;
    getBlockLoadDebounceMillis(): number;
    getPostProcessPopupFunc(): ((params: PostProcessPopupParams) => void) | undefined;
    getPaginationNumberFormatterFunc(): ((params: PaginationNumberFormatterParams) => string) | undefined;
    getChildCountFunc(): (dataItem: any) => number;
    getIsApplyServerSideTransactionFunc(): IsApplyServerSideTransaction | undefined;
    getDefaultGroupSortComparator(): (nodeA: RowNode, nodeB: RowNode) => number;
    getIsFullWidthCellFunc(): ((rowNode: RowNode) => boolean) | undefined;
    getFullWidthCellRendererParams(): any;
    isEmbedFullWidthRows(): boolean;
    isDetailRowAutoHeight(): boolean;
    getSuppressKeyboardEventFunc(): ((params: SuppressKeyboardEventParams) => boolean) | undefined;
    getBusinessKeyForNodeFunc(): (node: RowNode) => string;
    getApi(): GridApi | undefined | null;
    getColumnApi(): ColumnApi | undefined | null;
    isImmutableData(): boolean;
    isEnsureDomOrder(): boolean;
    isEnableCharts(): boolean;
    getColResizeDefault(): string;
    isSingleClickEdit(): boolean;
    isSuppressClickEdit(): boolean;
    isStopEditingWhenCellsLoseFocus(): boolean;
    getGroupDefaultExpanded(): number | undefined;
    getMaxConcurrentDatasourceRequests(): number | undefined;
    getMaxBlocksInCache(): number | undefined;
    getCacheOverflowSize(): number | undefined;
    getPaginationPageSize(): number | undefined;
    isPaginateChildRows(): boolean;
    getCacheBlockSize(): number | undefined;
    getInfiniteInitialRowCount(): number | undefined;
    isPurgeClosedRowNodes(): boolean;
    isSuppressPaginationPanel(): boolean;
    getRowData(): any[] | undefined;
    isGroupUseEntireRow(pivotMode: boolean): boolean;
    isEnableRtl(): boolean;
    getAutoGroupColumnDef(): ColDef | undefined;
    getRowGroupPanelShow(): string;
    getPivotPanelShow(): string;
    isAngularCompileRows(): boolean;
    isAngularCompileFilters(): boolean;
    isDebug(): boolean;
    getColumnDefs(): (ColGroupDef | ColDef)[];
    getColumnTypes(): {
        [key: string]: ColDef;
    } | undefined;
    getDatasource(): IDatasource | undefined;
    getViewportDatasource(): IViewportDatasource | undefined;
    getServerSideDatasource(): IServerSideDatasource | undefined;
    isAccentedSort(): boolean;
    isEnableBrowserTooltips(): boolean;
    isEnableCellExpressions(): boolean;
    isEnableGroupEdit(): boolean;
    isSuppressMiddleClickScrolls(): boolean;
    isPreventDefaultOnContextMenu(): boolean;
    isSuppressPreventDefaultOnMouseWheel(): boolean;
    isSuppressColumnVirtualisation(): boolean;
    isSuppressContextMenu(): boolean;
    isAllowContextMenuWithControlKey(): boolean;
    isSuppressCopyRowsToClipboard(): boolean;
    isCopyHeadersToClipboard(): boolean;
    isSuppressClipboardPaste(): boolean;
    isSuppressLastEmptyLineOnPaste(): boolean;
    isPagination(): boolean;
    isSuppressEnterpriseResetOnNewColumns(): boolean;
    getProcessDataFromClipboardFunc(): ((params: ProcessDataFromClipboardParams) => string[][] | null) | undefined;
    getAsyncTransactionWaitMillis(): number | undefined;
    isSuppressMovableColumns(): boolean;
    isAnimateRows(): boolean;
    isSuppressColumnMoveAnimation(): boolean;
    isSuppressAggFuncInHeader(): boolean;
    isSuppressAggAtRootLevel(): boolean;
    isSuppressAggFilteredOnly(): boolean;
    isShowOpenedGroup(): boolean;
    isEnableRangeSelection(): boolean;
    isEnableRangeHandle(): boolean;
    isEnableFillHandle(): boolean;
    getFillHandleDirection(): 'x' | 'y' | 'xy';
    getFillOperation(): ((params: FillOperationParams) => any) | undefined;
    isSuppressMultiRangeSelection(): boolean;
    isPaginationAutoPageSize(): boolean;
    isRememberGroupStateWhenNewData(): boolean;
    getIcons(): any;
    getAggFuncs(): {
        [key: string]: IAggFunc;
    } | undefined;
    getSortingOrder(): (string | null)[] | undefined;
    getAlignedGrids(): GridOptions[] | undefined;
    isMasterDetail(): boolean;
    isKeepDetailRows(): boolean;
    getKeepDetailRowsCount(): number | undefined;
    getIsRowMasterFunc(): IsRowMaster | undefined;
    getIsRowSelectableFunc(): IsRowSelectable | undefined;
    getGroupRowRendererParams(): any;
    getOverlayLoadingTemplate(): string;
    getOverlayNoRowsTemplate(): string;
    isSuppressAutoSize(): boolean;
    isEnableCellTextSelection(): boolean;
    isSuppressParentsInRowNodes(): boolean;
    isSuppressClipboardApi(): boolean;
    isFunctionsReadOnly(): boolean;
    isFloatingFilter(): boolean | undefined;
    isEnableCellTextSelect(): boolean;
    isEnableOldSetFilterModel(): boolean;
    getDefaultColDef(): ColDef | undefined;
    getDefaultColGroupDef(): ColGroupDef | undefined;
    getDefaultExportParams(type: 'csv'): CsvExportParams | undefined;
    getDefaultExportParams(type: 'excel'): ExcelExportParams | undefined;
    isSuppressCsvExport(): boolean;
    isAllowShowChangeAfterFilter(): boolean;
    isSuppressExcelExport(): boolean;
    isSuppressMakeColumnVisibleAfterUnGroup(): boolean;
    getDataPathFunc(): ((dataItem: any) => string[]) | undefined;
    getIsServerSideGroupFunc(): ((dataItem: any) => boolean) | undefined;
    getIsServerSideGroupOpenByDefaultFunc(): ((params: IsServerSideGroupOpenByDefaultParams) => boolean) | undefined;
    getIsGroupOpenByDefaultFunc(): ((params: IsGroupOpenByDefaultParams) => boolean) | undefined;
    getServerSideGroupKeyFunc(): ((dataItem: any) => string) | undefined;
    getGroupRowAggNodesFunc(): (nodes: RowNode[]) => any;
    getContextMenuItemsFunc(): GetContextMenuItems | undefined;
    getMainMenuItemsFunc(): GetMainMenuItems | undefined;
    getRowNodeIdFunc(): GetRowNodeIdFunc | undefined;
    getNavigateToNextHeaderFunc(): ((params: NavigateToNextHeaderParams) => HeaderPosition) | undefined;
    getTabToNextHeaderFunc(): ((params: TabToNextHeaderParams) => HeaderPosition) | undefined;
    getNavigateToNextCellFunc(): ((params: NavigateToNextCellParams) => CellPosition) | undefined;
    getTabToNextCellFunc(): ((params: TabToNextCellParams) => CellPosition) | undefined;
    getGridTabIndex(): string;
    isTreeData(): boolean;
    isValueCache(): boolean;
    isValueCacheNeverExpires(): boolean;
    isDeltaSort(): boolean;
    isAggregateOnlyChangedColumns(): boolean;
    getProcessSecondaryColDefFunc(): ((colDef: ColDef) => void) | undefined;
    getProcessSecondaryColGroupDefFunc(): ((colGroupDef: ColGroupDef) => void) | undefined;
    getSendToClipboardFunc(): (params: any) => void;
    getProcessRowPostCreateFunc(): any;
    getProcessCellForClipboardFunc(): ((params: ProcessCellForExportParams) => any) | undefined;
    getProcessHeaderForClipboardFunc(): ((params: ProcessHeaderForExportParams) => any) | undefined;
    getProcessCellFromClipboardFunc(): ((params: ProcessCellForExportParams) => any) | undefined;
    getViewportRowModelPageSize(): number | undefined;
    getViewportRowModelBufferSize(): number;
    isServerSideSortingAlwaysResets(): boolean;
    isServerSideFilteringAlwaysResets(): boolean;
    getPostSortFunc(): ((rowNodes: RowNode[]) => void) | undefined;
    getChartToolbarItemsFunc(): GetChartToolbarItems | undefined;
    getChartThemeOverrides(): AgChartThemeOverrides | undefined;
    getCustomChartThemes(): {
        [name: string]: AgChartTheme;
    } | undefined;
    getChartThemes(): string[];
    getProcessChartOptionsFunc(): ((params: ProcessChartOptionsParams) => ChartOptions<any>) | undefined;
    getClipboardDeliminator(): string;
    setProperty(key: string, value: any, force?: boolean): void;
    addEventListener(key: string, listener: Function): void;
    removeEventListener(key: string, listener: Function): void;
    isSkipHeaderOnAutoSize(): boolean;
    getAutoSizePadding(): number;
    getHeaderHeight(): number | null | undefined;
    getFloatingFiltersHeight(): number | null | undefined;
    getGroupHeaderHeight(): number | null | undefined;
    getPivotHeaderHeight(): number | null | undefined;
    getPivotGroupHeaderHeight(): number | null | undefined;
    isExternalFilterPresent(): boolean;
    doesExternalFilterPass(node: RowNode): boolean;
    getTooltipShowDelay(): number | null;
    isTooltipMouseTrack(): boolean;
    isSuppressModelUpdateAfterUpdateTransaction(): boolean;
    getDocument(): Document;
    getMinColWidth(): number;
    getMaxColWidth(): number;
    getColWidth(): number;
    getRowBuffer(): number;
    getRowBufferInPixels(): number;
    getScrollbarWidth(): number;
    private checkForDeprecated;
    private checkForViolations;
    private treeDataViolations;
    getLocaleTextFunc(): (key: string, defaultValue: string) => string;
    globalEventHandler(eventName: string, event?: any): void;
    getRowHeightAsNumber(): number;
    getRowHeightForNode(rowNode: RowNode, allowEstimate?: boolean): {
        height: number | null | undefined;
        estimated: boolean;
    };
    isDynamicRowHeight(): boolean;
    getListItemHeight(): number;
    chartMenuPanelWidth(): number;
    private isNumeric;
    private getFromTheme;
    private getDefaultRowHeight;
}