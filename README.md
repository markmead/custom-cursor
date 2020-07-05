# Custom Cursor 👆

Create your own custom cursor with minimal JavaScript

![](https://img.shields.io/bundlephobia/min/custom-cursor)
![](https://img.shields.io/npm/v/custom-cursor)
![](https://img.shields.io/npm/dt/custom-cursor)
![](https://img.shields.io/github/license/markmead/custom-cursor)

## Install

`npm install custom-cursor`

`yarn add custom-cursor`

## Usage

To get the cursor working, add this to your javascript file

```js
import Cursor from 'custom-cursor'

new Cursor({}).mount()
```

### Default Cursor

```html
<div id="custom-cursor" class="custom-cursor" style="position: absolute; pointer-events: none;"></div>
```

## Options

There's 3 options available and they are all optional:

- secondCursor
- hoverTargets
- browserCursor

```js
const customCursor = new Cursor({
  secondCursor: true, // default = false
  hoverTargets: ['.link-button', '#hero-text', 'p'], // default = null
  browserCursor: false, // default = true
})
```

### secondCursor

This adds a second cursor element to the page with the following markup:

```html
<div id="custom-cursor-second" class="custom-cursor-second" style="position: absolute; pointer-events: none;"></div>
```

### hoverTargets

Pass an array of elements that you want to apply a custom hover effect to the cursor when these elements are on hover.

The name of the element in the array will be given as a class name to the body element of the page. Therefore:

```js
new Cursor({
  hoverTargets: ['.link-button', '#hero-text', 'p'],
})
```

Will result in:

```html
<body class="custom-cursor-hover--link-button"></body>
<body class="custom-cursor-hover--hero-text"></body>
<body class="custom-cursor-hover--p"></body>
```

The class is applied to the body so that in CSS you can easily add different styles per hover, like so:

```css
.custom-cursor-hover--link-button .custom-cursor {
  background: red;
}

.custom-cursor-hover--hero-text .custom-cursor-second {
  background: green;
}

.custom-cursor-hover--hero-text .custom-cursor {
  background: green;
}
```

Currently it strips out `!`, `.` and `#` from the hover names.

If there are more characters in need of being removed, then please create either an issue or a pull request.

### browserCursor

Pass in `false` if you don't want the default browser cursor to appear.

This will handle most but not all cases, such as when you hover over a link. If you want to completely remove the cursor then I'd recommend doing so with CSS.

## Contributing

This is always welcomed so please do get involved!
