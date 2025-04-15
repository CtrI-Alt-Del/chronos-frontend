import { Input, Textarea } from '@heroui/input'
import { useWorkScheduleAdjustmentTab } from './use-work-schedule-adjustment-tab'
import { Button, Form } from '@heroui/react'
import { Controller } from 'react-hook-form'
import { WorkScheduleSelect } from '../../work-schedule-select'

type WorkScheduleAdjustmentTabProps = {
  onSubmit: VoidFunction
  onCancel: VoidFunction
}

export const WorkSheduleAdjustmentTab = ({
  onCancel,
  onSubmit,
}: WorkScheduleAdjustmentTabProps) => {
  const { errors, control, register, isSubmitting, handleSubmit } =
    useWorkScheduleAdjustmentTab({ onSubmit })

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

        <Controller
          name="workScheduleId"
          control={control}
          render={({ field: { onChange } }) => (
            <div className="w-full">
              <WorkScheduleSelect onSelectChange={onChange} />
              {errors.workScheduleId && (
                <p className="text-red-600 text-sm">{errors.workScheduleId.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button
          onPress={onCancel}
          isDisabled={isSubmitting}
          color="danger"
          variant="flat"
          className="text-gray-700 border-gray-300 hover:bg-gray-100"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          color="primary"
          isLoading={isSubmitting}
          className="bg-primary-600 hover:bg-primary-700"
        >
          Confirmar
        </Button>
      </div>
    </Form>
  )
}

