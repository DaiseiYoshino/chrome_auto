/**
 * コンソール用にグローバル関数を仕込む機能のclass
 */
export class SetConsole {
  constructor(fileNames) {
    if (typeof fileNames == 'string') {
      this.fileNames = [fileNames];
    } else {// 文字列の配列以外が来ることは想定してない……
      this.fileNames = fileNames;
    }
  }

  /**
   * コードをscriptタグに仕込み、コンソール等で使えるようにする
   */
  inject() {
    for (const fileName of this.fileNames) {
      let elem = document.createElement('script');
      elem.type = 'text/javascript';
      elem.src = chrome.runtime.getURL(fileName);
      document.head.appendChild(elem);
    }
  }
};
