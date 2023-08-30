
(async () => {
  const main = (await import(chrome.runtime.getURL('lib/main.js')));
  main.run();
})()