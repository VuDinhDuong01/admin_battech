
import { getHouse } from '~/utils'
import { SelectOption } from '../Select/Select';

interface SelectType {
  value: string
  label: string
}
interface InformationType {
  information: { topic: string, author: string, tag: string }
  setInformation: React.Dispatch<React.SetStateAction<{ topic: string; author: string; tag: string; }>>,
  dataTag: SelectType[]
  dataAuthor: SelectType[]
  dataTopic: SelectType[]
}

export const SelectPost = ({ information, setInformation, dataTag, dataAuthor, dataTopic }: InformationType) => {

  return (
    <div className='2xl:w-[320px] md:w-auto h-[340px] rounded-[5px] border border-[#E3E5E8] bg-white'>
      <div className='2xl:w-full h-[37px] flex items-center text-black font-Roboto text-[16px] font-[700] pl-[13px] border-b-2'>Thông tin</div>
      <SelectOption className="mb-[11px] w-full" value={information.topic} onChange={e =>
        setInformation(prev => ({ ...prev, topic: e.target.value }))} title='Chủ đề' ObjectData={dataTopic}
      />
      <SelectOption onChange={e => setInformation(prev => ({ ...prev, author: e.target.value }))}
        value={information.author}
        title='Tác giả'
        ObjectData={dataAuthor}
        className="mb-[11px]"
      />
      <SelectOption
        onChange={e => setInformation(prev => ({ ...prev, tag: e.target.value }))}
        value={information.tag}
        title='tag'
        ObjectData={dataTag}
        className='pb-[11px] border-b-2 border-b-[#E3E5E8] '
      />
      <div className='flex items-center justify-between px-[13px] py-[14px]' >
        <p className='text-black font-Roboto text-[16px] leading-[35px]'>Ngày viết:</p>
        <p className='font-Roboto text-[16px] font-[500] leading-[35px]'>{getHouse()}</p>
      </div>
    </div>
  )
}
