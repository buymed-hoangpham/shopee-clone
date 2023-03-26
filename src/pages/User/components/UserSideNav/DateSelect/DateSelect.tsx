import range from 'lodash/range'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const { t } = useTranslation('profile')
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-1/5 sm:text-right'>{t('date of birth')}</div>
      <div className='sm:w-4/5 sm:pl-5'>
        <div className='flex justify-between'>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            name='date'
            value={value?.getDate() || date.date}
            onChange={handleChange}
          >
            <option disabled>{t('day')}</option>
            {range(1, 32).map((opt) => (
              <option key={opt} value={opt} className='!hover:text-orange !py-2'>
                {opt}
              </option>
            ))}
          </select>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            name='month'
            value={value?.getMonth() || date.month}
            onChange={handleChange}
          >
            <option disabled>{t('month')}</option>
            {range(0, 12).map((opt) => (
              <option key={opt} value={opt} className=''>
                {opt + 1}
              </option>
            ))}
          </select>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            name='year'
            value={value?.getFullYear() || date.year}
            onChange={handleChange}
          >
            <option disabled>{t('year')}</option>
            {range(1990, new Date().getFullYear() + 1)
              .reverse()
              .map((opt) => (
                <option key={opt} value={opt} className='py-2 hover:text-orange'>
                  {opt}
                </option>
              ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}
