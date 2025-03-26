import { allowPageByRole } from "@/server/allow-page-by-role";
import { CollaboratorsPage } from "@/ui/collaboration/widgets/pages/collaborators";

export default async function Page() {
  await allowPageByRole(["collaborator", "manager"]);

  return <CollaboratorsPage />;
}
