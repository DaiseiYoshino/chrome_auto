/*
  参考:
    https://github.com/folletto/Blipshot/blob/master/screenshotter.js
    https://github.com/bobbyrne01/save-text-to-file-chrome/tree/master/addon
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
  let imageDataUrl = '';
  // 現在のタブ情報を取得
  chrome.windows.getCurrent((win) => {
    chrome.tabs.query(
      {active: true, windowID: win.id},
      (tabs) => {
        shared.tab = tabs[0];
      }
    );
  });

  // スクショ
  chrome.tabs.captureVisibleTab(
    null,
    {
      format: 'png',
      quality: 70
    },
    (dataUrl) => {
      imageDataUrl = dataUrl;
    }
  );
}
