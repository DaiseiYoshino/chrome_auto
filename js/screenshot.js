/*
  参考: https://github.com/folletto/Blipshot/blob/master/screenshotter.js
*/

const getScreenShot = () => {
  let shared = {
    imageDirtyCutAt: 0,
    imageDataURL: 0,
    originalScrollTop: 0,
    tab: {
      id: 0,
      url: '',
      title: '',
      hasVscrollbar: false
    }
  };
  // 現在のタブ情報を取得
  chrome.windows.getCurrent((win) => {
    chrome.tabs.query(
      {active: true, windowID: win.id},
      (tabs) => {
        shared.tab = tabs[0];
      }
    );
  });

  // スクショ開始
  chrome.tabs.sendMessage(
    tabData.id,
    {
      action: 'screenshotBegin',
      shared: shared
    }
  );
}
