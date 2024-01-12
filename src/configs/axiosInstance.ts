import axios, { AxiosError } from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    const formattedMessage = `success ${response.data.message}`

    return {
      ...response,
      data: {
        ...response.data,
        message: formattedMessage,
      },
    }
  },
  (error: AxiosError | Error): Promise<AxiosError> => {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status
      const statusText = error.response.statusText
      const message = error.response.data.message
      console.log(`${statusCode} (${statusText}) ${message}`)

      const formattedMessage = `fail ${message}`

      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message: formattedMessage,
          },
        },
      })
    } else {
      return Promise.reject(error)
    }
  },
)
