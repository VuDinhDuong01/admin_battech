import { useRef, useState } from "react"

import { Images } from "~/utils"

export const UploadImage = ({post_id}:{post_id:string}) => {
  console.log(post_id)
  const [image, setImage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const handleImage = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const urlFile = URL.createObjectURL(file as File)
      setImage(urlFile)
    } else {
      setImage('')
    }
  }
  console.log(image)
  return (
    <div className='col-span-1'>
      {
        image ? <img src={image} alt='' className='w-full h-[85px] object-cover' /> : <><label htmlFor="" className='flex items-center font-Roboto text-[16px] text-[#393939] mt-[8px]'>Ảnh</label>
          <div className="h-[85px] w-full rounded-[3px] border border-[#E3E5E8] bg-white text-black font-Roboto text-[16px] leading-[35px]  px-[15px] outline-none flex items-center justify-center cursor-pointer" onClick={handleImage}>
            <div className=' w-full flex flex-col items-center justify-center m-auto'>
              <img src={Images.Upload_img} alt="" className="w-[24px] h-[24px] object-cover" />
              <div className='text-[#5B5B5B] font-Roboto text-[14px]'>Click để tải ảnh</div>
              <input className='text-[#5B5B5B] font-Roboto text-[14px] ' placeholder='Click để tải ảnh' type="file" hidden ref={inputRef} onChange={handleInputChange} />
            </div>
          </div></>
      }
    </div>
  )
}
