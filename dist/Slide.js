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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState, } from "react";
import SlideItem from "./SlideItem";
import styled from "styled-components";
var Slide = function (_a) {
    var children = _a.children, responsives = _a.responsives, _b = _a.defaultItemsPerPage, defaultItemsPerPage = _b === void 0 ? 2 : _b, _c = _a.itemPaddingX, itemPaddingX = _c === void 0 ? 12 : _c, _d = _a.alignItems, alignItems = _d === void 0 ? "center" : _d, _e = _a.containerPaddingX, containerPaddingX = _e === void 0 ? 55 : _e, _f = _a.containerPaddingY, containerPaddingY = _f === void 0 ? 20 : _f, _g = _a.autoSlide, autoSlide = _g === void 0 ? false : _g, _h = _a.autoSlideInterval, autoSlideInterval = _h === void 0 ? 3000 : _h, _j = _a.draggable, draggable = _j === void 0 ? true : _j, slideContainer = _a.slideContainer, _k = _a.color, color = _k === void 0 ? "gray" : _k, _l = _a.navSize, navSize = _l === void 0 ? 40 : _l, _m = _a.navOpacity, navOpacity = _m === void 0 ? 1 : _m, _o = _a.pagination, pagination = _o === void 0 ? true : _o, _p = _a.clickablePagination, clickablePagination = _p === void 0 ? true : _p;
    var itemCount = useMemo(function () { return children.length; }, [children.length]);
    var slideRef = useRef(null);
    var _q = useState(autoSlide), activeAutoSlide = _q[0], setActiveAutoSlide = _q[1];
    var _r = useState(false), dragging = _r[0], setDragging = _r[1];
    var _s = useState(false), blockLink = _s[0], setBlockLink = _s[1];
    var _t = useState(0), slidePage = _t[0], setSlidePage = _t[1];
    var _u = useState(200), slideItemWidth = _u[0], setSlideItemWidth = _u[1];
    var _v = useState(Math.ceil(children.length / defaultItemsPerPage)), itemsPerPage = _v[0], setItemsPerPage = _v[1];
    var _w = useState(3), maxPage = _w[0], setMaxPage = _w[1];
    var _x = useState(null), container = _x[0], setContainer = _x[1];
    var isHTMLElementRef = function (ref) {
        return ref.current !== undefined;
    };
    useEffect(function () {
        if (isHTMLElementRef(slideContainer)) {
            setContainer(slideContainer.current);
        }
        else {
            setContainer(slideContainer);
        }
    }, [slideContainer]);
    var increasePage = function () {
        setSlidePage(function (prev) { return (prev === maxPage - 1 ? 0 : prev + 1); });
    };
    var decreasePage = function () {
        setSlidePage(function (prev) { return (prev === 0 ? maxPage - 1 : prev - 1); });
    };
    var onNextClick = function (e) {
        e.preventDefault();
        setActiveAutoSlide(false);
        increasePage();
    };
    var onPrevClick = function (e) {
        e.preventDefault();
        setActiveAutoSlide(false);
        decreasePage();
    };
    var paginationGenerator = useCallback(function () {
        var dots = [];
        var _loop_1 = function (i) {
            dots.push(_jsx("div", { className: "dot", style: {
                    cursor: clickablePagination ? "pointer" : "default",
                    backgroundColor: color,
                    opacity: i === slidePage ? 1 : 0.3,
                }, onClick: clickablePagination
                    ? function () {
                        setSlidePage(i);
                        setActiveAutoSlide(false);
                    }
                    : function () { } }, i));
        };
        for (var i = 0; i < maxPage; i++) {
            _loop_1(i);
        }
        return dots;
    }, [clickablePagination, color, maxPage, slidePage]);
    // 페이지에 맞춰 슬라이드 이동
    var moveSlide = useCallback(function () {
        setBlockLink(false);
        if (!slideRef.current)
            return;
        var slide = slideRef.current;
        var moveX = -slideItemWidth * itemsPerPage * slidePage;
        slide.style.transform = "translateX(".concat(moveX, "px)");
    }, [slideItemWidth, slidePage, itemsPerPage]);
    // 슬라이드 아이템 너비 계산
    useEffect(function () {
        var calcSlideItemWidth = function () {
            if (!container)
                return;
            var containerWidth = container.clientWidth;
            var padding = containerPaddingX * 2;
            if (!responsives) {
                if (containerWidth >= 1440) {
                    var itemsPerPage_1 = Math.min(5, Math.ceil(children.length / 2));
                    setSlidePage(0);
                    setMaxPage(Math.ceil(children.length / itemsPerPage_1));
                    setItemsPerPage(itemsPerPage_1);
                    setSlideItemWidth((containerWidth - padding) / itemsPerPage_1);
                }
                else if (containerWidth <= 500) {
                    var itemsPerPage_2 = 1;
                    setSlidePage(0);
                    setMaxPage(children.length / itemsPerPage_2);
                    setItemsPerPage(itemsPerPage_2);
                    setSlideItemWidth(containerWidth - padding);
                }
                else if (containerWidth <= 1024) {
                    var itemsPerPage_3 = Math.min(3, Math.ceil(children.length / 4));
                    setSlidePage(0);
                    setMaxPage(Math.ceil(children.length / itemsPerPage_3));
                    setItemsPerPage(itemsPerPage_3);
                    setSlideItemWidth((containerWidth - padding) / itemsPerPage_3);
                }
                else if (containerWidth <= 1439) {
                    var itemsPerPage_4 = Math.min(4, Math.ceil(children.length / 3));
                    setSlidePage(0);
                    setMaxPage(Math.ceil(children.length / itemsPerPage_4));
                    setItemsPerPage(itemsPerPage_4);
                    setSlideItemWidth((containerWidth - padding) / itemsPerPage_4);
                }
            }
            else {
                for (var i = 0; i < responsives.length; i++) {
                    var _a = responsives[i], _b = _a.range, from = _b.from, to = _b.to, itemsPerPage_5 = _a.itemsPerPage;
                    if (!from && !to) {
                        continue;
                    }
                    else if (!!to && !from) {
                        // ~~ to
                        if (containerWidth <= to) {
                            setSlidePage(0);
                            setMaxPage(Math.ceil(itemCount / itemsPerPage_5));
                            setItemsPerPage(itemsPerPage_5);
                            setSlideItemWidth((containerWidth - padding) / itemsPerPage_5);
                            break;
                        }
                        else if (i === responsives.length - 1) {
                            setSlidePage(0);
                            setMaxPage(Math.ceil(itemCount / defaultItemsPerPage));
                            setItemsPerPage(defaultItemsPerPage);
                            setSlideItemWidth((containerWidth - padding) / defaultItemsPerPage);
                        }
                        else {
                            continue;
                        }
                        // from ~~
                    }
                    else if (!!from && !to) {
                        if (containerWidth >= from) {
                            setSlidePage(0);
                            setMaxPage(Math.ceil(itemCount / itemsPerPage_5));
                            setItemsPerPage(itemsPerPage_5);
                            setSlideItemWidth((containerWidth - padding) / itemsPerPage_5);
                            break;
                        }
                        else if (i === responsives.length - 1) {
                            setSlidePage(0);
                            setMaxPage(Math.ceil(itemCount / defaultItemsPerPage));
                            setItemsPerPage(defaultItemsPerPage);
                            setSlideItemWidth((containerWidth - padding) / defaultItemsPerPage);
                        }
                        else {
                            continue;
                        }
                        // from ~ to
                    }
                    else if (!!to && !!from) {
                        if (containerWidth <= to && containerWidth >= from) {
                            console.log(containerWidth);
                            console.log((containerWidth - padding) / itemsPerPage_5);
                            setSlidePage(0);
                            setMaxPage(Math.ceil(itemCount / itemsPerPage_5));
                            setItemsPerPage(itemsPerPage_5);
                            setSlideItemWidth((containerWidth - padding) / itemsPerPage_5);
                            break;
                        }
                        else {
                            if (i === responsives.length - 1) {
                                setSlidePage(0);
                                setMaxPage(Math.ceil(itemCount / defaultItemsPerPage));
                                setItemsPerPage(defaultItemsPerPage);
                                setSlideItemWidth((containerWidth - padding) / defaultItemsPerPage);
                                break;
                            }
                            else {
                            }
                        }
                    }
                }
            }
        };
        calcSlideItemWidth();
        window.addEventListener("resize", calcSlideItemWidth);
        return function () {
            window.removeEventListener("resize", calcSlideItemWidth);
        };
    }, [
        containerPaddingX,
        container,
        defaultItemsPerPage,
        itemCount,
        responsives,
        children.length,
    ]);
    useEffect(function () {
        moveSlide();
    }, [moveSlide]);
    // 슬라이드 드래그
    useEffect(function () {
        if (!slideRef.current || !draggable)
            return;
        var slide = slideRef.current;
        var slideInitX = -slideItemWidth * itemsPerPage * slidePage;
        var touchStartX;
        var touchMoveX;
        // 터치 드래그
        var touchMoveHandler = function (e) {
            if (e.cancelable)
                e.preventDefault();
            if (!slideRef.current)
                return;
            var slide = slideRef.current;
            touchMoveX = e.touches[0].clientX - touchStartX;
            slide.style.transform = "translateX(".concat(slideInitX + touchMoveX, "px)");
        };
        var touchEndHandler = function (e) {
            if (e.cancelable)
                e.preventDefault();
            setDragging(false);
            var newPage = slidePage + Math.round(touchMoveX / -slideItemWidth);
            setSlidePage(newPage <= 0 ? 0 : newPage >= maxPage ? maxPage - 1 : newPage);
            moveSlide();
            window.removeEventListener("touchmove", touchMoveHandler);
        };
        var touchStartHandler = function (e) {
            if (e.cancelable)
                e.preventDefault();
            setActiveAutoSlide(false);
            setDragging(true);
            touchStartX = e.touches[0].clientX;
            window.addEventListener("touchmove", touchMoveHandler);
            window.addEventListener("touchend", touchEndHandler, { once: true });
        };
        // 마우스 드래그
        var mouseMoveHandler = function (e) {
            if (e.cancelable)
                e.preventDefault();
            if (!slideRef.current)
                return;
            var slide = slideRef.current;
            touchMoveX = e.clientX - touchStartX;
            // 드래그 시 제품으로 링크 이동을 막는다.
            if (Math.abs(touchMoveX) >= 25) {
                setBlockLink(true);
            }
            slide.style.transform = "translateX(".concat(slideInitX + touchMoveX, "px)");
        };
        var mouseUpHandler = function (e) {
            if (e.cancelable)
                e.preventDefault();
            setDragging(false);
            if (touchMoveX) {
                var newPage = slidePage + Math.round(touchMoveX / -slideItemWidth);
                setSlidePage(newPage <= 0 ? 0 : newPage >= maxPage ? maxPage - 1 : newPage);
                moveSlide();
            }
            window.removeEventListener("mousemove", mouseMoveHandler);
        };
        var MouseDownHandler = function (e) {
            if (e.cancelable)
                e.preventDefault();
            setActiveAutoSlide(false);
            setDragging(true);
            touchStartX = e.clientX;
            window.addEventListener("mousemove", mouseMoveHandler);
            window.addEventListener("mouseup", mouseUpHandler, { once: true });
        };
        slide.addEventListener("touchstart", touchStartHandler);
        slide.addEventListener("mousedown", MouseDownHandler);
        return function () {
            slide.removeEventListener("touchstart", touchStartHandler);
            window.removeEventListener("touchmove", touchMoveHandler);
            window.removeEventListener("touchend", touchEndHandler);
            slide.removeEventListener("mousedown", MouseDownHandler);
            window.removeEventListener("mousemove", mouseMoveHandler);
            window.removeEventListener("mouseup", mouseUpHandler);
        };
    }, [maxPage, moveSlide, slideItemWidth, slidePage, draggable, itemsPerPage]);
    useEffect(function () {
        if (!autoSlide)
            return;
        var automaticSlide = setInterval(function () {
            if (activeAutoSlide) {
                setSlidePage(function (prev) { return (prev >= maxPage - 1 ? 0 : prev + 1); });
            }
            else {
                clearInterval(automaticSlide);
            }
        }, autoSlideInterval);
        return function () {
            clearInterval(automaticSlide);
        };
    }, [activeAutoSlide, autoSlide, autoSlideInterval, maxPage]);
    return (_jsx(StyledSlide, { children: _jsxs("div", __assign({ className: "slide" }, { children: [_jsxs("div", __assign({ className: "navigation", style: {
                        translate: pagination ? "0px -8px" : "none",
                    } }, { children: [_jsx("button", __assign({ onClick: onPrevClick, style: {
                                width: "".concat(navSize, "px"),
                                height: "".concat(navSize, "px"),
                                opacity: navOpacity,
                            } }, { children: _jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 300 300", style: {
                                    stroke: color,
                                } }, { children: _jsx("polyline", { points: "221.98 32.98 78.02 150 221.98 267.02" }) })) })), _jsx("button", __assign({ onClick: onNextClick, style: {
                                width: "".concat(navSize, "px"),
                                height: "".concat(navSize, "px"),
                                opacity: navOpacity,
                            } }, { children: _jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 300 300", style: {
                                    stroke: color,
                                } }, { children: _jsx("polyline", { points: "78.79 267.02 222.75 150 78.79 32.98" }) })) }))] })), _jsx("ul", __assign({ ref: slideRef, className: "slider", style: {
                        cursor: blockLink ? "grabbing" : "default",
                        paddingLeft: "".concat(containerPaddingX, "px"),
                        paddingRight: "".concat(containerPaddingX, "px"),
                        paddingTop: "".concat(containerPaddingY, "px"),
                        paddingBottom: "".concat(containerPaddingY, "px"),
                        alignItems: alignItems,
                        transition: !dragging ? "all 0.5s" : "none",
                        marginBottom: pagination ? "32px" : "",
                    } }, { children: children.map(function (child, i) { return (_jsx(SlideItem, __assign({ slideItemWidth: slideItemWidth, paddingX: itemPaddingX }, { children: _jsx("li", __assign({ style: {
                                pointerEvents: blockLink ? "none" : "all",
                            } }, { children: child })) }), i)); }) })), pagination && (_jsx("div", __assign({ className: "pagination" }, { children: paginationGenerator() })))] })) }));
};
var StyledSlide = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    display: block;\n  }\n\n  .slide {\n    overflow: hidden;\n    position: relative;\n    height: fit-content;\n    min-height: 50px;\n    display: flex;\n    align-items: center;\n  }\n\n  .slide > .navigation {\n    z-index: 10;\n    pointer-events: none;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    display: flex;\n    justify-content: space-between;\n  }\n  .slide > .navigation > button {\n    pointer-events: all;\n    cursor: pointer;\n    position: relative;\n    margin-top: auto;\n    margin-bottom: auto;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 100%;\n    background-color: white;\n    box-shadow: 1px 1px 5px gray;\n    border: none;\n  }\n  .slide > .navigation > button > svg {\n    width: 100%;\n    fill: none;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n    stroke-width: 50px;\n    opacity: 0.3;\n    transition: all 0.3s;\n    margin: 10%;\n  }\n  .slide > .navigation > button:hover > svg {\n    opacity: 1;\n  }\n  .slide > .navigation > button:first-child {\n    margin-left: 10px;\n  }\n  .slide > .navigation > button:last-child {\n    margin-right: 10px;\n  }\n  .slide > .navigation > button:first-child > svg {\n    margin-right: 20%;\n  }\n  .slide > .navigation > button:last-child > svg {\n    margin-left: 20%;\n  }\n\n  .slide > .slider {\n    user-select: none;\n    position: relative;\n    height: fit-content;\n    width: fit-content;\n    display: flex;\n    list-style: none;\n  }\n\n  .slide > .pagination {\n    position: absolute;\n    height: 16px;\n    width: 100%;\n    bottom: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 7px;\n  }\n  .slide > .pagination > .dot {\n    height: 7px;\n    width: 7px;\n    border-radius: 100%;\n  }\n"], ["\n  * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    display: block;\n  }\n\n  .slide {\n    overflow: hidden;\n    position: relative;\n    height: fit-content;\n    min-height: 50px;\n    display: flex;\n    align-items: center;\n  }\n\n  .slide > .navigation {\n    z-index: 10;\n    pointer-events: none;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    display: flex;\n    justify-content: space-between;\n  }\n  .slide > .navigation > button {\n    pointer-events: all;\n    cursor: pointer;\n    position: relative;\n    margin-top: auto;\n    margin-bottom: auto;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 100%;\n    background-color: white;\n    box-shadow: 1px 1px 5px gray;\n    border: none;\n  }\n  .slide > .navigation > button > svg {\n    width: 100%;\n    fill: none;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n    stroke-width: 50px;\n    opacity: 0.3;\n    transition: all 0.3s;\n    margin: 10%;\n  }\n  .slide > .navigation > button:hover > svg {\n    opacity: 1;\n  }\n  .slide > .navigation > button:first-child {\n    margin-left: 10px;\n  }\n  .slide > .navigation > button:last-child {\n    margin-right: 10px;\n  }\n  .slide > .navigation > button:first-child > svg {\n    margin-right: 20%;\n  }\n  .slide > .navigation > button:last-child > svg {\n    margin-left: 20%;\n  }\n\n  .slide > .slider {\n    user-select: none;\n    position: relative;\n    height: fit-content;\n    width: fit-content;\n    display: flex;\n    list-style: none;\n  }\n\n  .slide > .pagination {\n    position: absolute;\n    height: 16px;\n    width: 100%;\n    bottom: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 7px;\n  }\n  .slide > .pagination > .dot {\n    height: 7px;\n    width: 7px;\n    border-radius: 100%;\n  }\n"])));
export default Slide;
var templateObject_1;
