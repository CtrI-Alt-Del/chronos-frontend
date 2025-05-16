'use client'

import { getLocalTimeZone, today } from '@internationalized/date'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { Button } from '@heroui/button'
import { DateRangePicker } from '@heroui/date-picker'
import type { DateValue, RangeValue } from '@heroui/react'

type VacationSolicitationDialogViewProps = {
  onSubmit: () => void
  isSubmitting: boolean
  handleDatesChange: (value: RangeValue<DateValue> | null) => void
}

export const VacationSolicitationDialogView = ({
  onSubmit,
  isSubmitting,
  handleDatesChange,
}: VacationSolicitationDialogViewProps) => {
  return (
    <Dialog
      title='Solicitacao de Ferias'
      trigger={
        <div className='flex gap-4 w-full cursor-pointer items-center p-4 bg-white rounded-lg border border-[#D5E7FF] hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all duration-300'>
          <div className='p-3 rounded-lg bg-[#2D2B4F]'>
            <Icon name='clock' className='w-6 h-6 text-green-500' />
          </div>
          <div>
            <h3 className='font-medium'>Solicitar Ferias</h3>
            <p className='text-sm text-gray-500'>Seu periodo de descanso</p>
          </div>
        </div>
      }
    >
      {(onCancel) => (
        <div className='space-y-6 flex items-center justify-center flex-col'>
          <DateRangePicker
            label='Dias de ferias'
            minValue={today(getLocalTimeZone())}
            onChange={handleDatesChange}
          />
          <div className='flex justify-center items-center gap-4 mt-4'>
            <Button
              className='w-40'
              color='danger'
              onPress={() => onCancel()}
              isDisabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              className='w-40'
              color='primary'
              type='submit'
              onPress={onSubmit}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Enviar
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  )
}
