import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const baseURL = axios.defaults.baseURL;
const API_KEY = '30699126-723906f358b47efc488aca811';

const fetchImages = async (page, filter) => {
  let response = await axios.get(`${baseURL}/?q=
${filter}
&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
  return response;
};


export default fetchImages;
