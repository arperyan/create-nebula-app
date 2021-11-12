import schema from "enigma.js/schemas/12.67.2.json";
import enigma from "enigma.js";
import { embed } from "@nebula.js/stardust";
import bar from "@nebula.js/sn-bar-chart";
import { config } from "../../config";

export class QlikComponent {
    app: EngineAPI.IApp;
    constructor() {}
    async session(): Promise<any> {
        let enigmaConfig: enigmaJS.IConfig = {
            Promise: Promise,
            schema: schema,
            url: `ws://${config.tenantDomain}/app/engineData`, ///IF Desktop ws otherswise wss
        };
        const session = enigma.create(enigmaConfig);
        const global: EngineAPI.IGlobal = await session.open();

        return await global.openDoc(config.appId);
    }
    async chart(): Promise<any> {
        this.app = await this.session();
        const nebbie = embed(this.app, {
            context: { theme: "light" },
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
