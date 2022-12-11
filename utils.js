// 関数類定義

const checkQuery = (query) => {
  const elemno = document.querySelectorAll(query).length;
  return 'count: ' + elemno;
}

const clickBySelector = (selector) => {
  const elem = document.querySelector(selector);
  if (elem) {
    elem.click();
  } else {
    console.log('no element: ' + selector);
  }
}

// コンソール等で使えるようにする

let elem = document.createElement('script');
elem.innerText = `
const cq = ${checkQuery.toString()};
const cbs = ${clickBySelector.toString()};
`;
document.body.appendChild(elem);
