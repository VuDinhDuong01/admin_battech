import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react'

import { userApi } from "~/apis"
import styles from '~/customStyle.module.css'
import { Theme } from "~/hook"
import { UserType } from "~/types/user.types"
import { SchemaType, UNPROCESSABLEENTITYError, schema, Images } from "~/utils/index"
import { path } from '~/contants/path'
import { InputForm, Input } from "~/components/Input/index"
import { Button } from "../Button/Button"

export const FormLogin = () => {
  const { setProfile, setAuthentication, setToggle } = useContext(Theme)
  const navigate = useNavigate()
  const schemaLogin = schema.pick(['email', 'password'])
  const { register, handleSubmit, formState: { errors }, setError } = useForm<Pick<SchemaType, 'email' | 'password'>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schemaLogin),
  }
  )
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: Pick<UserType, 'password' | 'email'>) => userApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    if (!isLoading) {
      mutate(data, {
        onSuccess: (data) => {
          navigate(path.post)
          setAuthentication(true)
          setProfile(data.data.user)
        },
        onError: (error) => {
          if (UNPROCESSABLEENTITYError(error)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            for (const key in (error as any).response.data.data) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setError(key as any, { type: 'server', message: (error as any).response.data.data[key] });
            }
          }
        }
      })
    }
  })

  return (
    <div className="">
      <form className={clsx(styles.boxShadow, {
        ["md:w-[508px] w-[95%]  pb-[50px] rounded-[25px] bg-white  absolute left-[50%] 2xl:translate-x-[-44%] md:translate-x-[-50%] translate-x-[-50%]  top-[50%] translate-y-[-50%] md:translate-y-0 md:top-[215px]"]: true,
      })} onSubmit={onSubmit}>
        <div className='md:w-[346px] w-[300px] md:h-[127px] h-[100px] mt-[58px] mb-[60px] flex items-center justify-center m-auto'>
          <img src={Images.img_logo_battech} alt='logo' className='w-full h-full object-cover flex items-center justify-center' />
        </div>
        <div className='md:px-[44px] px-[20px]'>
          <h2 className='text-black  md:text-[30px] text-[20px] font-[700] leading-[45px] font-Roboto'>Đăng nhập tài khoản</h2>
          <InputForm
            classNameDiv="mt-[20px] mb-[20px]"
            className={clsx(styles.border, { ['md:w-[420px] pl-[15px] w-full h-[50px] rounded-[25px]  md:px-[15px]']: true })}
            errorMessage={errors.email?.message as string}
            register={register}
            name='email'
            labelTitle="Email"

          />

          <InputForm
            classNameDiv="mt-[20px] mb-[20px]"
            className={clsx(styles.border, { ['md:w-[420px] w-full h-[50px] rounded-[25px] pl-[15px] pr-[15px] ']: true })}
            errorMessage={errors.password?.message as string}
            register={register}
            name='password'
            type='password'
            labelTitle="Mật khẩu"

          />
          <div className='flex items-center justify-between mb-[26px] mt-[20px]'>
            <div className='flex items-center'>
              <Input type="checkbox" className={clsx(styles.border, {
                ['w-[20px] h-[20px] rounded-[5px] mr-[7px] pl-[15px] pr-[15px]']: true
              })} />
              <p className="text-black text-center text-[16px] font-[400] leading-[24px] font-Roboto">Nhớ mật khẩu</p>
            </div>
            <Link to='/' className="text-[16px] text-[#0070EA] leading-[24px] underline font-Roboto " onClick={() => setToggle(true)}>Quên mật khẩu</Link>
          </div>

          <Button className={clsx({
            ['cursor-not-allowed']: isLoading,
            ["flex items-center justify-center  text-white text-[20px] font-[700] leading-[24px] md:w-[420px] h-[50px] w-full rounded-[25px] bg-[#F27024] font-Roboto"]: true,

          })}>Đăng nhập {isLoading && <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ml-[10px]"
            role="status">
          </div>}</Button>
        </div>
      </form>
    </div>
  )
}
