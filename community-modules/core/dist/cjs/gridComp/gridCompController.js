/**
 * @ag-grid-community/core - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v25.3.1
 * @link http://www.ag-grid.com/
 * @license MIT
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context/context");
var beanStub_1 = require("../context/beanStub");
var moduleRegistry_1 = require("../modules/moduleRegistry");
var moduleNames_1 = require("../modules/moduleNames");
var layoutFeature_1 = require("../styling/layoutFeature");
var eventKeys_1 = require("../eventKeys");
var array_1 = require("../utils/array");
var GridCompController = /** @class */ (function (_super) {
    __extends(GridCompController, _super);
    function GridCompController() {
        return _super.call(this) || this;
    }
    GridCompController.prototype.postConstruct = function () {
        var _this = this;
        this.logger = this.loggerFactory.create('GridCompController');
        // register with services that need grid core
        [
            this.gridApi,
            this.popupService,
            this.focusController,
            this.controllersService
        ].forEach(function (service) { return service.registerGridCompController(_this); });
        if (moduleRegistry_1.ModuleRegistry.isRegistered(moduleNames_1.ModuleNames.ClipboardModule)) {
            this.clipboardService.registerGridCompController(this);
        }
    };
    GridCompController.prototype.setView = function (view, eGridDiv, eGui) {
        var _this = this;
        this.view = view;
        this.eGridHostDiv = eGridDiv;
        this.eGui = eGui;
        this.mouseEventService.stampTopLevelGridCompWithGridInstance(eGridDiv);
        this.createManagedBean(new layoutFeature_1.LayoutFeature(this.view));
        // important to set rtl before doLayout, as setting the RTL class impacts the scroll position,
        // which doLayout indirectly depends on
        this.addRtlSupport();
        this.addManagedListener(this, eventKeys_1.Events.EVENT_KEYBOARD_FOCUS, function () {
            _this.view.addOrRemoveKeyboardFocusClass(true);
        });
        this.addManagedListener(this, eventKeys_1.Events.EVENT_MOUSE_FOCUS, function () {
            _this.view.addOrRemoveKeyboardFocusClass(false);
        });
        var unsubscribeFromResize = this.resizeObserverService.observeResize(this.eGridHostDiv, this.onGridSizeChanged.bind(this));
        this.addDestroyFunc(function () { return unsubscribeFromResize(); });
    };
    GridCompController.prototype.showDropZones = function () {
        return moduleRegistry_1.ModuleRegistry.isRegistered(moduleNames_1.ModuleNames.RowGroupingModule);
    };
    GridCompController.prototype.showSideBar = function () {
        return moduleRegistry_1.ModuleRegistry.isRegistered(moduleNames_1.ModuleNames.SideBarModule);
    };
    GridCompController.prototype.showStatusBar = function () {
        return moduleRegistry_1.ModuleRegistry.isRegistered(moduleNames_1.ModuleNames.StatusBarModule);
    };
    GridCompController.prototype.showWatermark = function () {
        return moduleRegistry_1.ModuleRegistry.isRegistered(moduleNames_1.ModuleNames.EnterpriseCoreModule);
        ;
    };
    GridCompController.prototype.onGridSizeChanged = function () {
        var event = {
            type: eventKeys_1.Events.EVENT_GRID_SIZE_CHANGED,
            api: this.gridApi,
            columnApi: this.columnApi,
            clientWidth: this.eGridHostDiv.clientWidth,
            clientHeight: this.eGridHostDiv.clientHeight
        };
        this.eventService.dispatchEvent(event);
    };
    GridCompController.prototype.addRtlSupport = function () {
        var cssClass = this.gridOptionsWrapper.isEnableRtl() ? 'ag-rtl' : 'ag-ltr';
        this.view.setRtlClass(cssClass);
    };
    GridCompController.prototype.destroyGridUi = function () {
        this.view.destroyGridUi();
    };
    GridCompController.prototype.getGui = function () {
        return this.eGui;
    };
    GridCompController.prototype.focusNextInnerContainer = function (backwards) {
        var focusableContainers = this.view.getFocusableContainers();
        var idxWithFocus = array_1.findIndex(focusableContainers, function (container) { return container.contains(document.activeElement); });
        var nextIdx = idxWithFocus + (backwards ? -1 : 1);
        if (nextIdx < 0 || nextIdx >= focusableContainers.length) {
            return false;
        }
        if (nextIdx === 0) {
            return this.focusGridHeader();
        }
        return this.focusController.focusInto(focusableContainers[nextIdx]);
    };
    GridCompController.prototype.focusGridHeader = function () {
        var firstColumn = this.columnController.getAllDisplayedColumns()[0];
        if (!firstColumn) {
            return false;
        }
        if (firstColumn.getParent()) {
            firstColumn = this.columnController.getColumnGroupAtLevel(firstColumn, 0);
        }
        this.focusController.focusHeaderPosition({ headerRowIndex: 0, column: firstColumn });
        return true;
    };
    GridCompController.prototype.forceFocusOutOfContainer = function (up) {
        if (up === void 0) { up = false; }
        this.view.forceFocusOutOfContainer(up);
    };
    __decorate([
        context_1.Autowired('columnApi')
    ], GridCompController.prototype, "columnApi", void 0);
    __decorate([
        context_1.Autowired('gridApi')
    ], GridCompController.prototype, "gridApi", void 0);
    __decorate([
        context_1.Autowired('popupService')
    ], GridCompController.prototype, "popupService", void 0);
    __decorate([
        context_1.Autowired('focusController')
    ], GridCompController.prototype, "focusController", void 0);
    __decorate([
        context_1.Optional('clipboardService')
    ], GridCompController.prototype, "clipboardService", void 0);
    __decorate([
        context_1.Autowired('loggerFactory')
    ], GridCompController.prototype, "loggerFactory", void 0);
    __decorate([
        context_1.Autowired('resizeObserverService')
    ], GridCompController.prototype, "resizeObserverService", void 0);
    __decorate([
        context_1.Autowired('columnController')
    ], GridCompController.prototype, "columnController", void 0);
    __decorate([
        context_1.Autowired('controllersService')
    ], GridCompController.prototype, "controllersService", void 0);
    __decorate([
        context_1.Autowired('mouseEventService')
    ], GridCompController.prototype, "mouseEventService", void 0);
    __decorate([
        context_1.PostConstruct
    ], GridCompController.prototype, "postConstruct", null);
    return GridCompController;
}(beanStub_1.BeanStub));
exports.GridCompController = GridCompController;

//# sourceMappingURL=gridCompController.js.map