// 関数リスト定義
const cmdWinFuncs = {
  f1: () => 'Function f1 called.',
  f2: (text) => `Input is ${text}`,
  fs: {
    a: () => 'Fs a called.',
    b: (v1, v2) => `Input is ${v1}, ${v2}`
  }
};

// パーサの定義
const cmdParser = (funcs, cmdStr) => {
  const cmdArr = cmdStr.split(' ');
  let tmpFunc = funcs;
  let cmdVars = [];
  for (cmd of cmdArr) {
    // そもそも実行関数が確定している時は、実行時の引数に入れる
    if (typeof tmpFunc === 'function') {
      cmdVars.push(cmd);
      continue;
    }

    // なんか関数を指していると思われる場合
    if (f = tmpFunc[cmd]) {
      tmpFunc = f;
    } else {// そもそも対象が存在しなかった場合
      return 'Command not found.';
    }
  }

  // parse結果の処理の実行
  return tmpFunc(...cmdVars);
};

// 起動設定の外出し
const isShiftCtrl = (e) => {
  if (!e.shiftKey) return false;
  if (!e.ctrlKey) return false;
  return ['Shift', 'Control'].includes(e.key);
};

/**
 * コマンド窓を作ったり云々なクラス
 */
class CmdWin {
  constructor(funcs, parser) {
    this.funcs = funcs;
    this.parser = parser;
  }

  /**
   * スタイルの記述を簡便にしたい為に作った関数
   *
   * @param {String} styleText 
   * @returns {String}
   */
  styleMaker(styleText) {
    return styleText
      .replace(/^\n/, '')// コードの見栄え良くしようとすると、これ対応しないといけない
      .replace(/(?<!;)\n/g, ';')// 「;」のない改行対策
      .replace(/[\s\n]/g, '');// minifyっぽいこと
  }

  createCmdRoot() {
    const cmdRootStyle = `
      background: #222
      color: #008
      position: fixed
      bottom: -1px
      right: 25%
      width: 25%
      height: 100px
      visibility: hidden
    `;

    this.cmdRoot = document.body.appendChild(document.createElement('div'));
    this.cmdRoot.style = this.styleMaker(cmdRootStyle);
  }

  createCmdInput() {
    this.cmdInput = this.cmdRoot.appendChild(document.createElement('input'));

    this.cmdInput.addEventListener('keydown', (e) => {
      // Enterでなければ何もしない
      if (e.key !== 'Enter') return;

      this.cmdInput.value = this.parser(this.funcs, this.cmdInput.value);
    }, true);
  }

  windowSetting() {
    window.addEventListener('keydown', (e) => {
      if (!isShiftCtrl(e)) return;

      const cmdIsVisible = this.cmdRoot.style.visibility === 'visible';
      if (cmdIsVisible) {
        this.cmdRoot.style.visibility = 'hidden';
      } else {
        this.cmdRoot.style.visibility = 'visible';
        this.cmdInput.focus();
      }
    }, true);
  }

  run() {
    this.createCmdRoot();
    this.createCmdInput();
    this.windowSetting();
  }
}

(new CmdWin(cmdWinFuncs, cmdParser)).run();
