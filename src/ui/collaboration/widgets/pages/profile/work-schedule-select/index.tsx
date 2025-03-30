import { Select, SelectItem, type SelectProps } from '@heroui/select'
import { useWorkScheduleSelect } from './use-work-schedule-select'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { cn } from '@heroui/theme'

type WorkScheduleSelectProps = {
  defaultValue?: string
  hasIcon?: boolean
  onChange: (value: string) => void
}

export function WorkScheduleSelect({
  defaultValue,
  onChange,
  hasIcon = true,
}: WorkScheduleSelectProps) {
  const { selectedWorkScheduleId, workSchedules, isLoading, hadleSelectChange } =
    useWorkScheduleSelect(onChange, defaultValue)

  return (
    <Select
      variant='flat'
      labelPlacement={hasIcon ? 'outside' : 'inside'}
      isLoading={isLoading}
      classNames={{
        trigger: cn('bg-gray-200 text-slate-700', isLoading ? 'opacity-50' : 'opacity-100'),
        label: 'text-slate-900',
      }}
      startContent={hasIcon ? <Icon name='schedule' size={16} /> : undefined}
      label='Escala'
      onChange={hadleSelectChange}
      defaultSelectedKeys={selectedWorkScheduleId ? [selectedWorkScheduleId] : undefined}
    >
      {workSchedules && (
        <>
          {workSchedules.map((workSchedule) => (
            <SelectItem key={workSchedule.id}>{workSchedule.description}</SelectItem>
          ))}
        </>
      )}
    </Select>
  )
}
