<script lang="ts">
    import enigma from "enigma.js";
    import schema from "enigma.js/schemas/12.67.2.json";
    import { QlikDesktopConnection } from "./lib/util/qlik-desktop-connection";
    import { config } from "./config.sample";
    import { NebulaCharts } from "./lib/util/nebulaCharts";
    import NebulaBar from "./lib/components/NebulaBar.svelte";
    import Spinnner from "./lib/ui/spinnner.svelte";
    import type { NebulaChart } from "./types";
    import NebulaSelection from "./lib/components/NebulaSelection.svelte";

    let qlikInstance: EngineAPI.IApp;

    const qlik: QlikDesktopConnection = new QlikDesktopConnection(enigma, schema);

    const establishConnection = async (): Promise<NebulaChart> => {
        qlikInstance = await qlik.connectAndOpenDoc(config.appId);
        const nebulaComponent = new NebulaCharts(qlik.app);
        return nebulaComponent.chart();
    };
</script>

<main>
    {#await establishConnection()}
        <Spinnner />
    {:then nebulaInstance}
        <NebulaSelection nebula={nebulaInstance} />
        <NebulaBar nebula={nebulaInstance} app={qlikInstance} />
    {/await}
</main>

<style>
    @import "../global.css";
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }
</style>
