/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { isAxiosError } from 'axios'
import { baseURL } from '~/contants/instanceAxios'
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  deleteLocalStorage,
  getRefreshToken,
  setProfile,
  UNAUTHORIZEDError,
  UNAUTHORIZEDErrorToken
} from '~/utils'

import { GeneralType } from '~/types/generalType.types'

type RefreshTokenResponseType = GeneralType<{ access_token: string; refresh_token: string }>
const instanceAxios = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

let access_token = getAccessToken()
let refresh_token = getRefreshToken()
let refreshTokenHandle: Promise<{ access_token: string; refresh_token: string }> | null = null


const refreshTokenRequest = async () => {
  try {
    const response = await instanceAxios.post<RefreshTokenResponseType>('api/auth/refresh_token', { refresh_token: refresh_token })

      ; (access_token = response.data.data.access_token), (refresh_token = response.data.data.refresh_token)
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
    return {
      access_token: response.data.data.access_token,
      refresh_token: response.data.data.refresh_token
    }
  } catch (error) {
    access_token = ''
    refresh_token = ''
    deleteLocalStorage()
    throw error
  }
}

instanceAxios.interceptors.request.use(
  function (config) {
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`
      return config
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instanceAxios.interceptors.response.use(
  function (response) {
    if (response.config.url === 'api/auth/login' || response.config.url === 'api/auth/register') {
      access_token = response.data.data.access_token
      refresh_token = response.data.data.refresh_token
      setAccessToken(response.data.data.access_token)
      setRefreshToken(response.data.data.refresh_token)
      setProfile(response.data.data.user)
    }
    if (response.config.url === 'api/auth/logout') {
      deleteLocalStorage()
      access_token = ''
      refresh_token = ''
    }
    return response
  },
  function (error) {
    if (isAxiosError(error)) {
      // lỗi 401 có nhiều loại lỗi
      if (UNAUTHORIZEDError(error)) {
        // trường hợp acesstoken hết hạn và request phải khác request refresh_token
        if (UNAUTHORIZEDErrorToken(error) && (error as any).config.url !== 'api/auth/refresh_token') {
          refreshTokenHandle = refreshTokenHandle
            ? refreshTokenHandle
            : refreshTokenRequest().finally(() => {
              // giữ refresh_token trong khoảng 1s , tránh việc refresh_token nhiều lần
              setTimeout(() => {
                refreshTokenHandle = null
              }, 1000)
            })
          return refreshTokenHandle?.then((res) => {
            setAccessToken(res.access_token)
            setRefreshToken(res.refresh_token)
            access_token = res.access_token
            refresh_token = res.refresh_token
            if (error.config?.headers) {
              error.config.headers.Authorization = `Bearer ${res.access_token}`
              return instanceAxios(error.config)
            }
          })
        }
        
        // khi refresh_token hết hạn thì cho logout tài khoản
        deleteLocalStorage()
        access_token = ''
        refresh_token = ''
      
       
      }
    }
    return Promise.reject(error)
  }
)

export default instanceAxios
