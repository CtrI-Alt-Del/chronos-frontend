import { Avatar } from '@heroui/avatar'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'

export const ProfileCard = () => {
  return (
    <Link
      href={ROUTES.profile}
      className='flex justify-center items-center py-3 mb-4 w-52 border border-blue-300 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:translate-y-[-2px] group'
    >
      <Avatar
        color='primary'
        isBordered
        className='w-6 h-6 transition-transform duration-300 group-hover:scale-110'
        radius='sm'
      />
      <p className='ml-3 font-normal text-gray-700 transition-all duration-300 text-md group-hover:ml-4 group-hover:font-medium'>
        Hector Bonilha
      </p>
    </Link>
  )
}
