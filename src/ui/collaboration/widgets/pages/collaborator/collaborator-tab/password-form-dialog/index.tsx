import { Dialog } from '@/ui/global/widgets/components/dialog'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { usePasswordFormDialog } from './use-password-form-dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'

type PasswordFormDialogProps = {
  collaboratorId: string
}

export function PasswordFormDialog({ collaboratorId }: PasswordFormDialogProps) {
  const { errors, isSubmitting, registerField, handleFormSubmit } =
    usePasswordFormDialog(collaboratorId)

  return (
    <Dialog
      title='Alterar Senha'
      trigger={
        <Button
          type='button'
          color='secondary'
          variant='flat'
          onPress={() => {}}
          isDisabled={isSubmitting}
          startContent={<Icon name='lock' size={16} />}
        >
          Alterar Senha
        </Button>
      }
    >
      {(closeDialog) => (
        <form  onSubmit={handleFormSubmit} className='flex flex-col gap-6 pb-3'>
          <Input
            label='Senha'
            type='password'
            placeholder='*****'
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            startContent={<Icon name='lock' size={16} />}
            {...registerField('password')}
          />
          <Input
            label='Confirmar senha'
            type='password'
            placeholder='*****'
            startContent={<Icon name='lock' size={16} />}
            isInvalid={Boolean(errors.passwordConfirmation)}
            errorMessage={errors.passwordConfirmation?.message}
            {...registerField('passwordConfirmation')}
          />

          <div className='flex justify-between items-center mt-3'>
            <Button type='submit' color='primary' isLoading={isSubmitting}>Altera senha</Button>
            <Button type='button' onPress={closeDialog} isDisabled={isSubmitting}>
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  )
}
