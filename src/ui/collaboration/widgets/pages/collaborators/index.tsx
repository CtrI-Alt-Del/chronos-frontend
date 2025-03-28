'use client'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Button,
} from '@heroui/react'

import { CollaboratorTable } from './collaborator-table'
import { RegisterCollaboratorForm } from './register-collaborator-form'
import { useCollaboratorsPage } from './use-collaborator-page'
import { Search } from '@/ui/global/widgets/components/search'

export const CollaboratorsPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    collaborators,
    totalPages,
    page,
    nameSearchvalue,
    handleNameSearchChange,
    isFetching,
    handlePageChange,
    handleRegisterCollaborator,
  } = useCollaboratorsPage()

  return (
    <div className=''>
      <div className='flex justify-between items-center py-4'>
        <div className='flex-1 space-y-2 w-full max-w-96'>
          <Search value={nameSearchvalue} onSearchChange={handleNameSearchChange} />
        </div>

        <Button color='primary' onPress={onOpen}>
          Registrar Colaborador
        </Button>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className='flex flex-col gap-1'>
                  Registrar Colaborador
                </DrawerHeader>
                <DrawerBody>
                  <RegisterCollaboratorForm
                    onSubmit={async () => {
                      await handleRegisterCollaborator()
                      onClose
                    }}
                    onCancel={onClose}
                  />
                </DrawerBody>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>

      <CollaboratorTable
        page={page}
        isLoading={isFetching}
        collaborators={collaborators || []}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
