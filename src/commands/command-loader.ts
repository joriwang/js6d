
import { Command } from 'commander';
import BareCommand from './bare/bare-command'

export default function loader(program: Command): void {
  new BareCommand().load(program);
}