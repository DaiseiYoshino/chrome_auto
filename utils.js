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
