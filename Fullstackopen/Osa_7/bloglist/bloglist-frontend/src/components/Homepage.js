import{
Routes, Route, Link
} from 'react-router-dom'
import ConnectedUser from './Users'
import ConnectedRedux from '../App'

const Homepage = () => {

const padding = {
    padding: 5
}





return(
    <div>
        <Link style={padding} to ="/users">Users</Link>
        <Link style={padding} to ="/">Home</Link>
        <Routes>
            <Route path="/users" element={<ConnectedUser/>}/>
            <Route path="/" element={<ConnectedRedux/>}/>
        </Routes>
    </div>
)
}

export default Homepage