(async () => {
  const SetConsole = (await import(chrome.runtime.getURL('lib/setConsole/setConsole.js'))).SetConsole;
  const CmdWin = (await import(chrome.runtime.getURL('lib/cmdwin/createCmdWin.js'))).CmdWin;
  const CmdParser = (await import(chrome.runtime.getURL('lib/cmdwin/parser.js'))).CmdParser;

  let commands = {
    cmdWinFuncs: {},
    suggest: () => 'No suggestion.'
  }

  const setConsole = new SetConsole('lib/setConsole/basic.js');
  setConsole.inject();
  (new CmdWin(new CmdParser(commands.cmdWinFuncs))).run();

  console.log('\x1b[44Automation ready\nPress Ctrl+Shift to open command imput.');
  console.log(commands.suggest(location.href));
})()
