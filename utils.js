// 関数類定義

const addToStorage = (itemKey, obj) => {
  const storageKey = 'auto_logs';

  let item = JSON.parse(localStorage.getItem(storageKey));
  if (item == null) {
    item = {};
  }
  item[itemKey] = obj;
  
  localStorage.setItem(storageKey, JSON.stringify(item))
}

const checkQuery = (query) => {
  const elemno = document.querySelectorAll(query).length;
  return 'count: ' + elemno;
}

const clickAfterElemAppears = async (selector) => {
  window.onload = (
    async () => {
      await waitElemAppears(selector);
      await sleep(randInRange(100, 1000));
      clickBySelector(selector);
    }
  )();
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
  const elem = document.elementsFromPoint(params.x, params.y);
  const event = new MouseEvent(
    'click',
    {
      bubbles: true,
      clientX: params.x,
      clientY: params.y
    }
  );
  elem.dispatchEvent(event);
}

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const randInRange = (min, max) => {
  const diff = max - min;
  const randFloat = Math.random * diff + min;
  return Math.trunc(randFloat);
}

const waitElemAppears = async query => {
  while (! document.querySelector(query)) {
    await sleep(1000);
  }
  return;
}

// コンソール等で使えるようにする

let elem = document.createElement('script');
elem.type = 'text/javascript'; 
elem.innerText = `
const cq = ${checkQuery.toString()};
const cbs = ${clickBySelector.toString()};
const cbp = ${clickByPoint.toString()};
const rr = ${randInRange.toString()};
const sleep = ${sleep.toString()};
console.log('loaded.');
`;
document.head.appendChild(elem);
