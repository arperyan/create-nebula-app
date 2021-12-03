import { FC, useState, useEffect, useMemo } from "react";
import Spinner from "./ui/Spinner";
import enigma from "enigma.js";
import schema from "enigma.js/schemas/12.67.2.json";
import { NebulaCharts } from "./util/nebulaCharts";
import NebulaComponent from "./components/NebulaBar";
import { config } from "./config.sample.";
import { QlikSaaSConnection } from "qlik-saas-web-auth";
import NebulaSelection from "./components/NebulaSelection";
import "./App.css";
import type { NebulaChart } from "./types";

const qlik: QlikSaaSConnection = new QlikSaaSConnection(
    {
        webIntegrationId: config.qlikWebIntegrationId,
        tenantDomain: config.tenantDomain,
    },
    enigma,
    schema
);

const App: FC = () => {
    const [qlikInstance, setQlikInstance] = useState({} as EngineAPI.IApp);
    const [nebulaInstance, setNebulaInstance] = useState({} as NebulaChart);
    const [loading, setLoading] = useState(true);

    const establishConnection = useMemo(() => {
        const connection = async () => {
            const getQlik = await qlik.connectAndOpenDoc(config.appId);
            setQlikInstance(getQlik);

            const nebulaComponent = new NebulaCharts(qlik.app);
            return nebulaComponent.chart();
        };
        return connection();
    }, []);

    useEffect(() => {
        const getNebula = async () => {
            let nebulaChart = await establishConnection;

            setNebulaInstance(nebulaChart);
            setLoading(false);
        };
        setLoading(true);
        getNebula();
    }, []);
    if (loading) return <Spinner></Spinner>;

    return (
        <main>
            <div>
                <NebulaSelection nebula={nebulaInstance}></NebulaSelection>
            </div>
            <div>
                <NebulaComponent nebula={nebulaInstance} app={qlikInstance}></NebulaComponent>
            </div>
        </main>
    );
};

export default App;
