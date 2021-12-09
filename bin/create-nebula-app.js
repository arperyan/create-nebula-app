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
            default: "my-app",
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
            choices: ["javascript (WIP)", "typescript"],
            default: "javascript",
        },
        {
            type: "list",
            message: "Qlik Env:",
            name: "environment",
            choices: ["saas", "desktop", "enterprise"],
            default: "saas",
        },
        {
            type: "confirm",
            message: "Virtual Proxy?",
            name: "virtualproxy",
            when: (answers) => answers.environment === "enterprise",
            choices: ["y", "N"],
            default: "N",
        },
        {
            type: "input",
            message: "Virtual Proxy name:",
            name: "virtualproxyname",
            when: (answers) => answers.virtualproxy,
            default: "abc",
        },
    ]);

    builder({
        ...answers,
    });

    shell.echo(`Your '${answers.name}' project is ready to go.

Next steps:

▶️ cd ${answers.name}
▶️ npm install
▶️ update the config.sample and data.sample file
▶️ npm run dev
`);
})();
