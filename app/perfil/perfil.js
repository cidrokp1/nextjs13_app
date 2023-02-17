"use client"
import React, { useMemo, useState, useContext } from 'react'; 
import { Typography, AccordionDetails, AccordionSummary, Accordion } from '@mui/material';
import Table from '@/pages/api/components/Table/Table.js';
// import AuthorizationContext from '../../../context/AuthorizationContext';
// import DataContext from "../../../context/DataContext";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Perfis = async () => {

//   const { isAdmin } = useContext(AuthorizationContext);
//   const { axiosOptions } = useContext(DataContext);
//   const [row, setRow] = useState();

  const isAdmin = true;
  const url = process.env.REACT_APP_API_URL + "/api/admin/roles/";

  const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=eae08655283c226acc01fd683762118d&language=en-US&page=1",{
    next: {
      revalidate: 30, //atualiza de 30 em 30 segundos
      cache: "force-cache", //no-store, no-cache, force-cache, only-if-cached
    },
  })
  const movies = await response.json(); 



  const handleCreate = isAdmin ? async (newData) => {
    newData.members = [];
    newData.permissions = [];
    const response = await axios.post(url, newData, axiosOptions);
    return response;
  } : null;

  const handleEdit = isAdmin ? async (oldData, newData) => {
    newData.id = oldData.id;
    newData.members = oldData.members ? oldData.members : [];
    newData.permissions = oldData.permissions ? oldData.permissions : [];
    return await axios.put(
      url + oldData.id,
      newData,
      axiosOptions
    );
  } : null;

  const handleDelete = isAdmin ? async (id) => {
    return await axios.delete(url + id, axiosOptions);
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
      <Typography variant="h4" gutterBottom>
        Administração
      </Typography>

      {/* <Table
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        columns={columns}
        listItems={movies.results}
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
      /> */}

    </>


  )
}

export default Perfis