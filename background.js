let lastMediaTab = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.get(['mediaControlEnabled'], (result) => {
      if (result.mediaControlEnabled) {
        chrome.tabs.sendMessage(tabId, { action: 'checkMedia' });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'mediaPlaying') {
    if (lastMediaTab && lastMediaTab !== sender.tab.id) {
      chrome.tabs.sendMessage(lastMediaTab, { action: 'pauseMedia' });
    }
    lastMediaTab = sender.tab.id;
  }
});