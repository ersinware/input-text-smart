export function calculatePositionOfDropdown(container) {
    if (!container.innerText.trim()) {
        const style = window.getComputedStyle(container)

        // This is the position where the first character would appear
        return { x: parseFloat(style.paddingTop), y: parseFloat(style.paddingLeft) }
    }

    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
        const caretRect = selection.getRangeAt(0).getBoundingClientRect(),
            containerRect = container.getBoundingClientRect()

        // When a badge is attempted to be inserted just after an inserted badge
        if (caretRect.x === 0) {
            const badges = container.querySelectorAll('.badge'),
                badgeRect = badges[badges.length - 1].getBoundingClientRect()

            return {
                x: badgeRect.width + badgeRect.left - containerRect.left,
                y: badgeRect.top - containerRect.top
            }
        }

        return {
            x: caretRect.left - containerRect.left,
            y: caretRect.top - containerRect.top
        }
    }

    return { x: 0, y: 0 }
}

export function createBadge(value, label) {
    const badge = document.createElement('span')
    badge.contentEditable = 'false'
    badge.setAttribute('data-value', value)
    badge.textContent = label
    badge.classList.add('badge')

    return badge
}

export function setResultOfInputTextSmart(refTextbox, refResult) {
    const clone = refTextbox.cloneNode(true),
        badges = clone.querySelectorAll('.badge')

    for (const badge of badges)
        badge.parentNode.replaceChild(document.createTextNode(badge.dataset.value), badge)

    refResult.innerHTML = clone.innerHTML.replace(/\n/g, '<br>') || 'The result text will be here.'

    return clone.innerText
}