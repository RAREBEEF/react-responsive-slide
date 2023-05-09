var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
var SlideItem = function (_a) {
    var slideItemWidth = _a.slideItemWidth, _b = _a.paddingX, paddingX = _b === void 0 ? 12 : _b, children = _a.children;
    return (_jsx(StyledSlideItem, { children: _jsx("div", __assign({ className: "slide-item", style: {
                width: "".concat(slideItemWidth, "px"),
                paddingLeft: "".concat(paddingX, "px"),
                paddingRight: "".concat(paddingX, "px"),
            } }, { children: children })) }));
};
var StyledSlideItem = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  * {\n    box-sizing: border-box;\n  }\n\n  .slide-item {\n    position: relative;\n    height: 100%;\n  }\n"], ["\n  * {\n    box-sizing: border-box;\n  }\n\n  .slide-item {\n    position: relative;\n    height: 100%;\n  }\n"])));
export default SlideItem;
var templateObject_1;
