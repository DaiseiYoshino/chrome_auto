const data = [
  {
    url: "https://*/*",
    commands: {
      'x': () => console.log('key x pressed')
    }
  }
]

for (const d of data) {
  if (document.location.href.match(d.url)) {
    const commands = d.commands
    document.addEventListener('keypress', (e) => {
      const key = e.key;
      if (key in commands) commands[key]();
    });
  }
}
