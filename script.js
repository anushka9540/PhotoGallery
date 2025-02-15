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
  './images/pic9.jpg',
  './images/img2.jpg',
  './images/img3.jpg',
  './images/img4.jpg',
  './images/img5.jpg',
  './images/img6.jpg'
];

const mainContainer = document.querySelector('.main-container');
const popup = document.querySelector('.popup');
const popupImage = document.querySelector('.popup-image');
const closeButton = document.querySelector('.popup .close-btn');
const prevButton = document.querySelector('.backward');
const nextButton = document.querySelector('.forward');
const sliderDots = document.querySelector('.slider-dots');

let currentIndex = 0;

imageSources.forEach((src, index) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = `Image ${index + 1}`;
  img.addEventListener('click', () => openPopup(index));
  mainContainer.appendChild(img);
});

function openPopup(index) {
  currentIndex = index;
  popup.style.display = 'flex';
  updateImage();
  createDots();
}

function closePopup() {
  popup.style.display = 'none';
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
  updateImage();
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % imageSources.length;
  updateImage();
}

function updateImage() {
  const animations = ['flip', 'rotate-in', 'bounce', 'zoom-spin'];
  const randomAnimation =
    animations[Math.floor(Math.random() * animations.length)];

  popupImage.classList.remove('flip', 'rotate-in', 'bounce', 'zoom-spin');

  setTimeout(() => {
    popupImage.src = imageSources[currentIndex];
    popupImage.classList.add(randomAnimation);
    createDots();
  }, 200);
}

function createDots() {
  sliderDots.innerHTML = '';

  imageSources.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    if (index === currentIndex) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => openPopup(index));
    sliderDots.appendChild(dot);
  });
}

closeButton.addEventListener('click', closePopup);
prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);
