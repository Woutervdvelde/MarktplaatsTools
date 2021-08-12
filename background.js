const settings = {
  remove_website_ads: true,
  quick_preview: true,
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ settings });
  console.log("set settings:")
  console.log(settings);
});
