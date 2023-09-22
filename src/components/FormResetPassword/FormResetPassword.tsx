import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useContext } from 'react'

import styles from '~/customStyle.module.css'

import { SchemaType, UNPROCESSABLEENTITYError, schema, Images } from "~/utils/index"
import { path } from '~/contants/path'
import { InputForm } from "~/components/Input/index"
import { Button } from "../Button/Button"
import { resetPasswordApi } from "~/apis/resetpassword.apis"
import { Theme } from "~/hook"

export const FormResetPassword = () => {
  const { id } = useParams()

  const { setToggle } = useContext(Theme)
  const navigate = useNavigate()
  const schemaResetPassword = schema.pick(['confirm_password', 'new_password'])
  const { register, handleSubmit, formState: { errors }, setError } = useForm<Pick<SchemaType, 'new_password' | 'confirm_password'>>({
    defaultValues: {
      new_password: '',
      confirm_password: '',
    },
    resolver: yupResolver(schemaResetPassword),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (body: { new_password: string, confirm_password: string, _id: string }) => resetPasswordApi.resetPassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    const ObjectData = { ...data, _id: id as string }
    if (!isLoading) {
      mutate(ObjectData, {
        onSuccess: (data) => {
          console.log(data)
          setToggle(false)
          navigate(path.login)
        },
        onError: (error) => {
          console.log(error)
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
    <div>
      <form className={clsx(styles.boxShadow, {
        ["md:w-[508px] w-[95%]  pb-[50px] rounded-[25px] bg-white  absolute left-[50%] 2xl:translate-x-[-44%] md:translate-x-[-50%] translate-x-[-50%]  top-[50%] translate-y-[-50%] md:translate-y-0 md:top-[215px]"]: true,
      })} onSubmit={onSubmit}>
        <div className='md:w-[346px] w-[300px] md:h-[127px] h-[100px] mt-[58px] mb-[60px] flex items-center justify-center m-auto'>
          <img src={Images.img_logo_battech} alt='logo' className='w-full h-full object-cover flex items-center justify-center' />
        </div>
        <div className='md:px-[44px] px-[20px]'>
          <h2 className='text-black  md:text-[30px] text-[20px] font-[700] leading-[45px] font-Roboto'>Thay đổi mật khẩu</h2>
          <InputForm
            classNameDiv="mt-[20px] mb-[20px]"
            className={clsx(styles.border, { ['md:w-[420px] pl-[15px] w-full h-[50px] rounded-[25px]  md:px-[15px]']: true })}
            errorMessage={errors.new_password?.message as string}
            register={register}
            name='new_password'
            labelTitle="Mật khẩu mới"
            type='password'

          />

          <InputForm
            classNameDiv="mt-[20px] mb-[20px]"
            className={clsx(styles.border, { ['md:w-[420px] w-full h-[50px] rounded-[25px] pl-[15px] pr-[15px] ']: true })}
            errorMessage={errors.confirm_password?.message as string}
            register={register}
            name='confirm_password'
            labelTitle="Xác nhận lại mật khẩu"
            type='password'

          />
          <Button className={clsx({
            ['cursor-not-allowed']: isLoading,
            ["flex items-center justify-center  text-white text-[20px] font-[700] leading-[24px] md:w-[420px] h-[50px] w-full rounded-[25px] bg-[#F27024] font-Roboto"]: true,

          })}>NEXT {isLoading && <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ml-[10px]"
            role="status">
          </div>}</Button>
        </div>
      </form>
    </div>
  )
}
