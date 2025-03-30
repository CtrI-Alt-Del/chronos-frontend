import { useApi } from '@/ui/global/hooks'
import { useToast } from '@/ui/global/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
export const timePunchAdjustmentRequestSchema = z.object({
  description: z
    .string()
    .min(5, { message: 'Descrição deve ter pelo menos 5 caracteres' }),
  feedbackMessage: z.string().min(1, { message: 'Mensagem obrigatória' }),
  workdayLogId: z.string().optional(),
  period: z.string().nonempty({ message: 'Período do ponto é obrigatório' }),
  time: z.string({ message: 'Horario e obrigatório' }),
})
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
    const parsedTime = parse(formData.time, "HH:mm", new Date())
     const formattedTime = format(parsedTime, "HH:mm:ss")
    const dataToBeSent = {
      ...formData,
      time: formattedTime,
      workdayLogId,
    }
    console.log(dataToBeSent)
    const response =
      await solicitationService.createTimePunchLogAdjustmentSolicitation(dataToBeSent)
    if (response.isSuccess) {
      showSuccess('Solicitação de alteração de ponto criada com sucesso!')
      onSubmit()
    }
    if (response.isFailure) {
      showError(response.errorMessage)
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
