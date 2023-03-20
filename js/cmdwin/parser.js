/**
 * コマンド用のパーサっぽいもの
 */
class CmdParser {
  constructor(funcs) {
    this.funcs = funcs;
  }

  /**
   * コマンドのパースを行い実行する
   * 
   * @param {string} cmdStr 
   * @returns {string}
   */
  do(cmdStr) {
    const cmdArr = cmdStr.split(' ');
    let tmpFunc = this.funcs;
    let cmdVars = [];

    for (const cmd of cmdArr) {
      if (typeof tmpFunc === 'function') {
        cmdVars.push(cmd);
        continue;
      }
  
      // なんか関数を指していると思われる場合
      if (tmpFunc[cmd]) {
        tmpFunc = tmpFunc[cmd];
      } else {// そもそも対象が存在しなかった場合
        return 'Command not found.';
      }
    }
  
    // parse結果の処理の実行
    return tmpFunc(...cmdVars);
  }
}
