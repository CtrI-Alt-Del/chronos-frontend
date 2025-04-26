import { SolicitationDto } from "@/@core/solicitation/dtos";
import { AlertDialog } from "@/ui/global/widgets/components/alert-dialog";
import { Button } from "@heroui/button";
type renderManagerActionsProps = {
  solicitation: SolicitationDto
  handleDeny: (solicitation: SolicitationDto) => void 
  handleApprove: (solicitation: SolicitationDto) => void
}
export const RenderManagerActions = ({solicitation,handleDeny,handleApprove}:renderManagerActionsProps) => (
    <div className='flex flex-col md:flex-row gap-2 mt-2 w-full md:w-fit'>
      <AlertDialog
        trigger={
          <Button color='success' className='text-white' size='sm'>
            Aprovar
          </Button>
        }
        onCancel={() => {}}
        title='ALERTA'
        onConfirm={() => handleApprove(solicitation)}
      >
        Você tem certeza que deseja aprovar essa solicitação?
      </AlertDialog>
      <AlertDialog
        trigger={
          <Button color='danger' size='sm'>
            Negar
          </Button>
        }
        onCancel={() => {}}
        title='ALERTA'
        onConfirm={() => handleDeny(solicitation)}
      >
        Você tem certeza que deseja negar essa solicitação?
      </AlertDialog>
    </div>
  )
