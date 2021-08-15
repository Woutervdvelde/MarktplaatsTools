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

const hidePreview = (e) => {
    if (e.target.classList.contains("mt-quick-preview-container"))
        e.target.parentElement.removeChild(e.target);
    if (e.type === "keydown") {
        const container = document.querySelector(".mt-quick-preview-container");
        if (container)
            container.parentElement.removeChild(container);
    }
}

const showPreview = async (e) => {
    const url = e.target.getAttribute("link")
    const fetched = await fetch(url);
    const response = await fetched.text();

    const DOM = new DOMParser().parseFromString(response, "text/html");
    const html = DOM.getElementById("content");

    const title = html.querySelector("#title");
    const stats = html.querySelector(".stats");
    const image = html.querySelector("img");
    const info = html.querySelector(".l-body-content");
    const price = document.createElement("h1");
        price.innerText = html.querySelector(".price").innerHTML;

    const container = document.createElement("div");
        container.classList.add("mt-quick-preview-container");
        container.addEventListener("click", hidePreview);

    const content = document.createElement("div");
        content.classList.add("mt-quick-preview-content");
        content.innerHTML += title.outerHTML + stats.outerHTML + image.outerHTML + price.outerHTML + info.outerHTML;
    
    container.innerHTML = content.outerHTML;
    document.body.insertAdjacentElement("afterbegin", container);
}

const addPreviewButton = () => {
    document.querySelectorAll(".mp-Listing--sellerInfo").forEach(e => {
        if (!e.querySelector(".mt-quick-preview-button")) {
            const url = e.closest(".mp-Listing").querySelector(".mp-Listing-coverLink").getAttribute("href");
            e.insertAdjacentHTML('beforeend', `<button class="mt-quick-preview-button" link="${url}">Snelle weergave</button>`);
        }
    });

    document.querySelectorAll(".mt-quick-preview-button").forEach(e => e.addEventListener("click", showPreview));
    document.body.addEventListener("keydown", hidePreview);
}