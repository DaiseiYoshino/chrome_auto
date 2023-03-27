/*
  参考:
    https://github.com/folletto/Blipshot/blob/master/screenshotter.js
    https://github.com/bobbyrne01/save-text-to-file-chrome/tree/master/addon
*/

const getScreenShot = (filename) => {
  // グローバル変数的なもの
  let imageDataUrl = '';

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

  // 保存
  chrome.downloads.download(
    {
      filename: filename,
      url: imageDataUrl
    },
    () => {
      return;
    }
  )

  return 'File saved.'
}
