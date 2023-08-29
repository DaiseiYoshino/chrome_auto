(async () => {
  let commands = {
    cmdWinFuncs: {},
    suggest: () => 'No suggestion.'
  }

  (new SetConsole()).run();
  (new CmdWin(new CmdParser(commands.cmdWinFuncs))).run();

  console.log('\x1b[44Automation ready\nPress Ctrl+Shift to open command imput.');
  console.log(commands.suggest(location.href));
})()
