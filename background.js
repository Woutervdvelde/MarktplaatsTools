const defaultValues = {
  color: "A4A4A",
}
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: defaultValues.color });
});
