import '../style.css'
const Notification = ({message}) => {
    console.log(message)
    if(message === null){
       
      return null;
    }
    if(message.length != 0 ){
    return(
      <div>
      {message}
      </div>
    )
  }
}
  export default Notification