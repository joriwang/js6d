import Path from 'path';
import { Command } from 'commander';
import inquirer from "inquirer";
import { AbstractCommand } from '../abstract-command';
import { Environment, InfoWrapper, Language } from "./common";
import createProject from './create-project';

export default class BareProjectCommand extends AbstractCommand {
  load(program: Command): void {
    program.command('bare <path>')
      .description('create a project with webpack')
      .action(function (path) {
        inquirer.prompt(makeQuestions()).then(anwsers => {
          return confirmPromot(new InfoWrapper(anwsers, path));
        }).then(info => {
          if (!info) return;
          doCreateProject(info)
        });
      });
  }
}

function makeQuestions(): any[] {
  let list:any[] = [
    {
      type: "input",
      name: "projectName",
      message: "input project name:",
    },
    {
      type: "input",
      name: "version",
      message: "input version code:",
      default: "0.0.1",
    },
    {
      type: "rawlist",
      name: "language",
      message: "choose programming language:",
      choices: [Language.js.toString(), Language.ts.toString()],
      default: 0,
    },
    {
      type: "rawlist",
      name: "environment",
      message: "environment:",
      choices: [
        Environment.web.toString(),
        Environment.node.toString()
      ],
      default: 0,
    },
  ];
  return list;
}

function confirmPromot(info: InfoWrapper): Promise<InfoWrapper|undefined> {
  let payload = `\nproject-name: ${info.projectName}\n     version: ${info.version}\n    language: ${info.language}\n`;
  console.log(payload);
  
  return inquirer
    .prompt([
      {
        type: "confirm",
        name: "isConfirm",
        message: "continue?",
        default: true,
      },
    ]).then((confirmAnswer) => {
      if (!confirmAnswer.isConfirm) return;
      return info;
    });
}

function doCreateProject(info: InfoWrapper): void {
  createProject(info);
}
