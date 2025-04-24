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
      [ROUTES.workSchedule.schedules]: 'Escalas',
      [ROUTES.workSchedule.schedule()]: 'Escala',
      [ROUTES.collaboration.collaborators]: 'Registro de colaboradores',
      [ROUTES.workSchedule.sectorHistory]: 'Histórico de colaboradores',
      [ROUTES.workSchedule.collaboratorHistory]: 'Meu histórico',
      [ROUTES.collaboration.createCollaborator]: 'Cadastrar colaborador',
      [ROUTES.workSchedule.hoursBank]: 'Banco de horas',
      [ROUTES.solicitation.justificationTypes]: 'Tipos de Justificativas',
    }

    if (currentRoute === ROUTES.solicitation.solicitations) {
      return account?.role === 'MANAGER' || account?.role === 'ADMIN'
        ? 'Solicitações do Setor'
        : 'Minhas Solicitações '
    }

    if (currentRoute.startsWith('/work-schedule/schedules/')) {
      return 'Escala'
    }

    if (currentRoute.startsWith('/collaboration/collaborators/create')) {
      return 'Cadastrar colaborador'
    }

    if (currentRoute.startsWith('/collaboration/collaborators/')) {
      return 'Perfil'
    }

    return routeTitles[currentRoute] || 'Página não encontrada'
  }, [currentRoute, account?.role])

  return {
    pageTitle,
  }
}
