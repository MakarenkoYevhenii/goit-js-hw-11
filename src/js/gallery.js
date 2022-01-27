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
const kolichestvoPicters=39

let currentPage = 1;
let nameOfPoisk = inputUserEl.value;
let kolichestvoPostov = 0;
let maxPostov = 0;

btnPoistel.addEventListener('click',poiskPosleClika)
async function poiskPosleClika()  {
  event.preventDefault();
  currentPage = 1;
  hiddenBtn.classList.add('is-hidden');
  galleryPhoto.innerHTML = '';
  const resultOfSearch = await expotrPhoto(inputUserEl.value)
    .then(res => {
      if (res.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again',
        );
      }
       
      console.log(res);
      galleryPhoto.insertAdjacentHTML('afterbegin', handelBars(res));
      let nameOfPictures = new SimpleLightbox('.gallery a');
      hiddenBtn.classList.remove('is-hidden');
      if(maxPostov <= kolichestvoPicters)
      {
        hiddenBtn.classList.add('is-hidden');
        // console.log("fsdfsdfsd");
      }
      return res;
      
    })
    .catch(err => {
      console.log(err);
    });
};

function  expotrPhoto(name) {
  return axios
    .get(
      `${BASE_URL}/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${kolichestvoPicters}`,
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

async function proslushkaKnopki() {
  currentPage += 1;
  try {
  const photoNovie=await expotrPhoto(inputUserEl.value)
  const otrisovka=await photoNovieOtrisovka(photoNovie)
  }catch (error) {
    console.log(error.message);
  }
   
}
hiddenBtn.addEventListener('click',proslushkaKnopki);
async function photoNovieOtrisovka(name) {
  if (name.length <= kolichestvoPostov && kolichestvoPostov >= maxPostov) {
        hiddenBtn.classList.add('is-hidden');
        Notiflix.Notify.info('Вы достигли дна');
      }
      galleryPhoto.insertAdjacentHTML('beforeend', handelBars(name));
      let nameOfPictures = new SimpleLightbox('.gallery a');
}