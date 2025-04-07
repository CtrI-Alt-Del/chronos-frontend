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
    <div className='w-[calc(100vw-50px)] md:w-full border-gray-border border rounded-lg p-2 md:p-10'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-2 w-full md:flex-row md:gap-4'>
          <Select
            defaultSelectedKeys={['true']}
            value={statusSearchValue}
            onChange={(e) => handleStatusSearchValueChange(e.target.value)}
          >
            <SelectItem classNames={{ title: 'text-xs md:text-base' }} key='true'>Ativo</SelectItem>
            <SelectItem classNames={{ title: 'text-xs md:text-base' }} key='false'>Inativo</SelectItem>
          </Select>
          <Button color='primary' className='px-5 text-xs md:text-base' onPress={onOpen}>
            Registrar Colaborador
          </Button>
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
