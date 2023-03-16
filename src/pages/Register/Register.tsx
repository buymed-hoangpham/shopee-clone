import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import { AppContext } from 'src/contexts/app.context'
import Input from 'src/components/Input'
import { ResponseApi } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Schema

const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} className='rounded bg-white p-10 shadow-sm' noValidate>
              <h1 className='text-xl'>Đăng ký</h1>

              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                register={register}
                name='email'
                errorMessage={errors.email?.message}
              />

              <Input
                className='mt-2'
                type='password'
                placeholder='Mật khẩu'
                register={register}
                name='password'
                errorMessage={errors.password?.message}
                autoComplete='on'
              />

              <Input
                className='mt-2'
                type='password'
                placeholder='Xác nhận mật khẩu'
                register={register}
                name='confirm_password'
                errorMessage={errors.confirm_password?.message}
                autoComplete='on'
              />

              <div className='mt-2'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center rounded-sm bg-orange py-4 px-2 text-center uppercase text-white'
                  isLoading={registerMutation.isLoading}
                  disabled={registerMutation.isLoading}
                >
                  Đăng ký
                </Button>
              </div>

              <div className='mt-8 flex items-center justify-center text-sm'>
                <span className='text-gray-300'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-orange' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
