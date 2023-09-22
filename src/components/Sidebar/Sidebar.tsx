import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'

import { Theme } from '~/hook/useContext'
import { path } from '~/contants/path'
import { userApi } from '~/apis'
import { Button } from '../Button/Button'
import { Images } from '~/utils/Image'

export const Sidebar = () => {
  const { profile, setAuthentication, setProfile } = useContext(Theme)
  const navigate = useNavigate()
  const [toggle, setToggle] = useState<boolean>(true)


  const location = useLocation()
  const handleToggle = () => {
    setToggle(prev => !prev)

  }
  localStorage.setItem('toggle', JSON.stringify(toggle))
  const LogoutMutation = useMutation({
    mutationFn: () => userApi.logout()
  })

  const handleLogout = () => {
    LogoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate(path.login)
        setAuthentication(false)
        setProfile(null)
      }
    })
  }
  const toggleStorage = JSON.parse(localStorage.getItem('toggle') as string)
  return (
    <div className="2xl:w-[260px] md:w-[180px]  bg-[#2A3444] fixed top-0 lef-0 bottom-0">
      <div>
        <div className='2xl:w-full md:w-full h-[124px] shrink-0 bg-green flex items-center justify-center mb-[33px]'>
          <img src={Images.Logo} alt="logo" className="2xl:w-[187px] 2xl:h-[75px] md:w-[130px] md:h-[50px] object-cover flex items-center justify-center" />
        </div>
        <div className='px-[25px]'>
          <div className="flex items-center justify-between  cursor-pointer py-[15px]"
            onClick={handleToggle}
          >
            <div className="flex items-center">
              <img src={Images.Notepad} alt="img_notepad" className='w-[24px] h-[24px] shrink-0 object-cover mr-[10px]' />
              <p className="text-white font-Roboto text-[16px] font-[600]">Viết bài</p>
            </div>
            {
              toggleStorage ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 font-bold text-white" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                : <img src={Images.Check} alt="img_check" />
            }
          </div>
          {
            toggleStorage &&
            (<ul className="text-[white] font-Roboto text-[16px] mb-[20px] animate-slideBottom">
              <li className={clsx({
                ['py-[10px]  rounded-[5px] ']: true,
                ['bg-[#3F4D63]']: location.pathname === path.post || location.pathname === path.addtopic
              })}><Link to={path.post} className='pl-[30px]'>Bài viết</Link></li>
              <li className={clsx({
                ['py-[10px]  rounded-[5px] ']: true,
                ['bg-[#3F4D63]']: location.pathname === path.topic || location.pathname === path.addpost
              })}><Link to={path.topic} className='pl-[30px]'>Chủ đề</Link></li>
              <li className={clsx({
                ['py-[10px]  rounded-[5px] ']: true,
                ['bg-[#3F4D63]']: location.pathname === path.author || location.pathname === path.addauthor
              })}><Link to={path.author} className='pl-[30px]'>Tác giả</Link></li>
              <li className={clsx({
                ['py-[10px]  rounded-[5px] ']: true,
                ['bg-[#3F4D63]']: location.pathname === path.tag || location.pathname === path.addtag
              })}><Link to={path.tag} className='pl-[30px]'>Tag</Link></li>
            </ul>)
          }

          <div className="flex items-center  cursor-pointer py-[15px]">
            <div className="flex items-center">
              <img src={Images.Image} alt="image" className='w-[24px] h-[24px] shrink-0 object-cover mr-[10px]' />
              <p className="text-white font-Roboto text-[16px] font-[600]">Ảnh</p>
            </div>
          </div>
          <div className="flex items-center mb-[33px] cursor-pointer py-[15px]">
            <div className="flex items-center">
              <img src={Images.Setting} alt="image" className='w-[24px] h-[24px] shrink-0 object-cover mr-[10px]' />
              <p className="text-white font-Roboto text-[16px] font-[600] ]">Cài đặt</p>
            </div>
          </div>
        </div>
        <div className='2xl:ml-[15px] fixed 2xl:bottom-[15px] md:bottom-0 md:w-[180px] md:flex md:flex-col md:justify-center md:items-center 2xl:justify-start 2xl:items-start '>
          <div className='mb-[15px] flex items-center'>
            <img src={profile ? 'https://tse4.mm.bing.net/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&pid=Api&P=0&h=180' : Images.Avatar} alt="" className='w-[40px] h-[40px] shrink-0 rounded-[40px] mr-[11px]' />
            <div>
              <h3 className='text-white font-Roboto text-[16px] font-[600] '>{profile?.username}</h3>
              <p className='text-[#939393] font-Roboto text-[14px] font-[400] '>Admin</p>
            </div>
          </div>
          <Button className='2xl:w-[230px]  md:w-[100%] md:m-auto 2xl:m-0 h-[40px] shrink-0 rounded-[5px] bg-[#3F4D63] flex items-center' onClick={handleLogout}>
            <img src={Images.Logout} alt="" className="w-[19px] h-[25px] shrink-0  mr-[11px] ml-[12px]" />
            <p className='text-white font-Roboto text-[16px] leading-[40px]'>Log out</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
