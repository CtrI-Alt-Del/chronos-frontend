import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { AuthService } from '@/@core/auth/interfaces/auth-service'
import { useToast } from '@/ui/global/hooks/use-toast'
import { emailSchema, stringSchema } from '@/validation/schemas/global'

export const passwordSchema = stringSchema.min(6, 'Pelo menos 6 caracteres')

const loginAdminFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

type LoginAdminFormData = z.infer<typeof loginAdminFormSchema>

export function useLoginPage(authService: AuthService) {
  const { formState, handleSubmit, register, getValues } = useForm<LoginAdminFormData>({
    resolver: zodResolver(loginAdminFormSchema),
    mode: 'onSubmit',
  })
  const toast = useToast()

  async function handleFormSubmit({ email, password }: LoginAdminFormData) {
    const response = await authService.requestAuthentication(email, password)

    if (response.isFailure) {
      toast.showError(response.errorMessage)
      response.throwError()
    }
  }

  async function handleCodeResend() {
    await handleFormSubmit(getValues())
  }

  return {
    formErrors: formState.errors,
    isSubmitting: formState.isSubmitting,
    isSubmitSuccessful: formState.isSubmitSuccessful,
    registerField: register,
    handleSubmit: handleSubmit(handleFormSubmit),
    handleCodeResend,
  }
}
