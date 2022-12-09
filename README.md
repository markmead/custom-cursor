# Custom Cursor 👆

This is a tiny JavaScript package that creates custom cursor for you with
minimal JavaScript and allows you to write hover effects for the cursor(s) in
CSS.

## Using with a Package Manager

If you're working with a package manager then you can install and run this
package with the following code.

```sh
yarn add -D custom-cursor

npm install -D custom-cursor
```

```js
import Cursor from 'custom-cursor'

new Cursor({})
```

## Using with a CDN

For this package to work with a CDN you have to call the `Cursor` class on the
`window` object.

```html
<script
  defer
  src="https://unpkg.com/custom-cursor@latest/dist/cursor.min.js"
></script>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    new window['Cursor']({})
  })
</script>
```

🚀 You can still use the `count` and `targets` options when using the CDN.

## Options

There are two options that you can pass to `new Cursor({})`, but they are both
optional.

```js
new Cursor({
  count: 5,
  targets: ['a', '.title', '#header'],
})
```

### Count

This allows you to control how many cursor are created, perfect for follow along
cursor effects.

If we use the example of `5` then it will result in the following HTML.

```html
<div data-cursor="0" style="..."></div>
<div data-cursor="1" style="..."></div>
<div data-cursor="2" style="..."></div>
<div data-cursor="3" style="..."></div>
<div data-cursor="4" style="..."></div>
```

We can use the `[data-cursor]` attributes to write CSS.

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

### Targets

This allows you to control which HTML elements on the page you want the cursor
to have a hover effect for.

If we use the example of `['a', '.title', '#header']`, it will do the following.

1. Find every `<a>`, `<... class="title">` and `<... id="header">` element on
   the page
2. Listen for `mouseover` and `mouseleave` events on those elements
3. When `mouseover` is triggered append `cursor-hover--<target>` to the body
   element

`<target>` will be the identifier give in the targets array, therefore if the
`.title` was triggered it would add `cursor-hover--title`.

#### Styling Hover Effects

Taking the previous example, we could use the following CSS to create hover
effects for the cursor(s).

```css
.cursor-hover--a [data-cursor] {
}

.cursor-hover--title [data-cursor] {
}

.cursor-hover--header [data-cursor] {
}

.cursor-hover--header [data-cursor='0'] {
}

.cursor-hover--header [data-cursor='1'] {
}
```

## Stats

![](https://img.shields.io/bundlephobia/min/custom-cursor)
![](https://img.shields.io/npm/v/custom-cursor)
![](https://img.shields.io/npm/dt/custom-cursor)
![](https://img.shields.io/github/license/markmead/custom-cursor)
