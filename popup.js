let settings;
const refresh_container = document.getElementById("refresh_container");
const refresh_button = document.getElementById("refresh_button");
const remove_website_ads = document.getElementById("remove_website_ads");
const quick_preview = document.getElementById("quick_preview");

chrome.storage.sync.get((values) => {
  refresh_container.style.opacity = "0";
  settings = values.settings;
  remove_website_ads.checked = values.settings.remove_website_ads;
  quick_preview.checked = values.settings.quick_preview;
});

const reload = () => {
  window.location.reload();
}

refresh_button.addEventListener("click", () => {
  if (refresh_container.style.opacity != 0) {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: reload,
      });
    });
  }
  refresh_container.style.opacity = "0";
});

remove_website_ads.addEventListener("change", () => {
  settings.remove_website_ads = remove_website_ads.checked;
  saveChanges();
});

quick_preview.addEventListener("change", () => {
  settings.quick_preview = quick_preview.checked;
  saveChanges();
});

const saveChanges = () => {
  chrome.storage.sync.set({ settings });
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    if (/\w+:\/\/www.marktplaats.nl.*/.exec(tabs[0].url))
      refresh_container.style.opacity = "1";
  });
}