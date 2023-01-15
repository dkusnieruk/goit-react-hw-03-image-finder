import axios from 'axios';
import propTypes from 'prop-types';

const fetchImages = async (page, filter) => {
  axios.defaults.baseURL = 'https://pixabay.com/api';
  const baseURL = axios.defaults.baseURL;
  const API_KEY = '30699126-723906f358b47efc488aca811';
  let response = await axios.get(`${baseURL}/?q=
${filter}
&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
  return response;
};

fetchImages.propTypes = {
  page: propTypes.number,
  filter: propTypes.string,
  response: propTypes.array,
};

export default fetchImages;
