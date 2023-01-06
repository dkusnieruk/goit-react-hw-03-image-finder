import { Component } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
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
const API_KEY= "30699126-723906f358b47efc488aca811"

axios.defaults.baseURL ="https://pixabay.com/api"

 class App extends Component {
  constructor(){
    super()
      this.state ={
        apiImg :[],
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
componendDidUpdate(prevProp, prevState){
  if (prevState.filter !== this.state.filter){
    return this.state.filter
  }
}
onSubmit = (event) =>{
  event.preventDefault();
  this.componentDidUpdate()
} 
  async componentDidMount(){
    this.setState({isLoading:true});
    try{
      const valueFilter = this.state.filter
      console.log(valueFilter);
   const response = await axios.get(`https://pixabay.com/api/?q=
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
  
 
render(){  
  console.log(this.state);
  const {apiImg, error, isLoading, response} = this.state

  return (
   <>
   <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <RevolvingDot/>}
        {apiImg.length > 0 &&<>
        <SearchBar onChange={this.onChange} onSubmit={this.onSubmit}/>
        <ImageGallery apiImg={apiImg} response={response} />
        
        </>}
      </div>
    
   </>
  );
};
 }

 export default App