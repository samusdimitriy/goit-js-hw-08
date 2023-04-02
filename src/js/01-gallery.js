import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const palette = document.querySelector('.gallery');
palette.insertAdjacentHTML('beforeend', createCardsMarkup(galleryItems));
palette.addEventListener('click', onGalleryClick);

function createCardsMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
      </a>
    </li>`
    )
    .join('');
}

function onGalleryClick(event) {
  event.preventDefault();
  const { target } = event;
  if (target.nodeName !== 'IMG') return;

  const instance = new SimpleLightbox('.gallery a', { nav: false });
  const selectedIndex = galleryItems.findIndex(
    item => item.original === target.dataset.source
  );

  instance.open(selectedIndex);

  document.body.style = 'overflow: hidden; height: 100vh;';
  window.addEventListener('keydown', onEscKeyClick);

  function onEscKeyClick(event) {
    if (event.code === 'Escape' && instance.visible()) {
      instance.close();
      document.body.style = '';
      window.removeEventListener('keydown', onEscKeyClick);
    }
  }
}
