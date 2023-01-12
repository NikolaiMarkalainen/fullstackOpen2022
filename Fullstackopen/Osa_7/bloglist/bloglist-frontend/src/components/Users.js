import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Users = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    return(
        <div>
            <h1>USERS</h1>
        <br></br>
        <ul>
            {props.users.map(user =>
            <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                    {user.username}
                </Link> {user.blogs.length}
            </li>)}
        </ul>
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