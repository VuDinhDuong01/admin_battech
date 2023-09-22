
import instanceAxios from "./http.apis"
import { UserType,GeneralType } from "~/types/index.types"

export const userApi = {
  register: async (payload: UserType) => {

    const response = await instanceAxios.post<GeneralType<UserType>>('api/auth/register', payload)
    return response.data

  },
  login: async (payload: Pick<UserType, 'email' | 'password'>) => {

    const response = await instanceAxios.post('api/auth/login', payload)
    return response.data

  },
  logout: async () => {
    try {
      const response = await instanceAxios.post<{message: string}>('api/auth/logout')
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}