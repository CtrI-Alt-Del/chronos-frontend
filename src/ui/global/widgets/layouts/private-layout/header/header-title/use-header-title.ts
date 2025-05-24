import { useMemo } from 'react'

import { ROUTES } from '@/constants/routes'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { useNavigation } from '@/ui/global/hooks/use-navigation'

function createTitleRouter(routes: Record<string, string>) {
  return {
    resolve: (path: string) => {
      if (typeof routes[path] !== 'undefined') {
        return routes[path]
      }

      const matchingPattern = Object.keys(routes)
        .filter((pattern) => pattern.endsWith('*'))
        .find((pattern) => path.startsWith(pattern.slice(0, -1)))

      if (matchingPattern) {
        return routes[matchingPattern]
      }

      return routes.default || 'Página não encontrada'
    },
  }
}

export function useHeaderTitle() {
  const { currentRoute } = useNavigation()
  const { account } = useAuthContext()

  const pageTitle = useMemo(() => {
    if (!currentRoute) {
      return 'Página não encontrada'
    }

    const isManager = account?.role === 'MANAGER' || account?.role === 'ADMIN'

    const titleRouter = createTitleRouter({
      [ROUTES.workSchedule.dashboard]: 'Dashboard',
      [ROUTES.workSchedule.timePunch]: 'Registrar ponto',
      [ROUTES.workSchedule.timeCard]: 'Espelho de pontos',
      [ROUTES.report]: 'Relatório analítico',
      [ROUTES.workSchedule.schedules]: 'Escalas',
      [ROUTES.workSchedule.schedule()]: 'Escala',
      [ROUTES.collaboration.collaborators]: 'Registro de colaboradores',
      [ROUTES.workSchedule.sectorHistory]: 'Histórico de colaboradores',
      [ROUTES.workSchedule.collaboratorHistory]: 'Meu histórico',
      [ROUTES.collaboration.createCollaborator]: 'Cadastrar colaborador',
      [ROUTES.workSchedule.hoursBank]: 'Banco de horas',
      [ROUTES.portal.justificationTypes]: 'Tipos de Justificativas',
      [ROUTES.portal.solicitations]: isManager
        ? 'Solicitações do Setor'
        : 'Minhas Solicitações',
      '/collaboration/collaborators/create*': 'Cadastrar colaborador',
      '/collaboration/collaborators/*': 'Perfil',
      '/hour-bank/*': 'Banco de horas',
      '/work-schedule/schedules/*': 'Escala',
      default: 'Página não encontrada',
    })

    return titleRouter.resolve(currentRoute)
  }, [currentRoute, account?.role])

  return {
    pageTitle,
  }
}
