import { useCreateTimePunchAdjustmentSolicitationAction } from './use-create-time-punch-adjustment-solicitation-action'

export function useTimePunchAdjustmentSolicitationModal() {
  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  return {
    today,
  }
}
