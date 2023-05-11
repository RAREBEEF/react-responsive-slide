import React, { ReactElement } from "react";
import styled from "styled-components";

interface SlideItemProps {
  slideItemWidth: number;
  paddingX?: number;
  children: ReactElement;
  blockLink: boolean;
}

interface StyleProps {
  slideItemWidth: number;
  paddingX: number;
  blockLink: boolean;
}

const SlideItem: React.FC<SlideItemProps> = ({
  slideItemWidth,
  paddingX = 12,
  children,
  blockLink,
}) => {
  return (
    <StyledSlideItem
      slideItemWidth={slideItemWidth}
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
    width: ${({ slideItemWidth }) => slideItemWidth}px;
    padding-left: ${({ paddingX }) => paddingX}px;
    padding-right: ${({ paddingX }) => paddingX}px;
    pointer-events: ${({ blockLink }) => (blockLink ? "none" : "all")};
  }
`;

export default SlideItem;
