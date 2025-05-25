import type { FormEvent } from 'react'
import { Textarea } from '@heroui/input'

import { Dialog } from '@/ui/global/widgets/components/dialog'
import { Button } from '@heroui/button'

type Props = {
  isLoading: boolean
  onApproveSubmit: (event: FormEvent<HTMLFormElement>) => void
  onDenySubmit: (event: FormEvent<HTMLFormElement>) => void
  onCancelSubmit: (event: FormEvent<HTMLFormElement>) => void
  isManager: boolean
  canCancel: boolean
}

export const SolicitationActionsView = ({
  isLoading,
  isManager,
  canCancel,
  onApproveSubmit,
  onDenySubmit,
  onCancelSubmit,
}: Props) => {
  return (
    <div className='flex flex-col gap-2 mt-2 w-full md:flex-row md:w-fit'>
      {canCancel && (
        <div className=''>
          <Dialog
            title='Cancelar solicitação'
            trigger={
              <Button variant='flat' color='secondary'>
                Cancelar
              </Button>
            }
          >
            {(closeDialog) => (
              <form onSubmit={onCancelSubmit} className='pb-3'>
                <div className='flex gap-2 items-center mt-6'>
                  <Button
                    type='submit'
                    color='primary'
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    onPress={closeDialog}
                  >
                    Confirmar
                  </Button>
                  <Button onPress={closeDialog}>Cancelar</Button>
                </div>
              </form>
            )}
          </Dialog>
        </div>
      )}

      {true && (
        <>
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
                <div className='flex gap-2 items-center mt-6'>
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
                <div className='flex gap-2 items-center mt-6'>
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
        </>
      )}
    </div>
  )
}
