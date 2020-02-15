import axios from 'axios'
import config from '../../config.json'

const hotelsAPI = axios.create({
  baseURL: config.uri
})

export default hotelsAPI
