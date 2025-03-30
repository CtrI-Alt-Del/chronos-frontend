'use client'
import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table'
import { Chip } from '@heroui/chip'
import { Tooltip } from '@heroui/tooltip'
import { Pagination } from '@heroui/pagination'
import { Spinner } from '@heroui/spinner'
import { Eye } from '@phosphor-icons/react'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import { IconButton } from '@/ui/global/widgets/components/icon-button'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { Tag } from '@/ui/global/widgets/components/tag'

type CollaboratorTableProps = {
  page: number
  isLoading: boolean
  collaborators: CollaboratorDto[]
  totalPages: number
  onPageChange: (page: number) => void
  handleDisableEmployee: (collaboratorId: string) => void
  handleEnableEmployee: (collaboratorId: string) => void
  isAlteringCollaboratorStatus: boolean
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
              <TableCell key={'name'}>
                <span>{item.name}</span>
              </TableCell>
              <TableCell key={'email'}>
                <span>{item.email}</span>
              </TableCell>
              <TableCell key={'cpf'}>
                <span>{item.cpf}</span>
              </TableCell>
              <TableCell key={'role'}>
                <span>{item.role === 'MANAGER' ? 'Gerente' : 'Colaborador'}</span>
              </TableCell>
              <TableCell key={'sector'}>
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
                    onCancel={() => { }}
                    title='ALERTA'
                    onConfirm={() => handleDisableEmployee(item.id as string)}
                  >
                    Voce tem certeza que deseja desativar esse colaborador? Foi vc que fez?
                  </AlertDialog>
                ) : (
                  <AlertDialog
                    trigger={
                      <IconButton
                        name='activity'
                        className='h-10 text-gray-700 bg-transparent duration-1000 hover:bg-primary hover:text-white border-zinc-400 min-w-10'
                        size={20}
                      />
                    }
                    onCancel={() => { }}
                    title='ALERTA'
                    onConfirm={() => handleEnableEmployee(item.id as string)}
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
