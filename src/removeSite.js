const removeElementsWithSite = () => {
    document.querySelectorAll(".mp-Listing-seller-link").forEach(e => {
        const listing = e.closest(".mp-Listing");
        if (listing && listing.parentNode)
            listing.style.display = "none";
    })
}