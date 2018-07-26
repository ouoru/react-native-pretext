## Pretext

> Style your Text components using prefixes!

## Description

`react-native-pretext` allows you to personally style intricate `Text` Components.
This is *NOT* what you are looking for if:
- You want a StyleSheet

This *may* be what you are looking for if:
- You need to Style words differently in an individual string
- You need to store and read styled Text components from a database

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

_renderTitle = () => {
    return <Pretext>$Hello World!</Pretext>
}
```

## API

### defaultStyle

> This is the style given to the parent `Text` Component

### context

> Your StyleSheet, Pretext will check if prefix exists in your context

### config

| Name  | Type     | default | Description |
| :---- | :------: | :------: | :--- |
| separator | `string`   | ` ` | separator used to determine where to check for prefixes |
| stackPrefixes | `bool`   | `false` | allow multiple prefixes, and combine the styles from each |