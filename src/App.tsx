import React, { useRef } from "react";
import Slide from "./lib/Slide";
import "./App.css";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <div
        ref={containerRef}
        style={{
          width: "100vw",
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
          // itemPaddingX={25}
          alignItems="center"
          // containerPaddingX={55}
          containerPaddingY={50}
          autoSlide={false}
          autoSlideInterval={3000}
          draggable={true}
          color="firebrick"
          navSize={50}
          navBackground="none"
          // navOpacity={0.8}
          pagination={true}
          clickablePagination={true}
        >
          <div
            style={{
              height: "300px",
              backgroundColor: "red",
              boxShadow: "0px 0px 50px red",
            }}
          >
            {0}
          </div>
          <div
            className="item"
            style={{ height: "300px", backgroundColor: "red" }}
          >
            {1}
          </div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{2}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{2}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{2}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{2}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{2}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{2}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{2}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{2}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{2}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{2}</div>
          {/* <div style={{ height: "300px", backgroundColor: "red" }}>{3}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{4}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{6}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{7}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{8}</div>
          <div style={{ height: "300px", backgroundColor: "red" }}>{9}</div> */}
        </Slide>
      </div>
    </div>
  );
}

export default App;
