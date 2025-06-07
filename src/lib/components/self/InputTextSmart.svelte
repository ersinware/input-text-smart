<script>
    import { Label } from '@/components/ui/label/index.js'
    import DropdownInputTextSmart from '@/components/self/DropdownInputTextSmart.svelte'
    import { calculatePositionOfDropdown, createBadge, setResultOfInputTextSmart } from '@/js/util.input.text.smart.js'
    import { yieldToMain } from '@/js/util.js'

    let stateDropdown = $state({}),
        refTextbox,
        refResult,
        range,
        badgeToEdit

    async function onKeyDown(event) {
        if (event.key !== '/')
            return

        event.preventDefault()

        range = window.getSelection().getRangeAt(0)
        const { x, y } = calculatePositionOfDropdown(refTextbox)
        stateDropdown = { open: true, x, y }
    }

    function onKeyUp() {
        // When the text box has no text to remove <br> element - it brakes position of the caret
        if (!setResultOfInputTextSmart(refTextbox, refResult))
            refTextbox.innerHTML = ''
    }

    async function onColumnSelected(value, label) {
        stateDropdown.open = false

        await yieldToMain()

        if (badgeToEdit) {
            badgeToEdit.dataset.value = value
            badgeToEdit.innerText = label

            // --- Adjust the caret position ---
            const range = document.createRange()
            range.setStartAfter(badgeToEdit)
            range.collapse(true)

            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)

            refTextbox.focus()

            clear()

            return
        }

        // --- Create a badge and adjust the caret position ---
        const badge = createBadge(value, label)
        badge.addEventListener('click', onBadgeClick)

        range.insertNode(badge)
        range.collapse(false)

        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)

        refTextbox.focus()

        clear()
    }

    function onBadgeClick(event) {
        badgeToEdit = event.currentTarget

        const badgeRect = badgeToEdit.getBoundingClientRect(),
            containerRect = refTextbox.getBoundingClientRect()

        stateDropdown = {
            open: true,
            value: badgeToEdit.dataset.value,
            x: badgeRect.width / 2 + badgeRect.left - containerRect.left,
            y: badgeRect.top - containerRect.top
        }
    }

    function onKeyDownWindow(event) {
        // When multiple instances of this component exists
        if (!range)
            return

        if (event.key !== 'Escape')
            return

        // --- Reserve the caret position and focus to the text box ---
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)

        refTextbox.focus()

        clear()
    }

    function clear() {
        stateDropdown = {}
        range = undefined
        badgeToEdit = undefined
        setResultOfInputTextSmart(refTextbox, refResult)
    }
</script>

<svelte:window onkeydown={onKeyDownWindow}></svelte:window>

<div class="space-y-2">
    <Label for="input-text-smart">Input Text Smart</Label>

    <div class="relative">
        <div id="input-text-smart"
             bind:this={refTextbox}
             class="min-h-[10rem] whitespace-pre-wrap border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 field-sizing-content shadow-xs w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
             contenteditable
             tabindex="0"
             role="textbox"
             onkeydown={onKeyDown}
             onkeyup={onKeyUp}>
        </div>

        {#if stateDropdown.open}
            <DropdownInputTextSmart bind:stateDropdown {onColumnSelected}/>
        {/if}
    </div>

    <p class="text-muted-foreground text-base md:text-sm">
        Type '/' to open the dropdown. To update a badge, click on it.
    </p>

    <p bind:this={refResult} class="mt-4 text-base md:text-sm">The result text will be here.</p>
</div>