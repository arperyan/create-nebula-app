/**
 * Connect to Saas
 */
import schema from "enigma.js/schemas/12.67.2.json";
import enigma from "enigma.js";
import { embed } from "@nebula.js/stardust";
import bar from "@nebula.js/sn-bar-chart";
import { config } from "../../config";

export class QlikComponent {
    app: EngineAPI.IApp;
    constructor() {}
    async session() {
        const url = `https://${config.tenantDomain}`;
        const webIntegrationId = config.qlikWebIntegrationId;
        const host = url.replace(/^https?:\/\//, "").replace(/\/?/, "");
        const headers = await this.getQCSHeaders({ url, webIntegrationId });
        const params = Object.keys(headers)
            .map((key) => `${key}=${headers[key]}`)
            .join("&");

        let enigmaConfig: enigmaJS.IConfig = {
            Promise: Promise,
            schema: schema,
            url: `wss://${host}/app/${config.appId}?${params}`,
        };

        const session = enigma.create(enigmaConfig);

        const global: EngineAPI.IGlobal = await session.open();
        // @ts-ignores
        return await global.openDoc(config.appId);
    }
    async chart() {
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
    async getQCSHeaders({ url, webIntegrationId }) {
        const response = await fetch(`${url}/api/v1/csrf-token`, {
            credentials: "include",
            headers: { "qlik-web-integration-id": webIntegrationId },
        });
        if (response.status === 401) {
            const loginUrl: URL | any = new URL(`${url}/login`);
            loginUrl.searchParams.append("returnto", window.location.href);
            loginUrl.searchParams.append("qlik-web-integration-id", webIntegrationId);
            window.location.href = loginUrl;
            return undefined;
        }
        const csrfToken = new Map(response.headers).get("qlik-csrf-token");
        return {
            "qlik-web-integration-id": webIntegrationId,
            "qlik-csrf-token": csrfToken,
        };
    }
}
