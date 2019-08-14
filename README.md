# Custom Cursor 🙌

Easily create custom cursors for your website and only worry about the CSS.

## Install

`npm install custom-cursor`

## Usage

The cursor uses a constructor, so to call it you need to write:

```js
const customCursor = new Cursor();

customCursor.init();
```

This will give you a basic cursor which you can then style using the class `js-cursor`.

#### Default Output

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
  id: "my-cursor",
  hovers: ["link-button", "hero-text"],
  cursor: true
});
```

### Id

This will be used for the cursors `class` so if you set the `id` in the options then remember to use that as the class name in the CSS.

It will also be used as the cursors `id` so make sure it's unique!

#### With Id Output

```html
<div id="my-cursor" class="my-cursor"></div>
```

### Hovers

This is an array of elements that will have an impact on the cursor when they are on hover.

On these elements (in the html) you will need to add an attribute of `data-class="insert-name"`. The name you give this attribute will be the class added to the cursor on hover of that element.

```html
<div id="js-cursor" class="js-cursor--insert-name"></div>
```

The class will always look like the above, with the default `js-cursor` or your custom class declared in the `id` option followed by `--class-name` with "class-name" being the name declared in the elements `data-class` attribute.

### Cursor

Pass in `false` if you don't want the default browser cursor to appear.

## React Usage

If you are using React you have to make use of the componentDidMount() and useEffect() functions.

### Class Component

```js
  componentDidMount() {
    const customCursor = new Cursor({
      hovers: ['link-button', 'hero-text']
    })
    return customCursor.init()
  }
```

### Function Component

```js
useEffect(() => {
  const customCursor = new Cursor({
    hovers: ["link-button", "hero-text"]
  });
  return customCursor.init();
});
```
