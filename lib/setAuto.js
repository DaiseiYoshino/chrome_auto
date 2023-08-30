const data = {}

// 設定されている各データについてループを回す
for (const d of data) {
  // データの対象URLに引っかかった1つ目について対応する処理を行う
  if (document.location.href.match(d.url)) {

    // キー入力コマンドの設定
    const commands = d.commands
    if (commands) {
      document.addEventListener('keypress', (e) => {
        const key = e.key;
        if (key in commands) {
          e.preventDefault();
          commands[key]()
        };
      });
    }

    // 自動実行関数があれば実行する
    if (d.auto) {
      d.auto();
    }

    break;
  }
}
