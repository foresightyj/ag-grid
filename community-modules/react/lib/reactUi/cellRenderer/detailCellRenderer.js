// @ag-grid-community/react v27.2.1
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const utils_1 = require("../utils");
const beansContext_1 = require("../beansContext");
const agGridReactUi_1 = require("../agGridReactUi");
const DetailCellRenderer = (props, ref) => {
    const { ctrlsFactory, context, gridOptionsWrapper, resizeObserverService, clientSideRowModel, serverSideRowModel } = react_1.useContext(beansContext_1.BeansContext);
    const [cssClasses, setCssClasses] = react_1.useState(new utils_1.CssClasses());
    const [gridCssClasses, setGridCssClasses] = react_1.useState(new utils_1.CssClasses());
    const [detailGridOptions, setDetailGridOptions] = react_1.useState();
    const [detailRowData, setDetailRowData] = react_1.useState();
    const ctrlRef = react_1.useRef();
    const eGuiRef = react_1.useRef(null);
    const topClassName = react_1.useMemo(() => cssClasses.toString() + ' ag-details-row', [cssClasses]);
    const gridClassName = react_1.useMemo(() => gridCssClasses.toString() + ' ag-details-grid', [gridCssClasses]);
    if (ref) {
        react_1.useImperativeHandle(ref, () => ({
            refresh() { return ctrlRef.current.refresh(); }
        }));
    }
    react_1.useEffect(() => {
        if (props.template && typeof props.template === 'string') {
            console.warn('AG Grid: detailCellRendererParams.template is not supported by React - this only works with frameworks that work against String templates. To change the template, please provide your own React Detail Cell Renderer.');
        }
    }, []);
    react_1.useEffect(() => {
        const compProxy = {
            addOrRemoveCssClass: (name, on) => setCssClasses(prev => prev.setClass(name, on)),
            addOrRemoveDetailGridCssClass: (name, on) => setGridCssClasses(prev => prev.setClass(name, on)),
            setDetailGrid: gridOptions => setDetailGridOptions(gridOptions),
            setRowData: rowData => setDetailRowData(rowData)
        };
        const ctrl = ctrlsFactory.getInstance('detailCellRenderer');
        if (!ctrl) {
            return;
        } // should never happen, means master/detail module not loaded
        context.createBean(ctrl);
        ctrl.init(compProxy, props);
        ctrlRef.current = ctrl;
        let resizeObserverDestroyFunc;
        if (gridOptionsWrapper.isDetailRowAutoHeight()) {
            const checkRowSizeFunc = () => {
                // when disposed, current is null, so nothing to do, and the resize observer will
                // be disposed of soon
                if (eGuiRef.current == null) {
                    return;
                }
                const clientHeight = eGuiRef.current.clientHeight;
                // if the UI is not ready, the height can be 0, which we ignore, as otherwise a flicker will occur
                // as UI goes from the default height, to 0, then to the real height as UI becomes ready. this means
                // it's not possible for have 0 as auto-height, however this is an improbable use case, as even an
                // empty detail grid would still have some styling around it giving at least a few pixels.
                if (clientHeight != null && clientHeight > 0) {
                    // we do the update in a timeout, to make sure we are not calling from inside the grid
                    // doing another update
                    const updateRowHeightFunc = () => {
                        props.node.setRowHeight(clientHeight);
                        if (clientSideRowModel) {
                            clientSideRowModel.onRowHeightChanged();
                        }
                        else if (serverSideRowModel) {
                            serverSideRowModel.onRowHeightChanged();
                        }
                    };
                    setTimeout(updateRowHeightFunc, 0);
                }
            };
            resizeObserverDestroyFunc = resizeObserverService.observeResize(eGuiRef.current, checkRowSizeFunc);
            checkRowSizeFunc();
        }
        return () => {
            context.destroyBean(ctrl);
        };
    }, []);
    const setGridApi = react_1.useCallback((api, columnApi) => {
        ctrlRef.current.registerDetailWithMaster(api, columnApi);
    }, []);
    return (react_1.default.createElement("div", { className: topClassName, ref: eGuiRef }, detailGridOptions &&
        react_1.default.createElement(agGridReactUi_1.AgGridReactUi, Object.assign({ className: gridClassName }, detailGridOptions, { rowData: detailRowData, setGridApi: setGridApi }))));
};
exports.default = react_1.forwardRef(DetailCellRenderer);

//# sourceMappingURL=detailCellRenderer.js.map