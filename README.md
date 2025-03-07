# Custom Cursor 👆

![](https://img.shields.io/bundlephobia/min/custom-cursor)
![](https://img.shields.io/npm/v/custom-cursor)
![](https://img.shields.io/npm/dt/custom-cursor)
![](https://img.shields.io/github/license/markmead/custom-cursor)

This is a tiny JavaScript package that creates custom cursor for you with
minimal JavaScript and allows you to write hover effects for the cursor(s) in
CSS.

## Features

- 🪶 Lightweight (< 1kb minified)
- 🎨 Fully customizable with CSS
- ⚡ Simple API with minimal configuration
- 🔄 Multiple cursor support for follow-along effects
- 🎯 Target specific elements for custom hover states
- 📱 Works with mouse and touch devices

Perfect for creative websites, portfolios, and interactive experiences where you
want to replace the default cursor with something more engaging.

## Install

## CDN

## CDN

For this package to work with a CDN, you'll need to access the `Cursor` class
from the `window` object.

```html
<script
  defer
  src="https://unpkg.com/custom-cursor@latest/dist/cdn.min.js"
></script>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    new window['Cursor']({})
  })
</script>
```

### Configuration with CDN

When using the CDN version, you still have full access to all configuration
options:

```js
document.addEventListener('DOMContentLoaded', () => {
  new window['Cursor']({
    count: 3, // Creates multiple cursor elements
    targets: ['a', 'button', '.interactive'], // Elements that trigger hover states
  })
})
```

These options work exactly the same way as in the package version, giving you
complete control over your custom cursor behavior.

## Package

```shell
yarn add -D custom-cursor
npm install -D custom-cursor
```

```js
import Cursor from 'custom-cursor'

new Cursor({})
```

## Options

The `Cursor` constructor accepts an optional configuration object with two
parameters:

```js
new Cursor({
  count: 5, // Creates multiple cursor elements
  targets: ['a', '.title', '#header'], // Elements that trigger hover states
})
```

Both parameters are optional and can be customized to fit your specific
requirements.

### Count

This parameter lets you specify the number of cursor elements to create, which
is ideal for creating trailing cursor effects.

When you set `count: 5`, the package generates the following HTML structure:

```html
<div data-cursor="0" style="..."></div>
<div data-cursor="1" style="..."></div>
<div data-cursor="2" style="..."></div>
<div data-cursor="3" style="..."></div>
<div data-cursor="4" style="..."></div>
```

Each cursor element receives a `data-cursor` attribute with its index number,
allowing you to style each cursor element individually with CSS:

```css
[data-cursor] {
  width: 20px;
  height: 20px;
}

[data-cursor='0'] {
  background: #00f;
}

[data-cursor='1'] {
  background: #eee;
}
```

This approach gives you complete control over the appearance of each cursor in
the sequence, creating trailing effects, size variations, or color gradients.

### Targets

The `targets` parameter lets you define specific HTML elements that will trigger
cursor hover effects.

For example, with `targets: ['a', '.title', '#header']`, the package will:

1. Locate all `<a>` elements, elements with the class `.title`, and the element
   with ID `#header`
2. Add event listeners for `mouseover` and `mouseleave` on these elements
3. When the mouse hovers over a target, add a class of `cursor-hover--<target>`
   to the document body

The `<target>` portion of the class name corresponds to the identifier in your
targets array. For instance, hovering over `.title` elements will add
`cursor-hover--title` to the body.

#### Creating Hover Styles

You can style cursor hover states using the added class names. For example:

```css
/* Style all cursors when hovering over links */
.cursor-hover--a [data-cursor] {
}

/* Style all cursors when hovering over elements with .title class */
.cursor-hover--title [data-cursor] {
}

/* Style all cursors when hovering over element with #header ID */
.cursor-hover--header [data-cursor] {
}

/* Style specific cursors by index during hover */
.cursor-hover--header [data-cursor='0'] {
}

.cursor-hover--header [data-cursor='1'] {
}
```

This approach gives you fine-grained control over cursor appearance during
different hover interactions.
