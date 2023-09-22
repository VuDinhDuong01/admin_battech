import { useContext } from "react"

import { Theme } from "~/hook"
import { AuthorType } from "~/types/author.types"
import { Images } from "~/utils"

interface TableAuthorType {
  handleUpdateAuthor: (author_id: string) => void,
  dataAuthor: AuthorType[]
  checkBox: string[]

  setCheckBox: React.Dispatch<React.SetStateAction<string[]>>
}

export const TableAuthor = ({ handleUpdateAuthor, dataAuthor,checkBox,setCheckBox }: TableAuthorType) => {
  const { setToggle, setIdDelete } = useContext(Theme)
  const handleCheckAll = () => {
    if (dataAuthor.length === checkBox.length && dataAuthor.length !== 0) {
      setCheckBox([])
    } else {
      setCheckBox(dataAuthor.map(item => item._id))
    }
  }
  const handleCheckBox = (_id: string) => {
    setCheckBox(prev => {
      const checked = checkBox.includes(_id)
      if (checked) {
        return prev.filter(item => item !== _id)
      } else {
        return [...prev, _id]
      }
    })
  }
  
  return (
    <table className=" border mt-[16px]  w-full table-fixed border-collapse border border-gray-300">
      <thead>
        <tr className="bg-green h-[45px] w-full flex ">
          <th className="w-[50px] border  flex items-center justify-center"><input type="checkbox" className="w-[15px] h-[15px] rounded-[3px] bg-[#fff]" checked={dataAuthor.length === checkBox.length && checkBox.length !== 0} onChange={handleCheckAll} /></th>
          <th className='flex-1 custom-class-table-th-post'>Tên tác giả</th>
          <th className='md:w-[15%] 2xl:w-[10%] custom-class-table-th-post'>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {
          dataAuthor?.map((author, index) => {
            return <tr className=" w-full flex" key={index}>
              <td className="w-[50px] border  flex items-center justify-center "><input type="checkbox" className="w-[15px] h-[15px] rounded-[3px] bg-white"  checked={checkBox.includes(author._id)}
                onChange={() => handleCheckBox(author._id)} /></td>
              <td className='flex-1 custom-class-table-td-post '>{author.author}</td>
              <td className='md:w-[15%] 2xl:w-[10%] custom-class-table-td-post pl-0 justify-center'>
                <img src={Images.CopyImage} alt="" className="w-[20px] h-[20px] cursor-pointer" />
                <img src={Images.UpdateImage} alt="" className="w-[20px] h-[20px] 2xl:mx-[10px] md:mx-[5px] cursor-pointer" onClick={() => handleUpdateAuthor(author._id)} />

                <img src={Images.deleteImage} alt="" className="w-[20px] h-[20px] cursor-pointer" onClick={() => {
                  setIdDelete(author._id)
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
