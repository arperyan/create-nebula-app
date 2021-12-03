<script lang="ts">
    import { onMount } from "svelte";
    import type { NebulaRender, NebulaChart } from "../../types";
    import { fields } from "../util/data.sample";

    export let nebula: NebulaChart;
    export let app: EngineAPI.IApp;

    let element: HTMLDivElement;

    onMount(() => {
        let renderNebbie: NebulaRender;

        const getNebula = async () => {
            renderNebbie = await nebula.render({
                element: element,
                type: "bar",
                //id: "",  //Qlik Object ID
                fields: fields,
                properties: {
                    title: "Nebula",
                },
            });
        };

        getNebula();

        return () => {
            console.log("destroy");
            renderNebbie.destroy();
        };
    });
</script>

<div class="container">
    <h1>Starter Project</h1>
    <div class="object" bind:this={element} />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        /* Modern Css */
        & > h1 {
            color: pink;
        }
    }

    .object {
        width: 100%;
        height: 600px;
        display: flex;
        margin-top: 30px;
    }
</style>
