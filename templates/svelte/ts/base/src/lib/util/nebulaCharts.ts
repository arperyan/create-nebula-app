import { embed } from "@nebula.js/stardust";
import bar from "@nebula.js/sn-bar-chart";
import type { NebulaChart } from "../../types";

export class NebulaCharts {
    private app: EngineAPI.IApp;
    constructor(app: EngineAPI.IApp) {
        this.app = app;
    }

    async chart(): Promise<NebulaChart> {
        const nebbie: NebulaChart = embed(this.app, {
            context: {
                theme: "light",
                language: "en-US",
                constraints: {
                    active: false,
                    passive: false,
                    select: false,
                },
            },
            types: [
                {
                    name: "bar",
                    load: () => bar,
                },
            ],
        });
        return nebbie;
    }
}
