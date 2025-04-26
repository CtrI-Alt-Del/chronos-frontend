import { TransactionAdjustmentDialogView } from './transaction-adjustment-dialog-view'
import { useCreateTransactionAdjustmentAction } from './use-create-transaction-adjustment-action'
import { useTransactionAdjustmentDialog } from './use-transaction-adjustment-dialog'

type Props = {
  collaboratorId: string
}

export const TransactionAdjustmentDialog = ({ collaboratorId }: Props) => {
  const { isCreatingTransactionAdjustment, createTransactionAdjustment } =
    useCreateTransactionAdjustmentAction()
  const {
    time,
    operation,
    handleTimeChange,
    handleOperationChange,
    handleConfirmButtonClick,
  } = useTransactionAdjustmentDialog(collaboratorId, createTransactionAdjustment)

  return (
    <TransactionAdjustmentDialogView
      isLoading={isCreatingTransactionAdjustment}
      time={time}
      operation={operation}
      onTimeChange={handleTimeChange}
      onOperationChange={handleOperationChange}
      onButtonConfirmClick={handleConfirmButtonClick}
    />
  )
}
