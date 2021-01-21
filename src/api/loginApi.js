import axios from 'axios'
import { gateway } from '../config/config'

export async function login(user, password) {
    return axios.post(`${gateway}login`, {
        user,
        password
    })
}