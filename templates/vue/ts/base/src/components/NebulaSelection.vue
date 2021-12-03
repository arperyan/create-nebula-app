<script lang="ts">
import { PropType } from "vue";
import type { NebulaChart } from "../types";

export default {
    name: "NebulaSelection",
    components: {},
    props: {
        nebula: { type: Object as PropType<NebulaChart>, default: {} },
    },
    async mounted() {
        (await this.nebula.selections()).mount(this.$refs.element);
    },
};
</script>

<template>
    <div class="toolbar" ref="element"></div>
</template>
