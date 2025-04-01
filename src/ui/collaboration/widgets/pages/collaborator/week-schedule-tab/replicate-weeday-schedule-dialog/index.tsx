import { Button, Checkbox, CheckboxGroup } from '@heroui/react'

import { WEEKDAYS } from '@/constants'
import { useReplicateWeekdayScheduleDialog } from './use-replicate-weeday-schedule-dialog'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'

type ReplicateWeekdayScheduleDialogProps = {
  onWeekdaysReplicate: (weekdays: string[]) => void
}

export const ReplicateWeekdayScheduleDialog = ({
  onWeekdaysReplicate,
}: ReplicateWeekdayScheduleDialogProps) => {
  const { weekdays, handleWeekdaysChange, handleConfirm } =
    useReplicateWeekdayScheduleDialog(onWeekdaysReplicate)

  return (
    <AlertDialog
      title='Replicar horário'
      trigger={
        <Button isIconOnly variant='light'>
          <Icon name='edit' size={16} className='text-slate-500' />
        </Button>
      }
      onConfirm={handleConfirm}
    >
      <div>
        <CheckboxGroup
          defaultValue={weekdays}
          label='Dias da semana'
          onValueChange={handleWeekdaysChange}
        >
          {Object.entries(WEEKDAYS).map(([weekdayValue, weekdayName]) => (
            <Checkbox key={weekdayValue} value={weekdayValue}>
              {weekdayName}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    </AlertDialog>
  )
}
