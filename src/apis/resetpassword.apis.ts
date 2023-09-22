import instanceAxios from "./http.apis"

export const resetPasswordApi = {
  forgotPassword: async (email: string) => {

    const response = await instanceAxios.post('api/auth/forgot_password', { email })
    return response.data

  },
  resetPassword: async ({ new_password, confirm_password, _id }: { new_password: string, confirm_password: string, _id: string }) => {

    const response = await instanceAxios.post<{ message: string }>(`api/auth/reset_password/${_id}`, { new_password, confirm_password })
    return response.data
  }

}