import { createEffect, onCleanup, onMount } from "solid-js";
import type { QlikEntity, NebulaRender } from "../types";
import { fields } from "../util/data.sample";
import styles from "./nebulabar.module.css";

const NebulaBar = (props: QlikEntity) => {
    let elementRef!: HTMLDivElement;
    let renderNebbie: NebulaRender;
    const { nebula, app } = props;

    onMount(() => {
        const getNebula = async () => {
            renderNebbie = await nebula.render({
                element: elementRef,
                type: "bar",
                //id: "",  //Qlik Object ID
                fields: fields,
                properties: {
                    title: "Nebula",
                },
            });
        };

        getNebula();
    });

    onCleanup(() => {
        console.log("destroy");
        renderNebbie.destroy();
    });

    return (
        <div class={styles.container}>
            <h1>Starter Project</h1>
            <div class={styles.object} ref={elementRef} />
        </div>
    );
};

export default NebulaBar;
