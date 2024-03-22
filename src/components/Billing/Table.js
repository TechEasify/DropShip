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
import {makeStyles} from '@mui/styles';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default (props) => {
  console.log(props, "props Billing");
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} id="payment_history">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <strong style={{ fontSize: 18 }}>ID</strong>
            </TableCell>
            <TableCell align="center">
              <strong style={{ fontSize: 18 }}>Status</strong>
            </TableCell>
            <TableCell align="center">
              <strong style={{ fontSize: 18 }}>Amount</strong>
            </TableCell>
            <TableCell align="center">
              <strong style={{ fontSize: 18 }}>Date</strong>
            </TableCell>
            <TableCell align="center">
              <strong style={{ fontSize: 18 }}>Invoice ID</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="center">
                <p style={{ fontSize: 16 }}> {row.id}</p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: 16 }}>{row.status}</p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: 16 }}>{row.amount}</p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: 16 }}>
                  {row.expiration_time.split('T')[0]}
                </p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: 16 }}>{row.invoice_id}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
