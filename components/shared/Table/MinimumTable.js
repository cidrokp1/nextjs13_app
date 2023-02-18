"use client"
import React, { useEffect, useContext, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import Typography from "@mui/material/Typography";  
import axios from "axios";
import DataContext from "../context/DataContext";   
import "alertifyjs/build/css/alertify.css"; 
import {  
  IconButton, 
  Tooltip,
} from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MenuExportExcel from './MenuExportExcel';

 
const MinimumTable = ({title, url, muiTableBodyCellProps, renderTopToolbarCustomActions, enableStickyHeader, muiTableHeadCellProps, enableRowSelection, handleBulkUpdate, updateTable, listItems, enableRowActions, enableRowOrdering, renderDetailPanel,renderRowActionMenuItems, initialState, columns  }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  
  const [isRefetching, setIsRefetching] = useState(false);   
  const [rowSelection, setRowSelection] = useState({}); 
  const { axiosOptions ,isLoading, setIsLoading, handleErrors} = useContext(DataContext); 
  
  
  const [buttonExcel, setButtonExcel] = useState(null);
  const open = Boolean(buttonExcel);
 
    
  useEffect( () => {  
     const fetchData = async () => {
  
      setIsLoading(true);
      setIsRefetching(true);
      axios.get(url,  axiosOptions ).then(
        response => { 
          setData(response.data);  
          setIsError(false);
          setIsLoading(false); 
          setIsRefetching(false);
        }
      ).catch(
        error  => {
          setIsError(true);
          setError(error)
          setIsLoading(false);
          setIsRefetching(false);
          console.error(error);
        }
      )
    };


    url !== null && !listItems ? 
    fetchData() 
    :  
    setData(listItems); 
  }, [updateTable, listItems]);  

  
  
  return (
     <> 
     {data && !isLoading &&
       <MaterialReactTable
          tableOptions
          muiTableBodyCellProps={muiTableBodyCellProps}
          enableStickyHeader={enableStickyHeader}
          muiTableHeadCellProps={muiTableHeadCellProps} 
          columns={columns}
          data={data} 
          positionActionsColumn="last"
          enableColumnOrdering
          enableRowActions={enableRowActions}
          // enableEditing  
          enableGrouping  
          renderDetailPanel={renderDetailPanel} 
          renderRowActionMenuItems={renderRowActionMenuItems} 
          muiTableContainerProps={{ sx: { maxHeight: '600px' } }}  
          muiToolbarAlertBannerProps={
              isError ? { color: 'error', children: 'Erro ao processar a tabela. \n\n' + error }  : undefined
          } 
          rowCount={data.length}
          getRowId={(row) => row.id} 
          initialState={initialState} 
          enableRowSelection={enableRowSelection}
          positionToolbarAlertBanner="bottom"
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own 
          
          enableRowOrdering={enableRowOrdering !== false  }
          renderTopToolbarCustomActions={renderTopToolbarCustomActions ? renderTopToolbarCustomActions : 
            ({ table }) => (
            <div className="row w-100 d-flex justify-content-around">
              <div className="col">  
                <Typography component="span" variant="h6"> 
                  {title}
                </Typography>
              </div>
              <div className="col-2 text-end">
              <Tooltip title="Exportar">
                <IconButton onClick={(event)=>setButtonExcel(event.currentTarget)}> 
                  <FileDownloadIcon />
                </IconButton>
              </Tooltip>
              <MenuExportExcel table={table} open={open} columns={columns} setButtonExcel={setButtonExcel} buttonExcel={buttonExcel}/>
              </div>
             </div>
            
          )}

          muiTableBodyRowDragHandleProps={({ table }) => ({
              onDragEnd: () => {
                const { draggingRow, hoveredRow } = table.getState();
                if (hoveredRow && draggingRow) {
                    data.splice( hoveredRow.index, 0, data.splice(draggingRow.index, 1)[0], );
                    let orderedRows = data.map((item, index) => ({...item, ordem: index +1 })) ;
                    handleBulkUpdate(orderedRows).then(
                      response =>  setData([...orderedRows])
                    ).catch(
                      error => {
                        handleErrors(error);
                      }
                    );   
                }
              },
        })} 
        state={{ 
          isLoading, 
          rowSelection,
          showAlertBanner: isError,
          showProgressBars: isRefetching, 
        }}
        localization={MRT_Localization_PT_BR}
   />  
     }
    
    
     </>
    
  );

};




 
 

export default MinimumTable;