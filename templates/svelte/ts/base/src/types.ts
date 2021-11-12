export type Nebula = {
    render: Function;
};
export type QlikInstance = {
    nebula: Nebula;
    app: EngineAPI.IApp;
};

export type LineRow = {
    value: string;
    baseColor: {
        color: string;
    };
};

export type RowObject = {
    domain: string;
    color: string;
};

interface ColorMap {
    colorMap?: {
        colors: LineRow[];
    };
}

export type EngineAPILayoutColor = EngineAPI.IGenericBaseLayout & ColorMap;
