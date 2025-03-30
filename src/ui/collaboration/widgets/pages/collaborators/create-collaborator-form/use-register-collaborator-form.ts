import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useApi } from '../../../../../global/hooks'
import { useToast } from '@/ui/global/hooks/use-toast'

export const collaboratorFormSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório', invalid_type_error: 'Nome inválido' })
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z
    .string({
      required_error: 'Email é obrigatório',
      invalid_type_error: 'Email inválido',
    })
    .email({ message: 'Email inválido' }),
  password: z.string({
    required_error: 'Senha é obrigatório',
    invalid_type_error: 'Senha inválida',
  }),
  cpf: z.string({
    required_error: 'CPF é obrigatório',
    invalid_type_error: 'CPF inválido',
  }),
  role: z
    .string({
      required_error: 'Cargo é obrigatório',
      invalid_type_error: 'Cargo inválido',
    })
    .min(1, { message: 'Cargo deve ser selecionado' }),
  sector: z
    .string({
      required_error: 'Setor é obrigatório',
      invalid_type_error: 'Setor inválido',
    })
    .min(1, { message: 'Setor deve ser selecionado' }),
  workScheduleId: z.string({
    required_error: 'Escala de trabalho é obrigatória',
    invalid_type_error: 'Escala de trabalho inválida',
  }),
  isActive: z.boolean().default(true),
})

type CollaboratorFormData = z.infer<typeof collaboratorFormSchema>
type CollaboratorFormProps = {
  onSubmit: VoidFunction
}

export function useCollaboratorForm({ onSubmit }: CollaboratorFormProps) {
  const { formState, register, handleSubmit, control } = useForm<CollaboratorFormData>({
    resolver: zodResolver(collaboratorFormSchema),
  })

  const { collaborationService } = useApi()
  const { showError, showSuccess } = useToast()
  async function handleFormSubmit(formData: CollaboratorFormData) {
    const { password, ...collaboratorData } = formData

    const response = await collaborationService.createCollaborator(
      collaboratorData,
      password,
    )
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }

    showSuccess('Colaborador cadastrado com sucesso')
    onSubmit()
  }

  return {
    errors: formState.errors,
    isSubmiting: formState.isSubmitting,
    control,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
