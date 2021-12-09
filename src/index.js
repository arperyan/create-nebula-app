const util = require("util");
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ncp = util.promisify(require("ncp").ncp);

const templateFile = (fileName, replacements) => {
    let contents = fs.readFileSync(fileName, "utf8").toString();
    Object.keys(replacements).forEach((key) => {
        contents = contents.replace(new RegExp(`(\{\{${key}\}\}|\{\{ ${key} \}\})`, "g"), replacements[key]);
    });
    fs.writeFileSync(fileName, contents);
};

// Options:
//   - type: "Application", "Library", "Server"
//   - name: Name of the project
//   - framework: Name of the framework
//   - language: Language of the project

module.exports = async ({ language, framework, name, environment, virtualproxy, virtualproxyname }) => {
    const lang = language === "typescript" ? "ts" : "js";

    const replacements = {
        NAME: name,
        FRAMEWORK: framework,
        SAFE_NAME: name.replace(/-/g, "_").trim(),
        LANGUAGE: language === "typescript" ? "TypeScript" : "JavaScript",
        VP: virtualproxy ? `server: {  open: "/${virtualproxyname}" }` : "",
    };
    console.log(replacements.VP);
    await ncp(path.join(__dirname, `../templates/${framework}/base`), name);
    await ncp(path.join(__dirname, `../templates/${framework}/${lang}/base`), name);
    await ncp(path.join(__dirname, `../templates/${framework}/${lang}/${environment}`), name);

    glob.sync(`${name}/**/*`).forEach((file) => {
        if (fs.lstatSync(file).isFile()) {
            templateFile(file, replacements);
        }
    });
};
