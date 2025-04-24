import { useRest } from '@/ui/global/hooks'
import { useToast } from '@/ui/global/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateTimePunchAdjustmentSolicitationAction } from '../use-create-time-punch-adjustment-solicitation-action'
export const timePunchAdjustmentRequestSchema = z
  .object({
    description: z.string().optional(),
    workdayLogDate: z.string().nonempty({ message: 'Data do ponto é obrigatória' }),
    period: z.string().nonempty({ message: 'Período do ponto é obrigatório' }),
    time: z.string({ message: 'Horário é obrigatório' }),
    reason: z.string({ message: 'Motivo é obrigatório' }),
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

export function useTimePunchAdjustmentTab(onSubmit: VoidFunction) {
  const {isCreatingSolicitation,createTimePunchAdjustmentSolicitation} = useCreateTimePunchAdjustmentSolicitationAction()
  const { formState, register, handleSubmit, control } =
    useForm<RegisterTimePunchAdjustmentFormData>({
      resolver: zodResolver(timePunchAdjustmentRequestSchema),
    })
  async function handleFormSubmit(formData: RegisterTimePunchAdjustmentFormData) {
    const parsedTime = parse(formData.time, 'HH:mm', new Date())
    const formattedTime = format(parsedTime, 'HH:mm:ss')
    const parsedDate = parse(formData.workdayLogDate, 'yyyy-MM-dd', new Date())
    const formattedDate = format(parsedDate, 'yyyy-MM-dd')
    createTimePunchAdjustmentSolicitation(formattedTime,formData.period,parsedDate,formData.reason)
  }
  return {
    errors: formState.errors,
    isSubmitting: isCreatingSolicitation,
    control,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
