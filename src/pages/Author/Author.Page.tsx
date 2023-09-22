import { useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { Pagination } from '~/components/Pagination/Pagination'
import { path } from '~/contants/path'
import { QueryType, useQueryString, Theme } from '~/hook/index'
import { OverNight } from '~/components/OverNight/OverNight'
import { AuthorType, GeneralType } from '~/types/index.types'
import { Images, customHandle, ObjectFilterAuthor } from '~/utils/index'
import { Button } from '~/components/Button/Button'
import { NotItem } from '~/components/NotItem/NotItem'
import { TippySort } from '~/components/TippySort/TippySort'
import { Input } from '~/components/Input/Input'
import { authorApi } from '~/apis'
import { TableAuthor } from '~/components/TableAuthor/TableAuthor'
import { TippyFilter } from '~/components/TippyFilter/TippyFilter'
import { LoadingSkeletonAuthor } from '~/components/LoadingSkeleton'
import { HelmetAsync } from '~/components/Helmet/Helmet'

const Author = () => {
  
  const [checkBox, setCheckBox] = useState<string[]>([])
  const [nameSearch, setNameSearch] = useState<string>('')
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const query: QueryType = useQueryString()
  const { toggle, setToggle } = useContext(Theme)

  const { data: dataAuthor, isLoading } = useQuery({
    queryKey: ['getAllAuthor', query],
    queryFn: () => authorApi.getAllAuthor(query)
  })
  const deleteAuthorMutation = useMutation({
    mutationFn: (author_id: string) => authorApi.deleteAuthor(author_id)
  })

  const handleDeleteAuthor = (author_id: string) => {
    deleteAuthorMutation.mutate(author_id, {
      onSuccess: () => {
        setToggle(false)
        queryClient.invalidateQueries(['getAllAuthor'])
      }
    })
  }

  const handleUpdateAuthor = (author_id: string) => {
    const getAuthor = dataAuthor && dataAuthor.data.find((item) => item._id === author_id)
    navigate(path.addauthor, {
      state: {
        author_id: author_id,
        author: getAuthor
      }
    })
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const customSearch = customHandle({ name: nameSearch, page: '1', query, navigate, pathname: path.author })
    customSearch()
  }
  const handleSort = ({ order, sort_by = 'author' }: { order: string, sort_by: string }) => {
    const customSort = customHandle({ order, page: query.page as string, sort_by, name: 'name', query, navigate, pathname: path.author })
    customSort()
  }
  const handleFilter = ({ name, page = '1' }: { name: string, page?: string }) => {
    const customFilter = customHandle({ name, page, query, navigate, pathname: path.author })
    customFilter()
  }

  const { mutate } = useMutation({
    mutationFn: (body: string[]) => authorApi.deleteManyAuthor(body)
  })

  const handleDeleteManyAuthor = () => {
    if (checkBox.length > 0) {
      mutate(checkBox, {
        onSuccess: () => {
          queryClient.invalidateQueries(['getAllAuthor'])
          setCheckBox([])
        }
      })
    }
  }
 
  return (
    <div className='h-screen  2xl:px-[15px] md:px-[10px] w-full mt-[26px] min-h-screen overflow-scroll '>
       <HelmetAsync  title='Tác giả' />
      <div className='flex  items-center justify-between mb-[18px] '>
        <h2 className='text-[#000] font-Roboto text-[24px] font-[600] leading-[20px]'>Tác giả</h2>
        <Link to={path.addauthor}><Button className="px-[8px] py-[10px] h-[32px] gap-[6px] bg-green rounded-[3px] flex items-center ">
          <img src={Images.Add} alt="" className="w-[20px] h-[20px] object-cover" />
          <p className="text-white font-Roboto text-[16px] font-[400]">Thêm tác giả</p>
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
          <TippyFilter ObjectFilter={ObjectFilterAuthor} handleFilter={handleFilter} />
        </div>
        <TippySort handleSort={handleSort} sort_by='author' title='tác giả' />
      </div>

      {
         isLoading ? <LoadingSkeletonAuthor /> : (<>
          <TableAuthor setCheckBox={setCheckBox} handleUpdateAuthor={handleUpdateAuthor} dataAuthor={(dataAuthor as GeneralType<AuthorType[]>)?.data} checkBox={checkBox} />
          {(dataAuthor as GeneralType<AuthorType[]>)?.data.length > 0 ? <Pagination total_page={dataAuthor?.total_page as number} currentPage={Number(query.page)} path={path.author} checkBox={checkBox} handleDeleteMany={handleDeleteManyAuthor} /> : <NotItem path={path.author} />}
        </>)
      }
      {toggle && <OverNight handleDelete={handleDeleteAuthor} />}
    </div>
  )
}
export default Author
