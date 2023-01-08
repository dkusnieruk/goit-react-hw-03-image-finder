import { Component } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
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
const baseURL =axios.defaults.baseURL;
const API_KEY ='30699126-723906f358b47efc488aca811'


 class App extends Component {
  constructor(){
    super()
      this.state ={
        apiImg :[],
        isLoading:false,
        error:null,
        filter:"",
        showModal:false
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
  this.gallerImplementation()
} 
  async gallerImplementation(){
    this.setState({isLoading:true});
    if (this.state.filter===0){
      this.setState({
        apiImg:[]
      })
    }
    else 
    try{
      
   const response = await axios.get(`${baseURL}/?q=
  ${this.state.filter}
   &page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
  
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
    this.setState({
      showModal:true,
      link :event.currentTarget.href,
      tags:event.currentTarget.title
    })
    console.log(event.currentTarget);
    
//        const instance = basicLightbox.create(`
//        <img src=${event.target.href || event.target.src}/>
//        <Modal//>
// `)

// instance.show()  
// document.addEventListener(`keydown`, (event)=>{
//   if (event.key === "Escape"){
//       instance.close();
//   }
// })

  }
onClose = (event) =>{
  this.setState({
    showModal:false
  })
}

render(){  
  console.log(this.state);
  if (this.state.filter===0){
    this.setState({
      apiImg:""
    })
  }
  const {apiImg, error, isLoading, response, showModal, link, tags} = this.state

  return (
   <>
   <div>
   <SearchBar onChange={this.onChange} onSubmit={this.onSubmit}/>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <RevolvingDot/>}
        {apiImg.length > 0 &&<>
        {/* <SearchBar onChange={this.onChange} onSubmit={this.onSubmit}/> */}
        <ImageGallery apiImg={apiImg} response={response} onClick={this.onClick}/>
        </>}
        {showModal && <Modal link={link} tags={tags} onClose={this.onClose}/>}
      </div>
    
   </>
  );
};
 }

 export default App