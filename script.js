document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".main-container img");
    const popup = document.querySelector(".popup");
    const popupImage = document.querySelector(".popup-image");
    const closeButton = document.querySelector(".popup button");
    const forwardButton = document.querySelector(".forward");
    const backwardButton = document.querySelector(".backward");
    const mainContainer = document.querySelector(".main-container");
    const body = document.body;
    
    let currentIndex = 0;
    let isPopupOpen = false;

    images.forEach((img, index) => {
        img.addEventListener("click", (event) => {
            if (!isPopupOpen) {
                currentIndex = index;
                popupImage.src = images[currentIndex].src;
                popup.style.display = "flex";
                popup.style.justifyContent = "center";
                popup.style.alignItems = "center";
                popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                popup.style.width = "100vw";
                popup.style.height = "100vh";
                popup.style.position = "fixed";
                popup.style.top = "0";
                popup.style.left = "0";
                popup.style.zIndex = "1000";
                
                popupImage.style.display = "block";
                popupImage.style.maxWidth = "80%";
                popupImage.style.maxHeight = "80vh";
                popupImage.style.zIndex = "1001";
                
                mainContainer.style.opacity = "0.3";
                // body.style.overflow = "hidden";
                isPopupOpen = true;
            }
        });
    });

    closeButton.addEventListener("click", () => {
        popup.style.display = "none";
        mainContainer.style.opacity = "1";
        body.style.overflow = "auto";
        isPopupOpen = false;
    });

    forwardButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        popupImage.src = images[currentIndex].src;
    });

    backwardButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        popupImage.src = images[currentIndex].src;
    });

    mainContainer.addEventListener("click", (event) => {
        if (isPopupOpen) {
            event.stopPropagation();
        }
    });
});
