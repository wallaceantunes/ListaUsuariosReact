import axios from 'axios'
import { gateway } from '../config/config'
import {getToken} from '../store/store'

export async function getClients() {
    return axios.get(`${gateway}client`, {headers: {'Authorization': getToken()}})
}
export async function deleteClient(id) {
    return  axios.delete(`${gateway}client/${id}`, {headers: {'Authorization': getToken()}});
}

export async function addClient(name, email, phone, address) {
    return axios.post(`${gateway}client`, {
        name,
        email,
        phone,
        address
    }, {headers: {'Authorization': getToken()}})
}

export async function editClient(id, name, email, phone, address) {
    return axios.put(`${gateway}client/${id}`, {
        name,
        email,
        phone,
        address
    }, {headers: {'Authorization': getToken()}})
}