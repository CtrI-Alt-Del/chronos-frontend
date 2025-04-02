import { Icon } from '@/ui/global/widgets/components/Icon'
import { Select, SelectItem } from '@heroui/select'

export const SectorSelect = () => {
  return (
    <Select
      variant='flat'
      labelPlacement='outside'
      classNames={{
        trigger: 'bg-gray-200 text-slate-700',
        label: 'text-slate-900',
      }}
      startContent={<Icon name='sector' size={16} />}
      label='Setor'
    >
      <SelectItem key='production'>Produção</SelectItem>
      <SelectItem key='comercial'>Comercial</SelectItem>
      <SelectItem key='administrative'>Administrativo</SelectItem>
      <SelectItem key='human_resources'>RH</SelectItem>
    </Select>
  )
}
