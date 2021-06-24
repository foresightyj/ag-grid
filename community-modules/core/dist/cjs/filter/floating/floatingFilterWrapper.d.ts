// Type definitions for @ag-grid-community/core v25.3.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Column } from '../../entities/column';
import { IFilterDef } from '../../interfaces/iFilter';
import { AbstractHeaderWrapper } from '../../headerRendering/header/abstractHeaderWrapper';
import { Beans } from '../../rendering/beans';
export declare class FloatingFilterWrapper extends AbstractHeaderWrapper {
    private static TEMPLATE;
    private readonly columnHoverService;
    private readonly userComponentFactory;
    private readonly gridApi;
    private readonly columnApi;
    private readonly filterManager;
    private readonly menuFactory;
    protected readonly beans: Beans;
    private readonly eFloatingFilterBody;
    private readonly eButtonWrapper;
    private readonly eButtonShowMainFilter;
    protected readonly column: Column;
    protected readonly pinned: string | null;
    private suppressFilterButton;
    private floatingFilterCompPromise;
    constructor(column: Column, pinned: string | null);
    protected postConstruct(): void;
    protected onTabKeyDown(e: KeyboardEvent): void;
    protected handleKeyDown(e: KeyboardEvent): void;
    protected onFocusIn(e: FocusEvent): void;
    private setupFloatingFilter;
    private setupLeftPositioning;
    private setupSyncWithFilter;
    private showParentFilter;
    private setupColumnHover;
    private onColumnHover;
    private setupWidth;
    private onColumnWidthChanged;
    private setupWithFloatingFilter;
    private parentFilterInstance;
    private getFilterComponent;
    static getDefaultFloatingFilterType(def: IFilterDef): string | null;
    private getFloatingFilterInstance;
    private currentParentModel;
    private onParentModelChanged;
    private onFloatingFilterChanged;
}
