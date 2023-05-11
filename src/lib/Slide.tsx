import React, {
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SlideItem from "./SlideItem";
import styled from "styled-components";
import _ from "lodash";

type Responsives = Array<{
  /**아이템 개수를 정의할 컨테이너 width 범위*/
  range: { from: number | null | undefined; to: number | null | undefined };
  /**한 페이지에 포함할 아이템 개수*/
  itemsPerPage: number;
}>;

interface StyleProps {
  containerPaddingY: number;
}

interface SlideProps {
  children: Array<ReactElement>;
  /**컨테이너 레퍼런스*/
  slideContainer: RefObject<HTMLElement> | HTMLElement;
  /**반응형 슬라이드 아이템 개수 설정*/
  responsives?: Responsives;
  /**한 페이지에 포함할 아이템 개수의 기본값*/
  defaultItemsPerPage?: number;
  /**아이템 사이 여백*/
  itemPaddingX?: number;
  /**아이템 세로 정렬*/
  alignItems?: "center" | "start" | "end";
  /**컨테이너 좌우 여백*/
  containerPaddingX?: number;
  /**컨테이너 좌우 여백*/
  containerPaddingY?: number;
  /**자동 슬라이드*/
  autoSlide?: boolean;
  /**자동 슬라이드 간격*/
  autoSlideInterval?: number;
  /**드래그 가능 여부*/
  draggable?: boolean;
  /**테마 색상*/
  color?: string;
  /**네비게이션 크기*/
  navSize?: number;
  /**네비게이션 배경 색상*/
  navBackground?: string;
  /**네비게이션 투명도*/
  navOpacity?: number;
  /**페이지네이션 여부*/
  pagination?: boolean;
  /**페이지네이션 클릭 여부*/
  clickablePagination?: boolean;
}

const Slide: React.FC<SlideProps> = ({
  children,
  responsives: customResponsives,
  defaultItemsPerPage = 2,
  itemPaddingX = 12,
  alignItems = "center",
  containerPaddingX = 55,
  containerPaddingY = 20,
  autoSlide = false,
  autoSlideInterval = 3000,
  draggable = true,
  slideContainer,
  color = "gray",
  navSize = 40,
  navBackground = "white",
  navOpacity = 1,
  pagination = true,
  clickablePagination = true,
}) => {
  const itemCount = useMemo(() => children.length, [children.length]);
  const slideRef = useRef<HTMLUListElement>(null);
  const [activeAutoSlide, setActiveAutoSlide] = useState<boolean>(autoSlide);
  const [dragging, setDragging] = useState<boolean>(false);
  const [blockLink, setBlockLink] = useState<boolean>(false);
  const [slidePage, setSlidePage] = useState<number>(0);
  const [slideItemWidth, setSlideItemWidth] = useState<number>(200);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    Math.ceil(children.length / defaultItemsPerPage)
  );
  const [maxPage, setMaxPage] = useState<number>(3);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [responsives, setResponsives] = useState<
    | Array<{
        /**아이템 개수를 정의할 컨테이너 width 범위*/
        range: {
          from: number | null | undefined;
          to: number | null | undefined;
        };
        /**한 페이지에 포함할 아이템 개수*/
        itemsPerPage: number;
      }>
    | undefined
  >(customResponsives);

  // 컨테이너 체크
  const isHTMLElementRef = (ref: unknown): ref is RefObject<HTMLElement> => {
    return (ref as RefObject<HTMLElement>).current !== undefined;
  };

  useEffect(() => {
    if (isHTMLElementRef(slideContainer)) {
      setContainer(slideContainer.current);
    } else {
      setContainer(slideContainer);
    }
  }, [slideContainer]);

  // 페이지 이동
  const moveSlide = useCallback(() => {
    setBlockLink(false);

    if (!slideRef.current) return;
    const { current: slide } = slideRef;
    const moveX = -slideItemWidth * itemsPerPage * slidePage;
    slide.style.transform = `translateX(${moveX}px)`;
  }, [slideItemWidth, slidePage, itemsPerPage]);

  useEffect(() => {
    moveSlide();
  }, [moveSlide]);

  const increasePage = () => {
    setSlidePage((prev) => (prev === maxPage - 1 ? 0 : prev + 1));
  };

  const decreasePage = () => {
    setSlidePage((prev) => (prev === 0 ? maxPage - 1 : prev - 1));
  };

  const onNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveAutoSlide(false);
    increasePage();
  };

  const onPrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveAutoSlide(false);
    decreasePage();
  };

  // 전달받은 responsives가 없을 경우 기본값 할당
  useEffect(() => {
    if (!customResponsives) {
      const defaultResponsives: Responsives = [
        { range: { from: 1501, to: null }, itemsPerPage: 5 },
        { range: { from: null, to: 600 }, itemsPerPage: 1 },
      ];

      if (children.length > 4) {
        defaultResponsives.push(
          {
            range: { from: 601, to: 800 },
            itemsPerPage: Math.min(2, Math.ceil(children.length / 5)),
          },

          {
            range: { from: 801, to: 1280 },
            itemsPerPage: Math.min(3, Math.ceil(children.length / 4)),
          },
          {
            range: { from: 1281, to: 1500 },
            itemsPerPage: Math.min(4, Math.ceil(children.length / 3)),
          }
        );
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

  // 슬라이드 아이템 너비 계산
  const calcSlideItemWidth = useCallback(() => {
    if (!container || !responsives) return;

    const containerWidth = container.clientWidth;
    const padding = containerPaddingX * 2;

    for (let i = 0; i < responsives.length; i++) {
      const {
        range: { from, to },
        itemsPerPage,
      } = responsives[i];

      if (!from && !to) {
        continue;
      } else if (!!to && !from) {
        // ~~ to
        if (containerWidth <= to) {
          setSlidePage(0);
          setMaxPage(Math.ceil(itemCount / itemsPerPage));
          setItemsPerPage(itemsPerPage);
          setSlideItemWidth((containerWidth - padding) / itemsPerPage);
          break;
        } else if (i === responsives.length - 1) {
          setSlidePage(0);
          setMaxPage(Math.ceil(itemCount / defaultItemsPerPage));
          setItemsPerPage(defaultItemsPerPage);
          setSlideItemWidth((containerWidth - padding) / defaultItemsPerPage);
        } else {
          continue;
        }
        // from ~~
      } else if (!!from && !to) {
        if (containerWidth >= from) {
          setSlidePage(0);
          setMaxPage(Math.ceil(itemCount / itemsPerPage));
          setItemsPerPage(itemsPerPage);
          setSlideItemWidth((containerWidth - padding) / itemsPerPage);
          break;
        } else if (i === responsives.length - 1) {
          setSlidePage(0);
          setMaxPage(Math.ceil(itemCount / defaultItemsPerPage));
          setItemsPerPage(defaultItemsPerPage);
          setSlideItemWidth((containerWidth - padding) / defaultItemsPerPage);
        } else {
          continue;
        }
        // from ~ to
      } else if (!!to && !!from) {
        if (containerWidth <= to && containerWidth >= from) {
          setSlidePage(0);
          setMaxPage(Math.ceil(itemCount / itemsPerPage));
          setItemsPerPage(itemsPerPage);
          setSlideItemWidth((containerWidth - padding) / itemsPerPage);
          break;
        } else {
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
  }, [
    container,
    responsives,
    containerPaddingX,
    itemCount,
    defaultItemsPerPage,
  ]);

  // 슬라이드 드래그
  useEffect(() => {
    if (!slideRef.current || !draggable || !container) return;

    const slide = slideRef.current;
    const containerWidth = container.clientWidth;
    const slideInitX = -slideItemWidth * itemsPerPage * slidePage;
    let touchStartX: number;
    let touchMoveX: number;

    // 터치 드래그
    const touchMoveHandler = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      if (!slideRef.current) return;
      const slide = slideRef.current;

      touchMoveX = e.touches[0].clientX - touchStartX;

      slide.style.transform = `translateX(${slideInitX + touchMoveX}px)`;
    };

    const touchEndHandler = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      setDragging(false);

      if (touchMoveX) {
        const newPage =
          slidePage -
          Math.sign(touchMoveX) *
            (Math.abs(touchMoveX) >= containerWidth / 4 ? 1 : 0);
        setSlidePage(
          newPage <= 0 ? 0 : newPage >= maxPage ? maxPage - 1 : newPage
        );
        moveSlide();
      }

      window.removeEventListener("touchmove", touchMoveHandler);
    };

    const touchStartHandler = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      setActiveAutoSlide(false);
      setDragging(true);

      touchStartX = e.touches[0].clientX;
      window.addEventListener("touchmove", touchMoveHandler);
      window.addEventListener("touchend", touchEndHandler, { once: true });
    };

    // 마우스 드래그
    const mouseMoveHandler = (e: MouseEvent) => {
      if (e.cancelable) e.preventDefault();
      if (!slideRef.current) return;
      const slide = slideRef.current;

      touchMoveX = e.clientX - touchStartX;

      // 드래그 시 제품으로 링크 이동을 막는다.
      if (Math.abs(touchMoveX) >= 25) {
        setBlockLink(true);
      }

      slide.style.transform = `translateX(${slideInitX + touchMoveX}px)`;
    };

    const mouseUpHandler = (e: MouseEvent) => {
      if (e.cancelable) e.preventDefault();
      setDragging(false);

      if (touchMoveX) {
        const newPage =
          slidePage -
          Math.sign(touchMoveX) *
            (Math.abs(touchMoveX) >= containerWidth / 4 ? 1 : 0);
        setSlidePage(
          newPage <= 0 ? 0 : newPage >= maxPage ? maxPage - 1 : newPage
        );
        moveSlide();
      }

      window.removeEventListener("mousemove", mouseMoveHandler);
    };

    const MouseDownHandler = (e: MouseEvent) => {
      if (e.cancelable) e.preventDefault();
      setActiveAutoSlide(false);
      setDragging(true);

      touchStartX = e.clientX;
      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", mouseUpHandler, { once: true });
    };

    slide.addEventListener("touchstart", touchStartHandler);
    slide.addEventListener("mousedown", MouseDownHandler);

    return () => {
      slide.removeEventListener("touchstart", touchStartHandler);
      window.removeEventListener("touchmove", touchMoveHandler);
      window.removeEventListener("touchend", touchEndHandler);
      slide.removeEventListener("mousedown", MouseDownHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [
    maxPage,
    moveSlide,
    slideItemWidth,
    slidePage,
    draggable,
    itemsPerPage,
    container,
  ]);

  // 최초 로드 및 리사이즈 시 슬라이드 아이템 너비 계산
  useEffect(() => {
    calcSlideItemWidth();

    window.addEventListener("resize", _.debounce(calcSlideItemWidth, 100));

    return () => {
      window.removeEventListener("resize", _.debounce(calcSlideItemWidth, 100));
    };
  }, [calcSlideItemWidth]);

  // 자동 슬라이드
  useEffect(() => {
    if (!autoSlide) return;

    const automaticSlide = setInterval(() => {
      if (activeAutoSlide) {
        setSlidePage((prev) => (prev >= maxPage - 1 ? 0 : prev + 1));
      } else {
        clearInterval(automaticSlide);
      }
    }, autoSlideInterval);

    return () => {
      clearInterval(automaticSlide);
    };
  }, [activeAutoSlide, autoSlide, autoSlideInterval, maxPage]);

  // 페이지네이션 생성
  const paginationGenerator = useCallback(() => {
    let dots: Array<JSX.Element> = [];

    for (let i = 0; i < maxPage; i++) {
      dots.push(
        <div
          key={i}
          className="dot"
          style={{
            cursor: clickablePagination ? "pointer" : "default",
            backgroundColor: color,
            opacity: i === slidePage ? 1 : 0.3,
            width: i === slidePage ? "15px" : "7px",
          }}
          onClick={
            clickablePagination
              ? () => {
                  setSlidePage(i);
                  setActiveAutoSlide(false);
                }
              : () => {}
          }
        />
      );
    }

    return dots;
  }, [clickablePagination, color, maxPage, slidePage]);

  return (
    <StyledSlide containerPaddingY={containerPaddingY}>
      <div
        className="navigation"
        style={{
          translate: pagination ? "0px -16px" : "none",
        }}
      >
        <button
          onClick={onPrevClick}
          style={{
            width: `${navSize}px`,
            height: `${navSize}px`,
            opacity: navOpacity,
            background: navBackground,
            boxShadow: navBackground === "none" ? "none" : "1px 1px 5px gray",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 300"
            style={{
              stroke: color,
            }}
          >
            <polyline points="221.98 32.98 78.02 150 221.98 267.02" />
          </svg>
        </button>
        <button
          onClick={onNextClick}
          style={{
            width: `${navSize}px`,
            height: `${navSize}px`,
            opacity: navOpacity,
            background: navBackground,
            boxShadow: navBackground === "none" ? "none" : "1px 1px 5px gray",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 300"
            style={{
              stroke: color,
            }}
          >
            <polyline points="78.79 267.02 222.75 150 78.79 32.98" />
          </svg>
        </button>
      </div>
      <ul
        ref={slideRef}
        className="slider"
        style={{
          cursor: blockLink ? "grabbing" : "default",
          paddingLeft: `${containerPaddingX}px`,
          paddingRight: `${containerPaddingX}px`,
          alignItems,
          transition: !dragging ? "all 0.5s" : "none",
          marginBottom: pagination ? "32px" : "",
        }}
      >
        {children.map((child, i) => (
          <SlideItem
            key={i}
            slideItemWidth={slideItemWidth}
            paddingX={itemPaddingX}
            blockLink={blockLink}
          >
            {child}
          </SlideItem>
        ))}
        {Array(
          maxPage % itemsPerPage === 0
            ? 0
            : itemsPerPage - (children.length % itemsPerPage)
        )
          .fill(0)
          .map((el, i) => (
            <SlideItem
              key={i}
              slideItemWidth={slideItemWidth}
              paddingX={itemPaddingX}
              blockLink={blockLink}
            >
              <div
                style={{
                  pointerEvents: blockLink ? "none" : "all",
                }}
              ></div>
            </SlideItem>
          ))}
      </ul>
      {pagination && (
        <div className="pagination" style={{ bottom: 0 + containerPaddingY }}>
          {paginationGenerator()}
        </div>
      )}
    </StyledSlide>
  );
};

const StyledSlide = styled.div<StyleProps>`
  &,
  & > .navigation,
  & > .navigation > button,
  & > .navigation > button > svg,
  & > .slider,
  & > .pagination,
  & > .pagination > .dot {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    display: block;
  }
  & {
    padding-top: ${({ containerPaddingY }) => containerPaddingY}px;
    padding-bottom: ${({ containerPaddingY }) => containerPaddingY}px;
    overflow: hidden;
    position: relative;
    height: fit-content;
    min-height: 50px;
    display: flex;
    align-items: center;
    position: relative;
  }
  & > .navigation {
    z-index: 10;
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
  }
  & > .navigation > button {
    pointer-events: all;
    cursor: pointer;
    position: relative;
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: none;
  }
  & > .navigation > button > svg {
    width: 100%;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 50px;
    opacity: 0.5;
    transition: all 0.3s;
    margin: 10%;
  }
  & > .navigation > button:hover > svg {
    opacity: 1;
  }
  & > .navigation > button:first-child {
    margin-left: 10px;
  }
  & > .navigation > button:last-child {
    margin-right: 10px;
  }
  & > .navigation > button:first-child > svg {
    margin-right: 20%;
  }
  & > .navigation > button:last-child > svg {
    margin-left: 20%;
  }

  & > .slider {
    user-select: none;
    position: relative;
    height: fit-content;
    width: fit-content;
    display: flex;
    list-style: none;
  }

  & > .pagination {
    position: absolute;
    height: 16px;
    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
  }
  & > .pagination > .dot {
    height: 7px;
    width: 7px;
    border-radius: 7px;
    transition: all 0.3s;
  }
`;

export default Slide;
