<script>
    import { Label } from '@/components/ui/label/index.js'
    import DropdownInputTextSmart from '@/components/self/DropdownInputTextSmart.svelte'
    import { createBadge, getPositionOfCaret, moveCaretAfter } from '@/js/util.input.text.smart.js'

    let stateDropdown = $state({}),
        refTextarea

    function onKeyDown(event) {
        if (event.key !== '/')
            return

        event.preventDefault()

        const selection = window.getSelection()
        if (!selection.rangeCount)
            return

        const range = selection.getRangeAt(0),
            placeholder = document.createElement('span') // Placeholder

        placeholder.id = 'badge-placeholder'
        range.insertNode(placeholder) // Insert the placeholder at the caret position

        // Get the position of the placeholder to open the dropdown
        const { x, y } = getPositionOfCaret(refTextarea)
        stateDropdown.open = true
        stateDropdown.x = x
        stateDropdown.y = y
    }

    function onColumnSelected(value, label) {
        // --- Editing an existing badge ---
        const badgeToEdit = refTextarea.querySelector('#editing-badge')
        if (badgeToEdit) {
            if (badgeToEdit.getAttribute('data-value') === value) {
                adjustCaretAndFocus(badgeToEdit)

                return
            }

            const badge = createBadge(value, label)
            badge.addEventListener('click', onBadgeClick)

            badgeToEdit.parentNode.replaceChild(badge, badgeToEdit)

            const space = document.createTextNode('\u00A0')
            badge.after(space)

            adjustCaretAndFocus(space)

            return
        }

        // --- Creating a new badge ---
        // Find the placeholder previously inserted
        const placeholder = refTextarea.querySelector('#badge-placeholder')
        if (!placeholder)
            return

        // Create the badge element
        const badge = createBadge(value, label)
        badge.addEventListener('click', onBadgeClick)

        // Replace the placeholder with the new badge
        placeholder.parentNode.replaceChild(badge, placeholder)

        // Create a space after the badge
        const space = document.createTextNode('\u00A0')
        badge.after(space)

        adjustCaretAndFocus(space)

        function adjustCaretAndFocus(after) {
            setTimeout(
                () => {
                    moveCaretAfter(after)
                    refTextarea.focus()
                },
                0
            )
        }
    }

    function onBadgeClick(event) {
        const currentlyEditing = refTextarea.querySelector('#editing-badge')
        if (currentlyEditing)
            currentlyEditing.removeAttribute('id')

        const clickedBadge = event.currentTarget
        clickedBadge.id = 'editing-badge'

        const badgeRect = clickedBadge.getBoundingClientRect(),
            containerRect = refTextarea.getBoundingClientRect()

        stateDropdown.value = clickedBadge.getAttribute('data-value')
        stateDropdown.x = badgeRect.left - containerRect.left
        stateDropdown.y = badgeRect.top - containerRect.top
        stateDropdown.open = true
    }

    function onKeyDownWindow(event) {
        if (event.key !== 'Escape')
            return

        const placeholder = refTextarea.querySelector('#badge-placeholder')
        if (placeholder) {
            const selection = window.getSelection(),
                range = document.createRange()

            range.selectNode(placeholder)

            placeholder.remove()

            range.collapse(true)
            selection.removeAllRanges()
            selection.addRange(range)
        }

        stateDropdown = {}
    }
</script>

<svelte:window onkeydown={onKeyDownWindow}></svelte:window>

<div class="space-y-2">
    <Label for="input-text-smart">Input Text Smart</Label>

    <div class="relative">
        <div id="input-text-smart"
             bind:this={refTextarea}
             class="min-h-[10rem] border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 field-sizing-content shadow-xs w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
             contenteditable
             tabindex="0"
             role="textbox"
             onkeydown={onKeyDown}>
        </div>

        {#if stateDropdown.open}
            <DropdownInputTextSmart bind:stateDropdown {onColumnSelected}/>
        {/if}
    </div>

    <p class="text-muted-foreground text-sm">
        Type '/' to open the dropdown. To update a badge, click on it.
    </p>
</div>