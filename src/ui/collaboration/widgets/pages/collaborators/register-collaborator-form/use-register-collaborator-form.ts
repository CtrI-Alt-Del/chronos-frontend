import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useApi } from '../../../../../global/hooks'

export const registerCollaboratorFormSchema = z.object({
    name: z
      .string({ required_error: 'Nome é obrigatório', invalid_type_error: 'Nome inválido' })
      .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
    email: z
      .string({ required_error: 'Email é obrigatório', invalid_type_error: 'Email inválido' })
      .email({ message: 'Email inválido' }),
    password: z
      .string({ required_error: 'Senha é obrigatório', invalid_type_error: 'Senha inválida' }),
    cpf: z
      .string({ required_error: 'CPF é obrigatório', invalid_type_error: 'CPF inválido' })
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido' }),
    role: z
      .string({ required_error: 'Cargo é obrigatório', invalid_type_error: 'Cargo inválido' })
      .min(1, { message: 'Cargo deve ser selecionado' }),
    sector: z
      .string({ required_error: 'Setor é obrigatório', invalid_type_error: 'Setor inválido' })
      .min(1, { message: 'Setor deve ser selecionado' }),
  });

type RegisterCollaboratorFormData = z.infer<typeof registerCollaboratorFormSchema>
type useRegisterCollaboratorFormProps = {
    onSubmit: VoidFunction
}

export function useRegisterCollaboratorForm({ onSubmit }: useRegisterCollaboratorFormProps) {
    const { formState, reset, register, handleSubmit } =
    useForm<RegisterCollaboratorFormData>({
      resolver: zodResolver(registerCollaboratorFormSchema),
    })

    const { collaboratorService } = useApi()
    async function handleFormSubmit(formData: RegisterCollaboratorFormData) {
      const collaborator = formData
      const response = await collaboratorService.registerCollaborator(collaborator)
      if (response.isSuccess) {
        reset()
        onSubmit()
      } else {
        alert("Erro ao cadastrar colaborador")
      }
    }
    return {
      errors: formState.errors,
      isSubmiting: formState.isSubmitting,
      register,
      handleSubmit: handleSubmit(handleFormSubmit),
    }
}