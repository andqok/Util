'use strict'

const tooltip = {}

tooltip.hide = function(tooltipElement) {
    tooltipElement.style.display = 'none'
}

tooltip.add = function (element, getTooltipElement, mods)  {
    var tip
    if (! window.instance ) {
        var wrapper = document.createElement('div')
        wrapper.classList.add('tooltip-wrapper')
        wrapper.style = 'position: relative; display: none;'
        tip = document.createElement('div')
        tip.textContent = 'tip'
        tip.classList.add('tooltip')
        tip.style = 'position: absolute; display: none;'
        wrapper.appendChild(tip)
        document.body.appendChild(wrapper)
        window.instance = tip
    }

    element.addEventListener('mouseover', (e) => {
        window.instance.textContent = e.target.classList.value
    })

    element.addEventListener('mouseout',  (e) => {
        tooltip.hide(window.instance)
    })

    element.addEventListener('mousemove',  (e) => {
        let elementStyle = window.instance.style

        elementStyle.left = (e.pageX) + 'px'
        elementStyle.top = (e.pageY - 820) + 'px'
        elementStyle.display = 'block'
    })
}
