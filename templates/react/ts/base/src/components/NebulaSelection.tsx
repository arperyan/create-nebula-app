import { FC, useEffect, useRef } from "react";
import type { NebulaChart } from "../types";

const NebulaSelection: FC<{ nebula: NebulaChart }> = ({ nebula }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!nebula) return;
        const run = async () => {
            (await nebula.selections()).mount(elementRef.current!);
        };
        run();
    }, [nebula]);

    return <div className="toolbar" ref={elementRef}></div>;
};

export default NebulaSelection;
