import React, { ChangeEvent, useRef, useState } from "react";
import Slide from "./lib/Slide";
import "./App.css";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(100);

  const onWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWidth(parseInt(e.target.value));
  };

  return (
    <div className="App">
      <header>
        <h1>react-responsive-slide</h1>
      </header>
      <div className="changer-container">
        <h2 className="changer-header">반응형 테스트</h2>
        <div className="changer-input-wrapper">
          <label htmlFor="width-input" className="input-label">
            컨테이너 너비 조절기
          </label>
          <p className="changer-indicator">
            {containerRef?.current && containerRef.current?.clientWidth <= 350
              ? "350px (최소값)"
              : `${width}vw`}
          </p>
          <input
            id="width-input"
            type="range"
            value={width}
            onChange={onWidthChange}
            max={100}
            className="changer-input"
          />
        </div>
      </div>
      <div
        ref={containerRef}
        className="slide-container"
        style={{
          width: `${width}vw`,
          margin: "auto",
          maxWidth: "100vw",
          minWidth: "350px",
        }}
      >
        <Slide
          slideContainer={containerRef}
          // responsives={[
          //   { range: { from: null, to: 500 }, itemsPerPage: 1 },
          //   { range: { from: 501, to: 900 }, itemsPerPage: 3 },
          //   { range: { from: 901, to: 1300 }, itemsPerPage: 4 },
          //   { range: { from: 1301, to: null }, itemsPerPage: 5 },
          // ]}
          defaultItemsPerPage={2}
          itemPaddingX={20}
          alignItems="center"
          containerPaddingX={55}
          containerPaddingY={100}
          autoSlide={false}
          autoSlideInterval={3000}
          draggable={true}
          color="deepskyblue"
          navSize={50}
          navBackground="none"
          navOpacity={1}
          pagination={true}
          clickablePagination={true}
        >
          <div className="slide-item">1</div>
          <div className="slide-item">2</div>
          <div className="slide-item">3</div>
          <div className="slide-item">4</div>
          <div className="slide-item">5</div>
          <div className="slide-item">6</div>
          <div className="slide-item">7</div>
          <div className="slide-item">8</div>
          <div className="slide-item">9</div>
          <div className="slide-item">10</div>
          <div className="slide-item">11</div>
        </Slide>
      </div>
    </div>
  );
}

export default App;
