import { Input, Textarea } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { useTimePunchAdjustmentTab } from './use-time-punch-adjustment-tab'
import { Button, Form } from '@heroui/react'
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
  console.log(errors)

  return (
    <Form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-6 bg-white p-8 rounded-lg shadow-sm"
    >
      <div className="w-full space-y-4">
        <div className="grid grid-cols-1 md:grid-rows-2 gap-6">
          <Textarea
            isRequired
            errorMessage={errors.description?.message}
            label="Descrição"
            placeholder="Digite a descrição"
            {...register('description')}
            className="focus:ring-primary-500 focus:border-primary-500"
          />
          <Textarea
            isRequired
            errorMessage={errors.feedbackMessage?.message}
            label="Mensagem"
            placeholder="Digite a mensagem"
            {...register('feedbackMessage')}
            className="focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div className="space-y-4">
          <Input
            type="time"
            errorMessage={errors.time?.message}
            label="Tempo do ponto"
            {...register('time')}
            className="focus:ring-primary-500 focus:border-primary-500"
          />
          <Select
            label="Setor"
            placeholder="Selecione o período do ponto"
            {...register('period')}
            className="focus:ring-primary-500 focus:border-primary-500"
          >
            <SelectItem key="first_clock_in">Primeira entrada</SelectItem>
            <SelectItem key="first_clock_out">Primeira saída</SelectItem>
            <SelectItem key="second_clock_in">Segunda entrada</SelectItem>
            <SelectItem key="second_clock_out">Segunda saída</SelectItem>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          onPress={onCancel}
          isDisabled={isSubmitting}
          color="danger"
          variant="flat"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          color="primary"
          isLoading={isSubmitting}
        >
          Confirmar
        </Button>
      </div>
    </Form>
  )
}

