export const barPlugin = {
    info: {
        name: "bar-plugin",
        type: "component-definition",
    },
    fn: ({ layout, keys }) => {
        const componentDefinition = {
            type: "box",

            // Provide the same name as the exisiting line component to override it
            key: keys.COMPONENT.BAR,
            settings: {
                box: { width: 0.4, stroke: "red", strokeWidth: 10 },
            },
        };
        return componentDefinition;
    },
};
