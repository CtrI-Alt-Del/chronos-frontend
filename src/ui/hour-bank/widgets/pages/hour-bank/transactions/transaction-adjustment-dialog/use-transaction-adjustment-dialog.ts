import { useState } from 'react'

export function useTransactionAdjustmentDialog(
  collaboratorId: string,
  createTransactionAdjustment: (
    collaboratorId: string,
    time: string,
    operation: string,
  ) => Promise<void>,
) {
  const [time, setTime] = useState('')
  const [operation, setOperation] = useState('credit')

  function handleTimeChange(value: string) {
    setTime(value)
  }

  function handleOperationChange(value: string) {
    setOperation(value)
  }

  async function handleConfirmButtonClick() {
    await createTransactionAdjustment(collaboratorId, time, operation)
    setTime('')
  }

  return {
    time,
    operation,
    handleTimeChange,
    handleOperationChange,
    handleConfirmButtonClick,
  }
}
