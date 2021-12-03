<script lang="ts">
    import { onMount } from "svelte";
    import type { NebulaChart } from "../../types";

    export let nebula: NebulaChart;

    let element: HTMLDivElement;

    onMount(async () => {
        (await nebula.selections()).mount(element);
    });
</script>

<div bind:this={element} />
