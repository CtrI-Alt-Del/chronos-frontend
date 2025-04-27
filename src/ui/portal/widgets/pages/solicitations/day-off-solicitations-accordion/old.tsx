// 'use client'

// import type { DayOffSolicitationDto, SolicitationDto } from '@/@core/portal/dtos'
// import { useDatetime } from '@/ui/global/hooks/use-datetime'
// import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
// import { Icon } from '@/ui/global/widgets/components/Icon'
// import { Accordion, AccordionItem } from '@heroui/accordion'
// import { Avatar } from '@heroui/avatar'
// import { Spinner } from '@heroui/spinner'
// import { SolicitationActions } from '../solicitation-actions'
// import { AttachmentDialog } from '@/ui/global/widgets/components/attachment-dialog'
// import { IconButton } from '@/ui/global/widgets/components/icon-button'

// type SolicitationAccordionProps = {
//   solicitations: DayOffSolicitationDto[] | null
//   isLoading: boolean
//   userRole: string
//   isResolvingSolicitation: boolean
//   handleDeny: (solicitation: SolicitationDto) => void
//   handleApprove: (solicitation: SolicitationDto) => void
// }

// export const DayOffSolicitationAccordion = ({
//   userRole,
//   solicitations,
//   isLoading,
//   isResolvingSolicitation,
//   handleDeny,
//   handleApprove,
// }: SolicitationAccordionProps) => {
//   const { formatDate } = useDatetime()
//   if (isLoading) {
//     return (
//       <div className='flex items-center justify-center h-64'>
//         <Spinner color='primary' />
//       </div>
//     )
//   }

//   if (!solicitations || solicitations.length === 0) {
//     return (
//       <div className='flex items-center justify-center h-64'>
//         <span className='text-gray-500'>Nenhuma solicitação encontrada</span>
//       </div>
//     )
//   }

//   const statusMapping: Record<string, { label: string; color: string }> = {
//     PENDING: { label: 'Pendente', color: 'bg-yellow-500 text-yellow-500' },
//     APPROVED: { label: 'Aprovado', color: 'bg-green-500 text-green-500' },
//     DENIED: { label: 'Negado', color: 'bg-red-500 text-red-500' },
//   }

//   return (
//     <Accordion className='border border-gray-border rounded-lg px-4'>
//       {solicitations.map((solicitation) => {
//         const statusInfo = statusMapping[solicitation.status] || {
//           label: solicitation.status,
//           color: 'bg-gray-500 text-gray-500',
//         }
//         const dayOffSchedule = solicitation as DayOffSolicitationDto
//         return (
//           <AccordionItem
//             key={solicitation.id}
//             hideIndicator={userRole === 'EMPLOYEE'}
//             aria-label={`Accordion ${solicitation.id}`}
//             indicator={<Icon name='arrow-down' className='w-4 h-4' />}
//             title={
//               <div className='flex flex-col md:flex-row items-center justify-between w-full text-sm lg:text-base'>
//                 <div className='flex items-center gap-2'>
//                   <div
//                     className={`w-3 h-3 rounded-full ${statusInfo.color.split(' ')[0]}`}
//                   />
//                   <span className='text-gray-500 text-sm md:text-lg'>
//                     Pedido de folga
//                   </span>
//                 </div>
//                 <span
//                   className={`block translate-y-3 text-base ${statusInfo.color.split(' ')[1]}`}
//                 >
//                   {statusInfo.label}
//                 </span>
//               </div>
//             }
//             subtitle={
//               <div className='flex flex-col md:flex-row items-center gap-6 mt-2 pl-6'>
//                 <span className='text-slate-800 text-sm'>
//                   {formatDate(solicitation.date as Date)}
//                 </span>
//                 <div className='flex items-center gap-2'>
//                   <Avatar
//                     color='primary'
//                     isBordered
//                     className='size-3 rounded-full'
//                     radius='sm'
//                   />
//                   <span className='text-slate-800'>
//                     {solicitation.senderResponsible?.dto.name}
//                   </span>
//                   <span className='text-slate-800'>
//                     {solicitation.justification.justificationType.name}
//                   </span>
//                   <AttachmentDialog
//                     attachmentKey={solicitation.justification.attachment?.key}
//                     trigger={
//                       <IconButton
//                         name='file'
//                         className=' text-slate-800 bg-transparent duration-1000 hover:bg-primary hover:text-white border-zinc-400 '
//                       />
//                     }
//                   />
//                 </div>
//               </div>
//             }
//           >
//             <div className='flex justify-between flex-col md:flex-row items-center'>
//               <div>{solicitation.justification.description}</div>
//               {/* {userRole === 'MANAGER' && solicitation.status === 'PENDING' && (
//                 <SolicitationActions
//                   solicitation={solicitation}
//                   handleDeny={handleDeny}
//                   handleApprove={handleApprove}
//                 />
//               )} */}
//             </div>
//           </AccordionItem>
//         )
//       })}
//     </Accordion>
//   )
// }
