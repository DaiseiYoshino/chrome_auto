/**
 * コンソール用にグローバル関数を仕込む機能のclass
 */
class SetConsole {
  constructor(funcObj) {
    this.funcObj = funcObj;
  }

  /**
   * 関数のオブジェクトからスクリプトを生成する
   * 
   * @param {Record<string, Function>} funcObj 関数とその名前の対応
   * @returns {String}
   */
  toScript(funcObj) {
    let ret = '';
    for (const key in funcObj) {
      ret += `const ${key} = ${funcObj[key]};\n`;
    }
    return ret;
  }

  /**
   * コードをscriptタグに仕込み、コンソール等で使えるようにする
   */
  run() {
    let elem = document.createElement('script');
    elem.type = 'text/javascript';
    elem.innerText = this.toScript(this.funcObj);
    document.head.appendChild(elem);
  }
};

(new SetConsole(funcsData)).run();
