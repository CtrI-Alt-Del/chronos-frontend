import { CollaboratorPage } from "@/ui/collaboration/widgets/pages/collaborator";
import { ProtectedRoute } from "@/ui/auth/components/protected-route";

export default function Page() {
  return (
    <ProtectedRoute requiredPermission="manage_collaborators">
      <CollaboratorPage />
    </ProtectedRoute>
  );
}
