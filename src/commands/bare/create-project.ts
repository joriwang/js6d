import Path from "path";
import FS from "fs-extra"; 
import EJS from "ejs";
import { InfoWrapper, Language } from "./common";

export default async function createProject(info: InfoWrapper) {
  let path = Path.resolve(info.path);
  await FS.copy(Path.resolve(Path.join(__dirname, "../templates/node")), path, {
    recursive: true
  });

  // prpare ejs
  let packageTemplatePath = Path.join(path, "package.ejs");
  let packagePath = Path.join(path, "package.json");
  let webpackConfigTemplatePath = Path.join(path, "webpack.config.ejs");
  let webpackConfigPath = Path.join(path, "webpack.config.js");

  // render and write to file
  let packageContent = await EJS.renderFile(packageTemplatePath, info);
  await FS.writeFile(packagePath, packageContent)
  let webpackConfigContent = await EJS.renderFile(webpackConfigTemplatePath, info);
  await FS.writeFile(webpackConfigPath, webpackConfigContent);

  // delete template
  await FS.unlink(packageTemplatePath);
  await FS.unlink(webpackConfigTemplatePath);
  if (info.language === Language.js) {
    await FS.unlink(Path.join(path, "src/index.ts"));
    await FS.unlink(Path.join(path, "tsconfig.json"));
  } else if (info.language === Language.ts) {
    await FS.unlink(Path.join(path, "src/index.js"));
  }
}