import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { connect } from "react-redux"

const Notification = (props) => {
  console.log(props)
let style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
}

console.log('IN NOTIFICATION', props.notification)

  

if(props.notification.content != undefined){

  style = {display:'none'}
}
else{

    return (
      <div
      style = {style}>
        {props.notification}
      </div>
    )
}

}

const mapStateToProps = (state) => {
  return{
    notification: state.notification
  }
}

const ConnectedNotifications  = connect(mapStateToProps)(Notification)

export default ConnectedNotifications