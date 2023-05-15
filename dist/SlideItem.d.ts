import React, { ReactElement } from "react";
interface SlideItemProps {
    itemWidth: number;
    itemRatio: string;
    paddingX?: number;
    children: ReactElement;
    blockLink: boolean;
}
declare const SlideItem: React.FC<SlideItemProps>;
export default SlideItem;
