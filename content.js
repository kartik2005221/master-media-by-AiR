let mediaElements = Array.from(document.querySelectorAll('audio, video'));

function pauseAllMediaExcept(current) {
  mediaElements.forEach((media) => {
    if (media !== current && !media.paused) {
      media.pause();
    }
  });
}

function monitorMedia() {
  mediaElements.forEach((media) => {
    media.addEventListener('play', () => {
      chrome.runtime.sendMessage({ action: 'mediaPlaying' });
      pauseAllMediaExcept(media);
    });

    media.addEventListener('pause', () => {
      const isAnyPlaying = mediaElements.some((m) => !m.paused);
      if (!isAnyPlaying) {
        chrome.runtime.sendMessage({ action: 'noMediaPlaying' });
      }
    });
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'checkMedia') {
    mediaElements = Array.from(document.querySelectorAll('audio, video'));
    monitorMedia();
  } else if (message.action === 'pauseMedia') {
    pauseAllMediaExcept(null);
  }
});

monitorMedia();