'use strict'

function id(str) {
    /**
     * @param {string} str
     * @return {DOMElement}
     */
    return document.getElementById(str)
}

function query(str) {
    /**
     * @param {string} str
     * @return {DOMElement}
     */
    return document.querySelector(str)
}

function queryArr(str) {
    /**
     * naming: queryArr instead of queryAll to emphasize that
     * it conveniently returns proper array
     * @param {string} str
     * @return {Array<DOMElement>}
     */
    return Array.from(
        document.querySelectorAll(str)
    )
}

function click(q, func) {
    /**
     * @param {string} q
     * @param {function} func
     */
    query(q).addEventListener('click', func)
}

const dom = {}

dom.isObject = function (i) {
    return i === Object(i)
        && Object.prototype.toString.call(i) !== '[object Array]'
}

dom.setIfDefined = function (val, set, pt) {
    if (val != null) {
        set[pt] = val
    }
}

dom.siblingOfClass = function (_class, el) {
    return el.parentNode.getElementsByClassName(_class)[0]
}

dom.siblingSearcher = function (el) {
    return function (_class) {
        return dom.siblingOfClass(_class, el)
    }
}

dom.eventOfClass = function (className, event) {
    return event.target.classList.value.includes(className)
}

dom.isNode = function (i) {
    return i.nodeType === 1
}

dom.render = function (scheme, parent) {
    /**
     * @param {object|string} scheme 
     * @param {DOMElement} [parent] to which elements from scheme 
     * will be appended.
     * @return {DOMElement} element, which has been appended to parent 
     * (if parent specified)
     * If scheme contains multiple first-level elements, 
     * this element will be DOMFragment
     */
    if (typeof scheme == 'string') {
        /** object */ scheme = dom.decode(scheme)
    }
    // inspired by Tiddlywiki source code — $tw.utils.domMaker
    var element
    if (scheme.el) {
        element = processEl(scheme.el)
    }

    if (scheme.ch && scheme.ch.length) {
        processCh(scheme.ch)
    }

    if (parent) {
        parent.appendChild(element)
    }

    return element

    function processEl(el) {
        let element
        if (typeof el == 'string') {
            element = dom.makeFromStr(el)
        } else
            if (Array.isArray(el)) {
                element = dom.make(el[0], el[1])
            } else {
                console.log('sodfjosdjfo!!!!!!')
            }
        return element
    }

    function processCh(ch) {
        ch.forEach(el => {
            if (typeof el == 'string') {
                dom.makeFromStr(el, element)
            } else if (dom.isObject(el)) {
                dom.render(el, element)
            }
        })
    }
}

dom.make = function (tag, options, parent) {
    var element = document.createElement(tag);
    // special cases — name of attribute in options (and in html)
    //   doesn't correspond to the name of attribute in JS
    if (options && Object.keys(options).length) {

        dom.setIfDefined(options['class'], element, 'className')
        delete options['class']
        dom.setIfDefined(options['for'], element, 'htmlFor')
        delete options['for']
        if (options.text) {
            element.appendChild(document.createTextNode(options.text));
            delete options['text']
        }
    }
    Object.keys(options).forEach(el => {
        // if options includes some of these html attributes,
        //   set them to the created object
        try {
            dom.setIfDefined(options[el], element, el)
        } catch (e) {
            console.log(e)
        }
    })

    if (parent) {
        parent.appendChild(element)
    }
    return element
}

dom.makeFromStr = function (str, parent) {
    /**
     * Wrapper around dom.make, which allows input in form of
     * @param {string} str, which represents DOM element in shortest form possible,
     * and produces {array} with {string} tag, {object} options 
     * and optional {DOMElement} parent.
     * @returns whatever dom.make returns
     * @todo standalone attributes like disabled
     */
    if (['template', 'fragment'].includes(str)) {
        // One top-level element should be, so let it be DOMFragment
        return document.createDocumentFragment()
    }
    var tags = {
        'a': 'a abbr address area article aside audio',
        'b': 'b base bdi bdo blockquote body br button',
        'c': 'canvas caption cite code col colgroup command',
        'd': 'datalist dd del details dfn dir div dl dt',
        'e': 'em embed',
        'f': 'fieldset figcaption figure footer form',
        'h': 'h1 h2 h3 h4 h5 h6 head header hgroup hr html',
        'i': 'i iframe img input ins',
        'k': 'kbd keygen',
        'l': 'label legend li link',
        'm': 'map mark menu meta meter',
        'n': 'nav noscript',
        'o': 'object ol optgroup option output',
        'p': 'p param pre progress',
        'q': 'q',
        'r': 'rp rt ruby',
        's': 's samp script section select small source span strong style sub summary sup',
        't': 'table tbody td textarea tfoot th thead time title tr track',
        'u': 'u ul',
        'v': 'var video',
        'w': 'wbr',
    }
    /**
     * Split tags strings into array and reverse it.
     * Reversed because otherwise any of <address>, <area>, <abbr> tags will
     * always be interpreted as <a>. Shortest tags should be tried last.
     */
    for (let i in tags) { tags[i] = tags[i].split(' ').reverse() }
    let /** string */ tag = parseTag()
    /** 
     * options keys are tag attributes with
     * special "text" key — node's textContent
     */
    let options = {}
    parseText()
    parseClass()
    parseAttribute()
    return dom.make(tag, options, parent)

    function parseTag() {
        /** string's first char points out the range of possible tags */
        let possibleTags = tags[str[0]]
        let tag = possibleTags.filter(possibleTag => {
            if (possibleTag === str.slice(0, possibleTag.length)) {
                return possibleTag
            }
        })[0]
        /** cut out tag from str */
        str = str.slice(tag.length, str.length).trim()
        return tag
    }
    function parseText() {
        /** Can't be confused with "text" attribute, it's never used */
        let text = str.match(/text=(.*)/)
        if (text) {
            options.text = text[1]
            str = str.slice(0, str.length - text[0].length).trim()
        }
    }
    function parseClass() {
        let classesStr
        if (str[0] === '.') {
            /** if first character is dot, classes are present */
            let index = str.indexOf(' ')
            if (index !== -1) {
                classesStr = str.slice(0, index)
            } else {
                classesStr = str
            }
            str = str.slice(index, str.length).trim()
            options.class = classesStr.split('.').slice(1, 999).join(' ')
        }
    }
    function parseAttribute() {
        if (str.includes('=')) {
            let splitMultiple = str.split(',')
                .map(i => i.trim())
                .filter(i => { if (i.length) return i })
            for (let el of splitMultiple) {
                let index = el.indexOf('=')
                let key = el.slice(0, index)
                let value = el.slice(index + 1, el.length)
                options[key] = value
            }
        }
    }
}

dom.decode = function decode(i) {
    /**
     * Helper function of dom.render, though may be used separately.
     * Take multi-line string, and make object, ready to use by dom.render
     * @param {string} i represents DOM elements in shortest form possible
     * @return {object}
     */

    i /** array */ = i.trim().split('\n')
    let o = {
        ch: []
    }
    let /** array */ blocks = split(i)
    if (blocks.length > 1) {
        o.el = 'template'
        o.ch = newChildren(blocks)
    } else {
        o.el = blocks[0]
        o = newChildren(blocks)[0]
    }
    return o

    function newChildren(blocks) {
        return blocks.map(line => {
            return {
                el: line[0],
                ch: processCh(line.slice(1, line.length))
            }
        })
    }

    function processCh(line) {
        if (line.length === 0) return []
        line = line.map(p => p.slice(4, p.length))
        let blocks = split(line)
        let res = []
        blocks.forEach(line => {
            let newObj = {
                el: line[0],
            }
            if (blocks.length === 1) {
                newObj.ch = []
            } else {
                newObj.ch = processCh(line.slice(1, line.length))
            }
            res.push(newObj)
        })
        return res
    }

    function split(lines) {
        var acc = []
        lines.forEach(line => {
            if (line[0] !== ' ') {
                acc.push([line])
            } else {
                acc[acc.length - 1].push(line)
            }
        })
        return acc
    }
}

dom.rm = function (el) {
    /** Remove element */
    if (el && el.parentNode) {
        el.parentNode.removeChild(el)
    }
}

dom.removeAllChildren = function (el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    }
}

dom.table = function (arr, parent) {
    let table = document.createElement('table')
    for (let line of arr) {
        let row = table.insertRow()
        for (let i = 0; i < line.length; i += 1) {
            let cell = row.insertCell(i)
            if (typeof line[i] == 'string') {
                let /** string */ cellText = line[i]
                cell.appendChild(
                    document.createTextNode(cellText)
                )
            }
            if (dom.isObject(line[i])) {
                cell.appendChild(
                    dom.render(line[i])
                )
            }
            row.appendChild(cell)
        }
        table.appendChild(row)
    }
    if (parent) {
        parent.appendChild(table)
    }
    return table
}

/**
 * @param {object} i
 *    fields: {DOMElement} input
 *            {string} up
 *            {string} down
 *            {array} range
 *            {string} disabledClass
 */
dom.boundsChecker = function (i) {
    const DOMElement = i.input
    const rangeLow  = Math.min(...i.range)
    const rangeHigh = Math.max(...i.range)
    const siblings = dom.siblingSearcher(DOMElement)
    const up   = siblings( i.up ).classList
    const down = siblings(i.down).classList
    const { disabledClass } = i
    
    return function (change) {
        let value = parseInt(DOMElement.value)
        if (!value) {
            DOMElement.value = value = rangeLow
        }
        let newValue = value + change
        if (rangeLow <= newValue && newValue <= rangeHigh) {
            DOMElement.value = newValue
            checkIfDisabled(newValue)
        }
    }

    function checkIfDisabled(newValue) {
        switch (newValue) {
            case rangeLow:
                down.add(disabledClass); break
            case (rangeLow + 1):
                down.remove(disabledClass); break
            case (rangeHigh - 1):
                up.remove(disabledClass); break
            case rangeHigh:
                up.add(disabledClass); break
        }
    }
}

dom.insertAfter = function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

dom.prependChild = function prependChild(parent, newFirstChild) {
    parent.insertBefore(newFirstChild, parent.firstChild)
}
