import { Select, SelectItem } from '@heroui/select'

import type { JustificationTypeDto } from '@/@core/portal/dtos'
import { useJustificationTypeSelect } from './use-justification-type-select'
import { Icon } from '../Icon'

type JustificationTypeSelectProps = {
  onSelect: (justificationType: JustificationTypeDto) => void
}
export const JustificationTypeSelect = ({ onSelect }: JustificationTypeSelectProps) => {
  const { justificationTypes, handleSelectionChange } =
    useJustificationTypeSelect(onSelect)

  return (
    <Select
      variant='flat'
      size='lg'
      radius='sm'
      classNames={{
        trigger: 'bg-[#f4f4f5] text-gray-700',
        label: 'text-gray-700',
      }}
      label={
        <span className='text-sm flex items-center justify-center gap-2 font-semibold text-gray-500'>
          <Icon name='album' size={18} />
          Tipo de Justificativa
        </span>
      }
      onChange={(event) => handleSelectionChange(event.target.value)}
    >
      {justificationTypes.map((justificationType) => (
        <SelectItem key={justificationType.id as string}>
          {justificationType.name}
        </SelectItem>
      ))}
    </Select>
  )
}
