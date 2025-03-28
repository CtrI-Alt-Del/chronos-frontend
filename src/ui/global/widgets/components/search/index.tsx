import { Input } from '@heroui/react'

type SearchComponentsProps = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export const Search = ({ onChange, placeholder, value }: SearchComponentsProps) => {
  return (
    <Input
      placeholder={placeholder}
      size='md'
      color='default'
      radius='sm'
      classNames={{
        inputWrapper: ['bg-zinc-100', 'h-14'],
      }}
      className='w-full md:max-w-96'
      value={value}
      onValueChange={onChange}
    />
  )
}
