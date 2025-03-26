'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import { Chip } from '@heroui/chip';
import { Tooltip } from '@heroui/tooltip';
import { Pagination } from "@heroui/pagination";
import { Spinner } from "@heroui/spinner"
import { Eye } from '@phosphor-icons/react';
import type { CollaboratorDto } from '@/@core/collaboration/dtos';

type CollaboratorTableProps = {
    page: number
    isLoading: boolean
    collaborators: CollaboratorDto[]
    totalPages: number
    onPageChange: (page: number) => void
  }

export const CollaboratorTable = ({
    isLoading,
    page,
    collaborators,
    totalPages,
    onPageChange,
  }: CollaboratorTableProps) => {
  return (
    <>
    <Table 
      bottomContent={
        totalPages > 1 ? (
        <div className="flex w-full">
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
      }>
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
          <TableRow key={item.id}>
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
                <span>{item.role}</span>
              </TableCell>
              <TableCell key={'sector'}>
                <span>{item.sector}</span>
              </TableCell>
              <TableCell key={'status'}>
                  <Chip
                    className="capitalize"
                    color={item.isActive ? "success" : "warning"}
                    size="sm"
                    variant="flat"
                  >
                    {item.isActive ? "Ativado" : "Desativado"}
                  </Chip>
              </TableCell>
              <TableCell key={'actions'}>
                <Tooltip content="Detalhes">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Eye />
                  </span>
                </Tooltip>
              </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </>

  );
}