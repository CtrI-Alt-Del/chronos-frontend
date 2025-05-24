import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { Spinner } from '@heroui/react'
import { cn } from '@heroui/theme'

type Props = {
  isLoading: boolean
  onConfirm: () => void
}

export const PaidOvertimeDialogView = ({ isLoading, onConfirm }: Props) => {
  return (
    <AlertDialog
      title='Hora Extra Remunerada'
      trigger={
        <div
          role='button'
          className={cn(
            isLoading
              ? 'pointer-events-none opacity-25 bg-blue-100'
              : 'pointer-events-auto bg-white',
            'flex gap-4 items-center p-4 w-full rounded-lg border border-[#D5E7FF] hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all duration-300',
          )}
        >
          {isLoading ? (
            <div className='grid flex-1 place-items-center'>
              <Spinner />
            </div>
          ) : (
            <>
              <div className='p-3 rounded-lg bg-[#9B7B29]'>
                <Icon name='clock' className='w-6 h-6 text-[#FFC300]' />
              </div>
              <div>
                <h3 className='font-medium'>Solicitar Hora Extra</h3>
                <p className='text-sm text-gray-500'>Trabalho adicional</p>
              </div>
            </>
          )}
        </div>
      }
      onConfirm={onConfirm}
    >
      <div>
        <p>
          Você tem direito de converter{' '}
          <strong className='text-primary-500'>2 horas</strong> do banco de horas como
          horas extras remuneradas.
        </p>
        <p className='mt-3'>Esta ação debitará diretamente do seu banco de horas.</p>
        <p className='mt-3'>Você tem certeza que deseja concluir essa ação?</p>
      </div>
    </AlertDialog>
  )
}
