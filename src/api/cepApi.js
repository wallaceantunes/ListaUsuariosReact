import axios from 'axios'

export async function getCep(cep) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://www.cepaberto.com/api/v3/cep?cep=${cep}`, {headers: {'Authorization': 'Token token=62f901e1c694b60490c852ee78dd7427'}})
}
