import { useMemo } from "react";
import { useNavigation } from "@/src/ui/global/hooks/useNavigation";
import { ROUTES } from "@/src/@core/src/constants/routes";

export function HeaderTitle() {
  const { currentRoute } = useNavigation();

  const pageTitle = useMemo(() => {
    const routeTitles: Record<string, string> = {
      [ROUTES.timePunch]: "Registrar ponto",
      [ROUTES.history]: "Histórico de pontos",
      [ROUTES.mirror]: "Espelho de pontos",
      [ROUTES.reviews]: "Revisões",
      [ROUTES.report]: "Relatório analítico",
      [ROUTES.profile]: "Meu perfil",
      [ROUTES.workSchedule.list]: "Escalas",
      [ROUTES.workSchedule.register]: "Registro de escala",
    };

    return routeTitles[currentRoute] || "Página não encontrada";
  }, [currentRoute]);

  return (
    <h1 className="text-2xl font-extrabold text-black md:text-3xl">
      {pageTitle}
    </h1>
  );
}
