<script lang="ts">
import { PropType } from "vue";
import type { NebulaRend, NebulaChart } from "../types";
import { fields } from "../util/data.sample";

export default {
    name: "NebulaBar",
    components: {},
    props: {
        nebula: { type: Object as PropType<NebulaChart>, default: {} },
        app: { type: Object as PropType<EngineAPI.IApp>, default: {}, required: false /* delete when its required */ },
    },
    data() {
        return {
            renderNebbie: <NebulaRender>{},
        };
    },
    async mounted() {
        this.renderNebbie = await this.nebula.render({
            element: <HTMLDivElement>this.$refs.elementRef,
            type: "bar",
            //id: "",  //Qlik Object ID
            fields: fields,
            properties: {
                title: "Nebula",
            },
        });
    },
    unmounted() {
        if (!this.renderNebbie) return;
        console.log("Unmounted");
        this.renderNebbie.destroy();
    },
};
</script>

<template>
    <div class="container">
        <h1>Starter Project</h1>
        <div class="object" ref="elementRef" />
    </div>
</template>

<style scoped>
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
