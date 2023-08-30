import {SetConsole} from './setConsole/setConsole.js';
import {CmdWin} from './cmdwin/createCmdWin.js';
import {CmdParser} from './cmdwin/parser.js';
import {CommandFunc} from './CommandFunc.js';

async function loadModule(filename) {
  return await import(chrome.runtime.getURL(filename));
}

function switchTypeIs(input, whenFalsy, whenString, whenArray, whenOthers) {
  if (!input) {
    return whenFalsy;
  } else if (typeof input == 'string') {
    return whenString;
  } else if (Array.isArray(input)) {
    return whenArray;
  } else {
    return whenOthers;
  }
}

async function setConsole(filenames) {
  const injection = switchTypeIs(
    filenames,
    [],
    [filenames],
    filenames,
    undefined
  );

  new SetConsole([
    'lib/setConsole/basic.js',
    ...injection
  ]).inject();
}

async function setCommands(filename) {
  const injection = switchTypeIs(
    filename,
    new CommandFunc({
      description: 'No command set.',
      option: ''
    }),
    (await loadModule(filename)).commands,
  );

  if (!injection) throw 'unexpected input.';

  return injection;
}

export const run = async (params) => {
  await setConsole(params.console);

  const commands = await setCommands(params.commands);

  (new CmdWin(new CmdParser(commands.toCommandTree()))).run();

  console.log('\x1b[44Automation ready\nPress Ctrl+Shift to open command imput.');
  // console.log(commands.suggest(location.href));
}
