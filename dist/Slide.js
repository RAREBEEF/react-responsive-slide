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
    var children = _a.children, customResponsives = _a.responsives, _b = _a.defaultItemsPerPage, defaultItemsPerPage = _b === void 0 ? 2 : _b, _c = _a.itemPaddingX, itemPaddingX = _c === void 0 ? 12 : _c, _d = _a.itemRatio, itemRatio = _d === void 0 ? "auto" : _d, _e = _a.alignItems, alignItems = _e === void 0 ? "center" : _e, _f = _a.containerPaddingX, containerPaddingX = _f === void 0 ? 55 : _f, _g = _a.containerPaddingY, containerPaddingY = _g === void 0 ? 20 : _g, _h = _a.autoSlide, autoSlide = _h === void 0 ? false : _h, _j = _a.autoSlideInterval, autoSlideInterval = _j === void 0 ? 3000 : _j, _k = _a.draggable, draggable = _k === void 0 ? true : _k, slideContainer = _a.slideContainer, _l = _a.color, color = _l === void 0 ? "gray" : _l, _m = _a.navSize, navSize = _m === void 0 ? 40 : _m, _o = _a.navBackground, navBackground = _o === void 0 ? "none" : _o, _p = _a.navOpacity, navOpacity = _p === void 0 ? 1 : _p, _q = _a.pagination, pagination = _q === void 0 ? true : _q, _r = _a.clickablePagination, clickablePagination = _r === void 0 ? true : _r;
    var itemCount = useMemo(function () { return children.length; }, [children.length]);
    var slideRef = useRef(null);
    var _s = useState(autoSlide), activeAutoSlide = _s[0], setActiveAutoSlide = _s[1];
    var _t = useState(false), dragging = _t[0], setDragging = _t[1];
    var _u = useState(false), blockLink = _u[0], setBlockLink = _u[1];
    var _v = useState(0), slidePage = _v[0], setSlidePage = _v[1];
    var _w = useState(200), slideItemWidth = _w[0], setSlideItemWidth = _w[1];
    var _x = useState(Math.ceil(children.length / defaultItemsPerPage)), itemsPerPage = _x[0], setItemsPerPage = _x[1];
    var _y = useState(3), maxPage = _y[0], setMaxPage = _y[1];
    var _z = useState(null), container = _z[0], setContainer = _z[1];
    var _0 = useState(customResponsives), responsives = _0[0], setResponsives = _0[1];
    // 컨테이너 체크
    useEffect(function () {
        var isHTMLElementRef = function (ref) {
            return ref.current !== undefined;
        };
        if (isHTMLElementRef(slideContainer)) {
            setContainer(slideContainer.current);
        }
        else {
            setContainer(slideContainer);
        }
    }, [slideContainer]);
    // 페이지 이동
    useEffect(function () {
        if (!slideRef.current || dragging)
            return;
        var slide = slideRef.current;
        var moveX = -slideItemWidth * itemsPerPage * slidePage;
        slide.style.transform = "translateX(".concat(moveX, "px)");
    }, [slideItemWidth, slidePage, itemsPerPage, dragging]);
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
    // 전달받은 responsives가 없을 경우 기본값 할당
    useEffect(function () {
        if (!customResponsives) {
            var defaultResponsives = [
                { range: { from: 1501, to: null }, itemsPerPage: 5 },
                { range: { from: null, to: 600 }, itemsPerPage: 1 },
            ];
            if (children.length > 4) {
                defaultResponsives.push({
                    range: { from: 601, to: 800 },
                    itemsPerPage: Math.min(2, Math.ceil(children.length / 4)),
                }, {
                    range: { from: 801, to: 1280 },
                    itemsPerPage: Math.min(3, Math.ceil(children.length / 3)),
                }, {
                    range: { from: 1281, to: 1500 },
                    itemsPerPage: Math.min(4, Math.ceil(children.length / 2)),
                });
            }
            setResponsives(defaultResponsives);
        }
    }, [
        children.length,
        container,
        containerPaddingX,
        defaultItemsPerPage,
        customResponsives,
    ]);
    // 슬라이드 드래그
    useEffect(function () {
        if (!slideRef.current || !draggable || !container)
            return;
        var slide = slideRef.current;
        var containerWidth = container.clientWidth;
        var slideInitX = -slideItemWidth * itemsPerPage * slidePage;
        var touchStartX;
        var touchMoveX;
        // 터치 드래그
        var touchMoveHandler = function (e) {
            if (!slideRef.current)
                return;
            var slide = slideRef.current;
            setDragging(true);
            touchMoveX = e.touches[0].clientX - touchStartX;
            slide.style.transform = "translateX(".concat(slideInitX + touchMoveX, "px)");
        };
        var touchEndHandler = function (e) {
            setDragging(false);
            if (touchMoveX) {
                var newPage = slidePage -
                    Math.sign(touchMoveX) *
                        (Math.abs(touchMoveX) >= containerWidth / 4 ? 1 : 0);
                setSlidePage(newPage <= 0 ? 0 : newPage >= maxPage ? maxPage - 1 : newPage);
            }
            window.removeEventListener("touchmove", touchMoveHandler);
        };
        var touchStartHandler = function (e) {
            setActiveAutoSlide(false);
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
            setBlockLink(false);
            if (touchMoveX) {
                var newPage = slidePage -
                    Math.sign(touchMoveX) *
                        (Math.abs(touchMoveX) >= containerWidth / 4 ? 1 : 0);
                setSlidePage(newPage <= 0 ? 0 : newPage >= maxPage ? maxPage - 1 : newPage);
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
    }, [maxPage, slideItemWidth, slidePage, draggable, itemsPerPage, container]);
    // 슬라이드 아이템 너비 계산
    var calcSlideItemWidth = useCallback(function (containerWidth) {
        if (!container || !responsives)
            return;
        var padding = containerPaddingX * 2;
        for (var i = 0; i < responsives.length; i++) {
            var _a = responsives[i], _b = _a.range, from = _b.from, to = _b.to, itemsPerPage_1 = _a.itemsPerPage;
            if (!from && !to) {
                continue;
            }
            else if (!!to && !from) {
                // ~~ to
                if (containerWidth <= to) {
                    setSlidePage(0);
                    setMaxPage(Math.ceil(itemCount / itemsPerPage_1));
                    setItemsPerPage(itemsPerPage_1);
                    setSlideItemWidth((containerWidth - padding) / itemsPerPage_1);
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
                    setMaxPage(Math.ceil(itemCount / itemsPerPage_1));
                    setItemsPerPage(itemsPerPage_1);
                    setSlideItemWidth((containerWidth - padding) / itemsPerPage_1);
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
                    setSlidePage(0);
                    setMaxPage(Math.ceil(itemCount / itemsPerPage_1));
                    setItemsPerPage(itemsPerPage_1);
                    setSlideItemWidth((containerWidth - padding) / itemsPerPage_1);
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
                }
            }
        }
    }, [container, responsives, containerPaddingX, itemCount, defaultItemsPerPage]);
    // 아이템 너비 계산 실행 및 컨테이너 리사이즈 옵저버 생성
    useEffect(function () {
        if (!container)
            return;
        calcSlideItemWidth(container.clientWidth);
        var resizeObserver = new ResizeObserver(function (entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                var contentRect = entry.contentRect;
                calcSlideItemWidth(contentRect.width);
            }
        });
        resizeObserver.observe(container);
        return function () {
            resizeObserver.disconnect();
        };
    }, [calcSlideItemWidth, container]);
    // 자동 슬라이드
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
    // 페이지네이션 생성
    var paginationGenerator = useCallback(function () {
        var dots = [];
        var _loop_1 = function (i) {
            dots.push(_jsx("div", { className: "dot", style: {
                    cursor: clickablePagination ? "pointer" : "default",
                    backgroundColor: color,
                    opacity: i === slidePage ? 1 : 0.3,
                    width: i === slidePage ? "15px" : "7px",
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
    return (_jsxs(StyledSlide, __assign({ containerPaddingY: containerPaddingY }, { children: [_jsxs("div", __assign({ className: "navigation", style: {
                    translate: pagination ? "0px -16px" : "none",
                } }, { children: [_jsx("button", __assign({ onClick: onPrevClick, style: {
                            width: "".concat(navSize, "px"),
                            height: "".concat(navSize, "px"),
                            opacity: navOpacity,
                            background: navBackground,
                            boxShadow: navBackground === "none" ? "none" : "1px 1px 5px gray",
                        } }, { children: _jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 300 300", style: {
                                stroke: color,
                            } }, { children: _jsx("polyline", { points: "221.98 32.98 78.02 150 221.98 267.02" }) })) })), _jsx("button", __assign({ onClick: onNextClick, style: {
                            width: "".concat(navSize, "px"),
                            height: "".concat(navSize, "px"),
                            opacity: navOpacity,
                            background: navBackground,
                            boxShadow: navBackground === "none" ? "none" : "1px 1px 5px gray",
                        } }, { children: _jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 300 300", style: {
                                stroke: color,
                            } }, { children: _jsx("polyline", { points: "78.79 267.02 222.75 150 78.79 32.98" }) })) }))] })), _jsxs("ul", __assign({ ref: slideRef, className: "slider", style: {
                    cursor: blockLink ? "grabbing" : "default",
                    paddingLeft: "".concat(containerPaddingX, "px"),
                    paddingRight: "".concat(containerPaddingX, "px"),
                    alignItems: alignItems,
                    transition: !dragging ? "all 0.5s" : "none",
                    marginBottom: pagination ? "32px" : "",
                } }, { children: [children.map(function (child, i) { return (_jsx(SlideItem, __assign({ itemWidth: slideItemWidth, paddingX: itemPaddingX, blockLink: blockLink, itemRatio: itemRatio }, { children: child }), i)); }), Array(maxPage % itemsPerPage === 0
                        ? 0
                        : itemsPerPage - (children.length % itemsPerPage))
                        .fill(0)
                        .map(function (el, i) { return (_jsx(SlideItem, __assign({ itemWidth: slideItemWidth, itemRatio: itemRatio, paddingX: itemPaddingX, blockLink: blockLink }, { children: _jsx("div", { style: {
                                pointerEvents: blockLink ? "none" : "all",
                            } }) }), i)); })] })), pagination && (_jsx("div", __assign({ className: "pagination", style: { bottom: 0 + containerPaddingY } }, { children: paginationGenerator() })))] })));
};
var StyledSlide = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  &,\n  & > .navigation,\n  & > .navigation > button,\n  & > .navigation > button > svg,\n  & > .slider,\n  & > .pagination,\n  & > .pagination > .dot {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    display: block;\n  }\n  & {\n    padding-top: ", "px;\n    padding-bottom: ", "px;\n    overflow: hidden;\n    position: relative;\n    height: fit-content;\n    min-height: 50px;\n    display: flex;\n    align-items: center;\n    position: relative;\n  }\n  & > .navigation {\n    z-index: 10;\n    pointer-events: none;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    display: flex;\n    justify-content: space-between;\n  }\n  & > .navigation > button {\n    pointer-events: all;\n    cursor: pointer;\n    position: relative;\n    margin-top: auto;\n    margin-bottom: auto;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 100%;\n    border: none;\n  }\n  & > .navigation > button > svg {\n    width: 100%;\n    fill: none;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n    stroke-width: 50px;\n    opacity: 0.5;\n    transition: all 0.3s;\n    margin: 10%;\n  }\n  & > .navigation > button:hover > svg {\n    opacity: 1;\n  }\n  & > .navigation > button:first-child {\n    margin-left: 10px;\n  }\n  & > .navigation > button:last-child {\n    margin-right: 10px;\n  }\n  & > .navigation > button:first-child > svg {\n    margin-right: 20%;\n  }\n  & > .navigation > button:last-child > svg {\n    margin-left: 20%;\n  }\n\n  & > .slider {\n    user-select: none;\n    position: relative;\n    height: fit-content;\n    width: fit-content;\n    display: flex;\n    list-style: none;\n  }\n\n  & > .pagination {\n    position: absolute;\n    height: 16px;\n    width: 100%;\n    bottom: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 7px;\n  }\n  & > .pagination > .dot {\n    height: 7px;\n    width: 7px;\n    border-radius: 7px;\n    transition: all 0.3s;\n  }\n"], ["\n  &,\n  & > .navigation,\n  & > .navigation > button,\n  & > .navigation > button > svg,\n  & > .slider,\n  & > .pagination,\n  & > .pagination > .dot {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    display: block;\n  }\n  & {\n    padding-top: ", "px;\n    padding-bottom: ", "px;\n    overflow: hidden;\n    position: relative;\n    height: fit-content;\n    min-height: 50px;\n    display: flex;\n    align-items: center;\n    position: relative;\n  }\n  & > .navigation {\n    z-index: 10;\n    pointer-events: none;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    display: flex;\n    justify-content: space-between;\n  }\n  & > .navigation > button {\n    pointer-events: all;\n    cursor: pointer;\n    position: relative;\n    margin-top: auto;\n    margin-bottom: auto;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 100%;\n    border: none;\n  }\n  & > .navigation > button > svg {\n    width: 100%;\n    fill: none;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n    stroke-width: 50px;\n    opacity: 0.5;\n    transition: all 0.3s;\n    margin: 10%;\n  }\n  & > .navigation > button:hover > svg {\n    opacity: 1;\n  }\n  & > .navigation > button:first-child {\n    margin-left: 10px;\n  }\n  & > .navigation > button:last-child {\n    margin-right: 10px;\n  }\n  & > .navigation > button:first-child > svg {\n    margin-right: 20%;\n  }\n  & > .navigation > button:last-child > svg {\n    margin-left: 20%;\n  }\n\n  & > .slider {\n    user-select: none;\n    position: relative;\n    height: fit-content;\n    width: fit-content;\n    display: flex;\n    list-style: none;\n  }\n\n  & > .pagination {\n    position: absolute;\n    height: 16px;\n    width: 100%;\n    bottom: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 7px;\n  }\n  & > .pagination > .dot {\n    height: 7px;\n    width: 7px;\n    border-radius: 7px;\n    transition: all 0.3s;\n  }\n"])), function (_a) {
    var containerPaddingY = _a.containerPaddingY;
    return containerPaddingY;
}, function (_a) {
    var containerPaddingY = _a.containerPaddingY;
    return containerPaddingY;
});
export default Slide;
var templateObject_1;
