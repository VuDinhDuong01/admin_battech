import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from "~/components/Sidebar/Sidebar"

const MainLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className='w-full flex '>
      <div className='2xl:w-[260px] md:w-[180px] w-[100px]'><Sidebar /></div>
      <div className='flex-1 md:flex-1  bg-[#F0F6FF] w-full '>
        {children}
        <Outlet />
      </div>
    </div>
  )
}
export default MainLayout
