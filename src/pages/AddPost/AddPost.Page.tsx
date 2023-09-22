import { useState, useMemo } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { convert } from 'html-to-text'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useLocation, Link } from "react-router-dom"
import 'react-quill/dist/quill.snow.css'

import { path } from '~/contants/path'
import { schema, SchemaType, Images } from "~/utils/index"
import { Button } from '~/components/Button/Button';
import { InputForm } from '~/components/Input/index';
import { authorApi, postApi, tagApi, topicApi } from '~/apis';
import { LoadingSkeletonAdd } from '~/components/LoadingSkeleton';
import { UploadImage } from '~/components/uploadImage/uploadImage';
import { SelectPost } from '~/components/SelectPost/SelectPost';
import { Cheditor } from '~/components/Ckeditor/Cheditor';
import { GeneralType,TagType,AuthorType ,TopicType,PostType} from '~/types/index.types'
import { HelmetAsync } from '~/components/Helmet/Helmet'

const AddTopic = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const { post_id, post } = location.state || {}
  const schemaTopic = schema.pick(['describe', 'post', 'slug', 'content'])
  const [information, setInformation] = useState<Pick<PostType, "topic" | "author" | "tag">>({
    topic: post_id ? post.topic : 'blockchain',
    author: post_id ? post.author : 'Bùi Tân Thân',
    tag: post_id ? post.tag : 'blockchain'
  });

  const { register, handleSubmit, control, formState: { errors } } =
    useForm<Pick<SchemaType, 'post' | 'describe' | 'slug' | 'content'>>({
      defaultValues: {
        describe: post_id ? post.describe : '',
        post: post_id ? post.post : "",
        slug: post_id ? post.slug : '',
        content: post_id ? post.content : ''
      },
      resolver: yupResolver(schemaTopic),
    })

  const addPostMutation = useMutation({
    mutationFn: (body: Omit<PostType, 'created_at' | 'updated_at' | '_id'>) => postApi.createPost(body)
  })
  const updatePostMutation = useMutation({
    mutationFn: (payload: { post_id: string, payload: Omit<PostType, 'created_at' | 'updated_at' | '_id'> }) => postApi.updatePost(payload)
  })
  const onSubmit = handleSubmit((data) => {
    const dataTotal = { ...data, ...information, content: convert(data.content) }
    if (post_id) {
      updatePostMutation.mutate({ post_id: post_id, payload: dataTotal }, {
        onSuccess: () => {
          navigate(path.post)
        }
      })
    } else {
      addPostMutation.mutate(dataTotal, {
        onSuccess: () => {
          navigate(path.post)
        }
      })
    }
  })
  const { data: dataAllTag } = useQuery({
    queryKey: ['getTag'],
    queryFn: () => tagApi.getTag()
  })
  const { data: dataAllAuthor } = useQuery({
    queryKey: ['getAuthor'],
    queryFn: () => authorApi.getAuthor()
  })
  const { data: dataAllTopic } = useQuery({
    queryKey: ['getTopic'],
    queryFn: () => topicApi.getTopic()
  })

  const dataTag = useMemo(() => {
    return (dataAllTag as GeneralType<TagType[]>)?.data?.map(item => ({ label: item.tag, value: item.tag }))
  }, [dataAllTag])

  const dataAuthor = useMemo(() => {
    return (dataAllAuthor as GeneralType<AuthorType[]>)?.data?.map(item => ({ label: item.author, value: item.author }))
  }, [dataAllAuthor])
  const dataTopic = useMemo(() => {
    return (dataAllTopic as GeneralType<TopicType[]>)?.data?.map(item => ({ label: item.topic, value: item.topic }))
  }, [dataAllTopic])

  return (
    <div className='w-full 2xl:px-[16px] md:px-[10px] md:h-[100%] min-h-screen overflow-hidden'>
       <HelmetAsync title='Thêm bài viết' />
      <div className="w-full mt-[26px] mb-[15px] flex items-center justify-between">
        <div className="flex items-center ">
          <Link to={path.post}> <img src={Images.check2} alt="" className="w-[20px] h-[20px] object-cover mr-[5px]" /></Link>

          <h3 className="text-black font-Roboto text-[24px] font-[600] leading-[20px]">Bài viết mới</h3>
        </div>
        <div className='flex items-center gap-[9px]'>
          <Button className="flex items-center justify-center rounded-[3px] h-[32px] px-[8px] py-[10px] gap-[6px] shrink-0 bg-[#C8CBD1] text-[#393939] font-Roboto text-[16px]  "><img src={Images.True} alt="" className='w-[20px] h-[20px]' />Publish</Button>
          <Button className="flex items-center justify-center rounded-[3px] h-[32px] px-[8px] py-[10px] gap-[6px] shrink-0 bg-[#186E25] text-white font-Roboto text-[16px] " onClick={onSubmit}>{post_id ? 'Cập nhật bài viết' : 'Lưu bài viết'}</Button></div>
      </div>
      {
        addPostMutation.isLoading || updatePostMutation.isLoading
          ? <LoadingSkeletonAdd /> : (
            <div className="w-full flex  2xl:gap-[18px] md:gap-[10px]">
              <form className='flex-1 rounded-[5px] border border-[#E3E5E8] bg-white pb-[53px] mb-[100px]' onSubmit={onSubmit}>
                <div className='w-full grid 2xl:grid-cols-2 md:grid-cols-1 px-[16px] mb-[20px] 2xl:gap-[17px] md:gap-[4px] pb-[15px] mt-[16px] rounded-[5px]  bg-white' >
                  <InputForm
                    classNameDiv='col-span-1'
                    labelTitle='Tên bài viết'
                    obligatory='*'
                    classNameLabel='flex items-center font-Roboto text-[16px] text-[#393939] mt-[8px] mb-[7px]'
                    className='h-[55px] w-full rounded-[3px] border border-[#E3E5E8] bg-white text-black font-Roboto text-[16px] leading-[35px] px-[15px] outline-none'
                    register={register}
                    errorMessage={errors.post?.message as string}
                    name='post'
                  />
                  <InputForm
                    labelTitle='Mô tả'
                    obligatory='*'
                    classNameDiv='col-span-1'
                    classNameLabel='flex items-center font-Roboto text-[16px] text-[#393939] mt-[8px] mb-[7px]'
                    className='h-[55px] w-full rounded-[3px] border border-[#E3E5E8] bg-white text-black font-Roboto text-[16px] leading-[35px] px-[15px] outline-none'
                    register={register}
                    name='describe'
                    errorMessage={errors.describe?.message as string}
                  />
                </div>
                <label htmlFor="" className='pl-[16px]   flex items-center font-Roboto text-[16px] text-[#393939] mt-[8px] mb-[7px]'>Nội dung<p className='text-[red]'>*</p></label>
                <Cheditor
                  name='content'
                  control={control}
                />
                {
                  errors.content && <span className='text-[red] pl-[16px] font-Roboto text-[16px]  2xl:mt-[2px] md:mt-[20px]'>{errors.content.message}</span>
                }
                <div className='w-full grid 2xl:grid-cols-2 md:grid-cols-1 px-[16px] mb-[20px] gap-[17px] 2xl:h-[102px] 2xl:mt-[16px]  md:mt-[40px] rounded-[5px]  bg-white'  >
                  <div className='col-span-1 relative'>
                    <label htmlFor="" className='flex items-center font-Roboto text-[16px] text-[#393939] mt-[8px]'>Slug<p className='text-[red]'>*</p></label>
                    <input type="text" className="h-[45px] w-full rounded-[3px] border border-[#E3E5E8] bg-white text-black font-Roboto text-[16px] leading-[35px] pl-[10px] pr-[35px] outline-none"
                      {...register('slug')}
                    />
                    {errors.slug && <span className='text-[red] font-Roboto text-[16px]'>{errors.slug.message}</span>}
                    <img src={Images.Slug_img} alt="slug" className="w-[20px] h-[20px] object-cover absolute 2xl:top-[48%] md:top-[70%] translate-y-[-50%] right-[10px]" />
                  </div>
                  <UploadImage post_id={post_id} />
                </div>
              </form>
              <SelectPost information={information} setInformation={setInformation} dataTag={dataTag} dataAuthor={dataAuthor} dataTopic={dataTopic} />
            </div>)
      }
    </div>
  )
}

export default AddTopic
