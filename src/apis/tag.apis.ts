import instanceAxios from './http.apis'
import { QueryType } from '~/hook/useQuery'
import { GeneralType, TagType } from '~/types/index.types'

export const tagApi = {
  createTag: async (payload: Pick<TagType, 'tag'>) => {
    try {
      const response = await instanceAxios.post<GeneralType<TagType>>('api/v1/tags', payload)
      return response.data
    } catch (err) {
      console.log(err)
    }
  },
  getAllTag: async (payload?: QueryType) => {
    try {
      const response = await instanceAxios.get<GeneralType<TagType[]>>('api/v1/tags', {
        params: payload
      })
      return response.data
    } catch (err) {
      console.log(err)
    }
  },
   getTag: async () => {
    try {
      const response = await instanceAxios.get<GeneralType<TagType[]>>('api/v1/tag')
      return response.data
    } catch (err) {
      console.log(err)
    }
  },
  deleteTag: async (tag_id: string) => {
    try {
      const response = await instanceAxios.delete(`api/v1/tags/${tag_id}`)
      return response.data
    } catch (err) {
      console.log(err)
    }
  },
  deleteManyTag: async (manyId: string[]) => {
    try {
      const response = await instanceAxios.delete('api/v1/tags', { data: { manyId } })
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  updateTag: async ({ tag_id, payload }: { tag_id: string; payload: Pick<TagType, 'tag'> }) => {
    try {
      const response = await instanceAxios.put(`api/v1/tags/${tag_id}`, payload)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
