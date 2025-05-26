import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { OtpVerificationView } from './otp-verification-view'
import { useOtpVerification } from './use-otp-verification'

type Props = {
  onCodeResend: () => void
}

export const OtpVerification = ({ onCodeResend }: Props) => {
  const { login, isAuthenticated, isAuthenticating } = useAuthContext()
  const { handleInputChange, handleSubmitCode } = useOtpVerification(login)

  return (
    <OtpVerificationView
      isVerified={isAuthenticated}
      isVerifying={isAuthenticating}
      onSubmitCode={handleSubmitCode}
      onCodeChange={handleInputChange}
      onCodeResend={onCodeResend}
    />
  )
}
