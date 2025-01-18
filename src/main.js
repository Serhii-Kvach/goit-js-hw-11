import { fetchImages } from './js/pixabay-api';
import { renderImageCards } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.form-search');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

const onFormSubmit = event => {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  loader.style.display = 'block';

  const query = event.currentTarget.elements.user_query.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    loader.style.display = 'none';
    return;
  }

  fetchImages(query)
    .then(data => {
      loader.style.display = 'none';

      if (!data.hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      const markup = renderImageCards(data.hits);
      galleryContainer.insertAdjacentHTML('beforeend', markup);

      const lightbox = new SimpleLightbox('.gallery-item', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
      lightbox.refresh();

      formEl.reset();
    })
    .catch(error => {
      loader.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message: 'Failed to load images. Please try again later.',
      });
    });
};

formEl.addEventListener('submit', onFormSubmit);
