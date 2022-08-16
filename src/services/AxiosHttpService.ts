import axios from 'axios'

const apiUrl = process.env.API_URL
const httpConfig = {
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
  },
}

const AxiosHttpService = {
  Get: (url: string) => axios.get(`${apiUrl}${url}`, httpConfig),
  Post: (url: string, data: any) =>
    axios.post(`${apiUrl}${url}`, data, httpConfig),
}

export default AxiosHttpService
