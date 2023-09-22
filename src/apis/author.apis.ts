import instanceAxios from "./http.apis" 
import { QueryType } from "~/hook/useQuery"
import { GeneralType,AuthorType} from "~/types/index.types"

export const authorApi = {
  createAuthor: async (payload: Pick<AuthorType, 'author'>) => {
    try {
      const response = await instanceAxios.post<GeneralType<AuthorType>>('api/v1/authors', payload)
      return response.data
    } catch (err) {
      console.log(err)
    }
  },
  getAllAuthor: async (payload: QueryType) => {
    try {
      const response = await instanceAxios.get<GeneralType<AuthorType[]>>('api/v1/authors', {
        params: payload
      })
      return response.data
    }
    catch (err) {
      console.log(err)
    }
  },
  getAuthor: async () => {
    try {
      const response = await instanceAxios.get<GeneralType<AuthorType[]>>('api/v1/author')
      return response.data
    }
    catch (err) {
      console.log(err)
    }
  },
  deleteAuthor: async (author_id: string) => {
    try {
      const response = await instanceAxios.delete(`api/v1/authors/${author_id}`)
      return response.data
    }
    catch (err) {
      console.log(err)
    }
  },
  deleteManyAuthor: async (manyId: string[]) => {
    try {
      const response = await instanceAxios.delete('api/v1/authors', { data: { manyId } })
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  updateAuthor:async({author_id,payload}:{author_id:string ,payload:Pick<AuthorType,'author'>})=>{
    try{
      const response = await instanceAxios.put(`api/v1/authors/${author_id}`,payload)
      return response.data
    }catch(error){
      console.log(error)
    }
  }
}