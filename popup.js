const toggleControl = document.getElementById('toggle-control');

// Load the toggle state from storage
chrome.storage.sync.get(['mediaControlEnabled'], (result) => {
  toggleControl.checked = result.mediaControlEnabled || false;
});

// Save the toggle state to storage
toggleControl.addEventListener('change', () => {
  chrome.storage.sync.set({ mediaControlEnabled: toggleControl.checked });
});