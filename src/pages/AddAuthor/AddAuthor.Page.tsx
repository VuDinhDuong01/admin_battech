import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation,Link } from "react-router-dom"

import { schema, SchemaType, Images } from "~/utils/index"
import { Button } from "~/components/Button/Button"
import { InputForm } from "~/components/Input/index"
import { authorApi } from "~/apis"
import { path } from '~/contants/path'
import { AuthorType } from "~/types/author.types"
import { LoadingSkeletonAdd } from "~/components/LoadingSkeleton"
import { HelmetAsync } from "~/components/Helmet/Helmet"

const AddAuthor = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { author_id, author } = location.state || {}
  const schemaTag = schema.pick(['author'])
  const { register, handleSubmit, formState: { errors }, } = useForm<Pick<SchemaType, 'author'>>({
    defaultValues: {
      author: author_id ? author.author : ''
    },
    resolver: yupResolver(schemaTag),
  })

  const addAuthorMutation = useMutation({
    mutationFn: (body: Pick<AuthorType, 'author'>) => authorApi.createAuthor(body)
  })

  const updateAuthorMutation = useMutation({
    mutationFn: (payload: { author_id: string, payload: Pick<AuthorType, 'author'> }) => authorApi.updateAuthor(payload)
  })
  const onSubmit = handleSubmit((data) => {
    if (author_id) {
      updateAuthorMutation.mutate({ author_id, payload: data }, {
        onSuccess: () => {
          navigate(path.author)
        }
      })
    } else {
      addAuthorMutation.mutate(data, {
        onSuccess: () => {
          navigate(path.author)
        }
      })
    }
  })


  return (
    <div className="px-[16px] min-h-screen overflow-hidden">
      <HelmetAsync title='Thêm tác giả' />
      <div className="w-full mt-[26px] flex items-center justify-between">
        <div className="flex items-center ">
          <Link to={path.author}> <img src={Images.check2} alt="" className="w-[20px] h-[20px] object-cover mr-[5px]" /></Link>
          <h3 className="text-black font-Roboto text-[24px] font-[600] leading-[20px]">{author_id ? 'Cập nhật tác giả' : 'Thêm tác giả'}</h3>
        </div>
        <Button className="flex items-center justify-center rounded-[3px] h-[32px] px-[8px] py-[10px] gap-[6px] shrink-0 bg-green text-white font-Roboto text-[16px] " onClick={onSubmit}>{author_id ? 'Cập nhật' : 'Lưu'}</Button>
      </div>
      {
        addAuthorMutation.isLoading || updateAuthorMutation.isLoading

          ? <LoadingSkeletonAdd /> : (<div className='w-full grid grid-cols-1 px-[16px] gap-[17px] pb-[15px] mt-[13px] rounded-[5px] border border-[#E3E5E8] bg-white'>
            <form className='col-span-1' onSubmit={onSubmit}>
              <InputForm
                classNameLabel='flex items-center font-Roboto text-[16px] text-[#393939] mt-[8px] mb-[7px]'
                className="h-[45px] w-full rounded-[3px] border border-[#E3E5E8] bg-white text-black font-Roboto text-[16px] leading-[35px] px-[15px] outline-none"
                placeholder='Nguyễn Tuân'
                register={register}
                name='author'
                errorMessage={errors.author?.message as string}
                labelTitle="Tên tác giả"
                obligatory='*'
              />
            </form>
          </div>)
      }
    </div>
  )
}

export default AddAuthor
