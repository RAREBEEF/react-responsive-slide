import React, { useRef } from "react";
import Slide from "./lib";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <div
        ref={containerRef}
        style={{
          width: "90vw",
          margin: "auto",
          maxWidth: "1500px",
          minWidth: "350px",
        }}
      >
        <Slide
          slideContainer={containerRef}
          responsives={[
            { range: { from: null, to: 500 }, itemsPerPage: 1 },
            { range: { from: 501, to: 900 }, itemsPerPage: 3 },
            { range: { from: 901, to: 1300 }, itemsPerPage: 4 },
            { range: { from: 1301, to: null }, itemsPerPage: 5 },
          ]}
          defaultItemsPerPage={2}
          itemPaddingX={50}
          alignItems="center"
          containerPaddingX={100}
          containerMinWidth={350}
          containerMaxWidth={1500}
          autoSlide={false}
          autoSlideInterval={3000}
          draggable={true}
          color="firebrick"
          navSize={40}
          navOpacity={0.8}
          pagination={true}
          clickablePagination={true}
        >
          <div style={{ height: "100px", backgroundColor: "red" }}>{0}</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>{1}</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>{2}</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>{3}</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>{4}</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>{5}</div>
          <div>{6}</div>
          <div>{7}</div>
          <div>{8}</div>
          <div>{9}</div>
          <div>{10}</div>
        </Slide>
      </div>
    </div>
  );
}

export default App;
