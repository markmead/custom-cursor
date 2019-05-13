# custom-cursor

| Easily create custom cursors for your website and only worry about the CSS

## Install

```
  npm install --save create-cursor
```

## Usage

The cursor uses a constructor, so to call it you need to write:

```js
const customCursor = new Cursor({})
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
- mouse

```js
const customCursor = new Cursor({
  id: 'my-cursor',
  hovers: ['div', '.hero'],
  mouse: true
})
```

### Id

This will be used for the cursors `class` so if you set the id in the options then remember to use that as the class name in the CSS.

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

#### Why Unique Attributes?

I have thought of using the value of `hovers` as the class name, so for example if you pass all `div` elements it will return on hover:

```html
<div id="js-cursor" class="js-cursor--div"></div>
```

However, I am yet to decide if that's easier/better than being specific in the `data-class` attribute.

As it currently stands, my thoughts are to change it so the above example with `js-cursor--div` happens and if the element has a `data-class` attribute that takes over.

### Mouse

Pass in `true` if you want the mouse to appear on the cursor, by default this is false and therefore the default browser mouse won't appear.

## React Usage

If you are using React you have to make use of the componentDidMount() and useEffect() functions.

### Class Component

```js
  componentDidMount() {
    const customCursor = new Cursor({ hovers: ['div'] })
    return customCursor.run()
  }
```

### Function Component

```js
useEffect(() => {
  const customCursor = new Cursor({ hovers: ['div'] })
  return customCursor.run()
})
```
