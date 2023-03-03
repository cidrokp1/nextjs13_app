"use client"
import React, { useEffect, useState } from 'react'  
import InputLabel from "@mui/material/InputLabel";
import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import {
  Button,
  Dialog,  
  DialogActions,
  DialogContent,
  DialogTitle, 
  Stack,
  TextField, 
} from "@mui/material";
 

export const CreateNewModal = ({ open, columns, onClose, onSubmit }) => {
   

    const [values, setValues] = useState(() =>
      columns.reduce((acc, column) => {
        acc[column.accessorKey ?? ""] = "";
        return acc;
      }, {})
    );
  
    const [validationError, setValidationError] = useState(
      columns.map((column) => {
        let errorState =
          column.muiTableBodyCellEditTextFieldProps &&
          column.muiTableBodyCellEditTextFieldProps.required
            ? true
            : false;
        let errorMessage =
          column.muiTableBodyCellEditTextFieldProps &&
          column.muiTableBodyCellEditTextFieldProps.required
            ? "O campo é obrigatório"
            : "";
        return {
          id: column.accessorKey,
          error: errorState,
          message: errorMessage,
        };
      })
    );
  

    useEffect(() => {
      setValidationError(
        columns.map((column) => {
          let errorState =
            column.muiTableBodyCellEditTextFieldProps &&
            column.muiTableBodyCellEditTextFieldProps.required
              ? true
              : false;
          let errorMessage =
            column.muiTableBodyCellEditTextFieldProps &&
            column.muiTableBodyCellEditTextFieldProps.required
              ? "O campo é obrigatório"
              : "";
          return {
            id: column.accessorKey,
            error: errorState,
            message: errorMessage,
          };
        })
      );
    }, [open, columns]);
  
    const isValid = (isRequired, type, value, id) => {
      // console.log(value)
      let index = validationError.findIndex((item) => item.id === id);
      let error_state = false;
      let msg = "";
  
      switch (type) {
        case "email":
          if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) === false
          ) {
            error_state = true;
            msg = "Formato de email errado";
          }
          break;
        case "phoneNumber":
          if (/\b\d{6,9}\b/.test(value) === false) {
            error_state = true;
            msg = "O número está inválido";
          }
          break;
        case "select":
          if (value === "" || value === null || value===undefined ) {
            error_state = true;
            msg = "Selecione uma opção";
          }
          break;
      }
  
      let state = { id: id, error: error_state, message: msg };
      index === -1
        ? validationError.push(state)
        : (validationError[index] = state);
  
      if (isRequired && (!value || value.toString().trim() === "" || value === undefined)) {
        let state = { id: id, error: true, message: "O campo é obrigatório" };
        index === -1
          ? validationError.push(state)
          : (validationError[index] = state);
      }
  
      setValidationError(validationError);
    };
  
    const handleSubmit = () => {
      //put your validation logic here
      onSubmit(values);
      onClose();
    };
  
    const handleError = (id) => {
      let pos = validationError.findIndex((x) => x.id === id);
      return pos !== -1 ? validationError[pos].error : false;
    };
  
    const handleHelperText = (id) => {
      let pos = validationError.findIndex((x) => x.id === id);
      return pos !== -1 ? validationError[pos].message : "";
    };
  
    const renderElement = (column) => {
      if (column.enableOnCreate !== false) {
        switch (column.muiTableBodyCellEditTextFieldProps.type) {
          case "select":
            return(
             <FormControl 
             fullWidth 
             error={handleError(column.accessorKey)}
             required={column.muiTableBodyCellEditTextFieldProps.required}
             >
              <InputLabel id="demo-simple-select-label">
                {column.header}
              </InputLabel>
              <Select
                key={column.accessorKey}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name={column.accessorKey}
                label={column.header}
                onChange={(e) => {
                  isValid(
                    column.muiTableBodyCellEditTextFieldProps.required,
                    "select",
                    e.target.value,
                    column.accessorKey
                  );
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
                
              >
                {column.muiTableBodyCellEditTextFieldProps.children}
              </Select>
            </FormControl>);
            break;
          default:
            return (
              <TextField
                fullWidth
                key={column.accessorKey}
                type={
                  column.muiTableBodyCellEditTextFieldProps.type
                    ? column.muiTableBodyCellEditTextFieldProps.type
                    : column.DateType
                    ? column.DateType
                    : "text"
                }
                multiline={column.multiline ? true : column.muiTableBodyCellEditTextFieldProps.multiline ? true : false}
                rows={column.rows ? column.rows : column.muiTableBodyCellEditTextFieldProps.rows ? column.muiTableBodyCellEditTextFieldProps.rows : 1}
                label={column.header}
                name={column.accessorKey}
                required={column.muiTableBodyCellEditTextFieldProps.required}
                error={handleError(column.accessorKey)}
                helperText={handleHelperText(column.accessorKey)}
                onChange={(e) => {
                  isValid(
                    column.muiTableBodyCellEditTextFieldProps.required,
                    column.DateType, 
                    e.target.value,
                    column.accessorKey
                  );
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
              />
            );
        }
      } else {
        return <></>;
      }
    };
  
    return (
      <Dialog open={open}>
          <>
            <DialogTitle textAlign="center">Criar novo item</DialogTitle>
            <DialogContent>
              <div className="my-3">
                <form onSubmit={(e) => e.preventDefault()}>
                  <Stack
                    sx={{
                      width: "100%",
                      minWidth: { xs: "300px", sm: "360px", md: "400px" },
                      gap: "1.5rem",
                    }}
                  >
                    {columns.map((column, index) => (
                      <div key={index}> {renderElement(column)} </div> 
                    ))}
                  </Stack>
                </form>
              </div>
            </DialogContent>
            <DialogActions sx={{ p: "1.25rem" }}>
              <Button onClick={onClose}>Cancelar</Button>
              <Button
                color="primary"
                onClick={handleSubmit}
                disabled={validationError.some((x) => x.error)}
                variant="contained"
              >
                Adicionar
              </Button>
            </DialogActions>
          </>
      </Dialog>

    );
  };
  
  
