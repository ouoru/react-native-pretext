import React from 'react'
import { Text } from 'react-native'

class Stylist {
    constructor() {
        this.defaultStyle = {}
        this.context = {}
        this.config = {
            //Whether or not to remove separators from the given string,
            //Set to true if you are separating using Symbols.
            removeSeparators: false,

            //Character(s) used to split up the string
            //Can be used with Regex, for example, /[\s,]+/ will split on spaces and commas.
            separator: ' ',

            //Checks for multiple prefixes
            stackPrefixes: false,
        }
    }

    give (defaultStyle, context, config) {
        this.defaultStyle = defaultStyle
        this.context = context
        this.config = Object.assign(this.config, config)
    }

    format (string) {
        let parts = string.split(this.config.separator)

        for (var i=0; i<parts.length; i++) {
            parts[i] = this._styledPart(parts[i], {}, i)
        }

        return <Text style={this.defaultStyle}>{parts}</Text>
    }

    _styledPart (string, styles, i) {
        let charId = string.charAt(0)
        if (this.context[charId]) {
            return this._styledPart(string.substr(1), Object.assign(styles, this.context[charId]), i)
        }

        if (!this.config.removeSeparators && i !== 0) {
            string = this.config.separator + string
        }

        return <Text style={styles} key={i}>{string}</Text>
    }
}

export const Context = new Stylist()

export const Pretext = (props) => Context.format(props.children)