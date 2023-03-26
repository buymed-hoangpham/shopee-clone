import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { schema, Schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'

type FormData = Omit<Schema, 'confirm_password'>

const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
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
      <Helmet>
        <title>{t('login')} | Shopee Clone</title>
        <meta
          name='description'
          content='Đăng nhập Tài khoản Shopee và tận hưởng ưu đãi độc quyền với giá cả hấp dẫn trên Shopee Việt Nam!'
        />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} className='rounded bg-white p-10 shadow-sm' noValidate>
              <h1 className='text-xl'>{t('login')}</h1>
              <Input
                className='mt-8'
                type='email'
                placeholder={t('email')}
                register={register}
                name='email'
                errorMessage={errors.email?.message}
              />

              <Input
                className='mt-2'
                type='password'
                placeholder={t('password')}
                register={register}
                name='password'
                errorMessage={errors.password?.message}
                autoComplete='on'
              />

              <div className='mt-2'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center rounded-sm bg-orange py-4 px-2 text-center uppercase text-white'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  {t('login')}
                </Button>
              </div>

              <div className='mt-8 flex items-center justify-center text-sm'>
                <span className='text-gray-300'>{t('new to shopee?')}</span>
                <Link className='ml-1 text-orange' to='/register'>
                  {t('sign up')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
