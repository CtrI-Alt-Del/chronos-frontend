import { ROUTES } from "@/@core/global/constants/routes";
import { useNavigation } from "@/ui/global/hooks/use-navigation";
import { useMemo } from "react";

export function useHeaderTitle() {
  const { currentRoute } = useNavigation()

  const pageTitle = useMemo(() => {
    const routeTitles: Record<string, string> = {
      [ROUTES.timePunch]: 'Registrar ponto',
      [ROUTES.history]: 'Histórico de pontos',
      [ROUTES.mirror]: 'Espelho de pontos',
      [ROUTES.reviews]: 'Revisões',
      [ROUTES.report]: 'Relatório analítico',
      [ROUTES.profile]: 'Meu perfil',
      [ROUTES.workSchedule.list]: 'Escalas',
      [ROUTES.workSchedule.register]: 'Registro de escala',
      [ROUTES.collaborators]: 'Registro de colaboratores',
      [ROUTES.timeRecordAllCollaborators]: 'Registro de pontos dos colaboradores',
      [ROUTES.pointHistory]: 'Historico de Pontos'

    }

    return routeTitles[currentRoute] || 'Página não encontrada'
  }, [currentRoute])

  return {
    pageTitle,
  }
}
