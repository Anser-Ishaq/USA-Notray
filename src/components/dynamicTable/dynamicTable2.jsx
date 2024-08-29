import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Button,
    Typography,
} from '@mui/material';

const DynamicTable2 = ({ columns, data = [], actions = [] }) => {
    const hasColumns = columns.length > 0;
    const hasData = data.length > 0;

    return (
        <Box sx={{ overflowX: 'auto', mt: 3 }}>
            <TableContainer component={Paper} sx={{ mt: 2, width: '100%' }}>
                <Table>
                    {hasColumns && (
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell key={index}>{column.label}</TableCell>
                                ))}
                                {actions.length > 0 && <TableCell>Actions</TableCell>}
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {hasData ? (
                            data.map((row, rowIndex) => (
                                <TableRow key={row.id || rowIndex}>
                                    {columns.map((column, colIndex) => (
                                        <TableCell key={colIndex}>
                                            {column.render
                                                ? column.render(row[column.field], row)
                                                : row[column.field]}
                                        </TableCell>
                                    ))}
                                    {actions.length > 0 && (
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                {actions.map((action, actionIndex) => (
                                                    <Button
                                                        key={actionIndex}
                                                        variant="outlined"
                                                        color={action.color}
                                                        onClick={() => action.onClick(row.id)}
                                                    >
                                                        {action.label}
                                                    </Button>
                                                ))}
                                            </Box>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + (actions.length > 0 ? 1 : 0)}>
                                    <Typography align="center" color="textSecondary" variant="body2">
                                        No data available
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DynamicTable2;
