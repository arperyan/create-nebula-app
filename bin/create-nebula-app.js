#!/usr/bin/env node
const inquirer = require("inquirer");

const builder = require("../src/index");

const choices = {
  yesNo: ["y", "N"],
  templates: ["Angular", "React", "Solid", "Svelte", "Vanilla", "Vue"],
  languages: ["JavaScript (WIP)", "TypeScript"],
  qlikEnvironments: ["SaaS", "Desktop", "Enterprise (QSEoW)"],
};

(async function () {
  console.log("Some short description here <---");
  console.log();

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
      choices: choices.templates,
      default: "Angular",
      filter: (a) => a.toLowerCase(),
    },
    {
      type: "list",
      message: "Language:",
      name: "language",
      choices: choices.languages,
      default: "JavaScript (WIP)",
      filter: (a) => {
        if (a == "TypeScript") return "ts";
        if (a.indexOf("JavaScript") > -1) return "js";
      },
    },
    {
      type: "list",
      message: "Qlik Environment:",
      name: "environment",
      choices: choices.qlikEnvironments,
      default: "SaaS",
      filter: (a) => {
        if (a == "Enterprise (QSEoW)") return "enterprise";
        return a.toLowerCase();
      },
    },
    {
      type: "confirm",
      message: "Virtual Proxy?",
      name: "virtualProxy",
      when: (answers) => answers.environment === "enterprise",
      choices: choices.yesNo,
      default: "N",
    },
    {
      type: "input",
      message: "Virtual Proxy name:",
      name: "virtualProxyName",
      when: (answers) => answers.virtualProxy,
      default: "abc",
    },
  ]);

  builder(answers);

  console.log(`Your '${answers.name}' project is ready to go.

Next steps:

▶️ cd ${answers.name}
▶️ npm install
▶️ update the config.sample and data.sample file
▶️ npm run dev
`);
})();
