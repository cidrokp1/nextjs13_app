import { ExportToCsv } from 'export-to-csv';
import React from 'react';
import {
  MenuItem,
  Menu,
} from "@mui/material";

const MenuExportExcel = ({ open, setButtonExcel, buttonExcel, columns, table }) => {
  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportFilter = (rows) => {

    const returnValue = (layeredObj, properties) => {

      if (properties.length === 1) {
        return layeredObj[properties[0]];;
      }
      else {
        let layer = properties.shift();
        return returnValue(layeredObj[layer], properties);
      }
    }


    let colunas = [...table.table.getAllColumns()];
    colunas.shift();
    // let result = rows.map((row) => JSON.parse( '[' +
    //   colunas.map( col => (`'${col.columnDef.header}' : '${returnValue(row.original ,col.id.split("."))}',`))
    // + ']')
    //  );
    let result = []; 
    rows.forEach(row => {
      let obj = {};
      colunas.forEach(col => {
        if (col.columnDef.header !== "Ações" && col.columnDef.header !== "Expandir" && col.columnDef.header !== "Selecionar") {  
          obj[col.columnDef.header]=returnValue(row.original, col.id.split("."))  
        }
      })
      result.push(obj);
    });
    
    console.log(result); 
    console.log(JSON.stringify(result)); 
    // console.log(JSON.parse(result));
    csvExporter.generateCsv(JSON.stringify(result));
    setButtonExcel(null)
  };


  return (
    <div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={buttonExcel}
        open={open}
        onClose={() => setButtonExcel(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleExportFilter(table.table.getRowModel().rows)}>Exportar página</MenuItem>
        <MenuItem //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportFilter(table.table.getPrePaginationRowModel().rows)
          }>Exportar com filtros</MenuItem>
      </Menu>
    </div>
  )
}

export default MenuExportExcel;