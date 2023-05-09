import React, { ReactElement } from "react";
import styled from "styled-components";

interface SlideItemProps {
  slideItemWidth: number;
  paddingX?: number;
  children: ReactElement;
}

const SlideItem: React.FC<SlideItemProps> = ({
  slideItemWidth,
  paddingX = 12,
  children,
}) => {
  return (
    <StyledSlideItem>
      <div
        className="slide-item"
        style={{
          width: `${slideItemWidth}px`,
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`,
        }}
      >
        {children}
      </div>
    </StyledSlideItem>
  );
};

const StyledSlideItem = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    display: block;
  }

  .slide-item {
    position: relative;
    height: 100%;
  }
`;

export default SlideItem;
