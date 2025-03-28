import { Button } from '@heroui/button'

import { HeaderTitle } from './header-title'
import { Icon } from '../../../components/Icon'

type HeaderProps = {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className='flex items-center px-6 h-16 bg-white border-b border-gray-border'>
      <Button
        onPress={onMenuClick}
        variant='ghost'
        size='sm'
        className='p-0 mr-4 text-white border-none bg-blue-primary md:hidden'
      >
        <Icon name='menu' size={24} />
      </Button>
      <HeaderTitle />
    </header>
  )
}
