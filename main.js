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

const addPreviewButton = () => {
    document.querySelectorAll(".mp-Listing--sellerInfo").forEach(e => {
        if (!e.querySelector(".mt-quick-preview-button"))
            e.insertAdjacentHTML('beforeend', `<button class="mt-quick-preview-button">Snelle weergave</button>`)
    });
}