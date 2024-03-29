import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from '../queries'

const LoginForm = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            props.setErrorMessage((error.graphQLErrors[0].message))
        },
    })

    console.log(props)
    useEffect(() => {
        if(result.data) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('library-token', token)
        }
    }, [result.data])

    if(!props.show){
        return null
    }
    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password }})
    }

    return(
        <div>
            <form onSubmit={submit}>
                <div>
                    username{' '}
                    <input
                    value = {username}
                    onChange={({ target }) => setUsername( target.value )}
                    />
                </div>
                <div>
                    password{' '}
                    <input
                    value = { password }
                    onChange={({ target }) => setPassword ( target.value )}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm