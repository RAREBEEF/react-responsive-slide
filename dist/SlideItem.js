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
    var slideItemWidth = _a.slideItemWidth, _b = _a.paddingX, paddingX = _b === void 0 ? 12 : _b, children = _a.children, blockLink = _a.blockLink;
    return (_jsx(StyledSlideItem, __assign({ slideItemWidth: slideItemWidth, paddingX: paddingX, blockLink: blockLink }, { children: children })));
};
var StyledSlideItem = styled.li(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  & {\n    position: relative;\n    height: 100%;\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    display: block;\n    width: ", "px;\n    padding-left: ", "px;\n    padding-right: ", "px;\n    pointer-events: ", ";\n  }\n"], ["\n  & {\n    position: relative;\n    height: 100%;\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    display: block;\n    width: ", "px;\n    padding-left: ", "px;\n    padding-right: ", "px;\n    pointer-events: ", ";\n  }\n"])), function (_a) {
    var slideItemWidth = _a.slideItemWidth;
    return slideItemWidth;
}, function (_a) {
    var paddingX = _a.paddingX;
    return paddingX;
}, function (_a) {
    var paddingX = _a.paddingX;
    return paddingX;
}, function (_a) {
    var blockLink = _a.blockLink;
    return (blockLink ? "none" : "all");
});
export default SlideItem;
var templateObject_1;
