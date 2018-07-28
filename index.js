import React from 'react'
import { Text } from 'react-native'

class Stylist {
    constructor() {
        //This style is applied to the parent Text component
        this.defaultStyle = {}

        //
        this.context = {}

        this.config = {
            //Indicates the start of the prefix string
            styleStart: '[',

            //Indicates the end of the prefix string
            styleEnd: ']',
        }
    }

    give (defaultStyle, context, config) {
        this.defaultStyle = defaultStyle
        this.context = context
        this.config = Object.assign(this.config, config)
    }

    format (string) {
        let parts = string.split(this.config.styleStart)

        for (var i=0; i<parts.length; i++) {
            parts[i] = this._styledPart(parts[i], {}, i)
        }

        return <Text style={this.defaultStyle}>{parts}</Text>
    }

    _styledPart (string, styles, i) {
        let char = string.charAt(0)
        //maybe mutate string with slice here so I don't have to do .substr(1)?
        //does slice return the char sliced? i forgots

        if (char !== this.config.styleEnd) {
            return this._styledPart(string.substr(1), Object.assign(styles, this.context[char]), i)
        }

        if (styles === {}) return string.substr(1)

        return <Text style={styles} key={i}>{string.substr(1)}</Text>
    }
}

export const Context = new Stylist()

export const Pretext = props => Context.format(props.children)