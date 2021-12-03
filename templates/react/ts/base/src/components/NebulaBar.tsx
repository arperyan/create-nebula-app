import { FC, useEffect, useRef } from "react";
import type { NebulaRender, NebulaChart } from "../types";
import { fields } from "../util/data.sample";
import styles from "./nebulabar.module.css";

const NebulaBar: FC<{ nebula: NebulaChart; app: EngineAPI.IApp }> = ({ nebula, app }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!nebula && !app) return;
        let renderNebbie: NebulaRender;

        const getNebula = async () => {
            renderNebbie = await nebula.render({
                element: elementRef.current,
                type: "bar",
                //id: "",  //Qlik Object ID
                fields: fields,
                properties: {
                    title: "Nebula",
                },
            });
        };

        getNebula();

        return () => {
            if (!renderNebbie) return;
            console.log("destroyed");
            renderNebbie.destroy();
        };
    }, [nebula, app]);

    return (
        <div className={styles.container}>
            <h1>Starter Project</h1>
            <div className={styles.object} ref={elementRef} />
        </div>
    );
};

export default NebulaBar;
