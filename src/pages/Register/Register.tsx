import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()
  const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    console.log('data', data)
  })

  return (
    <div className='bg-orange'>
      <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
        <div className='lg:col-span-2 lg:col-start-4'>
          <form onSubmit={onSubmit} className='rounded bg-white p-10 shadow-sm' noValidate>
            <h1 className='text-xl'>Đăng ký</h1>
            <div className='mt-8'>
              <input
                type='email'
                className='p-2.5 rounded-sm w-full outline-none focus:shadow-sm border border-gray-300 focus:border-gray-600'
                placeholder='Email'
                {...register('email', rules.email)}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
            </div>

            <div className='mt-2'>
              <input
                type='password'
                className='p-2.5 rounded-sm w-full outline-none focus:shadow-sm border border-gray-300 focus:border-gray-600'
                placeholder='Mật khẩu'
                autoComplete='on'
                {...register('password', rules.password)}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
            </div>

            <div className='mt-2'>
              <input
                type='confirm_password'
                className='p-2.5 rounded-sm w-full outline-none focus:shadow-sm border border-gray-300 focus:border-gray-600'
                placeholder='Xác nhận mật khẩu'
                autoComplete='on'
                {...register('confirm_password', rules.confirm_password)}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
            </div>

            <div className='mt-2'>
              <button className='w-full py-4 px-2 text-center uppercase bg-orange text-white rounded-sm'>
                Đăng ký
              </button>
            </div>

            <div className='mt-8 flex justify-center items-center text-sm'>
              <span className='text-gray-300'>Bạn đã có tài khoản?</span>
              <Link className='text-orange ml-1' to='/login'>
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
