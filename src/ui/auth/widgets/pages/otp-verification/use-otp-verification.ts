import { type FormEvent, useState } from 'react'

export function useOtpVerification(login: (code: string) => Promise<void>) {
  const [code, setCode] = useState('')

  function handleInputChange(code: string) {
    setCode(code)
  }

  async function handleSubmitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await login(code)
  }

  return {
    handleInputChange,
    handleSubmitCode,
  }
}
