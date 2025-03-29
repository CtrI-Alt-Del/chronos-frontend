import { Controller } from 'react-hook-form'
import { useRegisterCollaboratorForm } from './use-register-collaborator-form'
import { Button, Input, Form, SelectItem, Select } from '@heroui/react'
import { WorkScheduleSelect } from '@/ui/global/widgets/components/work-schedule-select'

type RegisterCollaboratorFormProps = {
  onCancel: VoidFunction
  onSubmit: VoidFunction
}

export const RegisterCollaboratorForm = ({
  onSubmit,
  onCancel,
}: RegisterCollaboratorFormProps) => {
  const { errors, isSubmiting, register, handleSubmit, control } = useRegisterCollaboratorForm({
    onSubmit,
  })

  return (
    <Form onSubmit={handleSubmit} className='w-full max-w-lg space-y-6'>
      <div className='space-y-4 w-full'>
        <Input
          isRequired
          errorMessage={errors.name?.message}
          label='Nome'
          placeholder='Digite o nome'
          {...register('name')}
        />
        <Input
          isRequired
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
        <Select label='Setor ' placeholder='Selecione o setor' {...register('sector')}>
          <SelectItem key='human_resources'>Recursos Humanos</SelectItem>
          <SelectItem key='production'>Produção</SelectItem>
          <SelectItem key='comercial'>Comercial</SelectItem>
          <SelectItem key='administrative'>Administrativo</SelectItem>
        </Select>

        <Controller
          name='workScheduleId'
          control={control}
          render={({ field: { onChange } }) => (
            <div className='w-full'>
              <WorkScheduleSelect onSelectChange={onChange} />
              {errors.workScheduleId && (
                <p className='text-red-600 text-sm'>{errors.workScheduleId.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className='flex justify-end gap-3'>
        <Button onPress={onCancel} isDisabled={isSubmiting} variant='flat'>
          Cancelar
        </Button>
        <Button type='submit' color='primary' isLoading={isSubmiting}>
          Confirmar
        </Button>
      </div>
    </Form>
  )
}

