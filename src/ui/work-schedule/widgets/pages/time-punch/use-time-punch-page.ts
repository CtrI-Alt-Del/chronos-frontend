import { useEffect, useState } from 'react'

export function useTimePunchPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  function handlePunchRegister() {
    if (currentStep === 4) {
      setCurrentStep(1)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  return {
    currentTime,
    currentStep,
    isComplete,
    handlePunchRegister,
  }
}
