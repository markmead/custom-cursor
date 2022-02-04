# Custom Cursor 👆

Create your own custom cursor that you can control with CSS.

![](https://img.shields.io/bundlephobia/min/custom-cursor)
![](https://img.shields.io/npm/v/custom-cursor)
![](https://img.shields.io/npm/dt/custom-cursor)
![](https://img.shields.io/github/license/markmead/custom-cursor)

## Usage

### Install

```
npm install custom-cursor
yarn add custom-cursor
```

### Init

```js
import Cursor from "custom-cursor";

new Cursor({});
```

## Options

There are two options you can pass to `new Cursor({})`.

```js
new Cursor({
  count: 5,
  targets: ["a", ".title", "#header"],
});
```

### Count

| Default | Type   |
| ------- | ------ |
| 1       | Number |

This allows you to set how many cursors are created.

If we use the example of `5`, it will result in the following HTML.

```html
<div data-cursor="0" style="position: absolute; pointer-events: none;"></div>
<div data-cursor="1" style="position: absolute; pointer-events: none;"></div>
<div data-cursor="2" style="position: absolute; pointer-events: none;"></div>
<div data-cursor="3" style="position: absolute; pointer-events: none;"></div>
<div data-cursor="4" style="position: absolute; pointer-events: none;"></div>
```

You can then write the following CSS.

```css
/* Global */

[data-cursor] {
  width: 20px;
  height: 20px;
}

/* Individual */

[data-cursor="0"] {
  background: #00F;
}

[data-cursor="1"] {
  background: #EEE;
}

...
```

### Targets

| Default | Type           |
| ------- | -------------- |
| []      | Array <String> |

This allows you to set the HTML elements that will trigger a hover effect for the custom cursor.

If we use the example of `["a", ".title", "#header"]`, it will do the following.

1. Find every element on the page that matches the value
2. Watch for `mouseover` and `mouseleave` events on those elements
3. If `mouseover` is triggered it appends `cursor-hover--<name>` to the body element

`<name>` will be the value in the array, therefore if the `.title` element was on `mouseover` it would add `cursor-hover--title`.
