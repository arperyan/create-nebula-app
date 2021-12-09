import { Component, createRenderEffect, createSignal, Show } from "solid-js";
import Spinner from "./ui/Spinner";
import enigma from "enigma.js";
import schema from "enigma.js/schemas/12.67.2.json";
import { NebulaCharts } from "./util/nebulaCharts";
import NebulaComponent from "./components/NebulaBar";
import { config } from "./config.sample.";
import { QlikEnterpriseConnection } from "./util/qlik-enterprise-connection";
import NebulaSelection from "./components/NebulaSelection";
import "./App.css";
import type { NebulaChart } from "./types";

const qlik: QlikEnterpriseConnection = new QlikEnterpriseConnection(config.host, config.virtualProxy, enigma, schema);

const App: Component = () => {
    const [qlikInstance, setQlikInstance] = createSignal({} as EngineAPI.IApp);
    const [nebulaInstance, setNebulaInstance] = createSignal({} as NebulaChart);
    const [loading, setLoading] = createSignal(true);

    createRenderEffect(async () => {
        const getNebula = async () => {
            setLoading(false);
            const getQlik = await qlik.connectAndOpenDoc(config.appId);
            setQlikInstance(getQlik);

            const nebulaComponent = new NebulaCharts(qlik.app);
            return nebulaComponent.chart();
        };

        let nebulaChart = await getNebula();
        setNebulaInstance(nebulaChart);

        setLoading(true);
    });

    return (
        <main>
            <Show when={loading()} fallback={<Spinner></Spinner>}>
                <div>
                    <NebulaSelection nebula={nebulaInstance()}></NebulaSelection>
                </div>
                <div>
                    <NebulaComponent nebula={nebulaInstance()} app={qlikInstance()}></NebulaComponent>
                </div>
            </Show>
        </main>
    );
};

export default App;
