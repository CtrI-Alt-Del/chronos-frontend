import { Button } from '@heroui/button'
import { Select, SelectItem } from '@heroui/select'

import { Dialog } from '@/ui/global/widgets/components/dialog'
import { TimeInput } from '@/ui/work-schedule/widgets/components/time-input'
import { Icon } from '@/ui/global/widgets/components/Icon'

type Props = {
  isLoading: boolean
  time: string
  operation: string
  onTimeChange: (time: string) => void
  onOperationChange: (operation: string) => void
  onButtonConfirmClick: VoidFunction
}

export const TransactionAdjustmentDialogView = ({
  isLoading,
  time,
  operation,
  onTimeChange,
  onOperationChange,
  onButtonConfirmClick,
}: Props) => {
  return (
    <Dialog
      title='Transação de ajuste'
      trigger={
        <Button
          type='button'
          color='primary'
          className='w-full'
          variant='flat'
          startContent={<Icon name='adjustment' className='text-blue-500' size={16} />}
          isLoading={isLoading}
        >
          Criar transação de ajuste
        </Button>
      }
    >
      {(closeDialog) => (
        <form className='pb-3'>
          <div className='flex gap-3'>
            <TimeInput label='Tempo' value={time} onChange={onTimeChange} />
            <Select
              variant='flat'
              label='Tipo de operação'
              defaultSelectedKeys={[operation]}
              onChange={(event) => {
                onOperationChange(event.target.value)
              }}
              startContent={<Icon name='clock' className='text-slate-700' size={16} />}
            >
              <SelectItem key='credit'>Crédito</SelectItem>
              <SelectItem key='debit'>Débito</SelectItem>
            </Select>
          </div>
          <Button
            type='button'
            color='primary'
            isLoading={isLoading}
            isDisabled={isLoading || !time}
            onPress={() => {
              closeDialog()
              onButtonConfirmClick()
            }}
            className='w-full mt-6'
          >
            Criar
          </Button>
        </form>
      )}
    </Dialog>
  )
}
