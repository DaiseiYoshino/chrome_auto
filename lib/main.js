import {SetConsole} from './setConsole/setConsole.js';
import {CmdWin} from './cmdwin/createCmdWin.js';
import {CmdParser} from './cmdwin/parser.js';

export const run = async () => {
  let commands = {
    cmdWinFuncs: {},
    suggest: () => 'No suggestion.'
  }

  const setConsole = new SetConsole('lib/setConsole/basic.js');
  setConsole.inject();
  (new CmdWin(new CmdParser(commands.cmdWinFuncs))).run();

  console.log('\x1b[44Automation ready\nPress Ctrl+Shift to open command imput.');
  console.log(commands.suggest(location.href));
}
