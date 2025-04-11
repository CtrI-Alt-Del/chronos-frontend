import { useApi } from '@/ui/global/hooks'
import { useToast } from '@/ui/global/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
type useRegisterTimePunchAdjustmentForm = {
  onSubmit: VoidFunction
  workdayLogId: string
}
type RegisterTimePunchAdjustmentFormData = z.infer<
  typeof timePunchAdjustmentRequestSchema
>

export function useTimePunchAdjustmentTab({
  onSubmit,
  workdayLogId,
}: useRegisterTimePunchAdjustmentForm) {
  const { formState, register, handleSubmit, control } =
    useForm<RegisterTimePunchAdjustmentFormData>({
      resolver: zodResolver(timePunchAdjustmentRequestSchema),
    })
  const { solicitationService } = useApi()
  const { showSuccess, showError } = useToast()
  async function handleFormSubmit(formData: RegisterTimePunchAdjustmentFormData) {
    const parsedTime = parse(formData.time, 'HH:mm', new Date())
    const formattedTime = format(parsedTime, 'HH:mm:ss')
    const parsedDate = parse(formData.workdayLogDate, 'yyyy-MM-dd', new Date())
    const formattedDate = format(parsedDate, 'yyyy-MM-dd')
    const dataToBeSent = {
      ...formData,
      time: formattedTime,
      workdayLogDate: parsedDate,
    }
    const response =
      await solicitationService.createTimePunchLogAdjustmentSolicitation(dataToBeSent)
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }

    if (response.isSuccess) {
      showSuccess('Solicitação de alteração de ponto criada com sucesso!')
      onSubmit()
    }
  }
  return {
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    control,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
