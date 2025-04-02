'use client'

import { Input } from '@heroui/input'
import { useCollaboratorTab } from './use-collaborator-tab'
import { Select, SelectItem } from '@heroui/select'
import { Button } from '@heroui/button'

import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import { PasswordFormDialog } from './password-form-dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { Avatar, Divider } from '@heroui/react'

type CollaboratorTabProps = {
  collaborator?: CollaboratorDto
}

export const CollaboratorTab = ({ collaborator }: CollaboratorTabProps) => {
  const {
    isAdmin,
    isManager,
    formErrors,
    isFormReadOnly,
    isFormDirty,
    isFormSubmitting,
    collaboratorSector,
    collaboratorRole,
    registerField,
    handleFormSubmit,
  } = useCollaboratorTab(collaborator)

  return (
    <div>
      <form
        id='collaborator-form'
        onSubmit={handleFormSubmit}
        className='flex flex-col gap-4'
      >
        <h2 className='text-lg text-slate-700 font-semibold'>Dados do colaborador</h2>

        {collaborator && (
          <div className='flex flex-col gap-4 items-center'>
            <Avatar
              name={collaborator?.name}
              color='primary'
              isBordered
              className='w-24 h-24 text-3xl'
            />
          </div>
        )}

        <div className='grid grid-cols-2 gap-4 mt-6'>
          <Input
            label='Nome'
            isReadOnly={isFormReadOnly}
            isInvalid={Boolean(formErrors.name)}
            startContent={
              <Icon name='collaborator' className='text-slate-700' size={20} />
            }
            errorMessage={formErrors?.name?.message}
            {...registerField('name')}
          />

          <Input
            label='CPF'
            isReadOnly={isFormReadOnly}
            isInvalid={Boolean(formErrors.cpf)}
            startContent={<Icon name='cpf' className='text-slate-700' size={20} />}
            errorMessage={formErrors?.cpf?.message}
            {...registerField('cpf')}
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <Input
            label='E-mail'
            isReadOnly={isFormReadOnly}
            isInvalid={Boolean(formErrors.email)}
            startContent={<Icon name='email' className='text-slate-700' size={20} />}
            errorMessage={formErrors?.email?.message}
            {...registerField('email')}
          />

          {!collaborator && (
            <Input
              label='Senha'
              type='password'
              isReadOnly={isFormReadOnly}
              isInvalid={Boolean(formErrors.password)}
              startContent={<Icon name='lock' className='text-slate-700' size={20} />}
              errorMessage={formErrors?.password?.message}
              {...registerField('password')}
            />
          )}

          {collaborator && (
            <Select
              variant='flat'
              classNames={{
                trigger: 'bg-gray-100 text-slate-700',
                label: 'text-slate-900',
              }}
              label='Cargo'
              isDisabled={isFormReadOnly}
              isInvalid={Boolean(formErrors.role)}
              startContent={<Icon name='role' className='text-slate-700' size={20} />}
              selectedKeys={collaboratorRole ? [collaboratorRole] : []}
              errorMessage={formErrors?.role?.message}
              {...registerField('role')}
            >
              <SelectItem key='MANAGER'>Gerente</SelectItem>
              <SelectItem key='EMPLOYEE'>Funcionário</SelectItem>
            </Select>
          )}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {!collaborator && (
            <Select
              variant='flat'
              classNames={{
                trigger: 'text-slate-700',
                label: 'text-slate-900',
              }}
              label='Cargo'
              isDisabled={isFormReadOnly}
              isInvalid={Boolean(formErrors.role)}
              startContent={<Icon name='role' className='text-slate-700' size={20} />}
              errorMessage={formErrors?.role?.message}
              selectedKeys={collaboratorRole ? [collaboratorRole] : []}
              {...registerField('role')}
            >
              <SelectItem key='MANAGER'>Gerente</SelectItem>
              <SelectItem key='EMPLOYEE'>Funcionário</SelectItem>
            </Select>
          )}

          {isAdmin && (
            <Select
              variant='flat'
              labelPlacement='outside'
              classNames={{
                trigger: 'bg-gray-200 text-slate-700',
                label: 'text-slate-900',
              }}
              startContent={<Icon name='sector' className='text-slate-700' size={20} />}
              isDisabled={isFormReadOnly}
              isInvalid={Boolean(formErrors.role)}
              label='Setor'
              selectedKeys={collaboratorSector ? [collaboratorSector] : []}
              {...registerField('sector')}
            >
              <SelectItem key='PRODUCTION'>Produção</SelectItem>
              <SelectItem key='COMERCIAL'>Comercial</SelectItem>
              <SelectItem key='ADMINISTRATIVE'>Administrativo</SelectItem>
              <SelectItem key='HUMAN_RESOURCES'>RH</SelectItem>
            </Select>
          )}
        </div>

        <Divider className='my-6' />
      </form>

      <div className='flex justify-between'>
        <>
          {(isManager || isAdmin) && collaborator?.id && (
            <>
              <PasswordFormDialog collaboratorId={collaborator.id} />
              <Button
                form='collaborator-form'
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
    </div>
  )
}
