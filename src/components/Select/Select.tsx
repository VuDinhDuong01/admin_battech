
interface OptionType {
  value: string
  label: string
}

interface SelectType {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  title: string
  ObjectData: OptionType[],
  className: string
}

export const SelectOption = ({ value, onChange, title, ObjectData, className }: SelectType) => {

  return (
    <div className={className}>
      <p className='text-[#000] font-Roboto text-[16px] ml-[13px] my-[10px]'>{title}</p>
      <select name="" id="" className='2xl:w-[294px] md:w-[90%] h-[32px]   rounded-[3px] border border-[#E3E5E8] bg-white ml-[13px] outline-none text-black font-Roboto 2xl:text-[16px] 2xl:font-[500] 2xl:leading-[35px]'
        onChange={onChange}
        value={value}
      >
        {
          ObjectData?.map((option, index) => {
            return <option value={option.label} key={index} className='custom-class-option'>{option.value}</option>
          })
        }
      </select>

    </div>

  )
}
