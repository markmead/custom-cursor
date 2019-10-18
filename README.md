# Custom Cursor

Easily create custom cursors for your website and only worry about the CSS

![](https://img.shields.io/bundlephobia/min/custom-cursor)
![](https://img.shields.io/npm/v/custom-cursor)
![](https://img.shields.io/npm/dt/custom-cursor)
![](https://img.shields.io/github/license/markmead/custom-cursor)

## Major Change in 1.3.0

You no longer need to add the `data-class` attribute to the elements you want a hover effect on.

It now takes the name passed in the `hovers` array.

## Install

`npm install custom-cursor`

`yarn add custom-cursor`

## Usage

The cursor uses a constructor, so to call it you need to write:

```js
import Cursor from "custom-cursor";

const customCursor = new Cursor({});

customCursor.init();
```

This will give you the default cursor setup.

### Default Cursor

```html
<div id="js-cursor" class="js-cursor"></div>
```

## Options

There's 3 options available and they are all optional:

- id
- hovers
- cursor

```js
const customCursor = new Cursor({
  id: "a-custom-name",
  hovers: [".link-button", "#hero-text"],
  cursor: true
});
```

### Id

This updates the cursor `id` and `class`.

#### Requirements

- Has to be a string
- Update the CSS class name to match the `cursor` value
- Make it unique as it will be used for the cursors `id`

#### With Id Output

```html
<div id="a-custom-name" class="a-custom-name"></div>
```

### Hovers

This is an array of elements that will apply a hover class to the cursor when an element is hovered.

The name of the element in the array will be given as a class to the cursor. Therefore:

```js
const customCursor = new Cursor({
  hovers: [".link-button", "#hero-text"]
});
```

The element `.link-button` is on hover it will apply:

```html
<div id="js-cursor" class="js-cursor--link-button"></div>
```

The element `#hero-text` is on hover it will apply:

```html
<div id="js-cursor" class="js-cursor--hero-text"></div>
```

The class will always look like the above, with the default `js-cursor` or your custom class declared in the `id` option followed by `--class-name` with "class-name" being the name of the element hovered which was declared in the `hovers` array.

Currently it strips out `!`, `.` and `#` from the hover names. If you come across more characters that are in need of being removed then please create an issue or a pull request.

### Cursor

Pass in `false` if you don't want the default browser cursor to appear.

## React Usage

If you are using React you have to make use of the componentDidMount() and useEffect() functions.

### Class Component

```js
componentDidMount() {
  const customCursor = new Cursor({
    hovers: [".link-button", "#hero-text"]
  })
  return customCursor.init()
}
```

### Function Component

```js
useEffect(() => {
  const customCursor = new Cursor({
    hovers: [".link-button", "#hero-text"]
  });
  return customCursor.init();
});
```
