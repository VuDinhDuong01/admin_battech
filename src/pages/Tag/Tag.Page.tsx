import { useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { Pagination } from '~/components/Pagination/Pagination'
import { path } from '~/contants/path'
import { QueryType, useQueryString, Theme } from '~/hook/index'
import { OverNight } from '~/components/OverNight/OverNight'
import { GeneralType, TagType } from '~/types/index.types'
import { Images, customHandle, ObjectFilterTag } from '~/utils/index'
import { Button } from '~/components/Button/Button'
import { NotItem } from '~/components/NotItem/NotItem'
import { TippySort } from '~/components/TippySort/TippySort'
import { Input } from '~/components/Input/Input'
import { tagApi } from '~/apis'
import { TableTag } from '~/components/TableTag/TableTag'
import { TippyFilter } from '~/components/TippyFilter/TippyFilter'
import { LoadingSkeletonTag } from '~/components/LoadingSkeleton'
import { HelmetAsync } from '~/components/Helmet/Helmet'

const Tag = () => {

  const [checkBox, setCheckBox] = useState<string[]>([])
  const [nameSearch, setNameSearch] = useState<string>('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const query: QueryType = useQueryString()
  const { toggle, setToggle } = useContext(Theme)

  const { data: dataTag, isLoading } = useQuery({
    queryKey: ['getAllTag', query],
    queryFn: () => tagApi.getAllTag(query),
  })

  const handleUpdateTag = (tag_id: string) => {
    const getTag = dataTag && dataTag.data.find((item: TagType) => item._id === tag_id)
    navigate(path.addtag, {
      state: {
        tag_id: tag_id,
        tag: getTag
      }
    })
  }
  const deleteTagMutation = useMutation({
    mutationFn: (tag_id: string) => tagApi.deleteTag(tag_id)
  })

  const handleDeleteTag = (tag_id: string) => {
    deleteTagMutation.mutate(tag_id, {
      onSuccess: () => {
        setToggle(false)
        queryClient.refetchQueries(['getAllTag']);
      }
    })
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const customSearch = customHandle({ name: nameSearch, page: '1', query, navigate, pathname: path.tag })
    customSearch()
  }

  const handleSort = ({ order, sort_by = 'tag' }: { order: string, sort_by: string }) => {
    const customSort = customHandle({ order, page: query.page as string, sort_by, name: 'name', query, navigate, pathname: path.tag })
    customSort()
  }

  const handleFilter = ({ name, page = '1' }: { name: string, page?: string }) => {
    const customFilter = customHandle({ name, page, query, navigate, pathname: path.tag })
    customFilter()
  }


  const { mutate } = useMutation({
    mutationFn: (body: string[]) => tagApi.deleteManyTag(body)
  })

  const handleDeleteManyTag = () => {
    if (checkBox.length > 0) {
      mutate(checkBox, {
        onSuccess: () => {
          queryClient.invalidateQueries(['getAllTag'])
          setCheckBox([])
        }
      })
    }
  }
  return (
    <div className='h-screen 2xl:px-[15px] md:px-[10px] w-full mt-[26px] min-h-screen overflow-scroll '>
       <HelmetAsync title="Tag" />
      <div className='flex  items-center justify-between mb-[18px] '>
        <h2 className='text-black font-Roboto text-[24px] font-[600] leading-[20px]'>Tag</h2>
        <Link to={path.addtag}><Button className="px-[8px] py-[10px] h-[32px] gap-[6px] bg-green rounded-[3px] flex items-center ">
          <img src={Images.Add} alt="" className="w-[20px] h-[20px] object-cover" />
          <p className="text-white font-Roboto text-[16px] font-[400]">Thêm tag</p>
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
          <TippyFilter ObjectFilter={ObjectFilterTag} handleFilter={handleFilter} />
        </div>
        <TippySort handleSort={handleSort} sort_by='tag' title='tag' />
      </div>
      {
        isLoading ? <LoadingSkeletonTag /> : (<><TableTag setCheckBox={setCheckBox} handleUpdateTag={handleUpdateTag} dataTag={(dataTag as GeneralType<TagType[]>)?.data} checkBox={checkBox} />
          {(dataTag as GeneralType<TagType[]>)?.data?.length > 0 ? <Pagination total_page={dataTag?.total_page as number} currentPage={Number(query.page)} path={path.tag} checkBox={checkBox} handleDeleteMany={handleDeleteManyTag} /> : <NotItem path={path.tag} />}</>)
      }
      {toggle && <OverNight handleDelete={handleDeleteTag} />}
    </div>
  )
}

export default Tag

