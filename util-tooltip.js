'use strict'

const tooltip = {}

tooltip.show = function(element, tooltipElement, mods) {
    let { top, bottom, right, left } = element.getBoundingClientRect()
    let { mTop = 0, mBottom = 0, mRight = 0, mLeft = 0 } = mods
    let targetStyle = tooltipElement.style
    targetStyle.top    = top  + mTop  + window.scrollY + 'px'
    targetStyle.bottom = bottom + mBottom + 'px'
    targetStyle.right  = right + mRight + 'px'
    targetStyle.left   = left + mLeft  + 'px'
    targetStyle.display = "block"

    element.addEventListener('mousemove', e => {
        let obj = handler(e)
        targetStyle.top  = obj.y + mods.top + 'px'
        targetStyle.left = obj.x + mods.left + 'px'
    })
    function handler(e) {
        e = e || window.event;

        var pageX = e.pageX;
        var pageY = e.pageY;

        // IE 8
        if (pageX === undefined) {
            pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        return {
            x: pageX,
            y: pageY
        }
    }

}

tooltip.hide = function(tooltipElement) {
    tooltipElement.style.display = 'none'
}

tooltip.add = function (element, getTooltipElement, mods)  {
    element.addEventListener('mouseover', (e) => {
        tooltip.show(element, getTooltipElement(e), mods)
    })
    element.addEventListener('mouseout',  (e) => {
        tooltip.hide(getTooltipElement(e))
    })
}
