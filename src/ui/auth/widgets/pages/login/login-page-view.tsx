import { Input } from '@heroui/input'

import type { AuthService } from '@/@core/auth/interfaces/auth-service'
import { useLoginPage } from './use-login-page'
import { AnimatedButton } from './animated-button'
import { OtpVerification } from '../otp-verification'

type Props = {
  authService: AuthService
}

export const LoginPageView = ({ authService }: Props) => {
  const {
    formErrors,
    isSubmitting,
    isSubmitSuccessful,
    handleSubmit,
    registerField,
    handleCodeResend,
  } = useLoginPage(authService)

  return (
    <div className='mx-auto w-full'>
      {!isSubmitSuccessful && (
        <div className='flex flex-col justify-center items-center mt-4 mb-2 md:mb-4'>
          <h1 className='text-2xl font-semibold md:text-3xl'>Login</h1>
        </div>
      )}

      {isSubmitSuccessful ? (
        <OtpVerification onCodeResend={handleCodeResend} />
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-6'>
          <div className='flex flex-col gap-6'>
            <Input
              label='Email'
              classNames={{
                inputWrapper:
                  'bg-zinc-200 focus-within:border-2 focus-within:border-primary',
                input: 'bg-transparent focus:outline-none text-sm md:text-base',
                label: 'text-sm md:text-base',
              }}
              labelPlacement='outside'
              type='email'
              variant='flat'
              disabled={isSubmitting}
              isInvalid={Boolean(formErrors.email)}
              errorMessage={formErrors.email?.message}
              {...registerField('email')}
            />
            <Input
              label='Senha'
              classNames={{
                inputWrapper:
                  'bg-zinc-200 focus-within:border-2 focus-within:border-primary',
                input: 'bg-transparent focus:outline-none text-sm md:text-base',
                label: 'text-sm md:text-base',
              }}
              labelPlacement='outside'
              type='password'
              variant='flat'
              disabled={isSubmitting}
              isInvalid={Boolean(formErrors.password)}
              errorMessage={formErrors.password?.message}
              {...registerField('password')}
            />
          </div>
          <div className='overflow-hidden relative mb-10 rounded-full md:mb-12'>
            <AnimatedButton isSubmitting={isSubmitting} showAnimation={false} />
          </div>
        </form>
      )}
      <div className='text-xs text-center text-gray-400 mt-3'>made by Ctrl Alt Del</div>
    </div>
  )
}
