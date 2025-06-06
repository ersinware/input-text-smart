<script>
    // import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    // import * as Command from "$lib/components/ui/command/index.js";
    import * as Command from "$lib/components/ui/command/index.js";
    import CheckIcon from '@lucide/svelte/icons/check'
    import { cn } from '$lib/utils.js'
    import { onMount } from 'svelte'

    let { stateDropdown = $bindable(), onColumnSelected } = $props(),
        columns = $state.raw([]),
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

    function _onColumnSelected(value, label) {
        onColumnSelected(value, label)
        stateDropdown.open = false
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
                        {#each columns as column (column.value)}
                            <Command.Item value={column.value}
                                          onSelect={() => {_onColumnSelected(column.value, column.label)}}>
                                <CheckIcon class={cn(stateDropdown.value !== column.value && "text-transparent")}/>

                                {column.label}
                            </Command.Item>
                        {/each}
                    </Command.Group>
                </Command.List>
            </Command.Root>
        </Popover.Content>
    </Popover.Root>
{/if}