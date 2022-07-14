import { Command } from 'commander';

export abstract class AbstractCommand {
  abstract load(program: Command): void;
}