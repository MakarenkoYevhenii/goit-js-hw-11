// import axios from 'axios';
// const BASE_URL = 'https://pixabay.com/api';
// const API_KEY = '25421427-490801345e4f25142920ea2db';
// const kolichestvoPicters=39

// // let currentPage = 1;
// // // let nameOfPoisk = inputUserEl.value;
// // let kolichestvoPostov = 0;
// // let maxPostov = 0;

// export function  expotrPhoto(name) {
//   return axios
//     .get(
//       `${BASE_URL}/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${kolichestvoPicters}`,
//     )
//     .then(res => {
//       console.log(res);
//       kolichestvoPostov = kolichestvoPostov + res.data.hits.length;
//       maxPostov = res.data.totalHits;
//       return res.data.hits;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

