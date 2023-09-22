import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useState } from "react"

import { schema, SchemaType, Images, getSlug } from "~/utils/index"
import { topicApi } from "~/apis/topic.apis"
import { TopicType } from "~/types/topic.types"
import { path } from '~/contants/path'
import { Button } from "~/components/Button/Button"
import { InputForm } from "~/components/Input/index"
import { LoadingSkeletonAdd } from "~/components/LoadingSkeleton"
import { HelmetAsync } from "~/components/Helmet/Helmet"

const AddPost = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { topic_id, topic } = location.state || {}
  const schemaTopic = schema.pick(['topic'])
  const [slug, setSlug] = useState('')
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Pick<SchemaType, 'topic'>>({
    defaultValues: {
      topic: topic_id ? topic.topic : '',
    },
    resolver: yupResolver(schemaTopic),
  })
  const slugTopic = watch('topic')

  const addTopicMutation = useMutation({
    mutationFn: (body: Pick<TopicType, 'slug' | 'topic'>) => topicApi.createTopic(body)
  })
  const updateTopicMutation = useMutation({
    mutationFn: (payload: { topic_id: string, payload: Pick<TopicType, 'slug' | 'topic'> }) => topicApi.updateTopic(payload)
  })
  const onSubmit = handleSubmit((data) => {
    const dataTopic = { ...data, slug: getSlug(slugTopic) || slug }
    if (topic_id) {
      updateTopicMutation.mutate({ topic_id, payload: dataTopic }, {
        onSuccess: () => {
          navigate(path.topic)
        }
      })
    } else {
      addTopicMutation.mutate(dataTopic, {
        onSuccess: () => {
          navigate(path.topic)
        }
      })
    }
  })

  return (
    <div className="px-[16px] min-h-screen overflow-hidden">
        <HelmetAsync  title='Thêm chủ đề' />
      <div className="w-full mt-[26px] flex items-center justify-between">
        <div className="flex items-center ">
          <Link to={path.topic}> <img src={Images.check2} alt="" className="w-[20px] h-[20px] object-cover mr-[5px]" /></Link>
          <h3 className="text-black font-Roboto text-[24px] font-[600] leading-[20px]">{topic_id ? 'Cập nhật chủ đề mới' : 'Chủ đề mới'}</h3>
        </div>
        <Button onClick={onSubmit} className="flex items-center justify-center rounded-[3px] h-[32px] px-[8px] py-[10px] gap-[6px] shrink-0 bg-green text-white font-Roboto text-[16px] ">{topic_id ? 'Cập nhật' : 'Lưu'}</Button>
      </div>
      {
        addTopicMutation.isLoading || updateTopicMutation.isLoading
          ?
          <LoadingSkeletonAdd /> : (<form className='w-full grid 2xl:grid-cols-2 md:grid-cols-1 px-[16px] gap-[17px] pb-[15px] mt-[13px] rounded-[5px] border border-[#E3E5E8] bg-white' onSubmit={onSubmit} >
            <InputForm
              classNameDiv='col-span-1'
              placeholder='Chuyển đổi số năm 2023'
              register={register}
              name='topic'
              labelTitle="Tên chủ đề"
              obligatory="*"
              classNameLabel='flex items-center font-Roboto text-[16px] text-[#393939] mt-[8px] mb-[7px]'
              errorMessage={errors.topic?.message as string}
              className="h-[45px] w-full rounded-[3px] border border-[#E3E5E8] bg-white text-black font-Roboto text-[16px] leading-[35px] px-[15px] outline-none"
            />
            <div className='col-span-1' >
              <label htmlFor="" className='flex items-center font-Roboto text-[16px] text-[#393939] mt-[8px] mb-[7px]' >Slug<span className='text-[red]'>*</span></label>
              <div className='w-full relative'>
                <input type='text' className="h-[45px] w-full rounded-[3px] border border-[#E3E5E8] bg-white text-black font-Roboto text-[16px] leading-[35px] px-[15px] outline-none" placeholder='Chuyen-doi-so-nam-2023' value={getSlug(slugTopic)} onChange={(e) => setSlug(e.target.value)} />
              </div>

            </div>
          </form>)
      }
    </div>
  )
}
export default AddPost