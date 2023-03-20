/**
 * コマンド用のパーサっぽいもの
 */
class CmdParser {
  constructor(funcs) {
    this.funcs = funcs;
  }

  // コマンドを関数とパラメータに分離する
  splitFuncPart(cmdArr) {
    let tmpFunc = this.funcs;
    let cmdVars = [];
    for (const cmd of cmdArr) {
      if (typeof tmpFunc === 'function') {
        cmdVars.push(cmd);
        continue;
      }

      // cmdが関数を指してるっぽい場合
      if(tmpFunc[cmd]) {
        tmpFunc = tmpFunc[cmd];
      } else {// そもそも対象が存在しなかった場合
        return {
          f: () => 'Command not found.',
          vars: []
        };
      }
    }

    return {
      f: tmpFunc,
      vars: cmdVars
    };
  }

  /**
   * コマンドのパースを行い実行する
   * 
   * @param {string} cmdStr 
   * @returns {string}
   */
  do(cmdStr) {
    const cmdArr = cmdStr.split(' ');

    const parseResult = this.splitFuncPart(cmdArr);
  
    // parse結果の処理の実行
    return parseResult.f(...parseResult.vars);
  }
}
