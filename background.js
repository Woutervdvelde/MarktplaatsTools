const settings = {
  remove_website_ads: true,
  quick_preview: true,
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ settings });
  console.log("set settings:")
  console.log(settings);

  chrome.contextMenus.create({id: "MTSearch", contexts: ['selection'], title: "Zoek op Marktplaats"}, ()=>{} );
});

const searchMarktplaats = (query) => {
  const baseUrl = "https://www.marktplaats.nl/q/"
  chrome.tabs.create({ url: baseUrl + query });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "MTSearch":
      searchMarktplaats(info.selectionText);
      break;
  }
});