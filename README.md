# **설치**

`npm i react-responsive-slide`

</br>
</br>

# **주요 기능**

커스텀은 크게 안되지만 나름 간단하게 컴포넌트로 생성할 수 있는 반응형 슬라이더입니다.

여기서 말하는 반응형은 한 페이지당 표시되는 슬라이드 아이템 수가 컨테이너의 사이즈에 따라 가변함을 의미합니다.

드래그도 됩니다. 멋지죠?

</br>
</br>

# **사용 방법**

1. 패키지 설치 후 `<Slide>` 컴포넌트를 불러옵니다.

```ts
import Slide from "react-responsive-slide";

function App() {
  return <Slide></Slide>;
}
```

2. `<Slide>`를 부모 요소(컨테이너)로 감싸고 그 레퍼런스를 생성해 `<Slide>` 컴포넌트의 Prop으로 전달합니다.  
   컨테이너는 반응형의 기준으로 사용됩니다. 컨테이너의 너비에 꼭 신경써 주세요.

```ts
import { useRef } from "react";
import Slide from "react-responsive-slide";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <Slide slideContainer={containerRef}></Slide>
    </div>
  );
}
```

3. `<Slide>` 컴포넌트의 자식으로 슬라이드 아이템들을 넣어주면 구현 완료입니다.  
   이제 컨테이너와 아이템의 스타일을 원하는대로 꾸며보세요.

```ts
import { useRef } from "react";
import Slide from "react-responsive-slide";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{ maxWidth: "90vw", backgroundColor: "blue" }}
    >
      <Slide slideContainer={containerRef}>
        <div style={{ height: "100px", color: "red" }}>1번 슬라이드</div>
        <div>2번 슬라이드</div>
        <div>3번 슬라이드</div>
        <div>4번 슬라이드</div>
        <div>5번 슬라이드</div>
        <div>6번 슬라이드</div>
      </Slide>
    </div>
  );
}
```

</br>
</br>

# **파라미터를 이용한 커스텀**

구체적이고 다양하지는 않지만 어느정도 쓸만한 커스텀 기능을 갖고 있습니다.  
다양한 파라미터를 `<Slide>` 컴포넌트에 전달하여 슬라이드를 커스텀할 수 있습니다.

### **1. `responsives`**

컨테이너의 사이즈에 맞춰 페이지당 슬라이드 아이템의 개수를 설정할 수 있습니다.  
따로 설정하지 않아도 반응형이 작동하지만 사이즈에 따른 개수를 직접 지정하고 싶은 경우 사용할 수 있습니다.

```ts
responsives={[
  { range: { from: null, to: 500 }, itemsPerPage: 1 },
  { range: { from: 501, to: 900 }, itemsPerPage: 3 },
  { range: { from: 901, to: 1300 }, itemsPerPage: 4 },
  { range: { from: 1301, to: null }, itemsPerPage: 5 },
]}
```

### **2. `defaultItemsPerPage`**

기본값으로 사용할 페이지당 슬라이드 아이템 개수입니다.  
컨테이너의 사이즈가 `responsives`로 전달한 범위 어디에도 속하지 않을 경우와 초기값으로 사용됩니다.  
기본값은 `2` 입니다.

```ts
defaultItemsPerPage={2}
```

### **3. `itemPaddingX`**

슬라이드 아이템 사이의 간격입니다. 단위는 px입니다.  
기본값은 `12` 입니다.

```ts
itemPaddingX={12}
```

### **4. `alignItems`**

아이템들의 세로 정렬 기준입니다. 아이템들의 높이가 다를 때 컨테이너보다 높이가 작은 아이템의 정렬 위치를 정할 수 있습니다. 유효값은 `"center" | "start" | "end"` 입니다.  
기본값은 `center` 입니다.

```ts
alignItems = "center";
```

### **5. `containerPaddingX`**

슬라이드 컨테이너의 좌우 여백입니다. 단위는 px입니다.  
기본값은 `55` 입니다.

```ts
containerPaddingX={55}
```

### **6. `containerPaddingY`**

슬라이드 컨테이너의 상하 여백입니다. 단위는 px입니다.  
기본값은 `20` 입니다.

```ts
containerPaddingY={20}
```

### **7. `autoSlide`**

슬라이드가 자동으로 움직일지 여부를 결정합니다.
기본값은 `false` 입니다.

```ts
autoSlide={12}
```

### **8. `autoSlideInterval`**

슬라이드가 자동으로 움직이는 시간 간격을 결정합니다. 단위는 ms입니다.  
기본값은 `3000` 입니다.

```ts
autoSlideInterval={3000}
```

### **9. `draggable`**

터치와 드래그로 슬라이드를 이동할 수 있는지 여부를 결정합니다.  
기본값은 `true` 입니다.

```ts
draggable={true}
```

### **10. `color`**

테마 색상입니다. 네비게이션과 페이지네이션의 색상을 결정합니다. css가 이해할 수 있는 모든 색상값을 지원합니다.  
기본값은 `gray` 입니다.

```ts
color = "gray";
```

### **11. `navSize`**

네비게이션 버튼의 크기를 조절합니다. 단위는 px입니다.  
기본값은 `40` 입니다.

```ts
navSize={40};
```

### **11. `navBackground`**

네비게이션 버튼의 배경 색상을 설정합니다. css Background 값으로 사용됩니다. `none` 으로 배경을 없앨 수 있습니다.  
기본값은 `none` 입니다.

```ts
navBackground = "white";
```

### **12. `pagination`**

페이지네이션을 표시할지 여부를 결정합니다.
기본값은 `true` 입니다.

```ts
pagination={true};
```

### **13. `clickablePagination`**

페이지네이션을 클릭하여 페이지를 이동할 수 있는지를 결정합니다.
기본값은 `true` 입니다.

```ts
clickablePagination={true};
```

</br>
</br>

# **유의 사항**

컨테이너가 슬라이드의 반응형 기준이 되기 때문에 컨테이너가 항상 적절한 너비를 유지할 수 있도록 신경써 주세요.

</br>
</br>

# **예시**

```ts
import React, { useRef } from "react";
import Slide from "react-responsive-slide";

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
          itemPaddingX={55}
          alignItems="center"
          containerPaddingX={55}
          containerPaddingY={55}
          autoSlide={true}
          autoSlideInterval={3000}
          draggable={true}
          color="firebrick"
          navSize={40}
          navBackground="white"
          navOpacity={0.8}
          pagination={true}
          clickablePagination={true}
        >
          <div style={{ height: "100px", backgroundColor: "red" }}>0</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>1</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>2</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>3</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>4</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>6</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>7</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>8</div>
          <div style={{ height: "100px", backgroundColor: "red" }}>9</div>
        </Slide>
      </div>
    </div>
  );
}

export default App;
```
