import axios from 'axios';
import handelBars from "../templates/gallery-card"
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25421427-490801345e4f25142920ea2db';
const inputUserEl=document.querySelector(".search-input")
const btnPoistel=document.querySelector(".search-btn")
const galleryPhoto=document.querySelector(".gallery")
const hiddenBtn=document.querySelector(".js-load-more")
btnPoistel.addEventListener("click",event =>{
  event.preventDefault();
  console.log(inputUserEl.value);
  const searchTag=inputUserEl.value
  
  const resultOfSearch=expotrPhoto(searchTag).then(res=>{
    console.log(res);
    galleryPhoto.insertAdjacentHTML("afterbegin",handelBars(res))
    return res
  }).catch(err=>{
    console.log(err);
  })
  hiddenBtn.classList.remove("is-hidden")
})
  

function expotrPhoto(name) {
  return axios.get(
    `${BASE_URL}/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`,
  ).then(res=>{
    console.log(res.data.hits);
    return res.data.hits
  }).catch(err =>{
    console.log(err);
  })
}
