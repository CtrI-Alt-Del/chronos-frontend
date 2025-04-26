import { Dialog } from '@/ui/global/widgets/components/dialog'
import { Clock } from 'lucide-react'
import { Button } from '@heroui/button'

export const OvertimeSolicitationDialog = () => {
  return (
    <Dialog
      title='Solicitação de Hora Extra'
      trigger={
        <div className='flex gap-4 cursor-pointer items-center p-4 bg-white rounded-lg border border-[#D5E7FF] hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all duration-300'>
          <div className='p-3 rounded-lg bg-[#9B7B29]'>
            <Clock className='w-6 h-6 text-[#FFC300]' />
          </div>
          <div>
            <h3 className='font-medium'>Solicitar Hora Extra</h3>
            <p className='text-sm text-gray-500'>Trabalho adicional</p>
          </div>
        </div>
      }
    >
      {(onCancel) => (
        <div className='flex flex-col justify-center items-center p-4 space-y-6'>
          <p className='text-center text-gray-700'>
            Você está solicitando autorização para realizar hora extra. Deseja confirmar?
          </p>
          
          <div className='flex gap-4 justify-center items-center mt-4'>
            <Button
              className='w-40' 
              color='danger'
              onPress={() => onCancel()}>
              Cancelar
            </Button>
            <Button 
              className='w-40'
              color='primary'
              onPress={() => {
                onCancel();
              }}>
              Confirmar
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  )
} 