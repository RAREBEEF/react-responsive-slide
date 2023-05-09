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

interface SlideProps {
  children: Array<ReactElement>;
  /**컨테이너 레퍼런스*/
  slideContainer: RefObject<HTMLElement> | HTMLElement;
  /**반응형 슬라이드 아이템 개수 설정*/
  responsives?: Array<{
    /**아이템 개수를 정의할 컨테이너 width 범위*/
    range: { from: number | null | undefined; to: number | null | undefined };
    /**한 페이지에 포함할 아이템 개수*/
    itemsPerPage: number;
  }>;
  /**한 페이지에 포함할 아이템 개수의 기본값*/
  defaultItemsPerPage?: number;
  /**아이템 사이 여백*/
  itemPaddingX?: number;
  /**아이템 세로 정렬*/
  alignItems?: "center" | "start" | "end";
  /**컨테이너 좌우 여백*/
  containerPaddingX?: number;
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
  /**네비게이션 투명도*/
  navOpacity?: number;
  /**페이지네이션 여부*/
  pagination?: boolean;
  /**페이지네이션 클릭 여부*/
  clickablePagination?: boolean;
}

const Slide: React.FC<SlideProps> = ({
  children,
  responsives,
  defaultItemsPerPage = 2,
  itemPaddingX = 12,
  alignItems = "center",
  containerPaddingX = 55,
  autoSlide = false,
  autoSlideInterval = 3000,
  draggable = true,
  slideContainer,
  color = "gray",
  navSize = 40,
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

  // 페이지에 맞춰 슬라이드 이동
  const moveSlide = useCallback(() => {
    setBlockLink(false);

    if (!slideRef.current) return;
    const { current: slide } = slideRef;
    const moveX = -slideItemWidth * itemsPerPage * slidePage;
    slide.style.transform = `translateX(${moveX}px)`;
  }, [slideItemWidth, slidePage, itemsPerPage]);

  // 슬라이드 아이템 너비 계산
  useEffect(() => {
    const calcSlideItemWidth = () => {
      if (!container) return;

      const containerWidth = container.clientWidth;
      const padding = containerPaddingX * 2;

      if (!responsives) {
        if (containerWidth >= 1440) {
          const itemsPerPage = Math.min(5, Math.ceil(children.length / 2));
          setSlidePage(0);
          setMaxPage(Math.ceil(children.length / itemsPerPage));
          setItemsPerPage(itemsPerPage);
          setSlideItemWidth((containerWidth - padding) / itemsPerPage);
        } else if (containerWidth <= 500) {
          const itemsPerPage = 1;
          setSlidePage(0);
          setMaxPage(children.length / itemsPerPage);
          setItemsPerPage(itemsPerPage);
          setSlideItemWidth(containerWidth - padding);
        } else if (containerWidth <= 1024) {
          const itemsPerPage = Math.min(3, Math.ceil(children.length / 4));
          setSlidePage(0);
          setMaxPage(Math.ceil(children.length / itemsPerPage));
          setItemsPerPage(itemsPerPage);
          setSlideItemWidth((containerWidth - padding) / itemsPerPage);
        } else if (containerWidth <= 1439) {
          const itemsPerPage = Math.min(4, Math.ceil(children.length / 3));
          setSlidePage(0);
          setMaxPage(Math.ceil(children.length / itemsPerPage));
          setItemsPerPage(itemsPerPage);
          setSlideItemWidth((containerWidth - padding) / itemsPerPage);
        }
      } else {
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
              setSlideItemWidth(
                (containerWidth - padding) / defaultItemsPerPage
              );
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
              setSlideItemWidth(
                (containerWidth - padding) / defaultItemsPerPage
              );
            } else {
              continue;
            }
            // from ~ to
          } else if (!!to && !!from) {
            if (containerWidth <= to && containerWidth >= from) {
              console.log(containerWidth);
              console.log((containerWidth - padding) / itemsPerPage);
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
                setSlideItemWidth(
                  (containerWidth - padding) / defaultItemsPerPage
                );
                break;
              } else {
              }
            }
          }
        }
      }
    };

    calcSlideItemWidth();

    window.addEventListener("resize", calcSlideItemWidth);

    return () => {
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

  useEffect(() => {
    moveSlide();
  }, [moveSlide]);

  // 슬라이드 드래그
  useEffect(() => {
    if (!slideRef.current || !draggable) return;

    const slide = slideRef.current;
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

      const newPage = slidePage + Math.round(touchMoveX / -slideItemWidth);
      setSlidePage(
        newPage <= 0 ? 0 : newPage >= maxPage ? maxPage - 1 : newPage
      );
      moveSlide();
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
        const newPage = slidePage + Math.round(touchMoveX / -slideItemWidth);
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
  }, [maxPage, moveSlide, slideItemWidth, slidePage, draggable, itemsPerPage]);

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

  return (
    <StyledSlide>
      <div
        className="slide"
        style={
          {
            // marginBottom: pagination ? "40px" : "",
          }
        }
      >
        <div
          className="navigation"
          style={{
            translate: pagination ? "0px -8px" : "none",
          }}
        >
          <button
            onClick={onPrevClick}
            style={{
              width: `${navSize}px`,
              height: `${navSize}px`,
              opacity: navOpacity,
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
            >
              <li
                style={{
                  pointerEvents: blockLink ? "none" : "all",
                }}
              >
                {child}
              </li>
            </SlideItem>
          ))}
        </ul>
        {pagination && (
          <div className="pagination">{paginationGenerator()}</div>
        )}
      </div>
    </StyledSlide>
  );
};

const StyledSlide = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    display: block;
  }

  .slide {
    overflow: hidden;
    position: relative;
    height: fit-content;
    min-height: 50px;
    display: flex;
    align-items: center;
  }

  .slide > .navigation {
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
  .slide > .navigation > button {
    pointer-events: all;
    cursor: pointer;
    position: relative;
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background-color: white;
    box-shadow: 1px 1px 5px gray;
    border: none;
  }
  .slide > .navigation > button > svg {
    width: 100%;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 50px;
    opacity: 0.3;
    transition: all 0.3s;
    margin: 10%;
  }
  .slide > .navigation > button:hover > svg {
    opacity: 1;
  }
  .slide > .navigation > button:first-child {
    margin-left: 10px;
  }
  .slide > .navigation > button:last-child {
    margin-right: 10px;
  }
  .slide > .navigation > button:first-child > svg {
    margin-right: 20%;
  }
  .slide > .navigation > button:last-child > svg {
    margin-left: 20%;
  }

  .slide > .slider {
    user-select: none;
    position: relative;
    height: fit-content;
    width: fit-content;
    display: flex;
    list-style: none;
  }

  .slide > .pagination {
    position: absolute;
    height: 16px;
    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
  }
  .slide > .pagination > .dot {
    height: 7px;
    width: 7px;
    border-radius: 100%;
  }
`;

export default Slide;
