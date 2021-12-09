<script lang="ts">
import NebulaBar from "./components/NebulaBar.vue";
import enigma from "enigma.js";
import schema from "enigma.js/schemas/12.67.2.json";
import { NebulaCharts } from "./util/nebulaCharts";
import NebulaSelection from "./components/NebulaSelection.vue";
import { QlikDesktopConnection } from "./util/qlik-desktop-connection";
import Spinnner from "./ui/spinner.vue";
import type { NebulaChart } from "./types";
import { config } from "./config.sample";
import "../global.css";

const qlik: QlikDesktopConnection = new QlikDesktopConnection(enigma, schema);

export default {
    name: "App",
    components: {
        Spinnner,
        NebulaBar,
        NebulaSelection,
    },
    props: [],
    data() {
        return {
            isLoading: <boolean>true,
            nebulaInstance: <NebulaChart>{},
            qlikInstance: <EngineAPI.IApp>{},
        };
    },

    async mounted() {
        const establishConnection = async (): Promise<NebulaChart> => {
            this.qlikInstance = await qlik.connectAndOpenDoc(config.appId);

            const nebulaComponent = new NebulaCharts(qlik.app);
            return nebulaComponent.chart();
        };

        this.nebulaInstance = await establishConnection();
        this.isLoading = false;
    },
};
</script>

<template>
    <main>
        <div v-if="isLoading">
            <Spinnner />
        </div>
        <div v-else>
            <NebulaSelection :nebula="nebulaInstance" />
            <NebulaBar :nebula="nebulaInstance" :app="qlikInstance" />
        </div>
    </main>
</template>

<style scoped>
main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
}
</style>
