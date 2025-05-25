import { Input } from '@heroui/react'

import { Icon } from '@/ui/global/widgets/components/Icon'

type SearchComponentsProps = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export const SearchView = ({ onChange, placeholder, value }: SearchComponentsProps) => {
  return (
    <Input
      placeholder={placeholder}
      size='md'
      color='default'
      radius='sm'
      classNames={{
        inputWrapper: ['bg-zinc-100', 'h-14'],
      }}
      startContent={<Icon name='search' size={16} />}
      className='w-full md:max-w-96'
      value={value}
      onValueChange={onChange}
    />
  )
}
