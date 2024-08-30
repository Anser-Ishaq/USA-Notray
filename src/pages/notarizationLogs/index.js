import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Heading from '../../components/Heading/heading'

const logs = []; 

const NotarizationLogsTable = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
      <Heading heading={'All Notarization Logs'} />

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Time of Notarial Act</TableCell>
              <TableCell>Type of Notarial Act</TableCell>
              <TableCell>Type or Title of Document/Proceeding</TableCell>
              <TableCell>Name of Principal</TableCell>
              <TableCell>Address of Principal</TableCell>
              <TableCell>Identification Method</TableCell>
              <TableCell>Form Of ID</TableCell>
              <TableCell>ID Issuance Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{log.timeOfNotarialAct}</TableCell>
                <TableCell>{log.typeOfNotarialAct}</TableCell>
                <TableCell>{log.typeOrTitleOfDocument}</TableCell>
                <TableCell>{log.nameOfPrincipal}</TableCell>
                <TableCell>{log.addressOfPrincipal}</TableCell>
                <TableCell>{log.identificationMethod}</TableCell>
                <TableCell>{log.formOfID}</TableCell>
                <TableCell>{log.idIssuanceDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default NotarizationLogsTable;
