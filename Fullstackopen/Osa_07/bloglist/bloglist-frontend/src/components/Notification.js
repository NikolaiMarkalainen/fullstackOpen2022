import '../styles.css'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log('PROPS NOTF',props.notification)
  if (props.notification === null) {
    console.log(props.notification)
    return null
  }
  if (props.notification.length !== 0) {
    console.log(props.notification)
    return <div className={props.notification.styling}>{props.notification.message}</div>
  }
}

const mapStateToProps = (state) => {
  return{
    notification: state.notification
  }
}


const mapDispatchToProps = {

}

const ConnectedNotifications = connect(mapStateToProps, mapDispatchToProps)(Notification)
export default ConnectedNotifications
