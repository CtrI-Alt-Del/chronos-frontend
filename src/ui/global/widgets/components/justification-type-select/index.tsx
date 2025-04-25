import { Select, SelectItem } from '@heroui/select'
import { useJustificationTypeSelect } from './use-justification-type-select'
import { Icon } from '../Icon'
import type { JustificationTypeDto } from '@/@core/solicitation/dtos'

type JustificationTypeSelectProps = {
  onSelect: (justificationType: JustificationTypeDto) => void
}
export const JustificationTypeSelect = ({ onSelect }: JustificationTypeSelectProps) => {
  const { justificationTypes, isLoading } = useJustificationTypeSelect()
  const handleSelectionChange = (id: string) => {
    const selected = justificationTypes.find((jt) => jt.id === id)
    if (selected) onSelect(selected)
  }
  return (
    <Select
      variant='flat'
      size='lg'
      radius='sm'
      classNames={{
        trigger: 'bg-[#f4f4f5] text-gray-700',
        label: 'text-gray-700',
      }}
      label=<span className='text-md flex items-center justify-center gap-2 font-semibold'>
        <Icon name='album' size={20} />
        Tipo de Justificativa
      </span>
      onChange={(e) => handleSelectionChange(e.target.value)}
    >
      {justificationTypes.map((justificationType) => (
        <SelectItem key={justificationType.id as string}>
          {justificationType.name}
        </SelectItem>
      ))}
    </Select>
  )
}
