import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const [showElement, setShowElement] = useState(true)
  console.log('IN NOTIFICATION', notification)

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }


  

if(notification.content != undefined){

  style = {display:'none'}
}
else{

    return (
      <div
      style = {style}>
        {notification}
      </div>
    )
}

}

export default Notification