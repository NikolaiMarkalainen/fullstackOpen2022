import { Notification } from "../types";
import '../styles.css'
const Notify = (props: {message: Notification, setError: React.Dispatch<React.SetStateAction<Notification>>}) => {
const notification = props.message;
if (notification.message !== undefined) {
    return <div></div>;
  }

else{
    setTimeout(() => {
        props.setError({message: ''});
      }, 5000);
    
      console.log(notification)
      return <div className="error"><>{notification}</></div>;
    }
}

export default Notify;