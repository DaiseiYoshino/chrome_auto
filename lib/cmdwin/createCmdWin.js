// 起動設定の外出し
const isShiftCtrl = (e) => {
  if (!e.shiftKey) return false;
  if (!e.ctrlKey) return false;
  return ['Shift', 'Control'].includes(e.key);
};

/**
 * コマンド窓を作ったり云々なクラス
 */
export class CmdWin {
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
      right: 5%
      width: 50%
      height: 100px
      visibility: hidden
    `;

    this.cmdRoot = document.body.appendChild(document.createElement('div'));
    this.cmdRoot.style = this.styleMaker(cmdRootStyle);
  }

  createCmdInput() {
    this.cmdInput = this.cmdRoot.appendChild(document.createElement('input'));
    this.cmdInput.style = this.styleMaker(`
      position: relative
      width: 95%
      top: 5%
      background-color: #444
      color: #0ff
    `);

    this.cmdInput.addEventListener('keydown', async (e) => {
      // Enterでなければ何もしない
      if (e.key !== 'Enter') return;

      this.result.innerText = await this.parser.do(this.cmdInput.value);
      this.cmdInput.value = '';
    }, true);
  }

  createResultText() {
    this.result = this.cmdRoot.appendChild(document.createElement('span'));

    this.result.style = this.styleMaker(`
      color: #00ff00
      position: relative
      float: left
      top: 10%
      left: 5%
    `);
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
    this.createResultText();
    this.windowSetting();
  }
}
