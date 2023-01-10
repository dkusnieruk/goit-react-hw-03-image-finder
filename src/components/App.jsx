import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import axios from 'axios';
import { RevolvingDot } from 'react-loader-spinner';

<RevolvingDot
  position="absolute"
  left="50%"
  top="50%"
  height="100"
  width="100"
  radius="6"
  color="#4fa94d"
  secondaryColor=""
  ariaLabel="revolving-dot-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>;

axios.defaults.baseURL = 'https://pixabay.com/api';
const baseURL = axios.defaults.baseURL;
const API_KEY = '30699126-723906f358b47efc488aca811';

class App extends Component {
  constructor() {
    super();
    this.state = {
      apiImg: [],
      isLoading: false,
      error: null,
      filter: '',
      showModal: false,
      pictureAmount: 12,
      page: 1,
    };
  }

  onChange = event => {
    const { value } = event.target;
    this.setState({
      filter: value,
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.gallerImplementation();
    this.setState({
      page: 1,
    });
    this.didComponentUpdate();
  };

  async gallerImplementation() {
    this.setState({ isLoading: true });
    if (this.state.filter === 0) {
      this.setState({
        apiImg: [],
      });
    } else
      try {
        let response = await axios.get(`${baseURL}/?q=
  ${this.state.filter}
   &page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.pictureAmount}`);
        if (response.data.hits === 0) {
          alert('No matches found');
        }
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

  onClick = event => {
    event.preventDefault();
    this.setState({
      showModal: true,
      imageSrc: event.currentTarget.href,
      imageAlt: event.currentTarget.title,
    });
  };
  onClose = event => {
    document.addEventListener(`keydown`, event => {
      if (event.key === 'Escape') {
        this.setState({
          showModal: false,
        });
      }
    });
    this.setState({
      showModal: false,
    });
  };
  updateCount = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.didComponentUpdate();
    this.gallerImplementation();
  };

  shouldComponentUpdate(nextState) {
    if (this.state.page !== nextState.page) return true;
    else {
      return false;
    }
  }

  didComponentUpdate(prevState) {
    if (this.shouldComponentUpdate) {
      this.gallerImplementation();
    } else {
      return false;
    }
  }

  render() {
    console.log(this.state);

    if (this.state.filter === 0) {
      this.setState({
        apiImg: '',
      });
    }
    const {
      apiImg,
      error,
      isLoading,
      response,
      showModal,
      imageSrc,
      imageAlt,
    } = this.state;

    return (
      <>
        <div>
          <SearchBar onChange={this.onChange} onSubmit={this.onSubmit} />
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          {isLoading && <RevolvingDot />}
          {apiImg.length > 0 && (
            <>
              <ImageGallery
                apiImg={apiImg}
                response={response}
                onClick={this.onClick}
                updateCount={this.updateCount}
              />
            </>
          )}
          {showModal && (
            <Modal
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              onClose={this.onClose}
            />
          )}
        </div>
      </>
    );
  }
}

export default App;
