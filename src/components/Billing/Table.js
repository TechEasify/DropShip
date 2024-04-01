import React from 'react';
import { makeStyles } from '@mui/styles';
import { IndexTable, LegacyCard, Pagination, Select } from '@shopify/polaris';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default ({
  resourceName,
  rowMarkup,
  trash,
  selectedResources,
  allResourcesSelected,
  handleSelectionChange,
  options,
  handlePageChange,
  handleItemsPerPageChange,
  itemsPerPage,
  currentPage,
  endIndex,
  filteredOrders,
}) => {
  const classes = useStyles();

  return (
    // <TableContainer component={Paper}>
    //   <Table className={classes.table} id="payment_history">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell align="center">
    //           <strong style={{ fontSize: 18 }}>ID</strong>
    //         </TableCell>
    //         <TableCell align="center">
    //           <strong style={{ fontSize: 18 }}>Status</strong>
    //         </TableCell>
    //         <TableCell align="center">
    //           <strong style={{ fontSize: 18 }}>Amount</strong>
    //         </TableCell>
    //         <TableCell align="center">
    //           <strong style={{ fontSize: 18 }}>Date</strong>
    //         </TableCell>
    //         <TableCell align="center">
    //           <strong style={{ fontSize: 18 }}>Invoice ID</strong>
    //         </TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {props.data.map((row, index) => (
    //         <TableRow key={index}>
    //           <TableCell component="th" scope="row" align="center">
    //             <p style={{ fontSize: 16 }}> {row.id}</p>
    //           </TableCell>
    //           <TableCell align="center">
    //             <p style={{ fontSize: 16 }}>{row.status}</p>
    //           </TableCell>
    //           <TableCell align="center">
    //             <p style={{ fontSize: 16 }}>{row.amount}</p>
    //           </TableCell>
    //           <TableCell align="center">
    //             <p style={{ fontSize: 16 }}>
    //               {row.expiration_time.split('T')[0]}
    //             </p>
    //           </TableCell>
    //           <TableCell align="center">
    //             <p style={{ fontSize: 16 }}>{row.invoice_id}</p>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>

    <>
      {filteredOrders.length !== 0 ? (
        <>
          <LegacyCard>
            <IndexTable
              resourceName={resourceName}
              itemCount={trash.length}
              selectedItemsCount={
                allResourcesSelected ? 'All' : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: 'Id' },
                { title: 'Status' },
                { title: 'Amount' },
                { title: 'Currency' },
                { title: 'Invoice_id' },
                { title: 'Date' },
              ]}
            >
              {rowMarkup}
            </IndexTable>
            <div
              style={{
                marginBottom: '10px',
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '10px',
                  marginBottom: '10px',
                }}
              >
                <div className="label-perpage">
                  <p>Row per page:- </p>
                </div>
                <Select
                  options={options}
                  value={itemsPerPage.toString()}
                  onChange={handleItemsPerPageChange}
                />
              </div>
              <div
                style={{
                  marginBottom: '10px',
                }}
              >
                <Pagination
                  onPrevious={() => handlePageChange(currentPage - 1)}
                  onNext={() => handlePageChange(currentPage + 1)}
                  hasPrevious={currentPage > 1}
                  hasNext={endIndex < trash.length}
                  label={`${currentPage}-${Math.min(
                    endIndex,
                    trash.length
                  )} of ${trash.length} orders`}
                />
              </div>
            </div>
          </LegacyCard>
        </>
      ) : (
        <div className="not-found">
          <div className="result-not">
            <h2 className="category-heading">No Results Found!</h2>
          </div>
        </div>
      )}
    </>
  );
};
