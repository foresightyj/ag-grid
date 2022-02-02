// ag-grid-react v27.0.0
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ag_grid_community_1 = require("ag-grid-community");
var jsComp_1 = require("../jsComp");
var utils_1 = require("../utils");
var beansContext_1 = require("../beansContext");
var cellComp_1 = __importDefault(require("../cells/cellComp"));
var maintainOrderOnColumns = function (prev, next, domOrder) {
    if (domOrder) {
        var res_1 = { list: next, instanceIdMap: new Map() };
        next.forEach(function (c) { return res_1.instanceIdMap.set(c.getInstanceId(), c); });
        return res_1;
    }
    // if dom order not important, we don't want to change the order
    // of the elements in the dom, as this would break transition styles
    var oldCellCtrls = [];
    var newCellCtrls = [];
    var newInstanceIdMap = new Map();
    var tempMap = new Map();
    next.forEach(function (c) { return tempMap.set(c.getInstanceId(), c); });
    prev.list.forEach(function (c) {
        var instanceId = c.getInstanceId();
        if (tempMap.has(instanceId)) {
            oldCellCtrls.push(c);
            newInstanceIdMap.set(instanceId, c);
        }
    });
    next.forEach(function (c) {
        var instanceId = c.getInstanceId();
        if (!prev.instanceIdMap.has(instanceId)) {
            newCellCtrls.push(c);
            newInstanceIdMap.set(instanceId, c);
        }
    });
    var res = {
        list: __spreadArrays(oldCellCtrls, newCellCtrls),
        instanceIdMap: newInstanceIdMap
    };
    return res;
};
var RowComp = function (params) {
    var context = react_1.useContext(beansContext_1.BeansContext).context;
    var rowCtrl = params.rowCtrl, containerType = params.containerType;
    var _a = react_1.useState(), rowIndex = _a[0], setRowIndex = _a[1];
    var _b = react_1.useState(), rowId = _b[0], setRowId = _b[1];
    var _c = react_1.useState(), role = _c[0], setRole = _c[1];
    var _d = react_1.useState(), rowBusinessKey = _d[0], setRowBusinessKey = _d[1];
    var _e = react_1.useState(), tabIndex = _e[0], setTabIndex = _e[1];
    var _f = react_1.useState(), ariaRowIndex = _f[0], setAriaRowIndex = _f[1];
    var _g = react_1.useState(), ariaExpanded = _g[0], setAriaExpanded = _g[1];
    var _h = react_1.useState(), ariaLabel = _h[0], setAriaLabel = _h[1];
    var _j = react_1.useState(), ariaSelected = _j[0], setAriaSelected = _j[1];
    var _k = react_1.useState(), userStyles = _k[0], setUserStyles = _k[1];
    var _l = react_1.useState({ list: [], instanceIdMap: new Map() }), cellCtrls = _l[0], setCellCtrls = _l[1];
    var _m = react_1.useState(), fullWidthCompDetails = _m[0], setFullWidthCompDetails = _m[1];
    var _o = react_1.useState(false), domOrder = _o[0], setDomOrder = _o[1];
    // these styles have initial values, so element is placed into the DOM with them,
    // rather than an transition getting applied.
    var _p = react_1.useState(rowCtrl.getInitialRowTop()), top = _p[0], setTop = _p[1];
    var _q = react_1.useState(rowCtrl.getInitialTransform()), transform = _q[0], setTransform = _q[1];
    var eGui = react_1.useRef(null);
    var fullWidthCompRef = react_1.useRef();
    var cssClassManager = react_1.useMemo(function () { return new ag_grid_community_1.CssClassManager(function () { return eGui.current; }); }, []);
    react_1.useEffect(function () {
        var compProxy = {
            // the rowTop is managed by state, instead of direct style manipulation by rowCtrl (like all the other styles)
            // as we need to have an initial value when it's placed into he DOM for the first time, for animation to work.
            setTop: function (value) { return setTop(value); },
            setTransform: function (value) { return setTransform(value); },
            // i found using React for managing classes at the row level was to slow, as modifying classes caused a lot of
            // React code to execute, so avoiding React for managing CSS Classes made the grid go much faster.
            addOrRemoveCssClass: function (name, on) { return cssClassManager.addOrRemoveCssClass(name, on); },
            setDomOrder: function (domOrder) { return setDomOrder(domOrder); },
            setRowIndex: function (value) { return setRowIndex(value); },
            setAriaRowIndex: function (value) { return setAriaRowIndex(value); },
            setAriaExpanded: function (value) { return setAriaExpanded(value); },
            setAriaLabel: function (value) { return setAriaLabel(value); },
            setRowId: function (value) { return setRowId(value); },
            setRowBusinessKey: function (value) { return setRowBusinessKey(value); },
            setTabIndex: function (value) { return setTabIndex(value); },
            setUserStyles: function (styles) { return setUserStyles(styles); },
            setAriaSelected: function (value) { return setAriaSelected(value); },
            setRole: function (value) { return setRole(value); },
            // if we don't maintain the order, then cols will be ripped out and into the dom
            // when cols reordered, which would stop the CSS transitions from working
            setCellCtrls: function (next) { return setCellCtrls(function (prev) { return maintainOrderOnColumns(prev, next, domOrder); }); },
            showFullWidth: function (compDetails) { return setFullWidthCompDetails(compDetails); },
            getFullWidthCellRenderer: function () { return fullWidthCompRef.current; },
        };
        rowCtrl.setComp(compProxy, eGui.current, containerType);
    }, []);
    react_1.useEffect(function () {
        return jsComp_1.showJsComp(fullWidthCompDetails, context, eGui.current, fullWidthCompRef);
    }, [fullWidthCompDetails]);
    var rowStyles = react_1.useMemo(function () {
        var res = {
            top: top,
            transform: transform
        };
        Object.assign(res, userStyles);
        return res;
    }, [top, transform, userStyles]);
    var showFullWidthFramework = fullWidthCompDetails && fullWidthCompDetails.componentFromFramework;
    var showCells = cellCtrls != null;
    var reactFullWidthCellRendererStateless = react_1.useMemo(function () {
        var res = fullWidthCompDetails
            && fullWidthCompDetails.componentFromFramework
            && utils_1.isComponentStateless(fullWidthCompDetails.componentClass);
        return !!res;
    }, [fullWidthCompDetails]);
    var showCellsJsx = function () { return cellCtrls.list.map(function (cellCtrl) {
        return (react_1.default.createElement(cellComp_1.default, { cellCtrl: cellCtrl, editingRow: rowCtrl.isEditing(), printLayout: rowCtrl.isPrintLayout(), key: cellCtrl.getInstanceId() }));
    }); };
    var showFullWidthFrameworkJsx = function () {
        var FullWidthComp = fullWidthCompDetails.componentClass;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            reactFullWidthCellRendererStateless
                && react_1.default.createElement(FullWidthComp, __assign({}, fullWidthCompDetails.params)),
            !reactFullWidthCellRendererStateless
                && react_1.default.createElement(FullWidthComp, __assign({}, fullWidthCompDetails.params, { ref: fullWidthCompRef }))));
    };
    return (react_1.default.createElement("div", { ref: eGui, role: role, style: rowStyles, "row-index": rowIndex, "aria-rowindex": ariaRowIndex, "aria-expanded": ariaExpanded, "aria-label": ariaLabel, "aria-selected": ariaSelected, "row-id": rowId, "row-business-key": rowBusinessKey, tabIndex: tabIndex },
        showCells && showCellsJsx(),
        showFullWidthFramework && showFullWidthFrameworkJsx()));
};
exports.default = react_1.memo(RowComp);