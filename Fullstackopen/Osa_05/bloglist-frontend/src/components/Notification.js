import '../styles.css'

const Notification = ({ message }) => {
  if(message === null){

    return null
  }
  if(message.length !== 0 ){
    return(
      <div>
        {message}
      </div>
    )
  }
}
export default Notification