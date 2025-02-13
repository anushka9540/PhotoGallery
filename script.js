document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.main-container img');
  const popup = document.querySelector('.popup');
  const popupImage = document.querySelector('.popup-image');
  const closeButton = document.querySelector('.popup button');
  const forwardButton = document.querySelector('.forward');
  const backwardButton = document.querySelector('.backward');
  const mainContainer = document.querySelector('.main-container');

  let currentIndex = 0;
  let isPopupOpen = false;
  let slideInterval;

  const popupDotsContainer = document.createElement('div');
  popupDotsContainer.classList.add('popup-dots');
  popup.appendChild(popupDotsContainer);

  function startAutoSlide() {
    slideInterval = setInterval(() => {
      navigateForward();
    }, 4000); // Increased duration for smoother transition
  }

  function navigateForward() {
    let nextIndex = (currentIndex + 1) % images.length;
    updatePopupImage(nextIndex, 'next');
  }

  function navigateBackward() {
    let prevIndex = (currentIndex - 1 + images.length) % images.length;
    updatePopupImage(prevIndex, 'prev');
  }

  function updatePopupImage(index, direction) {
    if (index === currentIndex) return;

    const animationClass =
      direction === 'next' ? 'slide-in-left' : 'slide-in-right';

    popupImage.classList.remove('slide-in-left', 'slide-in-right');
    void popupImage.offsetWidth;
    popupImage.classList.add(animationClass);

    setTimeout(() => {
      popupImage.style.transition = 'opacity 1s ease-in-out'; // Smooth transition
      popupImage.style.opacity = '0';
      
      setTimeout(() => {
        currentIndex = index;
        popupImage.src = images[currentIndex].src;
        popupImage.style.opacity = '1';
        updateArrows();
        updateDots();
      }, 500);
    }, 200);
  }

  function updateArrows() {
    backwardButton.style.display = currentIndex === 0 ? 'none' : 'block';
    forwardButton.style.display =
      currentIndex === images.length - 1 ? 'none' : 'block';
  }

  function updateDots() {
    document.querySelectorAll('.popup-dots .dot').forEach((dot, i) => {
      dot.style.backgroundColor = i === currentIndex ? 'white' : 'transparent';
    });
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      if (!isPopupOpen) {
        currentIndex = index;
        popupImage.src = images[currentIndex].src; // Ensure correct image appears
        updatePopupImage(currentIndex, 'next');
        popup.style.display = 'flex';
        mainContainer.style.opacity = '0.3';
        isPopupOpen = true;
        startAutoSlide();
      }
    });
  });

  closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
    mainContainer.style.opacity = '1';
    isPopupOpen = false;
    clearInterval(slideInterval);
  });

  forwardButton.addEventListener('click', () => {
    navigateForward();
  });

  backwardButton.addEventListener('click', () => {
    navigateBackward();
  });

  let startX = 0;
  popup.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  popup.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        navigateBackward();
      } else {
        navigateForward();
      }
    }
  });

  images.forEach(() => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    popupDotsContainer.appendChild(dot);
  });

  document.querySelectorAll('.popup-dots .dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      updatePopupImage(i, i > currentIndex ? 'next' : 'prev');
    });
  });

  updateArrows();
  updateDots();
});
