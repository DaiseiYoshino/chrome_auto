// script要素に仕込めるようにする
const toScript = (funcObj) => {
  let ret = '';
  for (key in funcObj) {
    ret += `const ${key} = ${funcObj[key]};\n`;
  }
  return ret;
}

// scriptタグに仕込み、コンソール等で使えるようにする

let elem = document.createElement('script');
elem.type = 'text/javascript'; 
elem.innerText = toScript(funcsData);
document.head.appendChild(elem);

