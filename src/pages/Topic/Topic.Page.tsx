import { useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { Pagination } from '~/components/Pagination/Pagination'
import { path } from '~/contants/path'
import { QueryType, useQueryString, Theme } from '~/hook/index'
import { topicApi } from '~/apis/topic.apis'
import { OverNight } from '~/components/OverNight/OverNight'
import { GeneralType, TopicType } from '~/types/index.types'
import { Images, customHandle, ObjectFilterTopic } from '~/utils/index'
import { Button } from '~/components/Button/Button'
import { NotItem } from '~/components/NotItem/NotItem'
import { TableTopic } from '~/components/TableTopic/TableTopic'
import { TippySort } from '~/components/TippySort/TippySort'
import { Input } from '~/components/Input/Input'
import { TippyFilter } from '~/components/TippyFilter/TippyFilter'
import { LoadingSkeletonTopic } from '~/components/LoadingSkeleton'
import { HelmetAsync } from '~/components/Helmet/Helmet'

const Topic = () => {
  const [checkBox, setCheckBox] = useState<string[]>([])
  const [nameSearch, setNameSearch] = useState<string>('')
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const query: QueryType = useQueryString()
  const { toggle ,setToggle} = useContext(Theme)

  const { data: dataTopic,isLoading } = useQuery({
    queryKey: ['getAllTopic', query],
    queryFn: () => topicApi.getAllTopic(query),
  })

  const deleteTopicMutation = useMutation({
    mutationFn: (topic_id: string) => topicApi.deleteTopic(topic_id)
  })

  const handleDeleteTopic = (topic_id: string) => {
    deleteTopicMutation.mutate(topic_id, {
      onSuccess: () => {
        setToggle(false)
        queryClient.invalidateQueries(['getAllTopic'])
      }
    })
  }

  const handleUpdateTopic = (topic_id: string) => {
    const getTopic = dataTopic && dataTopic.data.find((item: TopicType) => item._id === topic_id)
    navigate(path.addpost, {
      state: {
        topic_id: topic_id,
        topic: getTopic
      }
    })
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const customSearch = customHandle({ name: nameSearch, page: '1', query, navigate, pathname: path.topic })
    customSearch()
  }

  const handleSort = ({ order, sort_by = 'topic' }: { order: string, sort_by: string }) => {
    const customSort = customHandle({ order, page: query.page as string, sort_by, name: 'name', query, navigate, pathname: path.topic })
    customSort()
  }

  const handleFilter = ({ name, page = '1' }: { name: string, page?: string }) => {
    const customFilter = customHandle({ name, page, query, navigate, pathname: path.topic })
    customFilter()
  }

  const { mutate } = useMutation({
    mutationFn: (body: string[]) => topicApi.deleteManyTopic(body)
  })
  
  const handleDeleteManyTopic = () => {
    if (checkBox.length > 0) {
      mutate(checkBox, {
        onSuccess: () => {
          queryClient.invalidateQueries(['getAllTopic'])
          setCheckBox([])
        }
      })
    }

  }
  return (
    <div className='h-screen  2xl:px-[15px] md:px-[5px] w-full mt-[26px] min-h-screen overflow-scroll'>
       <HelmetAsync title="Chủ đề" />
      <div className='flex  items-center justify-between mb-[18px] '>
        <h2 className='text-black font-Roboto text-[24px] font-[600] leading-[20px]'>Bài viết</h2>
        <Link to={path.addpost}> <Button className="px-[8px] py-[10px] h-[32px] gap-[6px] bg-green rounded-[3px] flex items-center ">
          <img src={Images.Add} alt="" className="w-[20px] h-[20px] object-cover" />
          <p className="text-[#fff] font-Roboto text-[16px] font-[400]">Thêm bài viết </p>
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
        <TippySort handleSort={handleSort} sort_by='topic' title='Bài viết' />
      </div>
      {
        isLoading ?  <LoadingSkeletonTopic /> : (<> <TableTopic setCheckBox={setCheckBox} handleUpdateTopic={handleUpdateTopic} dataTopic={(dataTopic as GeneralType<TopicType[]>)?.data}  checkBox={checkBox} />
          {(dataTopic as GeneralType<TopicType[]>)?.data?.length > 0 ? <Pagination total_page={dataTopic?.total_page as number} currentPage={Number(query.page)} path={path.topic} checkBox={checkBox} handleDeleteMany={handleDeleteManyTopic} /> : <NotItem path={path.topic}   />}</>)
      }
      
      {toggle && <OverNight handleDelete={handleDeleteTopic} />}
    </div>
  )
}

export default Topic
