"use client"
import React, { useMemo } from 'react'; 
import { Typography } from '@mui/material';
import Table from '@/components/shared/Table/Table'; 
 

const TableComponent = ({list}) => {

  // const { isAdmin } = useContext(AuthorizationContext);
  // const { fetchHeaders, url } = useContext(DataContext);
  const isAdmin = true;
  const fetchHeaders ={};
  const url = "http://localhost:8000/api"; 

 

  const handleCreate = isAdmin ? async (newData) => {
    newData.members = [];
    newData.permissions = []; 
    return await fetch(url, {method: 'POST', headers: fetchHeaders, body: newData})
  } : null;

  const handleEdit = isAdmin ? async (oldData, newData) => {
    newData.id = oldData.id;
    newData.members = oldData.members ? oldData.members : [];
    newData.permissions = oldData.permissions ? oldData.permissions : [];
    return await fetch(url + oldData.id, {method: 'PUT', headers: fetchHeaders, body: newData})
  } : null;

  const handleDelete = isAdmin ? async (id) => { 
    return await fetch(url + id, {
        method: 'DELETE',
        mode: 'no-cors',
        headers: fetchHeaders,
    })
  } : null;


 
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableColumnOrdering: true,
        enableOnCreate: false,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: {
          required: false,
          variant: 'outlined',
        },
        Cell: ({ cell }) => ( 
          <strong>
            {cell.getValue()}
          </strong>
        ),
      },
      {
        accessorKey: 'original_title',
        header: 'original_title', 
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          variant: 'outlined',
        },
      } , 
      {
        accessorKey: 'popularity',
        header: 'popularity', 
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          variant: 'outlined',
        },
      } 
    ],
    [],
  );


  return (
    <>
      <Typography variant="h5" gutterBottom>
        Administração
      </Typography>
      {list &&
        <Table
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        columns={columns}
        listItems={list}
        title={"Perfis de Acesso"} 
        enableRowOrdering={false} 
        initialState={
          {
            pagination:
            {
              pageSize: 10,
              pageIndex: 0
            },
            showColumnFilters: false,
          }}
      />
      }
      

    </>


  )
}

export default TableComponent