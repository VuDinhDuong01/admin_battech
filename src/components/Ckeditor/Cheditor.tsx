import clsx from 'clsx'
import ReactQuill from 'react-quill'
import { Controller, Control } from 'react-hook-form'

import { Images } from '~/utils'
import styles from '~/customStyle.module.css'
interface CheditorType {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
}
export const Cheditor = ({ control, name }: CheditorType) => {
  return (
    <div className='px-[16px]'>
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <ReactQuill
            value={field.value}
            onChange={field.onChange}
            className={clsx(styles.customQuill, {
              ['h-[507px] font-Roboto text-[16px]']: true
            })}
          />
        )}
      />
       <div className='w-full 2xl:h-[45px] md:h-[70px] relative'>
        <div className='w-full h-full bg-[#E3E5E8] flex items-center'></div>
        <div className=' flex items-center  absolute top-[50%] right-[10px] translate-y-[-50%]'>
          <p className='text-[#000] font-Roboto text-[16px] mr-[4px]'>Mở rộng</p>
          <img src={Images.Arow} alt='Arow' className='w-[20px] h-[20px] object-cover' />
        </div>
      </div> 
    </div>
  )
}
