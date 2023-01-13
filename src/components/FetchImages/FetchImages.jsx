import axios from "axios";

const fetchImages = async(page, pictureAmount, filter) => {
    axios.defaults.baseURL = 'https://pixabay.com/api';
    const baseURL = axios.defaults.baseURL;
    const API_KEY = '30699126-723906f358b47efc488aca811';
    let galleryAmount = (await pictureAmount) * (await page);
    let response = await axios.get(`${baseURL}/?q=
${filter}
&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${await galleryAmount}`);
console.log(page , pictureAmount, filter);
await response.data.hits
return response.data.hits
     }

export default fetchImages