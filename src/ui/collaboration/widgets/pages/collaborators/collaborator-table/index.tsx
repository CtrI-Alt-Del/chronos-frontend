'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table'
import Link from 'next/link'
import { Pagination } from '@heroui/pagination'
import { Spinner } from '@heroui/spinner'
import { Button } from '@heroui/button'

import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import { ROUTES } from '@/constants'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { IconButton } from '@/ui/global/widgets/components/icon-button'
import { Tag } from '@/ui/global/widgets/components/tag'

type CollaboratorTableProps = {
  page: number
  isLoading: boolean
  collaborators: CollaboratorDto[]
  totalPages: number
  isAlteringCollaboratorStatus: boolean
  onPageChange: (page: number) => void
  handleDisableEmployee: (collaboratorId: string) => void
  handleEnableEmployee: (collaboratorId: string) => void
}

export const CollaboratorTable = ({
  isLoading,
  page,
  collaborators,
  totalPages,
  isAlteringCollaboratorStatus,
  onPageChange,
  handleDisableEmployee,
  handleEnableEmployee,
}: CollaboratorTableProps) => {
  return (
    <>
      <Table
        bottomContent={
          totalPages > 1 ? (
            <div className='flex w-full'>
              <Pagination
                isCompact
                showControls
                showShadow
                page={page}
                total={totalPages}
                onChange={onPageChange}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key='name' className='uppercase'>
            Nome
          </TableColumn>
          <TableColumn key='email' className='uppercase'>
            Email
          </TableColumn>
          <TableColumn key='cpf' className='uppercase'>
            CPF
          </TableColumn>
          <TableColumn key='role' className='uppercase'>
            Cargo
          </TableColumn>
          <TableColumn key='sector' className='uppercase'>
            Setor
          </TableColumn>
          <TableColumn key='status' className='uppercase'>
            Status
          </TableColumn>
          <TableColumn key='options' className='uppercase'>
            Ações
          </TableColumn>
        </TableHeader>
        <TableBody
          items={collaborators}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' />}
          emptyContent='Nenhum colaborador encontrado.'
        >
          {(item) => (
            <TableRow key={item.id} className={isLoading ? 'opacity-25' : 'opacity-100'}>
              <TableCell key='name'>
                <span>{item.name}</span>
              </TableCell>
              <TableCell key='email'>
                <span>{item.email}</span>
              </TableCell>
              <TableCell key='cpf'>
                <span>{item.cpf}</span>
              </TableCell>
              <TableCell key='role'>
                <span>{item.role === 'MANAGER' ? 'Gerente' : 'Colaborador'}</span>
              </TableCell>
              <TableCell key='sector'>
                <span>
                  {(() => {
                    switch (item.sector) {
                      case 'PRODUCTION':
                        return 'Produção'
                      case 'HUMAN_RESOURCES':
                        return 'Recursos Humanos'
                      case 'COMERCIAL':
                        return 'Comercial'
                      case 'ADMINISTRATIVE':
                        return 'Administrativo'
                      default:
                        return item.sector
                    }
                  })()}
                </span>
              </TableCell>
              <TableCell key={'status'}>
                {item.isActive ? (
                  <Tag type='sucess'>Ativo</Tag>
                ) : (
                  <Tag type='danger'>Inativo</Tag>
                )}
              </TableCell>
              <TableCell key={'actions'}>
                <Button
                  as={Link}
                  href={ROUTES.hourBank(item.id as string)}
                  isIconOnly
                  variant='light'
                  className='text-slate-600'
                >
                  <Icon name='hourglass' size={20} />
                </Button>

                <Button
                  as={Link}
                  href={ROUTES.collaboration.collaborator(String(item.id))}
                  isIconOnly
                  variant='light'
                  className='text-slate-600'
                >
                  <Icon name='collaborator' size={20} />
                </Button>
                {item.isActive ? (
                  <AlertDialog
                    isLoading={isAlteringCollaboratorStatus}
                    trigger={
                      <IconButton
                        name='trash'
                        className='h-10 text-gray-700 bg-transparent duration-1000 hover:bg-primary hover:text-white border-zinc-400 min-w-10'
                        size={20}
                      />
                    }
                    onCancel={() => {}}
                    title='ALERTA'
                    onConfirm={() => handleDisableEmployee(String(item.id))}
                  >
                    Voce tem certeza que deseja desativar esse colaborador?
                  </AlertDialog>
                ) : (
                  <AlertDialog
                    trigger={
                      <IconButton
                        name='file'
                        className='h-10 text-gray-700 bg-transparent duration-1000 hover:bg-primary hover:text-white border-zinc-400 min-w-10'
                        size={20}
                      />
                    }
                    onCancel={() => {}}
                    title='ALERTA'
                    onConfirm={() => handleEnableEmployee(String(item.id))}
                  >
                    Voce tem certeza que deseja ativar esse colaborador?
                  </AlertDialog>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
