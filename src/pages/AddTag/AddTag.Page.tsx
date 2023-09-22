

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useLocation ,Link} from "react-router-dom"

import { schema, SchemaType, Images } from "~/utils/index"
import { Button } from "~/components/Button/Button"
import { InputForm } from "~/components/Input/index"
import { TagType } from "~/types/tag.types"
import { tagApi } from "~/apis"
import { path } from '~/contants/path'
import { LoadingSkeletonAdd } from "~/components/LoadingSkeleton"
import { HelmetAsync } from "~/components/Helmet/Helmet"


const AddTag = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { tag_id, tag } = location.state || {}
  const schemaTag = schema.pick(['tag'])
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState: { errors }, } = useForm<Pick<SchemaType, 'tag'>>({
    defaultValues: {
      tag: tag_id ? tag.tag : ''
    },
    resolver: yupResolver(schemaTag),
  })

  const addTagMutation = useMutation({
    mutationFn: (body: Pick<TagType, 'tag'>) => tagApi.createTag(body)
  })
  const updateTagMutation = useMutation({
    mutationFn: (payload: { tag_id: string, payload: Pick<TagType, 'tag'> }) => tagApi.updateTag(payload)
  })
  const onSubmit = handleSubmit((data) => {
    if (tag_id) {
      updateTagMutation.mutate({ tag_id, payload: data }, {
        onSuccess: () => {
          navigate(path.tag)
        }
      })
    } else {
      addTagMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries(['getAllTag']);
          navigate(path.tag)
        }
      })
    }
  })

  return (
    <div className="px-[16px] min-h-screen overflow-hidden">
      <HelmetAsync  title='Thêm tag' />
      <div className="w-full mt-[26px] flex items-center justify-between">
        <div className="flex items-center ">
          <Link to={path.tag}>  <img src={Images.check2} alt="" className="w-[20px] h-[20px] object-cover mr-[5px]" /></Link>
        
          <h3 className="text-black font-Roboto text-[24px] font-[600] leading-[20px]">{tag_id ? 'Cập nhật Tag mới' : 'Thêm Tag mới'}</h3>
        </div>
        <Button className="flex items-center justify-center rounded-[3px] h-[32px] px-[8px] py-[10px] gap-[6px] shrink-0 bg-[#186E25] text-white  font-Roboto text-[16px] " onClick={onSubmit}>{tag_id ? 'Cập nhật' : 'Lưu'}</Button>
      </div>
      {
          addTagMutation.isLoading || updateTagMutation.isLoading 
      
        ?  <LoadingSkeletonAdd /> : (<div className='w-full grid grid-cols-1 px-[16px] gap-[17px] pb-[15px] mt-[13px] rounded-[5px] border border-[#E3E5E8] bg-white '>
          <form className='col-span-1' onSubmit={onSubmit}>
            <InputForm
              classNameLabel='flex items-center font-Roboto text-[16px] text-[#393939] mt-[8px] mb-[7px]'
              className="h-[45px] w-full rounded-[3px] border border-[#E3E5E8] bg-white  text-black font-Roboto text-[16px] leading-[35px] px-[15px] outline-none"
              placeholder='NFT'
              register={register}
              name='tag'
              labelTitle='Tên Tag'
              obligatory='*'
              errorMessage={errors.tag?.message as string}
            />
          </form>
        </div>)
      }

    </div>
  )
}

export default AddTag
