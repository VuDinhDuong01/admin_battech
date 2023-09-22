import { InferType } from 'yup';
import * as yup from "yup"

export const schema = yup.object({
  username: yup.string().required('Trường này không được để trống').min(1, 'Tối thiểu là 1 ký tự').max(30, 'Tối đa là 30 ký tự'),
  email: yup.string().required("Trường này không được để trống").email("Trường này phải nhập là email"),
  password: yup.string().required('Trường này không được để trống').min(5, 'mật khẩu phải nhập tối hiểu 5 ký tự').max(25, 'Mật khẩu nhập tối đa 25 ký tự'),
  topic: yup.string().required("Trường này không được để trống").min(1, 'Tối thiểu là 1 ký tự').max(50, 'Tối đa là 50 ký tự'),
  slug: yup.string().required("Trường này không được để trống").min(1, 'Tối thiểu là 1 ký tự').max(200, 'Tối đa là 200 ký tự'),
  post: yup.string().required("Trường này không được để trống").min(1, 'Tối thiểu là 1 ký tự').max(200, 'Tối đa là 200 ký tự'),
  describe: yup.string().required("Trường này không được để trống").min(1, 'Tối thiểu là 1 ký tự').max(200, 'Tối đa là 200 ký tự'),
  content: yup.string().required("Trường này không được để trống").min(1, 'Tối thiểu là 1 ký tự').max(200, 'Tối đa là 200 ký tự'),
  author: yup.string().required("Trường này không được để trống").min(1, 'Tối thiểu là 1 ký tự').max(200, 'Tối đa là 200 ký tự'),
  tag: yup.string().required("Trường này không được để trống").min(1, 'Tối thiểu là 1 ký tự').max(200, 'Tối đa là 200 ký tự'),
  new_password: yup.string().required('Trường này không được để trống').min(5, 'mật khẩu phải nhập tối hiểu 5 ký tự').max(25, 'Mật khẩu nhập tối đa 25 ký tự'),
  confirm_password: yup.string().required('Trường này không được để trống').min(5, 'mật khẩu phải nhập tối hiểu 5 ký tự').max(25, 'Mật khẩu nhập tối đa 25 ký tự')
   .oneOf([yup.ref('new_password')], 'bạn nhập lại mật khẩu chưa đúng')
})

export type SchemaType = InferType<typeof schema>;