import { z } from "zod"

import { useAuthContext } from "@/ui/auth/hooks/use-auth-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const stringSchema = z
    .string({ message: 'texto inválido' })
    .min(1, 'texto inválido')

const emailSchema = stringSchema.email({ message: 'E-mail inválido' })

export const passwordSchema = stringSchema.min(6, 'Pelo menos 6 caracteres')

const loginAdminFormSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})

type LoginAdminFormData = z.infer<typeof loginAdminFormSchema>

export function useLoginPage() {
    const { formState, handleSubmit, register } = useForm<LoginAdminFormData>({
        resolver: zodResolver(loginAdminFormSchema),
        mode: 'onChange'
    })
    const { login } = useAuthContext()

    async function handleFormSubmit({ email, password }: LoginAdminFormData) {
        await login(email, password)
    }

    return {
        errors: formState.errors,
        isSubmitting: formState.isSubmitting,
        registerField: register,
        handleSubmit: handleSubmit(handleFormSubmit),
    }
}
