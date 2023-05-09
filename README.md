# Installation

`npm i react-responsive-slide`

</br>
</br>

# Params

```ts
/**
 * @param slideContainer
 * @param responsives
 * @param defaultItemsPerPage
 * @param itemPaddingX
 * @param alignItems
 * @param containerPaddingX
 * @param containerMinWidth
 * @param containerMaxWidth
 * @param autoSlide
 * @param autoSlideInterval
 * @param draggable
 * @param color
 * @param navSize
 * @param pagination
 * @param clickablePagination
 */
```

# Example

```ts
// style unit = px
// time unit = ms

import { useRef } from "react";
import Slider from "../src/Slider";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <div
        ref={containerRef}
        s
        className="App"
        style={{
          width: "90vw",
          margin: "auto",
          maxWidth: "1500px",
          minWidth: "350px",
        }}
      >
        <Slider
          slideContainer={containerRef}
          responsives={[
            { range: { from: null, to: 500 }, itemsPerPage: 1 },
            { range: { from: 501, to: 900 }, itemsPerPage: 3 },
            { range: { from: 901, to: 1300 }, itemsPerPage: 4 },
            { range: { from: 1301, to: null }, itemsPerPage: 5 },
          ]}
          defaultItemsPerPage={2}
          itemPaddingX={20}
          alignItems="center"
          containerPaddingX={50}
          containerMinWidth={350}
          containerMaxWidth={1500}
          autoSlide={true}
          autoSlideInterval={3000}
          draggable={true}
          color="firebrick"
          navSize={40}
          pagination={true}
          clickablePagination={true}
        >
          <div>Hello</div>
          <div>RARE</div>
          <div>BEEF</div>
          <div>Nice</div>
          <div>To</div>
          <div>Meet</div>
          <div>You</div>
        </Slider>
      </div>
    </section>
  );
}

export default App;
```
