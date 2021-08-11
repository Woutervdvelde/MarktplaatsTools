const remove_website_ads = document.getElementById("remove_website_ads");

chrome.storage.sync.get((values) => {
  remove_website_ads.checked = values.settings.remove_website_ads;
});

remove_website_ads.addEventListener("change", () => {
  console.log("change!");
})