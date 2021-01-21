import React, { useContext } from 'react'
import { storeContext } from '../../store/store'
import jsonwebtoken from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'


function PrivateRoute({ children }) {
    const [jwt] = useContext(storeContext)
    if (jsonwebtoken.decode(jwt) === null) {
        return <Redirect to="/" />
    }
    return children
}

export default PrivateRoute;