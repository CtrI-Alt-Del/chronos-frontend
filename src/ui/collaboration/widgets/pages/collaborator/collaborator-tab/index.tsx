'use client'

import { Input } from '@heroui/input'
import { useCollaboratorTab } from './use-collaborator-tab'
import { Select, SelectItem } from '@heroui/select'
import { Button } from '@heroui/button'

import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import { PasswordFormDialog } from './password-form-dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'

type CollaboratorTabProps = {
  collaborator?: CollaboratorDto
}

export const CollaboratorTab = ({ collaborator }: CollaboratorTabProps) => {
  const {
    isAdmin,
    isManager,
    formErrors,
    isFormInvalid,
    isFormReadOnly,
    isFormDirty,
    isFormSubmitting,
    registerField,
  } = useCollaboratorTab(collaborator)

  return (
    <form>
      <Input
        label='Nome'
        isReadOnly={isFormReadOnly}
        isInvalid={isFormInvalid}
        errorMessage={formErrors?.name?.message}
        {...registerField('name')}
      />

      <Input
        label='CPF'
        isReadOnly={isFormReadOnly}
        isInvalid={isFormInvalid}
        errorMessage={formErrors?.email?.message}
        {...registerField('email')}
      />

      <Input
        label='E-mail'
        isReadOnly={isFormReadOnly}
        isInvalid={isFormInvalid}
        errorMessage={formErrors?.email?.message}
        {...registerField('email')}
      />

      {!collaborator && (
        <Input
          label='Senha'
          isReadOnly={isFormReadOnly}
          isInvalid={isFormInvalid}
          errorMessage={formErrors?.password?.message}
          {...registerField('password')}
        />
      )}

      <Select
        variant='flat'
        labelPlacement='outside'
        classNames={{
          trigger: 'bg-gray-200 text-slate-700',
          label: 'text-slate-900',
        }}
        label='Cargo'
        isDisabled={isFormReadOnly}
        isInvalid={isFormInvalid}
        startContent={<Icon name='role' size={16} />}
        {...registerField('role')}
      >
        <SelectItem key='manager'>Gerente</SelectItem>
        <SelectItem key='employee'>Funcionário</SelectItem>
      </Select>

      {isAdmin && (
        <Select
          variant='flat'
          labelPlacement='outside'
          classNames={{
            trigger: 'bg-gray-200 text-slate-700',
            label: 'text-slate-900',
          }}
          startContent={<Icon name='sector' size={16} />}
          isDisabled={isFormReadOnly}
          isInvalid={isFormInvalid}
          label='Setor'
          {...registerField('sector')}
        >
          <SelectItem key='production'>Produção</SelectItem>
          <SelectItem key='comercial'>Comercial</SelectItem>
          <SelectItem key='administrative'>Administrativo</SelectItem>
          <SelectItem key='human_resources'>RH</SelectItem>
        </Select>
      )}

      <Button>Confirmar</Button>

      <div className='flex justify-between py-6'>
        <>
          {(isManager || isAdmin) && collaborator?.id && (
            <>
              <PasswordFormDialog collaboratorId={collaborator.id} />
              <Button
                form='profile-form'
                type='submit'
                color='primary'
                isLoading={isFormSubmitting}
                isDisabled={!isFormDirty || isFormSubmitting}
                startContent={<Icon name='edit' size={16} />}
              >
                Editar Perfil
              </Button>
            </>
          )}
        </>
      </div>
    </form>
  )
}
