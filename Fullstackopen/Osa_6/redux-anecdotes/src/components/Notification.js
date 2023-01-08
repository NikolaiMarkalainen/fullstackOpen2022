import { connect } from "react-redux"

const Notification = (props) => {
let style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
}


  

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
const mapDispatchToProps ={


}

const ConnectedNotifications  = connect(mapStateToProps, mapDispatchToProps)(Notification)

export default ConnectedNotifications