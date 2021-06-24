// Type definitions for @ag-grid-community/core v25.3.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { BeanStub } from "../../context/beanStub";
export declare class RowContainerEventsFeature extends BeanStub {
    private mouseEventService;
    private valueService;
    private contextMenuFactory;
    private controllersService;
    private navigationService;
    private focusController;
    private undoRedoService;
    private columnController;
    private paginationProxy;
    private pinnedRowModel;
    private rangeController;
    private clipboardService;
    private element;
    constructor(element: HTMLElement);
    postConstruct(): void;
    private addKeyboardEvents;
    private addMouseListeners;
    private processMouseEvent;
    private mockContextMenuForIPad;
    private getRowForEvent;
    private handleContextMenuMouseEvent;
    private processKeyboardEvent;
    private processCellKeyboardEvent;
    private processFullWidthRowKeyboardEvent;
    private doGridOperations;
    private onCtrlAndA;
    private onCtrlAndC;
    private onCtrlAndV;
    private onCtrlAndD;
}