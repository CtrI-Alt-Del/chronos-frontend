import { useRef, useState } from 'react'
import { Button } from '@heroui/react'
import { Icon } from '../Icon'

type FileInputProps = {
  label?: string
  name?: string
  accept?: string
  onChange: (file: File) => void
}

export const FileInput = ({
  label = 'Escolher Arquivo',
  name,
  accept,
  onChange,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      onChange(file)
    }
  }

  return (
    <div className='flex flex-col gap-2 items-start w-full'>
      <input
        ref={inputRef}
        type='file'
        name={name}
        accept={accept}
        className='hidden'
        onChange={handleFileChange}
      />

      <Button
        type='button'
        startContent={
          fileName ? null : <Icon name='upload' className='w-6 h-6 text-gray-500' />
        }
        color='default'
        className='w-full h-16 bg-[#f4f4f5] text-gray-700'
        radius='sm'
        onClick={() => inputRef.current?.click()}
        size='lg'
      >
        {<span className='text-md'>{fileName || 'Selecione o arquivo'}</span>}
      </Button>
    </div>
  )
}
