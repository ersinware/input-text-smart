<script>
    // import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    // import * as Command from "$lib/components/ui/command/index.js";
    import * as Command from "$lib/components/ui/command/index.js";
    import CheckIcon from '@lucide/svelte/icons/check'
    import { ChevronsDownUpIcon } from '@lucide/svelte'
    import { onMount } from 'svelte'

    let { stateDropdown, onColumnSelected } = $props(),
        columns = $state([]),
        fetched = $state.raw()

    onMount(async () => {
        const response = await fetch('/api/get-columns')
        if (response.ok) {
            const body = await response.json()

            if (body.columns)
                columns = body.columns
        }

        fetched = true
    })

    function onCollapsibleItemClick(event, column) {
        event.preventDefault()
        event.stopPropagation()

        column.open = !column.open
    }
</script>

{#if fetched}
    <Popover.Root bind:open={stateDropdown.open}>
        <div class="!absolute "
             style="top: calc({stateDropdown.y}px + 1.5rem) !important; left: {stateDropdown.x}px !important;">

            <Popover.Trigger class="!absolute"></Popover.Trigger>
        </div>

        <Popover.Content class="max-w-[15rem] p-0">
            <Command.Root class="max-h-[15rem]">
                <Command.Input placeholder="Search column name..."/>

                <Command.List>
                    <Command.Empty>No column found.</Command.Empty>

                    <Command.Group value="columns">
                        {#each columns as column}
                            {#if column.value instanceof Array}
                                <Command.Item class="cursor-pointer"
                                              value={column.label}
                                              onclick={event => onCollapsibleItemClick(event, column)}>

                                    <ChevronsDownUpIcon class="!h-[.9rem]"/>

                                    {column.label}
                                </Command.Item>

                                {#each column.value as innerColumn}
                                    <Command.Item class="ml-2 cursor-pointer {!column.open ? 'hidden' : '' }"
                                                  value={innerColumn.label}
                                                  onSelect={() => onColumnSelected(innerColumn.value, innerColumn.label)}>

                                        <CheckIcon
                                                class={stateDropdown.value !== innerColumn.value && "text-transparent"}/>

                                        {innerColumn.label}
                                    </Command.Item>
                                {/each}
                            {:else}
                                <Command.Item class="cursor-pointer"
                                              value={column.label}
                                              onSelect={() =>  onColumnSelected(column.value, column.label)}>

                                    <CheckIcon
                                            class={stateDropdown.value !== column.value && "text-transparent"}/>

                                    {column.label}
                                </Command.Item>
                            {/if}
                        {/each}
                    </Command.Group>
                </Command.List>
            </Command.Root>
        </Popover.Content>
    </Popover.Root>
{/if}