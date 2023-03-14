import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import path from 'src/constants/path'
import { AppContext } from '../contexts/app.context'
import Popover from '../Popover'

export default function NavHeader() {
  const { profile, isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex justify-end gap-4 text-sm'>
      <Popover
        className='flex cursor-pointer items-center py-1 text-white hover:text-gray-300'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col py-2 pr-28'>
              <button className='py-2 px-3 hover:text-orange'>Tiếng Việt</button>
              <button className='mt-2 py-2 pr-3 hover:text-orange'>English</button>
            </div>
          </div>
        }
      >
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M5.33464 8.00004C5.33464 11.6819 6.52854 14.6667 8.0013 14.6667C9.47406 14.6667 10.668 11.6819 10.668 8.00004C10.668 4.31814 9.47406 1.33337 8.0013 1.33337C6.52854 1.33337 5.33464 4.31814 5.33464 8.00004Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path d='M1.33398 8H14.6673' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'></path>
        </svg>
        <span className='mx-1'>Tiếng Việt</span>
        <svg viewBox='0 0 12 12' fill='none' width='12' height='12' color='currentColor'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z'
            fill='currentColor'
          ></path>
        </svg>
      </Popover>

      {isAuthenticated && (
        <Popover
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-white/70'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to={path.profile}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Tài khoản của tôi
              </Link>
              <Link
                to={path.historyPurchase}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='mr-2 h-6 w-6 flex-shrink-0'>
            <img src={'/'} alt='avatar' className='h-full w-full rounded-full object-cover' />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40' />
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
