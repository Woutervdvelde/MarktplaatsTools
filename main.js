let settings = {};

chrome.storage.sync.get((values) => {
    settings = values.settings;
    initialize();
});

const initialize = () => {
    addDOMObserver();
}

const DOMchanged = () => {
    if (settings.remove_website_ads)
        removeElementsWithSite();
    if (settings.quick_preview)
        addPreviewButton();
}

const removeElementsWithSite = () => {
    document.querySelectorAll(".mp-Listing-seller-link").forEach(e => {
        const listing = e.closest(".mp-Listing");
        if (listing && listing.parentNode)
            listing.style.display = "none";
    })
}

const addDOMObserver = () => {
    const targetNode = document.querySelector(".mp-Page-element--main");
    const config = { childList: true, subtree: true };
    const callback = function (mutationsList, observer) {
        mutationsList.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length)
                DOMchanged();
        });
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

const showPreview = async (e) => {
    const url = e.target.getAttribute("link")
    const fetched = await fetch(url);
    const response = await fetched.text();

    const DOM = new DOMParser().parseFromString(response, "text/html");
    const html = DOM.getElementById("content");

    const title = html.querySelector("#title");
    const stats = html.querySelector(".stats");
    const price = html.querySelector(".price");

    const imageCollection = html.querySelectorAll(".image");
    const images = document.createElement("div");
    imageCollection.forEach(image => {
        console.log(image.outerHTML);
        images.innerHTML += image.outerHTML;
    });
    console.log(images);
    const info = html.querySelector(".l-body-content");

    const content = document.createElement("div");
        content.classList.add("mt-quick-preview-content");
        content.innerHTML += title.outerHTML + stats.outerHTML + price.outerHTML + images.outerHTML + info.outerHTML;

    document.body.insertAdjacentElement("afterbegin", content);
}

const addPreviewButton = () => {
    document.querySelectorAll(".mp-Listing--sellerInfo").forEach(e => {
        if (!e.querySelector(".mt-quick-preview-button")) {
            const url = e.closest(".mp-Listing").querySelector(".mp-Listing-coverLink").getAttribute("href");
            e.insertAdjacentHTML('beforeend', `<button class="mt-quick-preview-button" link="${url}">Snelle weergave</button>`);
        }
    });

    document.querySelectorAll(".mt-quick-preview-button").forEach(e => e.addEventListener("click", showPreview));
}