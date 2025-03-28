import { ROUTES } from '@/constants/routes'
import { useNavigation } from '@/ui/global/hooks/use-navigation'
import { useMemo } from 'react'

export function useHeaderTitle() {
  const { currentRoute } = useNavigation()

  const pageTitle = useMemo(() => {
    const routeTitles: Record<string, string> = {
      [ROUTES.workSchedule.timePunch]: 'Registrar ponto',
      [ROUTES.workSchedule.timeCard]: 'Espelho de pontos',
      [ROUTES.solicitation.solicitations]: 'Solicitações',
      [ROUTES.report]: 'Relatório analítico',
      [ROUTES.collaboration.profile]: 'Meu perfil',
      [ROUTES.workSchedule.schedules]: 'Escalas',
      [ROUTES.workSchedule.registerSchedule]: 'Registro de escala',
      [ROUTES.collaboration.collaborators]: 'Registro de colaboratores',
      [ROUTES.workSchedule.sectorHistory]: 'Histórico de colaboradores',
      [ROUTES.workSchedule.collaboratorHistory]: 'Meu histórico',
    }

    return routeTitles[currentRoute] || 'Página não encontrada'
  }, [currentRoute])

  return {
    pageTitle,
  }
}
