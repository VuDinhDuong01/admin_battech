import instanceAxios from "./http.apis"
import { QueryType } from "~/hook/useQuery"
import { GeneralType, PostType } from "~/types/index.types"

export const postApi = {
  createPost: async (payload: Omit<PostType, 'created_at' | 'updated_at' | '_id'>) => {
    try {
      const response = await instanceAxios.post<GeneralType<PostType>>('api/v1/posts', payload)
      return response.data
    } catch (err) {
      console.log(err)
    }
  },
  getAllPost: async (payload: QueryType) => {
    try {
      const response = await instanceAxios.get<GeneralType<PostType[]>>('api/v1/posts', {
        params: payload
      })
      return response.data
    }
    catch (err) {
      console.log(err)
    }
  },
  deletePost: async (post_id: string) => {
    try {
      const response = await instanceAxios.delete(`api/v1/posts/${post_id}`)
      return response.data
    }
    catch (err) {
      console.log(err)
    }
  },

  deleteManyPost: async (manyId: string[]) => {
    try {
      const response = await instanceAxios.delete('api/v1/posts', { data: { manyId } })
      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  updatePost: async ({ post_id, payload }: { post_id: string, payload: Omit<PostType, 'created_at' | 'updated_at' | '_id'> }) => {
    try {
      const response = await instanceAxios.put(`api/v1/posts/${post_id}`, payload)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}