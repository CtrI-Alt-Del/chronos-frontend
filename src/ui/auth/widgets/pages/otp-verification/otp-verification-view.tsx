import type { FormEvent } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, InputOtp } from '@heroui/react'

import { Icon } from '@/ui/global/widgets/components/Icon'

type Props = {
  isVerified: boolean
  isVerifying: boolean
  onSubmitCode: (event: FormEvent<HTMLFormElement>) => void
  onCodeChange: (value: string) => void
  onCodeResend: () => void
}

export const OtpVerificationView = ({
  isVerified,
  isVerifying,
  onCodeChange,
  onSubmitCode,
  onCodeResend,
}: Props) => {
  return (
    <Card className='w-full max-w-md p-2'>
      <CardHeader className='flex flex-col gap-2'>
        <h2 className='text-2xl font-bold'>Verificação de Código</h2>
        <p className='text-sm text-gray-500 text-center'>
          Digite o código de 6 dígitos enviado para o seu dispositivo.
        </p>
      </CardHeader>
      <CardBody>
        {isVerified ? (
          <div className='flex flex-col items-center justify-center text-center'>
            <Icon name='check' className='mb-4 h-16 w-16 text-green-500' />
            <h3 className='text-xl font-medium'>Verificação Concluída</h3>
            <p className='mt-2 text-gray-500'>Seu código foi verificado com sucesso.</p>
          </div>
        ) : (
          <form onSubmit={onSubmitCode}>
            <div className='flex'>
              <InputOtp
                length={6}
                onValueChange={onCodeChange}
                size='lg'
                autoFocus
                className='w-64'
              />
            </div>
            <Button
              type='submit'
              color='primary'
              disabled={isVerifying}
              className='w-full mt-6'
            >
              {isVerifying ? 'Verificando...' : 'Verificar Código'}
            </Button>
          </form>
        )}
      </CardBody>
      {!isVerified && (
        <CardFooter className='flex flex-col text-center text-sm text-gray-500'>
          <p>
            Não recebeu o código?{' '}
            <button
              type='button'
              onClick={onCodeResend}
              className='text-primary underline'
            >
              Reenviar código
            </button>
          </p>
        </CardFooter>
      )}
    </Card>
  )
}
