#!/usr/bin/env node
const inquirer = require("inquirer");
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

const builder = require("../src/index");

const templates = fs.readdirSync(path.join(__dirname, "../templates")).sort();

(async function () {
    const answers = await inquirer.prompt([
        {
            type: "input",
            message: "Pick the name of your app:",
            name: "name",
            default: "host",
        },
        {
            type: "list",
            message: "Framework:",
            name: "framework",
            choices: templates,
            default: "svelte",
        },
        {
            type: "list",
            message: "Language:",
            name: "language",
            choices: ["javascript", "typescript"],
            default: "javascript",
        },
        {
            type: "list",
            message: "Qlik Env:",
            name: "environment",
            choices: ["saas", "desktop"],
            default: "saas",
        },
        {
            type: "input",
            message: "Theme Color:",
            name: "theme",
            default: "#00B4AB",
        },
    ]);

    builder({
        ...answers,
    });

    shell.echo(`Your '${answers.name}' project is ready to go.

Next steps:

▶️ cd ${answers.name}
▶️ npm install
▶️ update the src/config file
▶️ npm run dev
`);
})();