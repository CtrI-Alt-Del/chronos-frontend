export function usePaidOvertimeSolicitationDialog(
  createSolicitation: () => Promise<void>,
) {
  async function handleDialogConfirm() {
    await createSolicitation()
  }

  return {
    handleDialogConfirm,
  }
}
