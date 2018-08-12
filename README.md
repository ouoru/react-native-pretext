## Pretext

> Style your Text components using prefixes!

Pretext handles your styles inside the string itself, by adding styles based on a given string of 'prefixes'.

Checkout [this link](https://ouoru.github.io/react-pretext/) for a Live Demo.

## Description

`react-native-pretext` allows you to intricately style `Text` Components.

This is **NOT** what you are looking for if:
- You want to manage a StyleSheet for your whole app

This **may be** what you are looking for if:
- You need to store and read styled Text components from a database
- You need different text styles in an individual string
- You use complex strings with variable text positions

## Install

Install with [npm](https://www.npmjs.com/package/react-native-pretext):

```sh
$ npm i react-native-pretext
```

## Usage

- Configure `Context`

```jsx
import { Context } from 'react-native-pretext'

const defaultStyle = {
    fontFamily: 'MyFont',
    fontSize: 12,
    color: '#FFFFFF'
}

const context = {
    p: {
        color: 'purple'
    }
    r: {
        color: 'red'
    },
}

const config = {}

Context.give(defaultStyle, context, config)
```

- Use `Pretext` Component as you would use a `Text` Component, but add the styles you want as a Prefix.

```jsx
import { Pretext } from 'react-native-pretext'

<Pretext>[p]Hello World!</Pretext>
```

- `Pretext` will style your text according to the context you initialized! In this case, `defaultStyle` is applied to the `Text` as well as the style of `p` in our `context`, `color: 'purple'`.

```jsx
<Text style={{ fontFamily: 'MyFont', fontSize: 12, color: 'purple' }}>Hello World!</Text>
```

##Advanced Usage

- You can pass context props to a Pretext component to override your default settings.

```jsx
<Pretext
    style={extraStyle}
    config={extraConfig}
>[p]Hello World!</Pretext>
```

## API

### defaultStyle

> This is the style given to the parent `Text` Component

### context

> Your StyleSheet, Pretext will check if prefix exists in your context

- We recommend you to use the following guidelines when creating your `StyleSheet` for ease of use. Note that these are just recommendations, you may need different guidelines depending on what styles you are using. Our recommendations are just to make life easier.

| Styling | Type | Example | Why |
| :------: | :------: | :-----: | :--- |
| color | letter | `a` | Associating a color with a letter is simply the easiest to remember. |
| backgroundColor, borderColor | capital letter | `A` | Same reasoning as colors. |
| fontSize/lineHeight, opacity, letterSpacing | number | `1` | Associating value with proportional numbers. You probably won't need 10 (0-9) different styles for each property, so you could use something like **0-4** for fontSize, and **5-9** for opacity. |
| fontFamily, textAlign, ... | symbol | `@, #, ...` | This is only recommended for styling props that either won't change often, or will only be set to one or two other values. |

### config

| Name  | Type     | default | Description |
| :---- | :------: | :------: | :--- |
| styleStart | `string` | `[` | we perform a `.split()` using the given character to separate the string |
| styleEnd | `string` | `]` | tells us when to stop looking for prefixes |
