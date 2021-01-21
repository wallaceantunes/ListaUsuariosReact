import React, { useState } from 'react'

export const storeContext = React.createContext()
let token = ''
const { Provider } = storeContext
const StateProvider = ({children}) => {
    const [jwt, setJwt] = useState('')
    token = jwt
    return <Provider value = {[jwt, setJwt]}>{children}</Provider>
}
export function getToken () {
    return token
}
export default StateProvider