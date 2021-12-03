const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
    plugins: [
        postcssPresetEnv({
            stage: 1,
            autoprefixer: {
                grid: true,
            },
        }),
    ],
};
