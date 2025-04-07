import { Input, Textarea } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { useTimePunchAdjustmentTab } from './use-time-punch-adjustment-tab'
import { Button, DateInput, Form } from '@heroui/react'
import { Controller } from 'react-hook-form'

type TimePunchAdjustmentTabProps = {
  workdayLogId: string
  onSubmit: VoidFunction
  onCancel: VoidFunction
}

export const TimePunchAdjustmentTab = ({
  workdayLogId,
  onSubmit,
  onCancel,
}: TimePunchAdjustmentTabProps) => {
  const { errors, isSubmitting, control, register, handleSubmit } =
    useTimePunchAdjustmentTab({ workdayLogId, onSubmit })

  return (
    <Form
      onSubmit={handleSubmit}
      className='w-full max-w-lg space-y-6 bg-white p-8 rounded-lg shadow-sm'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
        <Input
          isRequired
          type='date'
          errorMessage={errors.workdayLogDate?.message}
          isInvalid={Boolean(errors.workdayLogDate)}
          label='Data do ponto'
          {...register('workdayLogDate')}
        />

        <Input
          isRequired
          type='time'
          errorMessage={errors.time?.message}
          isInvalid={Boolean(errors.time)}
          label='Tempo do ponto'
          {...register('time')}
        />
      </div>
      <Select
        isRequired
        label='Periodo'
        isInvalid={Boolean(errors.period)}
        errorMessage={errors.period?.message}
        placeholder='Selecione o período do ponto'
        {...register('period')}
      >
        <SelectItem key='first_clock_in'>Primeira entrada</SelectItem>
        <SelectItem key='first_clock_out'>Primeira saída</SelectItem>
        <SelectItem key='second_clock_in'>Segunda entrada</SelectItem>
        <SelectItem key='second_clock_out'>Segunda saída</SelectItem>
      </Select>
      <Select
        isRequired
        label='Motivo'
        isInvalid={Boolean(errors.reason)}
        errorMessage={errors.reason?.message}
        placeholder='Selecione o motivo'
        {...register('reason')}
      >
        <SelectItem key='unwanted'>Bati o ponto sem querer</SelectItem>
        <SelectItem key='forgotten'>Esqueci de bater o ponto</SelectItem>
        <SelectItem key='Sick'>Fiquei doente</SelectItem>
        <SelectItem key='other'>Outro</SelectItem>
      </Select>
      <Textarea
        label='Descrição'
        errorMessage={errors.description?.message}
        isInvalid={Boolean(errors.description)}
        {...register('description')}
      />
      <div className='flex justify-end gap-4 mt-6'>
        <Button
          onPress={onCancel}
          isDisabled={isSubmitting}
          color='danger'
          variant='flat'
        >
          Cancelar
        </Button>
        <Button type='submit' color='primary' isLoading={isSubmitting}>
          Confirmar
        </Button>
      </div>
    </Form>
  )
}
