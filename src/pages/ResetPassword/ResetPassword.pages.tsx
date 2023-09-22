import { FormResetPassword } from "~/components/FormResetPassword/FormResetPassword"
import { HelmetAsync } from "~/components/Helmet/Helmet"
import { Images } from "~/utils"


export const ResetPassword = () => {
  return (
    <div className="w-full h-[100vh] m-auto bg-[#F0F6FF] relative">
      <HelmetAsync title="Thay đổi mật khẩu" />
      <div className="md:left-[50%] absolute md:translate-x-[-50%]  2xl:top-[94px] 2xl:w-[1225px] w-[100px] md:w-full md:h-[811px] w-full h-full  ">
        <img src={Images.img_login} alt="img_login" className="w-full h-full md:object-contain object-cover" />
      </div>
      <FormResetPassword /> 
    </div>

  )
}
