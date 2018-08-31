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
        arg2: if config needs to be adjusted for one-time use
    FUNCTION:
        Merges config with defaults,
        Splits string by config.styleStart,
        Loops through and styles each sub-string,
            Part is styled if it is non-empty, and contains config.styleEnd. otherwise, the part is skipped and remains the way it was after .split() was performed.
        Text is passed a keyed-Array[] child
    */
    format (props) {
        const mergedConfig = Object.assign(this.config, props.config)

        let parts = props.children.split(mergedConfig.styleStart)

        for (var i=0; i<parts.length; i++) {
            if (!parts[i]) {
                parts.splice(i, 1)
                i--
            }
            else if (parts[i].indexOf(mergedConfig.styleEnd) !== -1) {
                parts[i] = this._styledPart(
                    parts[i],
                    {},
                    i,
                    mergedConfig
                )
            }
        }

        if (parts.length === 1 && typeof parts[0] !== 'string') {
            return (
                React.cloneElement(parts[0], {
                    ...props,
                    style: [this.defaultStyle, props.style, parts[0].style],
                    children: parts[0]
                })
            )
        }

        return (
            <Text
                {...props}
                style={[this.defaultStyle, props.style]}
                children={parts}
            />
        )
    }

    /*
    ARGUMENTS:
        arg1: entire part
            NOTE: part includes config.styleEnd somewhere in the string, checked using .indexOf
        arg2: styles cumulated recursively
        arg3: key, objects in an Array[] must be keyed
    FUNCTION:
        Get prefix and remaining string,
            if remaining string is empty, return empty string to avoid extra <Text/>
        If config.styleEnd hasn't been reached, run function again.
            function will take shorter string, merged styles, and the same index
        If config.styleEnd has been reached, return <Text/> with applied styles
            if there aren't any styles, just return the string to avoid extra <Text/>
    */
    _styledPart (part, styles, key, mergedConfig) {
        const char = part.charAt(0)
        const substr = part.substr(1)

        if (!substr) return ""

        if (char !== mergedConfig.styleEnd) {
            return this._styledPart(
                substr,
                Object.assign(styles, this.context[char]),
                key,
                mergedConfig
            )
        }

        if (styles === {}) return substr

        return <Text style={styles} key={key}>{substr}</Text>
    }
}

export const Context = new Stylist()

export class Pretext extends React.PureComponent {
    render() { return Context.format(this.props) }
}