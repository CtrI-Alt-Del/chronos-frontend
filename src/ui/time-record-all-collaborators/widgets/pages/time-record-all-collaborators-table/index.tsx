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

export const TimeRecordAllCollaboratorsTable = () => {
  return (
    <Table>
        <TableHeader>
          <TableColumn key='name' className='uppercase'>
            Nome
          </TableColumn>
          <TableColumn key='date' className='uppercase'>
            Data
          </TableColumn>
          <TableColumn key='first-entry' className='uppercase'>
            Entrada 1
          </TableColumn>
          <TableColumn key='first-exit' className='uppercase'>
            Saída 1
          </TableColumn>
          <TableColumn key='second-entry' className='uppercase'>
            Entrada 2
          </TableColumn>
          <TableColumn key='second-exit' className='uppercase'>
            Saída 2
          </TableColumn>
        </TableHeader>
      <TableBody>
          <TableRow key="1">
              <TableCell key={'name'}>
                <span>José Silva</span>
              </TableCell>
              <TableCell key={'date'}>
                <span>11/09/2005</span>
              </TableCell>
              <TableCell key={'first-entry'}>
                <span>8:00</span>
              </TableCell>
              <TableCell key={'first-exit'}>
                <span>12:00</span>
              </TableCell>
              <TableCell key={'second-entry'}>
                <span>13:00</span>
              </TableCell>
              <TableCell key={'second-exit'}>
                <span>17:00</span>
              </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  );
}