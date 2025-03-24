import { Input } from '@heroui/react'

type SearchComponentsProps = {
  value?: string
  onSearchChange?: (value: string) => void
}

export const Search = ({ onSearchChange, value }: SearchComponentsProps) => {
  return (
    <Input
      placeholder='Pesquise por nome'
      size='md'
      color='default'
      radius='sm'
      classNames={{
        inputWrapper: ['bg-zinc-100', 'h-12'],
      }}
      className='w-full md:max-w-96'
      value={value}
      onValueChange={onSearchChange}
    />
  )
}
