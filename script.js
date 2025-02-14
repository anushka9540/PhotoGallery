const imageSources = [
  './images/mb3.jpg',
  './images/pic10.jpg',
  './images/gp2.jpg',
  './images/panda1.webp',
  './images/ob2.jpg',
  './images/mb4.jpg',
  './images/mb1.webp',
  './images/dr1.jpg',
  './images/dr5.webp',
  './images/dr4.webp',
  './images/gp1.jpg',
  './images/img1.jpg',
  './images/pic6.jpg',
  './images/pic7.jpg',
  './images/pic8.jpg',
  './images/pic9.jpg'
];

const mainContainer = document.querySelector('.main-container');
const popup = document.querySelector('.popup');
const popupImage = document.querySelector('.popup-image');
const closeButton = document.querySelector('.popup .close-btn');
const prevButton = document.querySelector('.backward');
const nextButton = document.querySelector('.forward');
const sliderDots = document.querySelector('.slider-dots');

let currentIndex = 0;
let slideshowInterval;

imageSources.forEach((src, index) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = `Image ${index + 1}`;
  img.addEventListener('click', () => openPopup(index));
  mainContainer.appendChild(img);
});

function openPopup(index) {
  currentIndex = index;
  popupImage.src = imageSources[currentIndex];
  popup.style.display = 'flex';
  updateNavigationButtons();
  createDots();
  startSlideshow();
}

function closePopup() {
  popup.style.display = 'none';
  stopSlideshow();
}

function updateNavigationButtons() {
  prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
  nextButton.style.display =
    currentIndex === imageSources.length - 1 ? 'none' : 'block';
}

function showPrevImage() {
  if (currentIndex > 0) {
    currentIndex--;
    updateImage();
  }
}

function showNextImage() {
  if (currentIndex < imageSources.length - 1) {
    currentIndex++;
    updateImage();
  }
}

function updateImage() {
  popupImage.src = imageSources[currentIndex];
  updateNavigationButtons();
  updateDots();
}

function createDots() {
  sliderDots.innerHTML = '';
  imageSources.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => openPopup(index));
    sliderDots.appendChild(dot);
  });
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function startSlideshow() {
  stopSlideshow();
  slideshowInterval = setInterval(() => {
    if (currentIndex < imageSources.length - 1) {
      showNextImage();
    } else {
      currentIndex = 0;
      updateImage();
    }
  }, 3000);
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
}

closeButton.addEventListener('click', closePopup);
prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    closePopup();
  }
});

document.addEventListener('keydown', (e) => {
  if (popup.style.display === 'flex') {
    if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'Escape') {
      closePopup();
    }
  }
});
