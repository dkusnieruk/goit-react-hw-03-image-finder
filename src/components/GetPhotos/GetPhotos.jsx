import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api';
const baseURL = axios.defaults.baseURL;
const API_KEY = '30699126-723906f358b47efc488aca811';


const getPhotos = async()=> {
    this.setState({ isLoading: true });
    if (this.props.filter === 0) {
      this.setState({
        apiImg: [],
      });
    } else
      try {
        let galleryAmount = await this.props.pictureAmount*this.props.page
        let response = await axios.get(`${baseURL}/?q=
  ${this.state.filter}
   &page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${galleryAmount}`);
        this.setState({
          apiImg: response.data.hits,
          response: response.data,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
  }

  export default getPhotos