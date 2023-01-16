import { RevolvingDot } from "react-loader-spinner"
function Loader(){
    return (    
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
/>
    )
}
export default Loader