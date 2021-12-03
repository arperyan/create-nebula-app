import { onMount } from "solid-js";
import type { QlikEntity } from "../types";

const NebulaSelection = (props: QlikEntity) => {
    let elementRef!: HTMLDivElement;
    const { nebula, app } = props;

    onMount(() => {
        const run = async () => {
            (await nebula.selections()).mount(elementRef);
        };
        run();
    });

    return <div ref={elementRef}></div>;
};

export default NebulaSelection;
