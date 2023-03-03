"use client"
import React, { useState } from "react"; 
import Typography from "@mui/material/Typography";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";  
import MenuExportExcel from "./MenuExportExcel";
import { Delete, AddBox } from "@mui/icons-material";
import MaterialReactTable from 'material-react-table';
import { IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload'; 
import { CreateNewModal } from "./CreateNewModal";
import Notiflix from 'notiflix';



const Table = ({
  title, 
  muiTableHeadCellProps, 
  muiTableBodyCellProps, 
  listItems,
  enableRowOrdering,
  renderDetailPanel,
  renderRowActionMenuItems,
  initialState,
  columns,
  handleEdit,
  handleDelete,
  handleCreate,
  handleBulkUpdate,
}) => {

  const [rowSelection, setRowSelection] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [buttonExcel, setButtonExcel] = useState(null);
  const open = Boolean(buttonExcel); 
 

  const handleCreateNewRow = async (values) => {
  
    handleCreate(values)
      .then((response) => {
        setData([...data, response.data]);
        Notiflix.Notify.success("Sucesso");
      })
      .catch((error) => handleErrors(error));
 
  };

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    

    row.getAllCells().map((item) => {
      if (item.selectedOptions) {
        values[item.column.id] = item.selectedOptions;
      }
    }); 
    handleEdit(data[row.index], values)
      .then((response) => { 
        data[row.index] = values;
        setData([...data]);
        Notiflix.Notify.success("Sucesso");
      })
      .catch((error) => handleErrors(error));
    
    exitEditingMode(); //required to exit editing mode
  };

  const handleDeleteRow = () => {
    Notiflix.Confirm.show(
      "Apagar",
      "Deseja apagar o(s) item(s)?",
      "Sim","Não",
      function () {
        const selectedIds = Object.keys(rowSelection);
        try { 
          selectedIds.forEach(async (id) => await handleDelete(id));
          let newArray = data.filter(
            (item) => !selectedIds.includes(item.id.toString())
          );
          setData([...newArray]);
          Notiflix.Notify.success("Sucesso");
        } catch (error) {
          handleErrors(error);
        } finally { 
          setRowSelection({});
        }
      },
      function () {
        Notiflix.Notify.failure("Cancelado");
      }
    );
  };

  return (
    <>
      {listItems && (
        <MaterialReactTable
          enableGrouping
          muiTableHeadCellProps={muiTableHeadCellProps}
          muiTableBodyCellProps={muiTableBodyCellProps}
          renderTopToolbarCustomActions={(table) => (
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
          columns={columns}
          data={listItems}
          positionActionsColumn="last"
          enableColumnOrdering
          enableEditing={handleEdit ? true : false}
          enableStickyHeader
          renderDetailPanel={renderDetailPanel}
          renderRowActionMenuItems={renderRowActionMenuItems}
          memoMode="cells"
          muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
          rowCount={data.length}
          getRowId={(row) => row.id}
          initialState={initialState}
          editingMode="modal"
          enableRowSelection
          positionToolbarAlertBanner="bottom"
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          onEditingRowSave={handleSaveRow}
          renderBottomToolbarCustomActions={({ table }) => {
            return (
              <div>
                {handleCreate && (
                  <Tooltip arrow title="Criar novo item">
                    <IconButton onClick={() => setCreateModalOpen(true)}>
                      <AddBox />
                    </IconButton>
                  </Tooltip>
                )}
                {handleDelete && (
                  <Tooltip arrow title="Apagar item">
                    <span>
                      <IconButton
                        disabled={
                          table.getSelectedRowModel().flatRows.length === 0
                        }
                        onClick={() => handleDeleteRow()}
                      >
                        <Delete />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
              </div>
            );
          }}
          enableRowOrdering={enableRowOrdering !== false}
          muiTableBodyRowDragHandleProps={({ table }) => ({
            onDragEnd: () => {
              const { draggingRow, hoveredRow } = table.getState();
              if (hoveredRow && draggingRow) {
                data.splice(
                  hoveredRow.index,
                  0,
                  data.splice(draggingRow.index, 1)[0]
                );
                let orderedRows = data.map((item, index) => ({
                  ...item,
                  ordem: index + 1,
                }));
                handleBulkUpdate(orderedRows)
                  .then((response) => setData([...orderedRows]))
                  .catch((error) => {
                    handleErrors(error);
                  });
              }
            },
          })}
          state={{ 
            rowSelection,  
          }}
          localization={MRT_Localization_PT_BR}
        />
      )}

      <CreateNewModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

export default Table;
