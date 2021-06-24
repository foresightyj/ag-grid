// Type definitions for @ag-grid-community/core v25.3.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Column } from "../entities/column";
import { RowNode } from "../entities/rowNode";
import { GridBodyComp } from "../gridBodyComp/gridBodyComp";
export interface IContextMenuFactory {
    onContextMenu(mouseEvent: MouseEvent | null, touchEvent: TouchEvent | null, rowNode: RowNode | null, column: Column | null, value: any, anchorToElement: HTMLElement): void;
    hideActiveMenu(): void;
    registerGridComp(gridPanel: GridBodyComp): void;
}
