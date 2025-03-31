import { Controller } from 'react-hook-form'
import { Button, Input, Form, SelectItem, Select } from '@heroui/react'

import { useCollaboratorForm } from './use-register-collaborator-form'
import { WorkScheduleSelect } from '../../profile/work-schedule-select'

type RegisterCollaboratorFormProps = {
  onCancel: VoidFunction
  onSubmit: VoidFunction
}

export const RegisterCollaboratorForm = ({
  onSubmit,
  onCancel,
}: RegisterCollaboratorFormProps) => {
  const { control, errors, isSubmiting, register, handleSubmit } =
    useCollaboratorForm({
      onSubmit,
    })

  return (
    <Form onSubmit={handleSubmit} className='space-y-6 w-full max-w-lg'>
      <div className='space-y-6 w-full'>
        <Input
          errorMessage={errors.name?.message}
          label='Nome'
          placeholder='Digite o nome'
          {...register('name')}
        />
        <Input
          errorMessage={errors.email?.message}
          label='Email'
          placeholder='Digite o email'
          {...register('email')}
        />
        <Input
          type='password'
          errorMessage={errors.password?.message}
          label='Senha'
          placeholder='Digite a senha'
          {...register('password')}
        />
        <Input
          errorMessage={errors.cpf?.message}
          label='CPF'
          placeholder='Digite o CPF'
          {...register('cpf')}
        />
        <Select label='Cargo' placeholder='Selecione um cargo' {...register('role')}>
          <SelectItem key='employee'>Colaborador</SelectItem>
          <SelectItem key='manager'>Gestor</SelectItem>
        </Select>
        <Controller
          name='workScheduleId'
          control={control}
          render={({ field: { onChange } }) => (
            <div className='mt-6 w-full'>
              <WorkScheduleSelect onChange={onChange} hasIcon={false} />
              {errors.workScheduleId && (
                <p className='text-sm text-red-600'>{errors.workScheduleId.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className='flex gap-3 justify-end'>
        <Button onPress={onCancel} isDisabled={isSubmiting} color='danger' variant='flat'>
          Cancelar
        </Button>
        <Button type='submit' color='primary' isLoading={isSubmiting}>
          Confirmar
        </Button>
      </div>
    </Form>
  )
}
