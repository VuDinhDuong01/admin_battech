import { useContext } from "react"

import { Theme } from "~/hook"
import { CustomCheckAll, CustomCheckBox } from "~/hook/useCheckBox"
import { TagType } from "~/types/index.types"
import { Images } from '~/utils'
interface TableTagType {
  handleUpdateTag: (topic: string) => void,
  dataTag: TagType[]
  checkBox: string[]

  setCheckBox: React.Dispatch<React.SetStateAction<string[]>>
}

export const TableTag = ({ handleUpdateTag, dataTag, checkBox, setCheckBox }: TableTagType) => {
  const { setToggle, setIdDelete } = useContext(Theme)
  const handleCheckAll = () => {
    CustomCheckAll({ checkBox, setCheckBox, data: dataTag })
  }
  const handleCheckBox = (_id: string) => {
    CustomCheckBox({_id,setCheckBox, checkBox})
  }
  return (
    <table className=" border mt-[16px]  w-full table-fixed border-collapse border border-gray-300">
      <thead>
        <tr className="bg-green h-[45px] w-full flex ">
          <th className="w-[50px] border  flex items-center justify-center"><input type="checkbox" checked={dataTag.length === checkBox.length && checkBox.length !== 0} onChange={handleCheckAll} className="w-[15px] h-[15px] rounded-[3px] bg-[#fff]" /></th>
          <th className='flex-1 custom-class-table-th-post'>Tag</th>
          <th className='md:w-[15%] 2xl:w-[10%] custom-class-table-th-post'>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {
          dataTag?.map((tag, index) => {
            return <tr className="  w-full flex" key={index}>
              <td className="w-[50px] border  flex items-center justify-center"><input type="checkbox" className="w-[15px] h-[15px] rounded-[3px] bg-[#fff]" checked={checkBox.includes(tag._id)}
                onChange={() => handleCheckBox(tag._id)} /></td>
              <td className='flex-1 custom-class-table-td-post '>{tag.tag}</td>
              <td className='md:w-[15%] 2xl:w-[10%] custom-class-table-td-post pl-0 justify-center'>
                <img src={Images.CopyImage} alt="" className="w-[20px] h-[20px] cursor-pointer" />
                <img src={Images.UpdateImage} alt="" className="w-[20px] h-[20px] 2xl:mx-[10px] md:mx-[5px] cursor-pointer" onClick={() => handleUpdateTag(tag._id)} />
                <img src={Images.deleteImage} alt="" className="w-[20px] h-[20px] cursor-pointer" onClick={() => {
                  setIdDelete(tag._id)
                  setToggle(true)
                }} />
              </td>
            </tr>
          })
        }

      </tbody>
    </table>
  )
}
