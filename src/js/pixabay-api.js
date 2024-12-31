import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

var API_KEY = '47763813-4917f5b92d54ff8a268fbe2f8';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export async function fetchImg(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get('/', {
      params: {
        q: query,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
    });
    throw err;
  }
}
