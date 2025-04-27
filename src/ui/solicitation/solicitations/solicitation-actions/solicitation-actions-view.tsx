import { Button } from '@heroui/button'

import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'

type Props = {
  onApprove: VoidFunction
  onDeny: VoidFunction
}

export const SolicitationActionsView = ({ onApprove, onDeny }: Props) => {
  return (
    <div className='flex flex-col md:flex-row gap-2 mt-2 w-full md:w-fit'>
      <AlertDialog
        trigger={
          <Button color='success' className='text-white' size='sm'>
            Aprovar
          </Button>
        }
        onCancel={() => {}}
        title='ALERTA'
        onConfirm={onApprove}
      >
        Você tem certeza que deseja aprovar essa solicitação?
      </AlertDialog>
      <AlertDialog
        trigger={
          <Button color='danger' size='sm'>
            Negar
          </Button>
        }
        onCancel={() => {}}
        title='ALERTA'
        onConfirm={onDeny}
      >
        Você tem certeza que deseja negar essa solicitação?
      </AlertDialog>
    </div>
  )
}
