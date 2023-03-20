/*
  便利関数パート
 */

// style用の文字列をいい感じに作成してくれる関数
const styleMaker = (styleText) => {
  return styleText
    .replace(/^\n/, '')// コードの見栄え良くしようとすると、これ対応しないといけない
    .replace(/(?<!;)\n/g, ';')// 「;」のない改行対策
    .replace(/[\s\n]/g, '');// minifyっぽいこと
};

/*
  実体生成パート
*/

// コマンド欄の実体を作成する
const cmdWin = document.body.appendChild(document.createElement('div'));

console.log(styleMaker(`
  background: #222
  color: #008
  position: fixed
  bottom: -1px
  right: 25%
  width: 25%
  height: 100px
  visibility: hidden
`));

// スタイルを設定する
cmdWin.style = styleMaker(`
  background: #222
  color: #008
  position: fixed
  bottom: -1px
  right: 25%
  width: 25%
  height: 100px
  visibility: hidden
`);

// 使える関数を設定する
Object.assign(cmdWin, {
  funcs: {
    f1: () => 'Function f1 called.',
    f2: (text) => `Input is ${text}`,
    fs: {
      a: () => 'Fs a called.',
      b: (v1, v2) => `Input is ${v1}, ${v2}`
    }
  }
});

// コマンド入力欄の実体を作成する
const cmdInput = cmdWin.appendChild(document.createElement('input'));

// Enter押した時の挙動を記述
cmdInput.addEventListener('keydown', (e) => {
  // Enterでなければ何もしない
  if (e.key !== 'Enter') return;

  //入力のparseとか
  const cmdArr = cmdInput.value.split(' ');
  let tmpFunc = cmdWin.funcs;
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
    } else {
      cmdInput.value = 'Command not found.';
      return;// 処理全体の早期return
    }

    // parse結果の処理の実行
    cmdInput.value = tmpFunc(...cmdVars);
  }
}, true);

/*
  ページに起動設定等するパート
*/

// 起動設定の外出し
const isShiftCtrl = (e) => {
  if (!e.shiftKey) return false;
  if (!e.ctrlKey) return false;
  return ['Shift', 'Control'].includes(e.key);
};

window.addEventListener('keydown', (e) => {
  if (!isShiftCtrl(e)) return;

  const cmdIsVisible = cmdWin.style.visibility === 'visible';
  if (cmdIsVisible) {
    cmdWin.style.visibility = 'hidden';
  } else {
    cmdWin.style.visibility = 'visible';
    cmdInput.focus();
  }
}, true);
