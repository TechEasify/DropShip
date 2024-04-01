import React, { useState } from 'react';
import { Table, ExportButton, DatePicker } from '../../../components';
import { Button } from '@mui/material';
import { IndexTable, useIndexResourceState, Text } from '@shopify/polaris';

export function Payments() {
  const trash = [
    {
      id: '52814937998046',
      status: 'AUTHORIZED',
      amount: 10.99,
      currency: 'USD',
      invoice_id: 'INVOICE-123',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998047',
      status: 'AUTHORIZED',
      amount: 12.99,
      currency: 'USD',
      invoice_id: 'INVOICE-124',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998048',
      status: 'AUTHORIZED',
      amount: 15.99,
      currency: 'USD',
      invoice_id: 'INVOICE-125',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998049',
      status: 'AUTHORIZED',
      amount: 9.99,
      currency: 'USD',
      invoice_id: 'INVOICE-126',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998050',
      status: 'AUTHORIZED',
      amount: 15.99,
      currency: 'USD',
      invoice_id: 'INVOICE-127',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998051',
      status: 'AUTHORIZED',
      amount: 20.99,
      currency: 'USD',
      invoice_id: 'INVOICE-128',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998052',
      status: 'AUTHORIZED',
      amount: 17.99,
      currency: 'USD',
      invoice_id: 'INVOICE-129',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998053',
      status: 'AUTHORIZED',
      amount: 28.99,
      currency: 'USD',
      invoice_id: 'INVOICE-130',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998054',
      status: 'AUTHORIZED',
      amount: 19.99,
      currency: 'USD',
      invoice_id: 'INVOICE-131',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998055',
      status: 'AUTHORIZED',
      amount: 20.99,
      currency: 'USD',
      invoice_id: 'INVOICE-132',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998056',
      status: 'AUTHORIZED',
      amount: 15.99,
      currency: 'USD',
      invoice_id: 'INVOICE-133',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998057',
      status: 'AUTHORIZED',
      amount: 10.99,
      currency: 'USD',
      invoice_id: 'INVOICE-134',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998058',
      status: 'AUTHORIZED',
      amount: 12.99,
      currency: 'USD',
      invoice_id: 'INVOICE-135',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
    {
      id: '52814937998059',
      status: 'AUTHORIZED',
      amount: 17.99,
      currency: 'USD',
      invoice_id: 'INVOICE-136',

      expiration_time: '2017-10-10T23:23:45Z',
      created_at: '2017-09-11T23:23:45Z',
      updated_at: '2017-09-11T23:23:45Z',
    },
  ];
  const [open, setOpen] = useState(false);
  const data = [trash, trash, trash];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const maxItemsPerPage = 100;

  // filter order
  const filteredOrders = trash.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredOrders, 'filteredOrders');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredOrders.length);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //Handle item per page
  const handleItemsPerPageChange = (selectedValue) => {
    const newItemsPerPage = parseInt(selectedValue, 10);
    setItemsPerPage(Math.min(newItemsPerPage, maxItemsPerPage));
    setCurrentPage(1);
  };

  const options = [
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
  ];

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(filteredOrders);

    console.log(allResourcesSelected, "allResourcesSelected");

  const rowMarkup = filteredOrders
    .slice(startIndex, endIndex)
    .map(
      (
        { id, status, amount, currency, invoice_id, expiration_time },
        index
      ) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>{id}</IndexTable.Cell>
          <IndexTable.Cell>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {status}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>{amount}</IndexTable.Cell>
          <IndexTable.Cell>{currency}</IndexTable.Cell>
          <IndexTable.Cell>{invoice_id}</IndexTable.Cell>
          <IndexTable.Cell>{expiration_time}</IndexTable.Cell>
        </IndexTable.Row>
      )
    );

  return (
    <>
      <div className="billing">
        <div className="row">
          <div className="pf-d-none">
            <div
              className="sidebar__component"
              url-prefix="/dashboard/billing/"
            >
              <div className="row">
                <div className="col-12">
                  <div className="navbar-header visible-xs">
                    <button
                      type="button"
                      data-toggle="collapse"
                      data-target="#side-menu-collapse"
                      className="navbar-toggle collapsed"
                    >
                      Payments
                      <span className="arrow" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="payments">
              <div>
                <h2 className="pf-h2 pf-my-40">Billing: Payments</h2>
                <hr />
                <div className="unconfirmed-payments" style={{}}>
                  <div
                    tabIndex={-1}
                    aria-labelledby="null-label"
                    aria-hidden="true"
                    role="dialog"
                    className="modal fade zoom"
                  >
                    <div className="modal-dialog ">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close">
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                          </button>
                          <div>
                            <h4>Are you sure?</h4>
                          </div>
                        </div>
                        <div className="modal-body" />
                        <div className="modal-footer">
                          <div className="pf-d-flex">
                            <a className="pf-btn pf-btn-primary pf-mr-8">
                              Decline
                            </a>
                            <a className="pf-btn pf-btn-secondary">Cancel</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="js-billing-transactions"
                  className="billing-transactions"
                >
                  <div className="pf-h4 pf-mb-12">Payment history</div>
                  <div className="row">
                    <div className="col-md-6 pf-mb-16">
                      <input
                        type="number"
                        placeholder="Order no.:#7654321"
                        className="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                    <div className="col-md-6 pf-mb-16">
                      <div className="billing__store-switcher transaction__store-switcher">
                        <div className="row store-switcher">
                          <div className="form-group pf-mb-32 col-12">
                            <div className="switcher-container pf-d-block pf-d-sm-inline-flex pf-mt-0 pf-mt-md-8">
                              <select className="form-control styled-select switcher pf-pr-32">
                                <option value={-1}>All stores</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 pf-mb-8">
                      <div>
                        <div className="c-multiselect">
                          <button
                            type="button"
                            className="c-multiselect__toggle styled-select pf-py-8 pf-pl-16 pf-pr-48"
                            onClick={() => setOpen(!open)}
                          >
                            Manage filters
                          </button>
                          <div
                            className="c-dropdown c-multiselect__dropdown"
                            style={{ display: open ? '' : 'none' }}
                          >
                            <div className="c-multiselect__group">
                              <div className="c-multiselect__group-title">
                                Billing method
                              </div>
                              <ul className="c-multiselect__list">
                                <li className="c-multiselect__list-item">
                                  <label className="pf-m-0 pf-py-8 pf-d-block">
                                    <input
                                      type="checkbox"
                                      className="pf-mt-0 pf-mr-8"
                                      defaultValue="merchants-paypal"
                                      style={{ display: 'none' }}
                                    />
                                    PayPal
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="c-multiselect__group">
                              <div className="c-multiselect__group-title">
                                Transaction type
                              </div>
                              <ul className="c-multiselect__list">
                                <li className="c-multiselect__list-item">
                                  <label className="pf-m-0 pf-py-8 pf-d-block">
                                    <input
                                      type="checkbox"
                                      className="pf-mt-0 pf-mr-8"
                                      defaultValue="categories-order"
                                      style={{ display: 'none' }}
                                    />
                                    Orders
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="c-multiselect__group">
                              <div className="c-multiselect__group-title">
                                Payment status
                              </div>
                              <ul className="c-multiselect__list">
                                <li className="c-multiselect__list-item">
                                  <label className="pf-m-0 pf-py-8 pf-d-block">
                                    <input
                                      type="checkbox"
                                      className="pf-mt-0 pf-mr-8"
                                      defaultValue="status-completed"
                                      style={{ display: 'none' }}
                                    />
                                    Completed
                                  </label>
                                </li>
                                <li className="c-multiselect__list-item">
                                  <label className="pf-m-0 pf-py-8 pf-d-block">
                                    <input
                                      type="checkbox"
                                      className="pf-mt-0 pf-mr-8"
                                      defaultValue="status-failed"
                                      style={{ display: 'none' }}
                                    />
                                    Failed
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="c-multiselect__group">
                              <ul className="c-multiselect__list">
                                <li className="c-multiselect__list-item">
                                  <label className="pf-m-0 pf-py-8 pf-d-block">
                                    <input
                                      type="checkbox"
                                      className="pf-mt-0 pf-mr-8"
                                      defaultValue="status-canceled"
                                      style={{ display: 'none' }}
                                    />
                                    Canceled
                                  </label>
                                </li>
                                <li className="c-multiselect__list-item">
                                  <label className="pf-m-0 pf-py-8 pf-d-block">
                                    <input
                                      type="checkbox"
                                      className="pf-mt-0 pf-mr-8"
                                      defaultValue="status-expired"
                                      style={{ display: 'none' }}
                                    />
                                    Expired
                                  </label>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 pf-mt-8 pf-mt-md-0 pf-mb-8">
                      <DatePicker />
                    </div>
                  </div>
                  <div className="row pf-mt-8">
                    <div className="col-12 col-md-auto">
                      <i className="pf-i pf-i-download pf-i-24 pf-text-muted" />
                      <ExportButton csvData={data} fileName="Hello" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 table-container pf-mt-24">
                      <Table
                        rowMarkup={rowMarkup}
                        resourceName={resourceName}
                        trash={trash}
                        selectedResources={selectedResources}
                        allResourcesSelected={allResourcesSelected}
                        handleSelectionChange={handleSelectionChange}
                        options={options}
                        handleItemsPerPageChange={handleItemsPerPageChange}
                        handlePageChange={handlePageChange}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        endIndex={endIndex}
                        filteredOrders={filteredOrders}
                      />
                    </div>
                  </div>
                </div>

                <div className="payment-mathod">
                  <div className="payment-head">
                    <h2 className="category-heading">No payments made yet</h2>
                    <p style={{ fontSize: '12px' }}>
                      You'll see all your transactions here once you make an
                      order
                    </p>
                    <Button variant="contained" className="order-now">
                      Order now
                    </Button>
                  </div>
                  <div className="payment-img">
                    <img
                      src="https://files.cdn.printful.com/upload/illustrate-item-svg/c9/c999e9bfe9d0cecb396ef565cbc21650"
                      className="payment"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
