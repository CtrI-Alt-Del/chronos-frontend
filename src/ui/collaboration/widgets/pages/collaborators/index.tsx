'use client'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Button,
  Select,
  SelectItem,
} from '@heroui/react'

import { CollaboratorTable } from './collaborator-table'
import { RegisterCollaboratorForm } from './create-collaborator-form'
import { useCollaboratorsPage } from './use-collaborators-page'
import Link from 'next/link'
import { ROUTES } from '@/constants'

export const CollaboratorsPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    collaborators,
    totalPages,
    page,
    isFetching,
    isAlteringCollaboratorStatus,
    statusSearchValue,
    handlePageChange,
    handleDisableEmployee,
    handleEnableEmployee,
    handleStatusSearchValueChange,
  } = useCollaboratorsPage()

  return (
    <div className=''>
      <div className='flex justify-between items-center py-4'>
        <div className='flex-1 space-y-2 w-full max-w-96'>
          <Select
            defaultSelectedKeys={['true']}
            label='Status do colaborador'
            value={statusSearchValue}
            onChange={(e) => handleStatusSearchValueChange(e.target.value)}
          >
            <SelectItem key='true'>Ativo</SelectItem>
            <SelectItem key='false'>Inativo</SelectItem>
          </Select>
        </div>

        <Button as={Link} href={ROUTES.collaboration.createCollaborator} color='primary'>
          Cadastrar colaborador
        </Button>
      </div>

      <div className='max-w-[460px] md:max-w-xl lg:max-w-full'>
        <CollaboratorTable
          isAlteringCollaboratorStatus={isAlteringCollaboratorStatus}
          handleDisableEmployee={handleDisableEmployee}
          handleEnableEmployee={handleEnableEmployee}
          page={page}
          isLoading={isFetching}
          collaborators={collaborators || []}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
