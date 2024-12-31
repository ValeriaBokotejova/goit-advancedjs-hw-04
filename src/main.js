import { fetchImg } from './js/pixabay-api';
import { createCardsMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let currentPage = 1;
let currentQuery = '';
const perPage = 15;

searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchFormSubmit(event) {
  event.preventDefault();
  const inputValue = event.currentTarget.elements.search.value.trim();
  if (!inputValue) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }
  currentQuery = inputValue;
  currentPage = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  await fetchAndRenderImages();
}

async function onLoadMore() {
  currentPage += 1;
  await fetchAndRenderImages();
}

async function fetchAndRenderImages() {
  loader.style.display = 'flex';
  try {
    const data = await fetchImg(currentQuery, currentPage, perPage);
    if (!data || data.hits.length === 0) {
      if (currentPage === 1) {
        iziToast.info({
          title: 'No Results',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      loadMoreBtn.style.display = 'none';
      return;
    }
    createCardsMarkup(data.hits);

    if (currentPage * perPage >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
    smoothScroll();
  } catch (error) {
    console.error('Error during fetchAndRenderImages:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
    });
  } finally {
    loader.style.display = 'none';
  }
}

function smoothScroll() {
  const gallery = document.querySelector('.gallery');
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  
  if (window.scrollY === 0) {
    return;
  }
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
