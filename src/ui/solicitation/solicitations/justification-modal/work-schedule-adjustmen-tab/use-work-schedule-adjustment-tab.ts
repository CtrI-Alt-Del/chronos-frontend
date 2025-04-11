import { ResponsibleDto } from '@/@core/global/dtos/ResponsibleDto'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { useApi } from '@/ui/global/hooks'
import { useToast } from '@/ui/global/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const workScheduleAdjustmentFormSchema = z.object({
  description: z.string().min(5, { message: 'Descricao obrigatória' }),
  feedbackMessage: z.string().min(1, { message: 'Mensagem obrigatoria' }),
  workScheduleId: z.string({ required_error: 'Escala de trabalho é obrigatória' }),
})
type useRegisterWorkScheduleAdjustmentForm = {
  onSubmit: VoidFunction
}
type RegisterWorkScheduleAdjustmentFormData = z.infer<
  typeof workScheduleAdjustmentFormSchema
>
export function useWorkScheduleAdjustmentTab({
  onSubmit,
}: useRegisterWorkScheduleAdjustmentForm) {
  const { formState, register, handleSubmit, control } =
    useForm<RegisterWorkScheduleAdjustmentFormData>({
      resolver: zodResolver(workScheduleAdjustmentFormSchema),
    })
  const { solicitationService,collaborationService } = useApi()
  const { showSuccess, showError } = useToast()
  async function handleFormSubmit(formData: RegisterWorkScheduleAdjustmentFormData) {
    const response =
      await solicitationService.createWorkScheduleAdjustmentSolicitation(formData)
    console.log(response)
    if (response.isSuccess) {
      showSuccess('Solicitação de alteração de escala criada com sucesso!')
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
