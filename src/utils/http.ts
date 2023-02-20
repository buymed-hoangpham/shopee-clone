import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { isAxiosError } from './utils'

class Http {
  instance: AxiosInstance
  constructor() {
    ;(this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })),
      this.instance.interceptors.response.use(
        function (response) {
          return response
        },

        function (error: AxiosError) {
          if (isAxiosError(error) && error.status !== HttpStatusCode.UnprocessableEntity) {
            const data: any = error.response?.data
            const message = data?.message || error?.message
            console.log('🚀 ~ file: http.ts:25 ~ Http ~ constructor ~ message:', message)
            toast.error(message)
          }

          return Promise.reject(error)
        }
      )
  }
}

const http = new Http().instance

export default http
