
import { CiCircleRemove } from 'react-icons/ci'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import clsx from 'clsx'

import { FormLogin } from '~/components/FormLogin/FormLogin'
import { SchemaType, schema, Images } from '~/utils/index'
import { resetPasswordApi } from '~/apis/resetpassword.apis'
import { Theme } from '~/hook'
import { HelmetAsync } from '~/components/Helmet/Helmet'

const Login = () => {
  const { toggle, setToggle } = useContext(Theme)
  const navigate = useNavigate()
  const schemaForgotPassword = schema.pick(['email'])
  const { register, handleSubmit, formState: { errors }, setError } = useForm<Pick<SchemaType, 'email'>>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schemaForgotPassword),
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: string) => resetPasswordApi.forgotPassword(body)
  })
  const onSubmit = handleSubmit((data) => {
    if (!isLoading) {
      mutate(data.email, {
        onSuccess: (data) => {
          navigate(`/reset_password/${data.data._id}`)
        },
        onError: (error) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errorEmail = (error as any).response.data.data
          for (const key in errorEmail) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError(key as any, { type: 'server', message: errorEmail[key] })
          }
        }
      })
    }
  })


  return (
    <div className="w-full h-[100vh] m-auto bg-[#F0F6FF] relative">
       <HelmetAsync  title='Đăng nhập' />

      <div className="md:left-[50%] absolute md:translate-x-[-50%]  2xl:top-[94px] 2xl:w-[1225px] w-[100px] md:w-full md:h-[811px] w-full h-full  ">
        <img src={Images.img_login} alt="img_login" className="w-full h-full md:object-contain object-cover" />
      </div>
      <FormLogin />
      {
        toggle && <div className='bottom-0 fixed left-0 right-0 top-0 px-[10px]  bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
          <div className='md:w-[500px] w-[400px]  md:px-0 h-[275px]   bg-white '>
            <CiCircleRemove size={30} className='mt-[10px] ml-[10px] cursor-pointer' onClick={() => setToggle(false)} />
            <h2 className='text-[#000] text-[25px] font-Roboto font-[500] flex  items-center justify-center mb-[30px]'>Forgot Password</h2>
            <form className='w-full flex items-center justify-center' onSubmit={onSubmit}>
              <div className='flex flex-col'>
                <input type="text" className='md:w-[340px] px-[8px] w-[300px] h-[40px] border-2 outline-none block flex   text-[black] text-[16px] font-Roboto ' placeholder='Nhập email của bạn' {...register('email')} />
                {
                  errors.email && <span className='text-[red] text-[16px] font-Roboto mt-[3px]'>{errors.email?.message}</span>
                }
                <button className={
                  clsx({
                    ['md:w-[340px] w-[300px] h-[40px] bg-[#F27024] text-white font-Roboto text-[20px] mt-[24px] flex items-center justify-center']: true,
                    ['cursor-not-allowed']: isLoading
                  })
                }>NEXT {isLoading && <div
                  className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-r-transparent  motion-reduce:animate-[spin_1.5s_linear_infinite] ml-[10px]"
                  role="status">
                </div>}</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>

  )
}

export default Login