import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from '@mui/material';

const DynamicTable = ({ columns, data, onRemove }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2, width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.id === 'actions' ? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => onRemove(index)}
                    >
                      Remove
                    </Button>
                  ) : (
                    row[column.id] || 'N/A'
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
