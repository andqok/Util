'use strict'
const svg = {}

svg.polyPainter = function (style, parent, points) {
    let styleArr = Object.keys(style).reduce((styleArr, key) => {
        let value = style[key]
        styleArr.push(`${key}:${value}`)
        return styleArr
    }, [])
    let styleStr = styleArr.join(';')
    
    return function (points) {
        svg.element('polyline', {
            points: points,
            style: styleStr
        }, parent)
    }
}

svg.element = function el(tag, options, parent) {
    /**
     * Create SVG element
     * @param {string} tag
     * @param {object} options
     * @param
     */
    var svgNS = "http://www.w3.org/2000/svg"
    const el = document.createElementNS(svgNS, tag)
    svg.attr(el, options)
    if (parent) {
        parent.appendChild(el)
    }
    return el
}

svg.attr = function attr(el, obj) {
    /**
     * Helper to bulk add add attributes to element
     */
    
    for (let attribute in obj) {
        el.setAttributeNS(null, attribute, obj[attribute])
    }
}
