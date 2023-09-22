import { useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { Pagination } from '~/components/Pagination/Pagination'
import { path } from '~/contants/path'
import { QueryType, useQueryString, Theme } from '~/hook/index'
import { OverNight } from '~/components/OverNight/OverNight'
import { GeneralType, PostType } from '~/types/index.types'
import { Images, customHandle, ObjectFilterTopic } from '~/utils/index'
import { Button } from '~/components/Button/Button'
import { NotItem } from '~/components/NotItem/NotItem'
import { TippySort } from '~/components/TippySort/TippySort'
import { Input } from '~/components/Input/Input'
import { TippyFilter } from '~/components/TippyFilter/TippyFilter'
import { TablePost } from '~/components/TablePost/TablePost'
import { postApi } from '~/apis'
import { LoadingSkeleton } from '~/components/LoadingSkeleton/LoadingSkeletonPost'
import { HelmetAsync } from '~/components/Helmet/Helmet'

const Posts = () => {
  const [checkBox, setCheckBox] = useState<string[]>([])
  const [nameSearch, setNameSearch] = useState<string>('')
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const query: QueryType = useQueryString()
  const { toggle, setToggle } = useContext(Theme)

  const { data: dataPost, isLoading } = useQuery({
    queryKey: ['getAllPost', query],
    queryFn: () => postApi.getAllPost(query)
  })

  const deletePostMutation = useMutation({
    mutationFn: (post_id: string) => postApi.deletePost(post_id)
  })

  const handleDeletePost = (post_id: string) => {
    deletePostMutation.mutate(post_id, {
      onSuccess: () => {
        setToggle(false)
        queryClient.invalidateQueries(['getAllPost'])
      }
    })
  }

  const handleUpdatePost = (post_id: string) => {
    const getPost = dataPost && dataPost.data.find((item) => item._id === post_id)
    navigate(path.addtopic, {
      state: {
        post_id: post_id,
        post: getPost
      }
    })
  }
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const customSearch = customHandle({ name: nameSearch, page: '1', query, navigate, pathname: path.post })
    customSearch()
  }
  const handleSort = ({ order, sort_by = 'topic' }: { order: string, sort_by: string }) => {
    const customSort = customHandle({ order, page: query.page as string, sort_by, name: 'name', query, navigate, pathname: path.post })
    customSort()
  }

  const handleFilter = ({ name, page = '1' }: { name: string, page?: string }) => {
    const customFilter = customHandle({ name, page, query, navigate, pathname: path.post })
    customFilter()
  }

  const { mutate } = useMutation({
    mutationFn: (body: string[]) => postApi.deleteManyPost(body)
  })

  const handleDeleteManyPost = () => {
    mutate(checkBox, {
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllPost'])
        setCheckBox([])
      }
    })

  }

  return (
    <div className='h-screen 2xl:px-[15px] md:px-[5px] w-full mt-[26px] min-h-screen overflow-scroll'>
      <HelmetAsync title="Bài viết" />
      <div className='flex  items-center justify-between mb-[18px] '>
        <h2 className='text-black font-Roboto text-[24px] font-[600] leading-[20px]'>Danh mục bài viết</h2>
        <Link to={path.addtopic}> <Button className="px-[8px] py-[10px] h-[32px] gap-[6px] bg-green rounded-[3px] flex items-center ">
          <img src={Images.Add} alt="" className="w-[20px] h-[20px] object-cover" />
          <p className="text-white font-Roboto text-[16px] font-[400]">Bài viết mới</p>
        </Button></Link>
      </div>
      <div className='flex  items-center justify-between '>
        <div className='flex items-center'>
          <form className='flex items-center mr-[10px] cursor-pointer' onSubmit={handleSearch} >
            <Input type="text" className='border-2 border-[#9D9D9D] w-[300px] h-[32px]  px-[10px] outline-none font-Roboto text-[15px] ' value={nameSearch} onChange={e => setNameSearch(e.target.value)} />
            <Button className='w-[32px] h-[32px] rounded-[3px] border border-[#9D9D9D] bg-white flex items-center justify-center' >
              <img src={Images.Search} alt="" className='w-[18px] h-[18px] object-cover' />
            </Button>
          </form>
          <TippyFilter handleFilter={handleFilter} ObjectFilter={ObjectFilterTopic}
          />
        </div>
        <TippySort handleSort={handleSort} sort_by='post' title='bài viết' />
      </div>
      {
        isLoading ? <LoadingSkeleton /> : (
          <>
            <TablePost setCheckBox={setCheckBox} handleUpdatePost={handleUpdatePost} dataPost={(dataPost as GeneralType<PostType[]>)?.data} checkBox={checkBox} />
            {(dataPost as GeneralType<PostType[]>)?.data.length > 0 ?
              <Pagination total_page={dataPost?.total_page as number} currentPage={Number(query.page)} path={path.post} checkBox={checkBox} handleDeleteMany={handleDeleteManyPost} />
              : <NotItem path={path.post} />}
          </>
        )
      }
      {toggle && <OverNight handleDelete={handleDeletePost} />}
    </div>
  )
}

export default Posts