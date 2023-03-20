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

const copy = text => navigator.clipboard.writeText(text);

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const randInRange = (min, max) => {
  const diff = max - min;
  const randFloat = Math.random() * diff + min;
  return Math.trunc(randFloat);
}

const waitElemAppears = async query => {
  while (! document.querySelector(query)) {
    await sleep(1000);
  }
  return;
}

const funcsData = {
  cq: checkQuery,
  cbs: clickBySelector,
  cbp: clickByPoint,
  copy: copy,
  rr: randInRange,
  sleep: sleep
};
