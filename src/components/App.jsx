import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { RevolvingDot } from 'react-loader-spinner';
import fetchImages from './FetchImages/FetchImages';

//SPINNER
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


class App extends Component {
  constructor(props) {
    super(props);
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

  //ONCHANGE
  onChange = event => {
    const { value } = event.target;
    this.setState({
      filter: value,
    });

  };

  //SUBMIT
  onSubmit = async(event) => {
    event.preventDefault();
    
    const  response=  await fetchImages(  
      this.state.page,
      this.state.pictureAmount,  
      this.state.filter)
      

      this.setState({
      apiImg:  response,
      });

  };

  // FETCH DATA
   getPhotos = async () => {
    
    this.setState({ isLoading: true });
    if (this.state.filter === 0 || this.state.filter==='') {
      this.setState({
        apiImg: [],
        isLoading:false
      });
    }
  
    else
      try {
      
        const  response=  await fetchImages( 
        this.state.page,  
        this.state.pictureAmount,  
        this.state.filter)
        
        this.setState({
        apiImg:  response,
        });
      } catch (error) {
        this.setState({ error });
      } finally {

        this.setState({
          isLoading: false,
        });
      }
  };

  //CLICK FUNCTION
  onClick = event => {
    event.preventDefault();
    this.setState({
      showModal: true,
      imageSrc: event.currentTarget.href,
      imageAlt: event.currentTarget.title,
    });
  };

  //CLOSE MODAL
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

  //COUNT INCREMENT
   updateCount = async() => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    const  response=  await fetchImages( 
      this.state.page+1,  
      this.state.pictureAmount,  
      this.state.filter)
      
      this.setState({
      apiImg:  [...this.state.apiImg, ...response],
      });
  };

  //DIDCOMPONENTUPDATE
  async didComponentUpdate(prevState) {
    if (this.state.page !== prevState.page) {
      await this.getPhotos();
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
      page,
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
                page={page}
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
