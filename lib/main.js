import {SetConsole} from './setConsole/setConsole.js';
import {CmdWin} from './cmdwin/createCmdWin.js';
import {CmdParser} from './cmdwin/parser.js';
import {CommandFunc} from './CommandFunc.js';

async function loadModule(filename) {
  return await import(chrome.runtime.getURL(filename));
}

export const run = async (params) => {
  let userConsoles = [];
  if (!params.console) {
    userConsoles = [];
  } else if (typeof params.console == 'string') {
    userConsoles = [params.console];
  } else {
    userConsoles = params.console;
  }
  const setConsole = new SetConsole([
    'lib/setConsole/basic.js',
    ...userConsoles
  ]);
  setConsole.inject();

  let commands = new CommandFunc({
    description: 'No command set.',
    option: ''
  });
  if (!params.commands) {
    // 上書きしない
  } else if (typeof params.commands == 'string') {
    commands = (await loadModule(params.commands)).commands;
  } else {
    throw 'unexpected input.'
  }

  (new CmdWin(new CmdParser(commands.toCommandTree()))).run();

  console.log('\x1b[44Automation ready\nPress Ctrl+Shift to open command imput.');
  // console.log(commands.suggest(location.href));
}
