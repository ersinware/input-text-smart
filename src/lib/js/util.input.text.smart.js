export function getPositionOfCaret(container) {
    if (!container.innerText.trim()) {
        const style = window.getComputedStyle(container),
            paddingTop = parseFloat(style.paddingTop),
            paddingLeft = parseFloat(style.paddingLeft)

        // This is the position where the first character would appear
        return { x: paddingLeft, y: paddingTop }
    }

    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0),
            caretRect = range.getBoundingClientRect(),
            containerRect = container.getBoundingClientRect(),
            x = caretRect.left - containerRect.left,
            y = caretRect.top - containerRect.top

        return { x, y }
    }

    return { x: 0, y: 0 }
}

export function createBadge(value, label) {
    const badge = document.createElement('span')
    badge.setAttribute('data-value', value)
    badge.textContent = label
    badge.classList.add('badge')
    badge.contentEditable = 'false'

    return badge
}

export function moveCaretAfter(node) {
    const range = document.createRange(),
        selection = window.getSelection()

    range.setStartAfter(node)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
}