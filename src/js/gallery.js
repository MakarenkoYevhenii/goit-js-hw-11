import axios from 'axios';
import handelBars from '../templates/gallery-card';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25421427-490801345e4f25142920ea2db';

const inputUserEl = document.querySelector('.search-input');
const btnPoistel = document.querySelector('.search-btn');
const galleryPhoto = document.querySelector('.gallery');
const hiddenBtn = document.querySelector('.js-load-more');
let currentPage = 1;
let nameOfPoisk = inputUserEl.value;
let kolichestvoPostov = null;
let maxPostov = null;

btnPoistel.addEventListener('click', event => {
  event.preventDefault();
  currentPage = 1;
  hiddenBtn.classList.add('is-hidden');
  galleryPhoto.innerHTML = '';
  const resultOfSearch = expotrPhoto(inputUserEl.value)
    .then(res => {
      if (res.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again',
        );
      }
      console.log(res);
      galleryPhoto.insertAdjacentHTML('afterbegin', handelBars(res));
      let nameOfPictures = new SimpleLightbox('.gallery a').refresh;

      hiddenBtn.classList.remove('is-hidden');
      return res;
    })
    .catch(err => {
      console.log(err);
    });
});

function expotrPhoto(name) {
  return axios
    .get(
      `${BASE_URL}/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=200`,
    )
    .then(res => {
      console.log(res);
      kolichestvoPostov = kolichestvoPostov + res.data.hits.length;
      maxPostov = res.data.totalHits;
      return res.data.hits;
    })
    .catch(err => {
      console.log(err);
    });
}

hiddenBtn.addEventListener('click', () => {
  currentPage += 1;
  expotrPhoto(inputUserEl.value).then(res => {
    
    console.log(kolichestvoPostov);
    console.log(maxPostov);
    if (res.length < 39 || kolichestvoPostov >= maxPostov) {
      hiddenBtn.classList.add('is-hidden');
      Notiflix.Notify.info('Вы достигли дна');
    }
    galleryPhoto.insertAdjacentHTML('beforeend', handelBars(res));
    let nameOfPictures = new SimpleLightbox('.gallery a').refresh;
  });
});
