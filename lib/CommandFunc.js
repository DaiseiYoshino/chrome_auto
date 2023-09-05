export class CommandFunc {
  /**
   * コンストラクタ
   * @param {description: string?, option: string, func: ((string) => string) | null} param 
   */
  constructor(param) {
    this.description = param.description ?? 'No description.';
    this.option = param.option;// 内部に入れたくない……
    this.func = param.func ?? function(){return this.description};

    this.subcommands = {};
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
    this.subcommands[command.option] = command;
    return this;
  }

  /**
   * 子コマンドを複数追加する
   * 
   * @param {[string]: CommandFunc} commands
   * @returns {this}
   */
  addCommands(commands) {
    this.subcommands = {
      ...this.subcommands,
      ...commands
    };
    return this;
  }

  /**
   * コマンド用のツリーを生成する
   *
   * @param {string} rootCmd
   * @returns {{description: string, func:(string) => string, [key:string]: any}}
   */
  toCommandTree(rootCmd, myOption) {
    let tree = {};
    tree.description = (rootCmd ? rootCmd + ' ' : '') + ' : ' + this.description;
    tree.func = this.func;
    for (const option in this.subcommands) {
      const thisCmd = (rootCmd ? rootCmd + ' ' : '') + option;
      tree[option] = this.subcommands[option].toCommandTree(thisCmd, option);
    }
    return tree;
  }

  suggest(href, rootCmd, myOption) {
    if (! this.canUseHere(href)) return '';
    let retStr = ''
    const thisCmd = (rootCmd ? rootCmd + ' ':  '') + (myOption ?? '');
    if (this.subcommands.length == 0) {
      return thisCmd + ' : ' + this.description + '\n';
    }
    for (const option in this.subcommands) {
      retStr += this.subcommands[option].suggest(href, thisCmd, option);
    }
    return retStr;
  }
};
