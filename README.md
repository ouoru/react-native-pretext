## Pretext

> Style your Text components using prefixes!

Pretext handles your styles inside the string itself, by applying different styles based on the beginning character(s) of your string. 

## Description

`react-native-pretext` allows you to personally style intricate `Text` Components.

This is **NOT** what you are looking for if:
- You want to manage a StyleSheet for your whole app

This **may** be what you are looking for if:
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
    fontSize: 12,
    color: '#FFFFFF'
}

const context = {
    '$': {
        fontSize: 14,
        color: '#BF3138'
    },
    '&': {
        textAlign: 'center'
    }
}

const config = {}

Context.give(defaultStyle, context, config)
```

- Use `Pretext` Component as you would use a `Text` Component

```jsx
import { Pretext } from 'react-native-pretext'

<Pretext>$Hello World!</Pretext>
```

- `Pretext` will style your text according to the context you initialized!

```jsx
<Text style={context['$']}>Hello World!</Text>
```

## API

### defaultStyle

> This is the style given to the parent `Text` Component

### context

> Your StyleSheet, Pretext will check if prefix exists in your context

### config

| Name  | Type     | default | Description |
| :---- | :------: | :------: | :--- |
| separator | `string`   | `' '` | separator used to determine where to check for prefixes |
| stackPrefixes | `bool`   | `false` | allow multiple prefixes, and combine the styles from each |
