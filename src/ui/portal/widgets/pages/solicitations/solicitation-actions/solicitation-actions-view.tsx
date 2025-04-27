import type { FormEvent } from 'react'
import { Textarea } from '@heroui/input'

import { Dialog } from '@/ui/global/widgets/components/dialog'
import { Button } from '@heroui/button'

type Props = {
  isLoading: boolean
  onApproveSubmit: (event: FormEvent<HTMLFormElement>) => void
  onDenySubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const SolicitationActionsView = ({
  isLoading,
  onApproveSubmit,
  onDenySubmit,
}: Props) => {
  return (
    <div className='flex flex-col md:flex-row gap-2 mt-2 w-full md:w-fit'>
      <Dialog
        title='Aprovar solicitação'
        trigger={
          <Button variant='flat' color='primary'>
            Aprovar
          </Button>
        }
      >
        {(closeDialog) => (
          <form onSubmit={onApproveSubmit} className='pb-3'>
            <Textarea label='Mensagem de feedback' name='feedback-message' />
            <div className='flex items-center gap-2 mt-6'>
              <Button
                type='submit'
                color='primary'
                isLoading={isLoading}
                isDisabled={isLoading}
                onPress={closeDialog}
              >
                Confirmar aprovação
              </Button>
              <Button onPress={closeDialog}>Cancelar</Button>
            </div>
          </form>
        )}
      </Dialog>

      <Dialog
        title='Negar solicitação'
        trigger={
          <Button variant='flat' color='danger'>
            Negar
          </Button>
        }
      >
        {(closeDialog) => (
          <form onSubmit={onDenySubmit} className='pb-3'>
            <Textarea label='Mensagem de feedback' name='feedback-message' />
            <div className='flex items-center gap-2 mt-6'>
              <Button
                type='submit'
                color='primary'
                isLoading={isLoading}
                isDisabled={isLoading}
                onPress={closeDialog}
              >
                Confirmar negação
              </Button>
              <Button onPress={closeDialog}>Cancelar</Button>
            </div>
          </form>
        )}
      </Dialog>
    </div>
  )
}
