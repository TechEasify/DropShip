import React, { useState } from 'react';
import {
  Modal, Backdrop, Fade,
} from '@mui/material';
import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
} from '@shopify/polaris';
import { makeStyles } from '@mui/styles';
import { NewOrders } from '../../../components';
import './Orders.scss';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export function Orders() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname === '/admin/orders';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const orders = [
    {
      id: '1020',
      order: '#1020',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1019',
      order: '#1019',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1018',
      order: '#1018',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      { id, order, date, customer, total, paymentStatus, fulfillmentStatus },
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {total}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <>
      {
        isAdminPath ?
          <>
            <div className="container-fluid dashboard__container clearfix">
              <div className="order-intro">
                <h2 className="pf-h2 pf-my-40">
                  Orders
                  <a
                    className="pf-btn pf-btn-primary float-none float-xs-right pf-d-block pf-d-xs-inline-block pf-d-sm-none pf-mt-12 pf-mt-xs-0"
                    id="orders-new-order"
                  >
                    New order
                  </a>
                </h2>
                <div className="pf-mt-64 pf-mb-16">
                  <LegacyCard>
                    <IndexTable
                      resourceName={resourceName}
                      itemCount={orders.length}
                      selectedItemsCount={
                        allResourcesSelected ? 'All' : selectedResources.length
                      }
                      onSelectionChange={handleSelectionChange}
                      headings={[
                        { title: 'Order' },
                        { title: 'Date' },
                        { title: 'Customer' },
                        { title: 'Total', alignment: 'end' },
                        { title: 'Payment status' },
                        { title: 'Fulfillment status' },
                      ]}
                    >
                      {rowMarkup}
                    </IndexTable>
                  </LegacyCard>
                </div>
              </div>
            </div>
          </>
          :
          <>
            <div className="container-fluid dashboard__container clearfix">
              <img
                className="hidden-xs hidden-sm order-intro__arrow"
                alt="Intro arrow"
                src="https://static.cdn.printful.com/static/v767/images/layout/order-intro-arrow.png"
              />
              <div className="order-intro">
                <h2 className="pf-h2 pf-my-40">
                  Orders
                  <a
                    className="pf-btn pf-btn-primary float-none float-xs-right pf-d-block pf-d-xs-inline-block pf-d-sm-none pf-mt-12 pf-mt-xs-0"
                    id="orders-new-order"
                  >
                    New order
                  </a>
                </h2>
                <div className="row margin-vertical-50">
                  <div className="col-md-12 text-center">
                    <h1 className="pf-m-0 container-header">Explore your Orders</h1>
                    <h3 className="subheading regular pf-m-0 margin-top-10">
                      Here you’ll be able to manage your orders and check their status
                    </h3>
                  </div>
                </div>
                <div className="row pf-mb-40">
                  <div className="col-sm-10 offset-sm-1 text-center">
                    <div className="pf-d-none pf-d-sm-block">
                      <img
                        className='order-example'
                        alt="example"
                        style={{ maxWidth: '50%' }}
                        src="https://www.printful.com/static/images/layout/zero-state-illustration.svg"
                      />
                    </div>
                    <div className="pf-d-block pf-d-sm-none">
                      <img
                        alt="example"
                        style={{ maxWidth: '60%' }}
                        src="https://www.printful.com/static/images/layout/zero-state-illustration.svg"
                      />
                    </div>
                    <div>
                      <NewOrders />
                    </div>
                    <button
                      type="button"
                      onClick={handleOpen}
                      className="pf-btn pf-btn-lg pf-btn-primary pf-ml-16"
                      id="dashboard-new-order"
                    >
                      New order
                    </button>
                    <Modal
                      open={open}
                      className={classes.modal}
                      onClose={handleClose}
                      closeAfterTransition
                    // BackdropComponent={Backdrop}
                    // BackdropProps={{
                    //   timeout: 500,
                    // }}
                    >
                      <Fade in={open}>
                        <NewOrders Close={handleClose} />
                      </Fade>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </>
      }
    </>
  );
}
