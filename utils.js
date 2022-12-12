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

const clickByPoint = (params) => {
  const elem = document.elementsFromPoint(params.x, params, y);
  const event = new MouseEvent(
    'click',
    {cx: params.cx, cy: params.cy}
  );
  elem.dispatchEvent(event);
}

// コンソール等で使えるようにする

let elem = document.createElement('script');
elem.type = 'text/javascript'; 
elem.innerText = `
const cq = ${checkQuery.toString()};
const cbs = ${clickBySelector.toString()};
const cbp = ${clickByPoint.toString()};
console.log('loaded.');
`;
document.head.appendChild(elem);
