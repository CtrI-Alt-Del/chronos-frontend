'use client'

import { Avatar } from '@heroui/avatar'
import { Button } from '@heroui/button'
import { Divider } from '@heroui/divider'
import { Input } from '@heroui/input'
import { User, Mail, CreditCard, Briefcase, Building, Edit } from 'lucide-react'
import { useProfilePage } from './use-profile-page'
import { Select, SelectItem } from '@heroui/select'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import { WorkScheduleSelect } from './work-schedule-select'
import { Controller } from 'react-hook-form'
import { PasswordFormDialog } from './password-form-dialog'

type ProfilePageProps = {
  collaborator: CollaboratorDto
}

export const ProfilePage = ({ collaborator }: ProfilePageProps) => {
  const {
    formControl,
    errors,
    isSubmitting,
    isFormDirty,
    canEdit,
    registerField,
    handleFormSubmit,
  } = useProfilePage(collaborator)

  return (
    <div className='container px-4 py-8 mx-auto max-w-3xl'>
      <div className='flex flex-col gap-4 items-center pt-8 pb-6'>
        <Avatar
          src=''
          name={collaborator.name}
          color='primary'
          isBordered
          className='w-24 h-24 text-3xl'
        />
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>{collaborator.name}</h1>
          <p className='text-gray-500'>
            {collaborator.role} - {collaborator.sector}
          </p>
        </div>
      </div>

      <form id='profile-form' onSubmit={handleFormSubmit} className='py-10'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
          <div className='space-y-10'>
            {/* Name Input */}
            <div className='space-y-1'>
              <Input
                label='Nome'
                isDisabled={isSubmitting}
                classNames={{
                  inputWrapper:
                    'bg-zinc-200 focus-within:border-2 focus-within:border-primary',
                  input: 'bg-transparent focus:outline-none text-gray-800 font-medium',
                  label: 'text-sm font-medium mb-3',
                }}
                labelPlacement='outside'
                variant='flat'
                startContent={<User size={16} />}
                isInvalid={Boolean(errors.name)}
                errorMessage={errors?.name?.message}
                {...registerField('name')}
              />
            </div>

            {/* Email Input */}
            <div className='space-y-1'>
              <Input
                label='Email'
                isDisabled={isSubmitting}
                classNames={{
                  inputWrapper:
                    'bg-zinc-200 focus-within:border-2 focus-within:border-primary',
                  input: 'bg-transparent focus:outline-none text-gray-800 font-medium',
                  label: 'text-sm font-medium mb-3',
                }}
                labelPlacement='outside'
                variant='flat'
                startContent={<Mail size={16} />}
                isInvalid={Boolean(errors.email)}
                errorMessage={errors?.email?.message}
                {...registerField('email')}
              />
            </div>

            {/* CPF Input */}
            <div className='space-y-1'>
              <Input
                label='CPF'
                isReadOnly={true}
                isDisabled={true}
                classNames={{
                  inputWrapper:
                    'bg-zinc-200 focus-within:border-2 focus-within:border-primary',
                  input: 'bg-transparent focus:outline-none text-gray-800 font-medium',
                  label: 'text-sm font-medium mb-3',
                  base: 'opacity-90',
                }}
                labelPlacement='outside'
                variant='flat'
                startContent={<CreditCard size={16} />}
                isInvalid={Boolean(errors.cpf)}
                {...registerField('cpf')}
              />
            </div>
          </div>

          <div className='space-y-10'>
            <Select
              variant='flat'
              labelPlacement='outside'
              classNames={{
                trigger: 'bg-gray-200 text-slate-700',
                label: 'text-slate-900',
              }}
              label='Cargo'
              startContent={<Briefcase size={16} />}
              defaultSelectedKeys={[collaborator.role.toLowerCase()]}
              {...registerField('role')}
            >
              <SelectItem key='manager'>Gerente</SelectItem>
              <SelectItem key='employee'>Funcionário</SelectItem>
            </Select>

            <Select
              variant='flat'
              labelPlacement='outside'
              classNames={{
                trigger: 'bg-gray-200 text-slate-700',
                label: 'text-slate-900',
              }}
              startContent={<Building size={16} />}
              label='Setor'
              defaultSelectedKeys={[collaborator.sector.toLowerCase()]}
              {...registerField('sector')}
            >
              <SelectItem key='production'>Produção</SelectItem>
              <SelectItem key='comercial'>Comercial</SelectItem>
              <SelectItem key='administrative'>Administrativo</SelectItem>
              <SelectItem key='human_resources'>RH</SelectItem>
            </Select>

            <Controller
              control={formControl}
              name='workScheduleId'
              render={({ field: { onChange } }) => (
                <WorkScheduleSelect
                  defaultValue={collaborator.workScheduleId}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <Divider className='my-6' />
      </form>

      <div className='flex justify-between py-6'>
        <>
          {canEdit && collaborator.id && (
            <>
              <PasswordFormDialog collaboratorId={collaborator.id} />
              <Button
                form='profile-form'
                type='submit'
                color='primary'
                isLoading={isSubmitting}
                isDisabled={!isFormDirty || isSubmitting}
                startContent={<Edit size={16} />}
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
