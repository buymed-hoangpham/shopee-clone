import * as yup from 'yup'

export const schema = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .min(5, 'Độ dài từ 5 - 160 ký tự')
      .max(160, 'Độ dài từ 5 - 160 ký tự')
      .email('Email không đúng định dạng'),
    password: yup
      .string()
      .required('Mật khẩu  là bắt buộc')
      .min(6, 'Độ dài từ 6 - 160 ký tự')
      .max(160, 'Độ dài từ 6 - 160 ký tự'),
    confirm_password: yup
      .string()
      .required('Nhập lại mật khẩu  là bắt buộc')
      .min(6, 'Độ dài từ 6 - 160 ký tự')
      .max(160, 'Độ dài từ 6 - 160 ký tự')
      .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp')
  })
  .required()

export const loginSchema = schema.omit(['confirm_password'])

export type Schema = yup.InferType<typeof schema>
