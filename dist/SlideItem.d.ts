import React, { ReactElement } from "react";
interface SlideItemProps {
    slideItemWidth: number;
    paddingX?: number;
    children: ReactElement;
}
declare const SlideItem: React.FC<SlideItemProps>;
export default SlideItem;
