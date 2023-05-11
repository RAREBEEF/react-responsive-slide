import React, { ReactElement } from "react";
interface SlideItemProps {
    slideItemWidth: number;
    paddingX?: number;
    children: ReactElement;
    blockLink: boolean;
}
declare const SlideItem: React.FC<SlideItemProps>;
export default SlideItem;
