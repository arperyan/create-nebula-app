import enigma from "enigma.js";
import schema from "enigma.js/schemas/12.67.2.json";
import { QlikSaaSConnection } from "qlik-saas-web-auth";
import { config } from "./config.sample";
import { NebulaCharts } from "./util/nebulaCharts";
import type { NebulaChart } from "./types";
import { fields } from "./util/data.sample";

(async () => {
    const qlik: QlikSaaSConnection = new QlikSaaSConnection(
        {
            webIntegrationId: config.qlikWebIntegrationId,
            tenantDomain: config.tenantDomain,
        },
        enigma,
        schema
    );

    const establishConnection = async (): Promise<NebulaChart> => {
        await qlik.connectAndOpenDoc(config.appId);
        const nebulaComponent = new NebulaCharts(qlik.app);
        return nebulaComponent.chart();
    };

    const run = async () => {
        const renderNebbie = await establishConnection();

        (await renderNebbie.selections()).mount(<HTMLDivElement>document.querySelector(".toolbar"));

        await renderNebbie.render({
            element: <HTMLDivElement>document.getElementById("chart"),
            type: "bar",
            //id: "",  //Qlik Object ID
            fields: fields,
            properties: {
                title: "Nebula",
            },
        });
        let isLoading = <HTMLDivElement>document.getElementById("qv-spinner")!;
        isLoading.style.display = "none";
    };

    run();
})();
