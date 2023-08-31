/**
 * コマンド用のパーサっぽいもの
 */
export class CmdParser {
  constructor(funcs) {
    this.funcs = funcs;
  }

  /**
   * コマンドのパースを行い実行する
   * 
   * @param {string} cmdStr 
   * @returns {string}
   */
  async do(cmdsStr) {
    const cmdStrs = cmdsStr.split('|');
    let result = '';
    for (const cmdStr of cmdStrs) {// パイプで繋がれた各コマンドを逐次処理する
      const cmdArr = cmdStr
        .replace(/^\s+|\s+$/g, '')// 前後にスペースあるとバグる
        .replace(/\s+/g, ' ')// スペース複数あるとバグる
        .split(' ');
  
      let tmpFunc = this.funcs;
      let cmdVars = result ? [result] : [];// 予め第一引数に前の結果を入れておく
      for (const cmd of cmdArr) {// 各コマンドの処理

        if (tmpFunc[cmd]) {// 該当するコマンドがある時
          tmpFunc = tmpFunc[cmd];
        } else if (tmpFunc.func) {// 該当するコマンドが無いが、コマンドの引数の形式となっている時
          cmdVars.push(cmd);
        } else {// そんなコマンドない時
          return `${cmdStr} : Command not found.`;
        }
      }
      
      if (tmpFunc.func) {
        result = await tmpFunc.func(...cmdVars);
      } else {
        return `${cmdStr} : Command not found.`;
      }
    }
    // 最終結果が返される
    return result;
  }
}
