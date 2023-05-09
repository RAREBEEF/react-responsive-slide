import React, { ReactElement, RefObject } from "react";
interface SlideProps {
    children: Array<ReactElement>;
    /**컨테이너 레퍼런스*/
    slideContainer: RefObject<HTMLElement> | HTMLElement;
    /**반응형 슬라이드 아이템 개수 설정*/
    responsives?: Array<{
        /**아이템 개수를 정의할 컨테이너 width 범위*/
        range: {
            from: number | null | undefined;
            to: number | null | undefined;
        };
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
declare const Slide: React.FC<SlideProps>;
export default Slide;
