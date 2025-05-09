import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateTimePunchAdjustmentSolicitationAction } from '../use-create-time-punch-adjustment-solicitation-action'
import { descriptionSchema, stringSchema } from '@/validation/schemas/global'

export const timePunchAdjustmentRequestSchema = z
  .object({
    description: descriptionSchema.optional(),
    workdayLogDate: stringSchema.nonempty({ message: 'Data do ponto é obrigatória' }),
    period: stringSchema.nonempty({ message: 'Período do ponto é obrigatório' }),
    time: stringSchema.nonempty({ message: 'Horário é obrigatório' }),
    reason: stringSchema.nonempty({ message: 'Motivo é obrigatório' }),
  })
  .refine(
    (data) => {
      if (data.reason === 'other' && !data.description) {
        return false
      }
      return true
    },
    {
      message: 'Descrição é obrigatória quando o motivo é "outro"',
      path: ['description'],
    },
  )
type RegisterTimePunchAdjustmentFormData = z.infer<
  typeof timePunchAdjustmentRequestSchema
>

export function useTimePunchAdjustmentTab() {
  const { isCreatingSolicitation, createTimePunchAdjustmentSolicitation } =
    useCreateTimePunchAdjustmentSolicitationAction()
  const { formState, register, handleSubmit, control } =
    useForm<RegisterTimePunchAdjustmentFormData>({
      resolver: zodResolver(timePunchAdjustmentRequestSchema),
    })
  async function handleFormSubmit(formData: RegisterTimePunchAdjustmentFormData) {
    const parsedTime = parse(formData.time, 'HH:mm', new Date())
    const formattedTime = format(parsedTime, 'HH:mm:ss')
    const parsedDate = parse(formData.workdayLogDate, 'yyyy-MM-dd', new Date())
    createTimePunchAdjustmentSolicitation(
      formattedTime,
      formData.period,
      parsedDate,
      formData.reason,
    )
  }
  return {
    errors: formState.errors,
    isSubmitting: isCreatingSolicitation,
    control,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
