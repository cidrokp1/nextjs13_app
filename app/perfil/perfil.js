"use client"
import React, { useMemo, useState, useContext } from 'react'; 
import { Typography, AccordionDetails, AccordionSummary, Accordion } from '@mui/material';
import Table from '@/components/shared/Table/Table';
 

const Perfis = ({list}) => {

//   const { isAdmin } = useContext(AuthorizationContext);
//   const { axiosOptions } = useContext(DataContext);
//   const [row, setRow] = useState();

 

  // const handleCreate = isAdmin ? async (newData) => {
  //   newData.members = [];
  //   newData.permissions = [];
  //   const response = await axios.post(url, newData, axiosOptions);
  //   return response;
  // } : null;

  // const handleEdit = isAdmin ? async (oldData, newData) => {
  //   newData.id = oldData.id;
  //   newData.members = oldData.members ? oldData.members : [];
  //   newData.permissions = oldData.permissions ? oldData.permissions : [];
  //   return await axios.put(
  //     url + oldData.id,
  //     newData,
  //     axiosOptions
  //   );
  // } : null;

  // const handleDelete = isAdmin ? async (id) => {
  //   return await axios.delete(url + id, axiosOptions);
  // } : null;
 
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

      <Table
        handleCreate={null}
        handleEdit={null}
        handleDelete={null}
        columns={columns}
        listItems={list}
        title={"Perfis de Acesso"}
        // url={url}
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

    </>


  )
}

export default Perfis