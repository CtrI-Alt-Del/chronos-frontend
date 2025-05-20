export function usePaidOvertimeDialog(
  createPaidOvertime: () => Promise<void>,
) {
  async function handleDialogConfirm() {
    await createPaidOvertime()
  }

  return {
    handleDialogConfirm,
  }
}
