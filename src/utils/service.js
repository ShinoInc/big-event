import axios from 'axios'

const service = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timeout: 5000
})

service.interceptors.request.use()

service.interceptors.response.use(
  response => {
    return response.data
  }
)

export default service
