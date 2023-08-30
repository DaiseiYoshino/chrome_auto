// 関数類定義

export const addToStorage = (itemKey, obj) => {
  const storageKey = 'auto_logs';

  let item = JSON.parse(localStorage.getItem(storageKey));
  if (item == null) {
    item = {};
  }
  item[itemKey] = obj;
  
  localStorage.setItem(storageKey, JSON.stringify(item))
}

export const clickAfterElemAppears = async (selector) => {
  window.onload = (
    async () => {
      await waitElemAppears(selector);
      await sleep(randInRange(100, 1000));
      clickBySelector(selector);
    }
  )();
}

export const clickBySelector = (selector) => {
  const elem = document.querySelector(selector);
  if (elem) {
    elem.click();
  } else {
    console.log('no element: ' + selector);
  }
}

export const clickByPoint = (params) => {
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

export const copy = text => navigator.clipboard.writeText(text);

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const randInRange = (min, max) => {
  const diff = max - min;
  const randFloat = Math.random() * diff + min;
  return Math.trunc(randFloat);
}

export const waitElemAppears = async query => {
  while (! document.querySelector(query)) {
    await sleep(1000);
  }
  return;
}

export class FindQuerySelector {
  constructor(elem) {
    this.elem = elem;
    this.infoObj = {};
    return this;
  }

  setTag() {
    this.infoObj.tagName = this.elem.tagName;
  }

  setId() {
    const id = this.elem.id;
    if (id) {
      this.infoObj.id = id;
      console.log('Id set.');
    } else {
      console.log('No id.');
    }
  }

  info() {
    console.table({
      'id': this.elem.id
    });
  }

  toSelector() {
    return `${this.infoObj.tagName}${this.infoObj.id ? '#'+this.infoObj.id : ''}`;
  }
}
