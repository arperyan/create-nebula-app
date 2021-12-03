export type NebulaChart = {
    context?: () => {};
    field?: () => {};
    getRegisteredTypes?: () => {};
    render: ({}) => NebulaRender;
    selections: () => NebulaSelect;
    _DO_NOY_USE?: any;
};

export type NebulaRender = {
    destroy: () => {};
    id?: string;
    convertTo?: (type: string) => void;
    _DO_NOT_USE__?: {};
};

export type QlikEntity = {
    nebula: NebulaChart;
    app?: EngineAPI.IApp;
};

type NebulaSelect = {
    mount: (element: HTMLDivElement) => {};
};
