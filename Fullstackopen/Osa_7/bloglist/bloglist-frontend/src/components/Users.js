import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
const Users = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    console.log('USERS',props.users)
    return(
        <div>
        <h1>USERS</h1>
        <br></br>
        {props.users.map(user => <li key={user.id}>{user.username} blogs: {user.blogs.length}</li>
        )}
        </div>
    )
}



const mapDispatchToProps = {
    initializeUsers
}

const mapStateToProps = (state) => {
   return{
    blogs: state.blogs,
    users: state.users
   }
}

const ConnectedUser = connect(
    mapStateToProps,
    mapDispatchToProps)(Users)

export default ConnectedUser