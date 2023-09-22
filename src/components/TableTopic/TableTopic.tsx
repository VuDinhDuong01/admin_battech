import { useContext } from "react"

import { Theme } from "~/hook"
import { TopicType } from "~/types/topic.types"
import { Images } from "~/utils/Image"


interface TableTopicType {
  handleUpdateTopic: (topic: string) => void,
  dataTopic: TopicType[]
  checkBox: string[]
  setCheckBox: React.Dispatch<React.SetStateAction<string[]>>
}
export const TableTopic = ({ handleUpdateTopic, dataTopic, setCheckBox, checkBox }: TableTopicType) => {
  const { setToggle, setIdDelete } = useContext(Theme)
  const handleCheckAll = () => {
    if (dataTopic.length === checkBox.length && dataTopic.length !== 0) {
      setCheckBox([])
    } else {
      setCheckBox(dataTopic.map(item => item._id))
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
          <th className="2xl:w-[50px] md:w-[30px] border  flex items-center justify-center">
            <input type="checkbox" className="w-[15px] h-[15px] rounded-[3px] bg-white" checked={dataTopic.length === checkBox.length && checkBox.length !== 0} onChange={handleCheckAll} />
          </th>
          <th className='2xl:w-[30%] md:w-[30%] custom-class-table-th-post '>Tên chủ đề</th>
          <th className='2xl:w-[30%px] md:w-[30%] custom-class-table-th-post '>Slug</th>
          <th className='2xl:w-[25%] md:w-[20%] custom-class-table-th-post '>Số bài viết</th>
          <th className='flex-1 md:flex-1 custom-class-table-th-post '>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {
          dataTopic?.map((topic, index) => {
            return <tr className="  w-full flex" key={index}>
              <td className="2xl:w-[50px] md:w-[30px] border  flex items-center justify-center">
                <input type="checkbox" className="w-[15px] h-[15px] rounded-[3px] bg-white" checked={checkBox.includes(topic._id)}
                  onChange={() => handleCheckBox(topic._id)} />
              </td>
              <td className='2xl:w-[30%] md:w-[30%] custom-class-table-td-post'>{topic.topic}</td>
              <td className='2xl:w-[30%] md:w-[30%] custom-class-table-td-post'>{topic.slug}</td>
              <td className='2xl:w-[25%] md:w-[20%] custom-class-table-td-post'>{topic?.result?.length > 0 ? `${topic?.result?.length} bài viết` : '_'}</td>
              <td className='flex-1 md:flex-1 custom-class-table-td-post pl-0 justify-center'>
                <img src={Images.CopyImage} alt="" className="w-[20px] h-[20px] cursor-pointer" />
                <img src={Images.UpdateImage} alt="" className="w-[20px] h-[20px] 2xl:mx-[10px] md:mx-[5px]  cursor-pointer" onClick={() => handleUpdateTopic(topic._id)} />
                <img src={Images.deleteImage} alt="" className="w-[20px] h-[20px] cursor-pointer" onClick={() => {
                  setIdDelete(topic._id)
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
