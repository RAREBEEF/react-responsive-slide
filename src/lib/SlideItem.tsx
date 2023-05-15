import React, { ReactElement } from "react";
import styled from "styled-components";

interface SlideItemProps {
  itemWidth: number;
  itemRatio: string;
  paddingX?: number;
  children: ReactElement;
  blockLink: boolean;
}

interface StyleProps {
  itemWidth: number;
  itemRatio: string;
  paddingX: number;
  blockLink: boolean;
}

const SlideItem: React.FC<SlideItemProps> = ({
  itemWidth,
  itemRatio,
  paddingX = 12,
  children,
  blockLink,
}) => {
  console.log(itemRatio);
  return (
    <StyledSlideItem
      itemWidth={itemWidth}
      itemRatio={itemRatio}
      paddingX={paddingX}
      blockLink={blockLink}
    >
      {children}
    </StyledSlideItem>
  );
};

const StyledSlideItem = styled.li<StyleProps>`
  & {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    display: block;
    width: ${({ itemWidth }) => itemWidth}px;
    padding-left: ${({ paddingX }) => paddingX}px;
    padding-right: ${({ paddingX }) => paddingX}px;
    pointer-events: ${({ blockLink }) => (blockLink ? "none" : "all")};
  }
  & > * {
    aspect-ratio: ${({ itemRatio }) => itemRatio};
  }
`;

export default SlideItem;
