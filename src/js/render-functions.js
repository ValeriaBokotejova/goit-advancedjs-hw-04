import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function createCardsMarkup(imgData) {
  const cartItem = imgData
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-card">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
                <div class="values-container">
                    <ul class="labels">
                        <li>Likes</li>
                        <li>${likes}</li>
                        <li>Views</li>
                        <li>${views}</li>
                        <li>Comments</li>
                        <li>${comments}</li>
                        <li>Downloads</li>
                        <li>${downloads}</li>
                    </ul>
                </div>
            </a>
        </li>`
    )
    .join('');

  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML('beforeend', cartItem);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      scrollZoom: false,
    });
  }
}
