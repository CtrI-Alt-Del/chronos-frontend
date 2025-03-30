import { ROUTES } from '@/constants/routes'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { useNavigation } from '@/ui/global/hooks/use-navigation'
import { useMemo } from 'react'

export function useHeaderTitle() {
  const { currentRoute } = useNavigation()
  const { account } = useAuthContext()

  const pageTitle = useMemo(() => {
    const routeTitles: Record<string, string> = {
      [ROUTES.workSchedule.timePunch]: 'Registrar ponto',
      [ROUTES.workSchedule.timeCard]: 'Espelho de pontos',
      [ROUTES.report]: 'Relatório analítico',
      [ROUTES.collaboration.profile]: 'Meu perfil',
      [ROUTES.workSchedule.schedules]: 'Escalas',
      [ROUTES.workSchedule.schedule()]: 'Escala',
      [ROUTES.collaboration.collaborators]: 'Registro de colaboratores',
      [ROUTES.workSchedule.sectorHistory]: 'Histórico de colaboradores',
      [ROUTES.workSchedule.collaboratorHistory]: 'Meu histórico',
    }

    if (currentRoute === ROUTES.solicitation.solicitations) {
      return account?.role === 'manager' || account?.role === 'admin'
        ? 'Solicitações'
        : 'Solicitações do Setor'
    }

    if (currentRoute.startsWith('/work-schedule/schedules/')) {
      return 'Escala'
    }

    return routeTitles[currentRoute] || 'Página não encontrada'
  }, [currentRoute, account?.role])

  return {
    pageTitle,
  }
}
