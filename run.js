
(async () => {
  const main = await import(chrome.runtime.getURL('lib/main.js'));
  main.run({
    console: ['usr/console-example.js'],
    commands: 'usr/command-example.js'
  });
})()