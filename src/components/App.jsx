import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import fetchImages from '../fetchImages/fetchImages';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    pictures: [],
    isLoading: false,
    error: null,
    filter: '',
    showModal: false,
    page: 1,
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({
      filter: value,
      page: 1,
    });
  };

  onSubmit = async event => {
    this.setState({
      isLoading: true,
    });
    event.preventDefault();
    const response = await fetchImages(this.state.page, this.state.filter);

    this.setState({
      pictures: response.data.hits,
      totalHits: response.data.totalHits,
      isLoading: false,
    });
  };

  getPhotos = async () => {
    this.setState({ isLoading: true });
    if (this.state.filter === 0 || this.state.filter === '') {
      this.setState({
        pictures: [],
        isLoading: false,
      });
    } else
      try {
        const response = await fetchImages(this.state.page, this.state.filter);

        this.setState({
          pictures: response.data.hits,
          totalHits: response.data.totalHits,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
  };

  onClickModal = (largeFormatURL, tags) => {
    this.setState({
      showModal: true,
      imageSrc: largeFormatURL,
      imageAlt: tags,
    });
  };

  onClose = () => {
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

  updateCount = async () => {
    this.setState(prevState => ({
      isLoading: true,
      page: prevState.page + 1,
    }));
    const newImages = await fetchImages(this.state.page + 1, this.state.filter);

    this.setState({
      pictures: [...this.state.pictures, ...newImages.data.hits],
      totalHits: this.state.totalHits,
      isLoading: false,
    });
  };

  async didComponentUpdate(prevState) {
    if (this.state.page !== prevState.page) {
      await this.getPhotos();
    } else {
      return false;
    }
  }

  render() {
    console.log(this.state);
    const {
      pictures,
      error,
      isLoading,
      response,
      showModal,
      imageSrc,
      imageAlt,
      page,
      totalHits,
    } = this.state;

    return (
      <>
        <div>
          <SearchBar onChange={this.onChange} onSubmit={this.onSubmit} />
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          {isLoading && <Loader />}
          {pictures.length > 0 && (
            <>
              <ImageGallery
                page={page}
                pictures={pictures}
                response={response}
                onClickModal={this.onClickModal}
                updateCount={this.updateCount}
                totalHits={totalHits}
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
