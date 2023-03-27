// 関数リスト定義
const cmdWinFuncs = {
  f1: () => 'Function f1 called.',
  f2: (text) => `Input is ${text}`,
  fs: {
    a: () => 'Fs a called.',
    b: (v1, v2) => `Input is ${v1}, ${v2}`
  },
  ss: getScreenShot
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
  constructor(parser) {
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

      this.cmdInput.value = this.parser.do(this.cmdInput.value);
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

(new CmdWin(new CmdParser(cmdWinFuncs))).run();
