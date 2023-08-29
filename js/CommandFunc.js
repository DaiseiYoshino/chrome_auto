export class CommandFunc {
  /**
   * コンストラクタ
   * @param {description: string?, option: string, func: ((string) => string) | null} param 
   */
  constructor(param) {
    this.description = param.description ?? 'No description.';
    this.option = param.option;
    this.func = param.func ?? function(){return this.description};

    this.subcommands = [];
    this.canUseHere = (href) => true;
  }

  /**
   * どこで使えるかをURLに対する正規表現を基に設定する
   *
   * @param {RegExp} expression 
   */
  useWhenMatch(expression) {
    this.canUseHere = (href) => expression.test(href);
    return this;
  }

  /**
   * 子コマンドを追加する
   *
   * @param {CommandFunc} command
   * @returns {this}
   */
  addCommand(command) {
    this.subcommands.push(command);
    return this;
  }

  /**
   * コマンド用のツリーを生成する
   *
   * @param {string} rootCmd
   * @returns {{description: string, func:(string) => string, [key:string]: any}}
   */
  toCommandTree(rootCmd) {
    let tree = {};
    const thisCmd = (rootCmd ?? '') + ' ' + this.option;
    tree.description = thisCmd + ' : ' + this.description;
    tree.func = this.func;
    for (const cmd of this.subcommands) {
      tree[cmd.option] = cmd.toCommandTree(thisCmd);
    }
    return tree;
  }
};
