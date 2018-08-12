import React from 'react'
import { Text } from 'react-native'
import styleSheet from './stylesheet'

class Stylist {
    constructor() {
        this.defaultStyle = {}
        this.context = styleSheet

        this.config = {
            styleStart: '[',
            styleEnd: ']',
        }
    }

    //Merge config with defaults
    give (defaultStyle, context, config) {
        this.defaultStyle = defaultStyle
        this.context = Object.assign(this.context, context)
        this.config = Object.assign(this.config, config)
    }

    /*
    ARGUMENTS:
        arg1: entire string
        arg2: if default style needs to be adjusted for one-time use
        arg3: if config needs to be adjusted for one-time use
    FUNCTION:
        Merges config with defaults,
        Splits string by config.styleStart,
        Loops through and styles each sub-string,
            Part is styled if it is non-empty, and contains config.styleEnd. otherwise, the part is skipped and remains the way it was after .split() was performed.
        Text is passed a keyed-Array[] child
    */
    format (string, extraConfig = {}) {
        this.mergedConfig = Object.assign(this.config, extraConfig)

        let parts = string.split(this.mergedConfig.styleStart)

        for (var i=0; i<parts.length; i++) {
            if (parts[i] && parts[i].indexOf(this.mergedConfig.styleEnd) !== -1) {
                parts[i] = this._styledPart(parts[i], {}, i)
            }
        }

        return parts
    }

    /*
    ARGUMENTS:
        arg1: entire part
            NOTE: part includes config.styleEnd somewhere in the string, checked using .indexOf
        arg2: styles cumulated recursively
        arg3: index, objects in an Array[] must be keyed
    FUNCTION:
        Get prefix and remaining string,
            if remaining string is empty, return empty string to avoid extra <Text/>
        If config.styleEnd hasn't been reached, run function again.
            function will take shorter string, merged styles, and the same index
        If config.styleEnd has been reached, return <Text/> with applied styles
            if there aren't any styles, just return the string to avoid extra <Text/>
    */
    _styledPart (part, styles, i) {
        const char = part.charAt(0)
        const substr = part.substr(1)

        if (!substr) return ""

        if (char !== this.mergedConfig.styleEnd) {
            return this._styledPart(substr, Object.assign(styles, this.context[char]), i)
        }

        if (styles === {}) return substr

        return <Text style={styles} key={i}>{substr}</Text>
    }
}

export const Context = new Stylist()

export const Pretext = props => {
    return (
        <Text
            { ...props }
            style={[this.defaultStyle, ...props.style]}
        >
            {Context.format(props.children, props.config)}
        </Text>
    )
}