import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Menu, MenuItem, Dialog } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@shopify/polaris';

function AdminDegitalService() {
  const [adminData, setAdminData] = useState([]);
  const fileInputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectId, setSelectId] = useState(null);
  const [approveStatus, setApproveStatus] = useState('');
  const [Status, setStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const dummyImage = "https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png"

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('tableData'));
    if (savedData !== null && savedData !== undefined) {
      setAdminData(savedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(adminData));
  }, [adminData]);

  const columns = [
    { field: 'id', headerName: 'Vender No.', width: 90 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'plan', headerName: 'Digital Service', width: 150 },
    { field: 'price', headerName: 'Amount', width: 120 },
    { field: 'duration', headerName: 'App Time', width: 120 },
    { field: 'approveStatus', headerName: 'Approve Status', width: 120 },
    { field: 'Status', headerName: 'Status', width: 120 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex' }}>
          <div className='edit-btn'>
            <Button
              className="download-btn"
              variant="contained"
              color="primary"
              onClick={() => handleDownloadImage(params.row.id)}
            >
              <DownloadIcon />
            </Button>
          </div>
          <div className='edit-btn'>
            <Button
              className="download-btn"
              variant="contained"
              color="primary"
              onClick={() => fileInputRef.current.click()}
            >
              <CloudUploadIcon />
            </Button>
          </div>
          <div className='edit-btn'>
            <Button
              className="download-btn"
              variant="contained"
              color="primary"
              onClick={(event) => handleViewMenuOpen(event, params.row.id)}
            >
              <VisibilityIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleViewMenuClose}
            >
              <MenuItem onClick={() => handleViewDetails(params.row.id)}>View Details</MenuItem>
              <MenuItem onClick={() => handlePrintInvoice(params.row.id)}>Print Invoice</MenuItem>
            </Menu>
          </div>
        </div>
      ),
    },
  ];

  const handleViewMenuOpen = (event, id) => {
    setSelectId(id)
    setAnchorEl(event.currentTarget);
  };

  const handleViewMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetails = () => {
    const selectRow = adminData.find(row => row.id === selectId);
    setSelectedRow(selectRow);
    setApproveStatus(selectRow.approveStatus);
    setOpenView(true);
  };

  const handleCloseDialog = () => {
    setOpenView(false);
    setSelectedRow(null)
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setApproveStatus(event.target.value);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePrintInvoice = () => {
    handleViewMenuClose();
    const selectedRowData = adminData.find(row => row.id === selectId);
    setSelectedRow(selectedRowData);
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <style>
        body {
          background: rgb(204, 204, 204);
        }

        #background {
          position: absolute;
          z-index: 0;
          background: white;
          display: block;
          min-height: 50%;
          min-width: 50%;
          color: yellow;
        }

        #bg-text {
          color: lightgrey;
          font-size: 120px;
          transform: rotate(300deg);
          -webkit-transform: rotate(300deg);
        }

        page {
          background: white;
          display: block;
          margin: 0 auto;
          margin-bottom: 0.5cm;
          box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
        }

        page[size="A4"] {
          width: 21cm;
          height: 45cm;
        }

        page[size="A4"][layout="landscape"] {
          width: 29.7cm;
          height: 21cm;
        }

        page[size="A3"] {
          width: 29.7cm;
          height: 42cm;
        }

        page[size="A3"][layout="landscape"] {
          width: 42cm;
          height: 29.7cm;
        }

        page[size="A5"] {
          width: 14.8cm;
          height: 21cm;
        }

        .well {
          min-height: 20px;
          padding: 19px;
          margin-bottom: 20px;
          background-color: #a77000;
          color: #fff;
          border-radius: 4px;
          -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
        }

        .wrapper {
          height: 100%;
          position: relative;
          overflow-x: hidden;
          overflow-y: auto;
        }

        section.invoice {
          position: relative;
          background: #fff;
          border: 1px solid #f4f4f4;
          padding: 10px;
          margin: 10px;
        }

        .well-sm {
          padding: 9px;
          border-radius: 3px;
        }

        .list-group {
        padding-left: 0;
        margin-bottom: 20px;
        }

        .list-group-item {
          position: relative;
          display: block;
          padding: 10px 15px;
          margin-bottom: -1px;
          background-color: #fff;
          border: none;
        }

        .list-group-item:first-child {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }

        .badge {
          display: inline-block;
          min-width: 10px;
          padding: 3px 7px;
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          background-color: #a77000;
          border-radius: 10px;
        }

        .list-group-item>.badge {
        float: right;
        }

        .page-header {
          margin: 10px 0 20px 0;
        }

        .no-shadow {
          box-shadow: none !important;
        }

        h2.page-header.well.well-sm.no-shadow {
          text-align: center;
        }

        .text-center {
          text-align: center;
        }

        .pull-left {
          float: left !important;
          width: 50%;
        }

        .list-group {
          margin-bottom: 20px;
        }

        .btn-group-vertical>.btn-group:after, .btn-group-vertical>.btn-group:before, .btn-toolbar:after, .btn-toolbar:before, .clearfix:after, .clearfix:before, .container-fluid:after, .container-fluid:before, .container:after, .container:before, .dl-horizontal dd:after, .dl-horizontal dd:before, .form-horizontal .form-group:after, .form-horizontal .form-group:before, .modal-footer:after, .modal-footer:before, .modal-header:after, .modal-header:before, .nav:after, .nav:before, .navbar-collapse:after, .navbar-collapse:before, .navbar-header:after, .navbar-header:before, .navbar:after, .navbar:before, .pager:after, .pager:before, .panel-body:after, .panel-body:before, .row:after, .row:before {
          display: table;
          content: " ";
        }

        .table-responsive {
          min-height: .01%;
          overflow-x: auto;
        }

        .table-bordered {
          border: 1px solid #f4f4f4;
        } 

        .table {
          width: 100%;
          max-width: 100%;
          margin-bottom: 20px;
        }

        p.well.well-sm.no-shadow {
          text-align: center;
          font-size: 10px;
        }

        .table-bordered>thead>tr>th, .table-bordered>thead>tr>td {
          border-bottom-width: 2px;
        }

        .table-bordered>thead>tr>th, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>tbody>tr>td, .table-bordered>tfoot>tr>td {
          border: 1px solid #a77000;
          text-align: center;
        }

        .page-header {
          padding-bottom: 9px;
          margin: 10px 0 20px;
          border-bottom: 1px solid #eee;
        }

        page[size="A5"][layout="landscape"] {
          width: 21cm;
          height: 14.8cm;
        }
        .invoice-wrap{
            display:none;
        }

        td {
          text-align: center;
        }

        @media print {
          body, page {
            margin: 0;
            box-shadow: none;
          }
                .invoice-wrap{
                  display:block;
                  transform: rotate(-40deg);
                  opacity: 0.1;
                  top: 30%;
                  left: 20%;
                  bottom: 0;
                  right: 0;
                  position: absolute;
                  z-index: 10;
                  height:500px;
                  width:500px;
                  font-size: 100px;
                  color: #3d3d3d52;
                }
        }
        </style>
      </head>
      <body>
      <page size="A4">
      <!--	<div id="background">-->
      <!--		<p id="bg-text">IIHT</p>-->
      <!--	</div>-->
      <div class="wrapper">
        <!-- Main content -->
        <section class="invoice">
          <div class="invoice-wrap">
            IIHT Surat #2024254342 </div>
          <!-- title row -->
          <div class="row">
            <div class="col-xs-12">
              <!--<p class="well well-sm no-shadow"><b>Franchise of Harshad Krupa</b></p>-->
              <h2 class="page-header well well-sm no-shadow">
                Digital Services Invoice
              </h2>
              <p class="well well-sm no-shadow" style="display:none;"><b>GSTIN: 24AAIFH8677E2Z3</b></p>
              <address class="pull-left well well-sm no-shadow">
                <strong>Digital Service</strong><br>
                Digital Services, 2625 Augustine Dr, Suite 601 Santa Clara CA 95054<br>
                Mobile: +1 5421384188646<br>
                Email: digital_services@gmail.com
              </address>
              <address class="pull-right well well-sm no-shadow">
                <strong>${selectedRowData.name !== null && selectedRowData.name !== undefined && selectedRowData.name}</strong><br>
                F 4/5, Okuneva Terrace,<br>
                dummy demo, USA 395009<br>
                Mobile: +1 5421384188646<br>
                Email: digital_services@gmail.com
              </address>
            </div>
            <!-- /.col -->
          </div>

          <div class="well well-sm no-shadow">
            <h3 class="text-center">Invoice #2024254342</h3>
          </div>
          <p class="well well-sm no-shadow" style="display:none;"><b>Vet Charges: </b></p>
          <!-- info row -->
          <div class="row invoice-info">
            <div class="col-xs-6">
              <ul class="list-group">
                <li class="list-group-item">Invoice Date <span class="badge">07-03-2024</span>
                <li class="list-group-item" style="height: 60px;">Company Name <span
                    class="badge">Digital Service</span></li>
                <li class="list-group-item">Balance<span class="badge"> <small><i
                        class="fa fa-rupee"></i></small>
                    4200 $</span>
                </li>
                <li class="list-group-item">Payment Method<span class="badge"> <small><i
                        class="fa fa-rupee"></i></small>
                        Mobile Wallet</span>
                </li>
                <li class="list-group-item">Payment Status <span class="badge"> <small><i
                        class="fa fa-rupee"></i></small>
                    Paid</span>
                </li>
              </ul>
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->

          <!-- Table row -->
          <div class="row">
            <div class="col-xs-12 table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Vender No.</th>
                    <th>Vender Name</th>
                    <th>Description</th>
                    <th>App Time</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${selectedRowData.id !== null && selectedRowData.id !== null && selectedRowData.id}</td>
                    <td>${selectedRowData.name !== null && selectedRowData.name !== null && selectedRowData.name}</td>
                    <td>${selectedRowData.description !== null && selectedRowData.description !== null && selectedRowData.description}</td>
                    <td>${selectedRowData.duration !== null && selectedRowData.duration !== null && selectedRowData.duration}</td>
                    <td>${selectedRowData.price !== null && selectedRowData.price !== null && selectedRowData.price}$</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->

          <div class="row">
            <!-- accepted payments column -->
            <div class="col-xs-6">
              <p class="well well-sm no-shadow" style="margin-top: 10px;"><b>Note:-<br />${selectedRowData.terms !== null && selectedRowData.terms !== undefined && selectedRowData.terms}</b></p>
            </div>
            <!-- /.col -->
            <div class="col-xs-6">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <tr>
                    <th style="width:50%">Total Payment Received:</th>
                    <td>${selectedRowData.price !== null && selectedRowData.price !== undefined && selectedRowData.price}$</td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->
        </section>
        <!-- /.content -->
      </div>
    </page>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </body>
      </html>
    `);

    // Close before unload
    window.addEventListener('beforeunload', () => {
      newWindow.close();
    });
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = dummyImage;
    link.download = 'dummyImage.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Uploading image: ${file.name}`);
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleSaveDialog = () => {
    const selectedIndex = adminData.findIndex(row => row.id === selectedRow.id);
    const updatedRow = {
      ...selectedRow,
      approveStatus: approveStatus,
      Status: Status,
    };
    const updatedAdminData = [...adminData];
    updatedAdminData[selectedIndex] = updatedRow;
    setAdminData(updatedAdminData);
    handleCloseDialog();
  };

  console.log(adminData, "adminData");

  return (
    <div className='Admin-degital'>
      <div className='admin-heading'>
        <h2 className='category-heading'>Admin Digital Service</h2>
      </div>
      {
        openView ?
          <>
            <div className='view-invoice'>
              <div className='invoice-text'>
                <h4>Digital Service</h4>
                <div className='invoice-add'>
                  <div className='invoice-from'>
                    <h6>From:</h6>
                  </div>
                  <div className='invoice-address'>
                    <p style={{ fontSize: 14 }}>Digital Services, 2625 Augustine Dr, Suite 601 Santa Clara CA 95054, USA</p>
                  </div>
                </div>
                <div className='invoice-add'>
                  <div className='invoice-from'>
                    <h6>Bill to:</h6>
                  </div>
                  <div className='invoice-address'>
                    <p style={{ fontSize: 14 }}>F 4/5, Okuneva Terrace, dummy demo 395009, USA</p>
                  </div>
                </div>
              </div>

              <div className='invoice-label'>
                <div className='invoice'>
                  <h4 style={{ color: "white" }}>View Detail</h4>
                </div>
                <div className='invoice-detail'>
                  <div className='invoice-list'>
                    <p style={{ fontSize: 14, fontWeight: "bold" }}>Date :- </p>
                  </div>
                  <div className='invoice-list'>
                    <p style={{ fontSize: 14 }}>06/03/2024</p>
                  </div>
                </div>
                <div className='invoice-detail'>
                  <div className='invoice-list'>
                    <p style={{ fontSize: 14, fontWeight: "bold" }}>INVOICE # :- </p>
                  </div>
                  <div className='invoice-list'>
                    <p style={{ fontSize: 14 }}>245542</p>
                  </div>
                </div>
                <div className='invoice-detail'>
                  <div className='invoice-list'>
                    <p style={{ fontSize: 14, fontWeight: "bold" }}>Total Amount :- </p>
                  </div>
                  <div className='invoice-list'>
                    <p style={{ fontSize: 14 }}>{selectedRow.price}$</p>
                  </div>
                </div>
                <div className='invoice-detail'>
                  <div className='invoice-list'>
                    <p style={{ fontSize: 14, fontWeight: "bold" }}>Payment Method :- </p>
                  </div>
                  <div className='invoice-list'>
                    <p style={{ fontSize: 14 }}>Mobile Wallet</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='invoice-table'>
              <table className='invoice-det'>
                <tbody>
                  <tr className='table-row'>
                    <th className='table-head'>Vender No.</th>
                    <th className='table-head'>Vender Name</th>
                    <th className='table-head'>Description</th>
                    <th className='table-head'>App Time</th>
                    <th className='table-head'>Vet Charges</th>
                    <th className='table-head'>Amount</th>
                  </tr>
                  <tr>
                    <td className='table-head'>{selectedRow.id}</td>
                    <td className='table-head'>{selectedRow.name}</td>
                    <td className='table-head'>{selectedRow.description}</td>
                    <td className='table-head'>{selectedRow.duration}</td>
                    <td className='table-head'>7$</td>
                    <td className='table-head'>{selectedRow.price}$</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='view-payment'>
              <div className='text-payment'>
                <h6>Payment Status :- </h6>
              </div>
              <div className='payment-status'>
                <p style={{ fontSize: 16 }}>Paid</p>
              </div>
            </div>
            <div className='view-payment'>
              <div className='text-payment'>
                <h6>Terms :- </h6>
              </div>
              <div className='payment-status'>
                <p style={{ fontSize: 16 }}>{selectedRow.terms}</p>
              </div>
            </div>
            <div className='view-status'>
              <div className='text-payment'>
                <h6>Approve Status :- </h6>
              </div>
              <div className='payment-status'>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Approve Status</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={approveStatus}
                    label="ApproveStatus"
                    onChange={handleChange}
                  >
                    <MenuItem value="Approve">Approve</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Cancel">Cancel</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {
              approveStatus === "Cancel" &&
              <div className='view-status'>
                <div className='text-payment'>
                  <h6>Status :- </h6>
                </div>
                <div className='payment-status'>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={Status}
                      label="Status"
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value="ChangeDesigning">Change Designing</MenuItem>
                      <MenuItem value="Refund">Refund</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            }

            <div className='view-Attachment'>
              <div className='text-payment'>
                <h6>Attachments :- </h6>
              </div>
              <div className='payment-status'>
                <div className='save-btn'>
                  <Button className="download-btn"
                    variant="contained"
                    color="primary"
                    onClick={handleSaveDialog}
                    style={{ fontSize: 14, fontWeight: 600, textTransform: "none" }}
                  >
                    <DownloadIcon />
                  </Button>
                </div>
                <div className='save-btn'>
                  <Button className="download-btn"
                    variant="contained"
                    color="primary"
                    onClick={handleUploadButtonClick}
                    style={{ fontSize: 14, fontWeight: 600, textTransform: "none" }}
                  >
                    <CloudUploadIcon />
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            {imageUrl && (
              <div className='img-upload'>
                <img src={imageUrl} alt="Uploaded" />
                {/* <Button onClick={handleUploadImage}>Upload</Button> */}
              </div>
            )}
            <div className='viewclose-btn'>
              <div className='save-btn'>
                <Button className="download-btn"
                  variant="contained"
                  color="primary"
                  onClick={handleSaveDialog}
                  style={{ fontSize: 14, fontWeight: 600, textTransform: "none" }}
                >
                  Save
                </Button>
              </div>
              <div className='save-btn'>
                <Button className="download-btn"
                  variant="contained"
                  color="primary"
                  onClick={handleCloseDialog}
                  style={{ fontSize: 14, fontWeight: 600, textTransform: "none" }}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
          :
          <>
            <div className='admin-table'>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={adminData}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  checkboxSelection
                />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </>
      }


    </div>
  );
}

export default AdminDegitalService;
