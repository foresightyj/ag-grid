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
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesList = function () {
    var list = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        list[_i] = arguments[_i];
    }
    var filtered = list.filter(function (s) { return s != null && s !== ''; });
    return filtered.join(' ');
};
var CssClasses = /** @class */ (function () {
    function CssClasses() {
        this.classesMap = {};
    }
    CssClasses.prototype.setClass = function (className, on) {
        // important to not make a copy if nothing has changed, so react
        // won't trigger a render cycle on new object instance
        var nothingHasChanged = !!this.classesMap[className] == on;
        if (nothingHasChanged) {
            return this;
        }
        var res = new CssClasses();
        res.classesMap = __assign({}, this.classesMap);
        res.classesMap[className] = on;
        return res;
    };
    CssClasses.prototype.toString = function () {
        var _this = this;
        var res = Object.keys(this.classesMap).filter(function (key) { return _this.classesMap[key]; }).join(' ');
        return res;
    };
    return CssClasses;
}());
exports.CssClasses = CssClasses;
exports.isComponentStateless = function (Component) {
    var hasSymbol = function () { return typeof Symbol === 'function' && Symbol.for; };
    var getMemoType = function () { return hasSymbol() ? Symbol.for('react.memo') : 0xead3; };
    return (typeof Component === 'function' && !(Component.prototype && Component.prototype.isReactComponent)) || (typeof Component === 'object' && Component.$$typeof === getMemoType());
};