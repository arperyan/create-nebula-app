const util = require("util");
const fs = require("fs");
const glob = require("glob");
const degit = require("degit");

const baseRepository = "arperyan/create-nebula-app/templates";
const ncp = util.promisify(require("ncp").ncp);

const templateFile = (fileName, replacements) => {
  let contents = fs.readFileSync(fileName, "utf8").toString();

  Object.keys(replacements).forEach((key) => {
    contents = contents.replace(
      new RegExp(`(\{\{${key}\}\}|\{\{ ${key} \}\})`, "g"),
      replacements[key]
    );
  });

  fs.writeFileSync(fileName, contents);
};

const processAnswers = async ({
  language,
  framework,
  name,
  environment,
  virtualProxy,
  virtualProxyName,
}) => {
  const templateRepository = `${baseRepository}/${framework}/${language}`;

  const baseEmitter = degit(`${templateRepository}/base`, {
    cache: true,
    force: true,
    verbose: false,
  });

  const emitter = degit(`${templateRepository}/${environment}`, {
    cache: true,
    force: true,
    verbose: false,
  });

  let virtual;

  if (virtualProxy && framework !== "angular")
    virtual = `server: {  open: "/${virtualProxyName}" }`;
  if (virtualProxy && framework === "angular") virtual = virtualProxyName;

  const replacements = {
    NAME: name,
    FRAMEWORK: framework,
    SAFE_NAME: name.replace(/-/g, "_").trim(),
    LANGUAGE: language === "ts" ? "TypeScript" : "JavaScript",
    VP: virtual,
  };

  await baseEmitter.clone(`./${name}/base`);

  emitter
    .clone(`./${name}/${environment}`)
    .then(async () => {
      await ncp(`./${name}/base`, name);
      await ncp(`./${name}/${environment}`, name);

      glob.sync(`${name}/**/*`).forEach((file) => {
        if (fs.lstatSync(file).isFile()) {
          templateFile(file, replacements);
        }
      });

      fs.rmSync(`./${name}/base`, { recursive: true, force: true });
      fs.rmSync(`./${name}/${environment}`, { recursive: true, force: true });
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = processAnswers;
