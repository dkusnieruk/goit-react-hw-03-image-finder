import { Component } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import * as basicLightbox from 'basiclightbox'
import axios from "axios";
import { RevolvingDot } from  'react-loader-spinner'

<RevolvingDot
  height="100"
  width="100"
  radius="6"
  color="#4fa94d"
  secondaryColor=''
  ariaLabel="revolving-dot-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>


axios.defaults.baseURL ="https://pixabay.com/api"

 class App extends Component {
  constructor(){
    super()
      this.state ={
        apiImg :[],
        apiKey : '30699126-723906f358b47efc488aca811',
        baseURL :'https://pixabay.com/api',
        isLoading:false,
        error:null,
        filter:""
       }
  }
onChange= (event) =>{
const {value} =event.target
this.setState({
 filter: value
})
}

onSubmit = (event) =>{
  event.preventDefault();
  this.componentDidMount()
} 
  async componentDidMount(){
    this.setState({isLoading:true});
    if (this.state.filter===0){
      this.setState({
        apiImg:""
      })
    }
    else 
    try{
      
   const response = await axios.get(`${this.state.baseURL}/?q=
  ${this.state.filter}
   &page=1&key=${this.state.apiKey}&image_type=photo&orientation=horizontal&per_page=12`);
  
   this.setState({
   apiImg: response.data.hits,
   response: response.data 

   });}
   catch(error){
    this.setState({error});
   }
   finally{
    this.setState({
      isLoading:false
    })
   }
  }
  
  onClick =(event) =>{
    event.preventDefault()
       const instance = basicLightbox.create(`
       <img src=${event.target.href || event.target.src}/>
       <Modal src${event.target.href || event.target.src}/>
`)

instance.show()  
document.addEventListener(`keydown`, (event)=>{
  if (event.key === "Escape"){
      instance.close();
  }
})

  }
 
render(){  
  console.log(this.state);
  if (this.state.filter===0){
    this.setState({
      apiImg:""
    })
  }
  const {apiImg, error, isLoading, response} = this.state

  return (
   <>
   <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <RevolvingDot/>}
        {apiImg.length > 0 &&<>
        <SearchBar onChange={this.onChange} onSubmit={this.onSubmit}/>
        <ImageGallery apiImg={apiImg} response={response} onClick={this.onClick}/>
        <Modal apiImg={apiImg}/>
        </>}
      </div>
    
   </>
  );
};
 }

 export default App