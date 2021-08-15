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