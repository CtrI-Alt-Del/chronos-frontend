import type { FormEvent } from 'react'
import { Textarea } from '@heroui/input'

import { Dialog } from '@/ui/global/widgets/components/dialog'
import { Button } from '@heroui/button'

type Props = {
  onApproveSubmit: (event: FormEvent<HTMLFormElement>) => void
  onDenySubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const SolicitationActionsView = ({ onApproveSubmit, onDenySubmit }: Props) => {
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
          <form onSubmit={onApproveSubmit}>
            <Textarea label='Mensagem de feedback' name='feedback-message' />
            <Button type='submit'>Aprovar negação</Button>
            <Button onPress={closeDialog}>Cancelar</Button>
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
          <form onSubmit={onDenySubmit}>
            <Textarea label='Mensagem de feedback' name='feedback-message' />
            <Button type='submit'>Confirmar negação</Button>
            <Button onPress={closeDialog}>Cancelar</Button>
          </form>
        )}
      </Dialog>
    </div>
  )
}
