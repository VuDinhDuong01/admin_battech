import instanceAxios from "./http.apis" 
import { QueryType } from "~/hook/useQuery"
import { GeneralType,TopicType } from "~/types/index.types"

export const topicApi = {
  createTopic: async (payload: Pick<TopicType, 'slug' | 'topic'>) => {
    try {
      const response = await instanceAxios.post<GeneralType<TopicType>>('api/v1/topics', payload)
      return response.data
    } catch (err) {
      console.log(err)
    }
  },
  
  getAllTopic: async (payload: QueryType) => {
    try {
      const response = await instanceAxios.get<GeneralType<TopicType[]>>('api/v1/topics', {
        params: payload
      })
      return response.data
    }
    catch (err) {
      console.log(err)
    }
  },
  getTopic: async () => {
    try {
      const response = await instanceAxios.get<GeneralType<TopicType[]>>('api/v1/topic')
      return response.data
    }
    catch (err) {
      console.log(err)
    }
  },
  deleteTopic: async (topic_id: string) => {
    try {
      const response = await instanceAxios.delete(`api/v1/topics/${topic_id}`)
      return response.data
    }
    catch (err) {
      console.log(err)
    }
  },
  deleteManyTopic: async (manyId: string[]) => {
    try {
      const response = await instanceAxios.delete('api/v1/topics', { data: { manyId } })
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  updateTopic:async({topic_id,payload}:{topic_id:string ,payload:Pick<TopicType,'slug'|'topic'>})=>{
    try{
      const response = await instanceAxios.put(`api/v1/topics/${topic_id}`,payload)
      return response.data
    }catch(error){
      console.log(error)
    }
  }
}