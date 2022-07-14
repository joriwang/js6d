export interface ProjectInfoAnswer {
  projectName: string;
  version: string;
  language: string;
  environment: string;
}

export class InfoWrapper implements ProjectInfoAnswer {
  path: string;
  projectName: string;
  version: string;
  language: Language;
  environment: Environment;

  constructor(info: ProjectInfoAnswer, path: string) {
    this.projectName = info.projectName;
    this.version = info.version;
    this.language = info.language as Language;
    this.environment = info.environment as Environment;
    this.path = path;
  }
}

export enum Language {
  js = "JS",
  ts = "TS",
}

export enum Environment {
  node = "node",
  web = "web"
}