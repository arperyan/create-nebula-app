import { Component } from "@angular/core";
import enigma from "enigma.js";
import schema from "enigma.js/schemas/12.67.2.json";
import { config } from "../config.sample";
import { QlikSaaSConnection } from "qlik-saas-web-auth";
import { NebulaCharts } from "./util/nebulaCharts";
import type { NebulaChart } from "./types";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    qlikInstance: EngineAPI.IApp;
    nebulaInstance: NebulaChart;
    isLoading = true;

    private qlik!: QlikSaaSConnection;

    constructor() {}

    getQlikInstance() {
        return new QlikSaaSConnection(
            {
                webIntegrationId: config.qlikWebIntegrationId,
                tenantDomain: config.tenantDomain,
            },
            enigma,
            schema
        );
    }
    init = async () => {
        this.qlik = this.getQlikInstance();
        const establishConnection = async (): Promise<NebulaChart> => {
            this.qlikInstance = await this.qlik.connectAndOpenDoc(config.appId);

            const nebulaComponent = new NebulaCharts(this.qlik.app);
            return nebulaComponent.chart();
        };

        this.nebulaInstance = await establishConnection();
        this.isLoading = false;
    };
    ngOnInit() {
        this.init();
    }
}
