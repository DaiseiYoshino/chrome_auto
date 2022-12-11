const cq = (query) => {
  const elemno = document.querySelectorAll(query);
  console.log('count: ' + elemno);
}

const clickBySelector = (selector) => {
  const elem = document.querySelector(selector);
  if (elem) {
    elem.click();
  } else {
    console.log('no element: ' + selector);
  }
}

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
      if (key in commands) {
        e.preventDefault();
        commands[key]()
      };
    });
  }
}
