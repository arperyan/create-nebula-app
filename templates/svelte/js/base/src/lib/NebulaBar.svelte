<script lang="ts">
    import { onMount } from "svelte";
    import { barPlugin } from "./function/nebulaPlugins";
    import type { Nebula } from "../types";

    export let nebula: Nebula;
    export let fields: string[];
    export let app: EngineAPI.IApp;

    let element: HTMLDivElement;

    onMount(async () => {
        await nebula.render({
            element: element,
            type: "bar",
            fields: fields,
            plugins: [barPlugin],
            properties: {
                title: "Nebula",
            },
        });
    });
</script>

<div class="container">
    <div class="object" bind:this={element} />
</div>

<style>
    .container {
        width: 100%;
        height: 600px;
    }

    .object {
        width: 100%;
        height: 600px;
        display: flex;
        margin-top: 30px;
    }
</style>
