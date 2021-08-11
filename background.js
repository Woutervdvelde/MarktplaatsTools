const settings = {
  remove_website_ads: false,
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ settings });
  console.log(`set settings: `)
  console.log(settings);
});
