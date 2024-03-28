import React, { useState, useEffect } from 'react';

import { getProfileUser } from '../../../routes/helper';
import { Card, Icon, Pagination, Select } from '@shopify/polaris';
import {
  CartAbandonedFilledIcon,
  CartFilledIcon,
  CartSaleIcon,
  ClipboardCheckFilledIcon,
  LabelPrinterIcon,
  OrderDraftFilledIcon,
  OrderIcon,
} from '@shopify/polaris-icons';
import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
} from '@shopify/polaris';
import { useLocation } from 'react-router-dom';

const defaultAllSteps = [
  { text: 'Sign up for DropShippy', status: true },
  { text: 'Confirm your email', status: false },
  { text: 'Create a product template', status: false },
];

// import './dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentServicePage, setCurrentServicePage] = useState(1);
  const [currentTransactionPage, setCurrentTransactionPage] = useState(1);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [currentServices, setCurrentServices] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState([]);
  const [selected, setSelected] = useState('10');
  const [serviceSelected, setServiceSelected] = useState('10');
  const [transaction, setTransaction] = useState('10');

  // useEffect(() => {
  //   getProfileUser()
  //     .then((res) => setUser(res))
  //     .catch((err) => console.log(err));
  // });

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
    {
      id: '1021',
      order: '#1021',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1022',
      order: '#1022',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1023',
      order: '#1023',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1024',
      order: '#1024',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1025',
      order: '#1025',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1026',
      order: '#1026',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1027',
      order: '#1027',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1028',
      order: '#1028',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1029',
      order: '#1029',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1030',
      order: '#1030',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1031',
      order: '#1031',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1032',
      order: '#1032',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1033',
      order: '#1033',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1034',
      order: '#1034',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1035',
      order: '#1035',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1036',
      order: '#1036',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1037',
      order: '#1037',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1038',
      order: '#1038',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];

  const DServices = [
    {
      id: '9021',
      order: '#9021',
      digitalServices: 'logodesigning',
      amount: '$200',
      time: '10',
      approveStatus: <Badge progress="complete">Approve</Badge>,
    },
    {
      id: '9022',
      order: '#9022',
      digitalServices: 'labeldesigning',
      amount: '$500',
      time: '20',
      approveStatus: <Badge progress="complete">Pending</Badge>,
    },
    {
      id: '9023',
      order: '#9023',
      digitalServices: 'imagedesigning',
      amount: '$100',
      time: '15',
      approveStatus: <Badge progress="complete">Cancel</Badge>,
    },
    {
      id: '9024',
      order: '#9024',
      digitalServices: 'logodesigning',
      amount: '$200',
      time: '10',
      approveStatus: <Badge progress="complete">Approve</Badge>,
    },
    {
      id: '9025',
      order: '#9025',
      digitalServices: 'labeldesigning',
      amount: '$500',
      time: '20',
      approveStatus: <Badge progress="complete">Pending</Badge>,
    },
    {
      id: '9026',
      order: '#9026',
      digitalServices: 'imagedesigning',
      amount: '$100',
      time: '15',
      approveStatus: <Badge progress="complete">Cancel</Badge>,
    },
    {
      id: '9027',
      order: '#9027',
      digitalServices: 'logodesigning',
      amount: '$200',
      time: '10',
      approveStatus: <Badge progress="complete">Approve</Badge>,
    },
    {
      id: '9028',
      order: '#9028',
      digitalServices: 'labeldesigning',
      amount: '$500',
      time: '20',
      approveStatus: <Badge progress="complete">Pending</Badge>,
    },
    {
      id: '9029',
      order: '#9029',
      digitalServices: 'imagedesigning',
      amount: '$100',
      time: '15',
      approveStatus: <Badge progress="complete">Cancel</Badge>,
    },
    {
      id: '9030',
      order: '#9030',
      digitalServices: 'logodesigning',
      amount: '$200',
      time: '10',
      approveStatus: <Badge progress="complete">Approve</Badge>,
    },
    {
      id: '9031',
      order: '#9031',
      digitalServices: 'labeldesigning',
      amount: '$500',
      time: '20',
      approveStatus: <Badge progress="complete">Pending</Badge>,
    },
    {
      id: '9032',
      order: '#9032',
      digitalServices: 'imagedesigning',
      amount: '$100',
      time: '15',
      approveStatus: <Badge progress="complete">Cancel</Badge>,
    },
  ];

  const Transaction = [
    {
      id: '120',
      order: '#120',
      amount: '$200',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
    },
    {
      id: '121',
      order: '#121',
      amount: '$500',
      paymentStatus: <Badge progress="complete">Cancel</Badge>,
    },
    {
      id: '122',
      order: '#122',
      amount: '$200',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
    },
    {
      id: '123',
      order: '#123',
      amount: '$500',
      paymentStatus: <Badge progress="complete">Cancel</Badge>,
    },
    {
      id: '124',
      order: '#124',
      amount: '$200',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
    },
    {
      id: '125',
      order: '#125',
      amount: '$500',
      paymentStatus: <Badge progress="complete">Cancel</Badge>,
    },
    {
      id: '126',
      order: '#126',
      amount: '$200',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
    },
    {
      id: '127',
      order: '#127',
      amount: '$500',
      paymentStatus: <Badge progress="complete">Cancel</Badge>,
    },
    {
      id: '128',
      order: '#128',
      amount: '$200',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
    },
    {
      id: '129',
      order: '#129',
      amount: '$500',
      paymentStatus: <Badge progress="complete">Cancel</Badge>,
    },
    {
      id: '130',
      order: '#130',
      amount: '$200',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
    },
    {
      id: '131',
      order: '#131',
      amount: '$500',
      paymentStatus: <Badge progress="complete">Cancel</Badge>,
    },
    {
      id: '132',
      order: '#132',
      amount: '$200',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
    },
    {
      id: '133',
      order: '#133',
      amount: '$500',
      paymentStatus: <Badge progress="complete">Cancel</Badge>,
    },
  ];

  const handleSelectChange = (value) => {
    setSelected(value);
    const newPageLimit = parseInt(value);
    const newStartIndex = (currentPage - 1) * newPageLimit;
    const newEndIndex = Math.min(newStartIndex + newPageLimit, orders.length);
    setCurrentOrders(orders.slice(newStartIndex, newEndIndex));
    setCurrentPage(1);
  };

  const handleSelectServiceChange = (value) => {
    setServiceSelected(value);
    const newPageLimit = parseInt(value);
    const newStartIndex = (currentServicePage - 1) * newPageLimit;
    const newEndIndex = Math.min(
      newStartIndex + newPageLimit,
      DServices.length
    );
    setCurrentServices(DServices.slice(newStartIndex, newEndIndex));
    setCurrentServicePage(1);
  };

  const handleSelectTransactionChange = (value) => {
    setTransaction(value);
    const newPageLimit = parseInt(value);
    const newStartIndex = (currentTransactionPage - 1) * newPageLimit;
    const newEndIndex = Math.min(
      newStartIndex + newPageLimit,
      Transaction.length
    );
    setCurrentTransaction(Transaction.slice(newStartIndex, newEndIndex));
    setCurrentTransactionPage(1);
  };

  const pageLimit = 10;
  const startIndex = (currentPage - 1) * pageLimit;
  const startServiceIndex = (currentServicePage - 1) * pageLimit;
  const startTransactionIndex = (currentTransactionPage - 1) * pageLimit;
  const endIndex = Math.min(startIndex + pageLimit, orders.length);
  const endServices = Math.min(startServiceIndex + pageLimit, DServices.length);
  const endTransaction = Math.min(
    startTransactionIndex + pageLimit,
    Transaction.length
  );

  useEffect(() => {
    setCurrentOrders(orders.slice(startIndex, endIndex));
  }, [currentPage]);

  useEffect(() => {
    setCurrentServices(DServices.slice(startServiceIndex, endServices));
  }, [currentServicePage]);

  useEffect(() => {
    setCurrentTransaction(
      Transaction.slice(startTransactionIndex, endTransaction)
    );
  }, [currentTransactionPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePreviousSerPage = () => {
    setCurrentServicePage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePreviousTranPage = () => {
    setCurrentTransactionPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(orders.length / pageLimit))
    );
  };

  const handlenextservices = () => {
    setCurrentServicePage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(DServices.length / pageLimit))
    );
  };

  const handlenextTransaction = () => {
    setCurrentTransactionPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(Transaction.length / pageLimit))
    );
  };

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = currentOrders.map(
    (
      { id, order, date, customer, total, paymentStatus, fulfillmentStatus },
      index
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
      </IndexTable.Row>
    )
  );

  const DigitalService = currentServices.map(
    ({ id, order, digitalServices, amount, time, approveStatus }, index) => (
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
        <IndexTable.Cell>{digitalServices}</IndexTable.Cell>
        <IndexTable.Cell>{amount}</IndexTable.Cell>
        <IndexTable.Cell>{time}</IndexTable.Cell>
        <IndexTable.Cell>{approveStatus}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const TransactionHistory = currentTransaction.map(
    ({ id, order, amount, paymentStatus }, index) => (
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
        <IndexTable.Cell>{amount}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const options = [
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
  ];

  const generateOptions = (length) => {
    const pageCount = Math.ceil(length / pageLimit);
    const dynamicOptions = Array.from({ length: pageCount }, (_, index) => ({
      label: `${(index + 1) * pageLimit}`,
      value: `${(index + 1) * pageLimit}`,
    }));
    return dynamicOptions;
  };

  const currentOptions = generateOptions(orders.length);
  const currentServOptions = generateOptions(DServices.length);
  const currentTranOptions = generateOptions(Transaction.length);

  return (
    <div className="pf-bg-lighter dashboard__fullwidth">
      <div>
        <div
          id="dashboard-disclaimer"
          tabIndex={-1}
          aria-labelledby="dashboard-disclaimer-label"
          aria-hidden="true"
          role="dialog"
          className="modal fade zoom"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close">
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Close</span>
                </button>
                <div>
                  <span className="pf-h3 pf-m-0">
                    Explore your dropshippy Dashboard
                  </span>
                </div>
              </div>
              <div className="modal-body ">
                <div className="pf-d-flex pf-flex-column pf-flex-sm-row pf-align-items-center">
                  <p className="text-center text-sm-left pf-text-muted pf-ui-body pf-mb-0 pf-mt-24 pf-mt-sm-0 pf-ml-0 pf-ml-sm-24">
                    Your Dashboard might look a little different. That's because
                    it's been specially crafted to help you sell online. Check
                    out our useful shortcuts, tips &amp; tricks, and trending
                    products!
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <div className="text-left">
                  <button
                    type="button"
                    className="pf-btn pf-btn-primary pf-w-100 pf-w-sm-auto"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="onboarding-disclaimer"
          tabIndex={-1}
          aria-labelledby="onboarding-disclaimer-label"
          aria-hidden="true"
          role="dialog"
          className="pf-pr-0 modal fade zoom"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close">
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Close</span>
                </button>
                <div>
                  <span className="pf-h3 pf-m-0 pf-pl-4 pf-d-block">
                    Let’s skip the Welcome Guide
                  </span>
                </div>
              </div>
              <div className="modal-body ">
                <div className="pf-d-flex pf-flex-column pf-flex-sm-row pf-align-items-center">
                  <p className="text-center text-sm-left pf-text-muted pf-ui-body pf-my-0 pf-mx-0">
                    It looks like you’ve been using dropshippy for a while now
                    and know the basics. Instead of the Welcome Guide, we’ll
                    display the newest and most relevant info for you.
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <div className="text-left">
                  <button
                    type="button"
                    className="pf-btn pf-btn-primary pf-w-100 pf-w-sm-auto"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="dashboard-home__welcome text-center pf-py-24 pf-pt-md-40 pf-pb-md-12 inspectlet-sensitive">
          Welcome to your DropShippy dashboard. Let’s get started!
        </h2>
        <div className="dashboard-home__essential-steps pf-mb-40">
          <hr className="pf-border-top pf-my-24 pf-my-md-32" />
          {location.pathname === '/admin' ? (
            ''
          ) : (
            <div className="pf-d-flex  pf-justify-content-center">
              <div
                className="splide__track splide__track--slide splide__track--ltr"
                id="onboarding-steps-splide-slider-track"
                aria-live="polite"
                aria-atomic="true"
              >
                <Card>
                  <div className="dashboard-card">
                    {/* Slide 1 */}
                    <div className="dashoard-step">
                      <Card>
                        <div className="pf-d-flex pf-flex-column pf-rounded--large pf-p-16 pf-h-100 pf-border pf-bg-white">
                          <img
                            alt="Design your first product"
                            src="https://static.cdn.printful.com/static/v864/images/dashboard/onboarding/create-product-template.png"
                            className="img-responsive pf-m-auto"
                            style={{ maxWidth: '195px' }}
                          />
                          <div className="pf-d-flex pf-flex-column pf-h-100">
                            <div className="pf-ui-subheading">Step 1</div>
                            <h3 className="pf-h3 pf-m-0">
                              Design your product
                            </h3>
                            <div className="pf-ui-body pf-py-8">
                              You’ll simply add any design to one of our
                              hundreds of premium-quality products.
                            </div>
                            <div className="pf-ui-body">~ 25 minutes</div>
                            <div className="pf-d-flex pf-align-items-end pf-h-100">
                              <a
                                id="create_product_template-action"
                                href="/dashboard/product-templates"
                                className="pf-w-100"
                              >
                                <button className="pf-w-100 pf-btn pf-mt-12 pf-btn-primary">
                                  Start
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Slide 2 */}
                    <div className="dashoard-step">
                      <Card>
                        <div className="pf-d-flex pf-flex-column pf-rounded--large pf-p-16 pf-h-100 pf-border pf-bg-white">
                          <img
                            alt="Connect your store"
                            src="https://static.cdn.printful.com/static/v864/images/dashboard/onboarding/create-store.png"
                            className="img-responsive pf-m-auto"
                            style={{ maxWidth: '195px' }}
                          />
                          <div className="pf-d-flex pf-flex-column pf-h-100">
                            <div className="pf-ui-subheading">Step 2</div>
                            <h3 className="pf-h3 pf-m-0">Connect your store</h3>
                            <div className="pf-ui-body pf-py-8">
                              You’ll easily connect your ecommerce platform to
                              Printful in only a few clicks.
                            </div>
                            <div className="pf-ui-body">~ 10 minutes</div>
                            <div className="pf-d-flex pf-align-items-end pf-h-100">
                              <a
                                id="create_store-action"
                                href="/dashboard/store"
                                className="pf-w-100"
                              >
                                <button className="pf-w-100 pf-btn pf-mt-12 pf-btn-secondary">
                                  Start
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Slide 3 */}
                    <div className="dashoard-step">
                      <Card>
                        <div className="pf-d-flex pf-flex-column pf-rounded--large pf-p-16 pf-h-100 pf-border pf-bg-white">
                          <img
                            alt="Add products to store"
                            src="https://static.cdn.printful.com/static/v864/images/dashboard/onboarding/design-products.png"
                            className="img-responsive pf-m-auto"
                            style={{ maxWidth: '195px' }}
                          />
                          <div className="pf-d-flex pf-flex-column pf-h-100">
                            <div className="pf-ui-subheading">Step 3</div>
                            <h3 className="pf-h3 pf-m-0">
                              Upload products to store
                            </h3>
                            <div className="pf-ui-body pf-py-8">
                              You’ll give your product some context with a
                              title, description, and price.
                            </div>
                            <div className="pf-ui-body">~ 15 minutes</div>
                            <div className="pf-d-flex pf-align-items-end pf-h-100">
                              <a
                                id="design_products-action"
                                href="/dashboard/store?offerSync=1"
                                className="pf-w-100"
                              >
                                <button
                                  disabled="disabled"
                                  className="pf-w-100 pf-btn pf-mt-12 pf-btn-secondary"
                                >
                                  Start
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Slide 4 */}
                    <div className="dashoard-step">
                      <Card>
                        <div className="pf-d-flex pf-flex-column pf-rounded--large pf-p-16 pf-h-100 pf-border pf-bg-white">
                          <img
                            alt="Set up billing"
                            src="https://static.cdn.printful.com/static/v864/images/dashboard/onboarding/add-billing.png"
                            className="img-responsive pf-m-auto"
                            style={{ maxWidth: '195px' }}
                          />
                          <div className="pf-d-flex pf-flex-column pf-h-100">
                            <div className="pf-ui-subheading">Step 4</div>
                            <h3 className="pf-h3 pf-m-0">Set up billing</h3>
                            <div className="pf-ui-body pf-py-8">
                              You’ll input your billing information to cover the
                              fulfilment fee each time you sell a product.
                            </div>
                            <div className="pf-ui-body">~ 5 minutes</div>
                            <div className="pf-d-flex pf-align-items-end pf-h-100">
                              <a
                                id="add_billing-action"
                                href="/dashboard/billing/billing-methods/add"
                                className="pf-w-100"
                              >
                                <button className="pf-w-100 pf-btn pf-mt-12 pf-btn-secondary">
                                  Start
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-detail">
        <Card roundedAbove="md" background="bg-surface-secondary">
          <div className="dashcard-detail">
            <Card roundedAbove="md">
              <Icon source={OrderIcon} tone="base" />
              <p className="oders-value">1</p>
              <div className="dash-cardtext">
                <h4>Today Orders</h4>
              </div>
            </Card>

            <Card roundedAbove="md">
              <Icon source={OrderDraftFilledIcon} tone="base" />
              <p className="oders-value">1</p>
              <div className="dash-cardtext">
                <h4>Pendding Orders</h4>
              </div>
            </Card>

            <Card roundedAbove="md">
              <Icon source={ClipboardCheckFilledIcon} tone="base" />
              <p className="oders-value">1</p>
              <div className="dash-cardtext">
                <h4>Completed Orders</h4>
              </div>
            </Card>

            <Card roundedAbove="md">
              <Icon source={CartFilledIcon} tone="base" />
              <p className="oders-value">1</p>
              <div className="dash-cardtext">
                <h4>Total Orders</h4>
              </div>
            </Card>

            <Card roundedAbove="md">
              <Icon source={CartSaleIcon} tone="base" />
              <p className="oders-value">1</p>
              <div className="dash-cardtext">
                <h4>Monthly Sale</h4>
              </div>
            </Card>

            <Card roundedAbove="md">
              <Icon source={CartAbandonedFilledIcon} tone="base" />
              <p className="oders-value">1</p>
              <div className="dash-cardtext">
                <h4>Annual Sale</h4>
              </div>
            </Card>

            <Card roundedAbove="md">
              <Icon source={OrderDraftFilledIcon} tone="base" />
              <p className="oders-value">1</p>
              <div className="dash-cardtext">
                <h4>Monthly Order</h4>
              </div>
            </Card>

            <Card roundedAbove="md">
              <Icon source={LabelPrinterIcon} tone="base" />
              <div className="dashcard-tiers">
                <p className="oders-value">
                  Broze + <span>300$</span>
                </p>
              </div>
              <div className="dash-cardtext">
                <h4>Current Tiers</h4>
              </div>
            </Card>
          </div>
        </Card>
      </div>

      <div className="trending-product">
        <div className="top-product">
          <Card roundedAbove="md" background="bg-surface-secondary">
            <div className="tranding-product">
              <h4 className="tranding-text">Top Trending Products</h4>
            </div>
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
                ]}
              >
                {rowMarkup}
              </IndexTable>
              <div
                style={{
                  maxWidth: '700px',
                  margin: 'auto',
                  border: '1px solid var(--p-color-border)',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="label-perpage">
                    <p>Row per page:- </p>
                  </div>
                  <Select
                    options={currentOptions}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                </div>
                <Pagination
                  onPrevious={handlePreviousPage}
                  onNext={handleNextPage}
                  hasNext={currentPage < Math.ceil(orders.length / pageLimit)}
                  hasPrevious={currentPage > 1}
                  type="table"
                  label={`${currentPage} of ${orders.length} product`}
                />
              </div>
            </LegacyCard>
          </Card>
        </div>
        <div className="recent-order">
          <Card roundedAbove="md" background="bg-surface-secondary">
            <div className="tranding-product">
              <h4 className="tranding-text">Recent Orders</h4>
            </div>
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
                ]}
              >
                {rowMarkup}
              </IndexTable>
              <div
                style={{
                  maxWidth: '700px',
                  margin: 'auto',
                  border: '1px solid var(--p-color-border)',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="label-perpage">
                    <p>Row per page:- </p>
                  </div>
                  <Select
                    options={currentOptions}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                </div>
                <Pagination
                  onPrevious={handlePreviousPage}
                  onNext={handleNextPage}
                  hasNext={currentPage < Math.ceil(orders.length / pageLimit)}
                  hasPrevious={currentPage > 1}
                  type="table"
                  label={`${currentPage} of ${orders.length} orders`}
                />
              </div>
            </LegacyCard>
          </Card>
        </div>
      </div>

      <div className="trending-product">
        <div className="top-product">
          <Card roundedAbove="md" background="bg-surface-secondary">
            <div className="tranding-product">
              <h4 className="tranding-text">Digital Service</h4>
            </div>
            <LegacyCard>
              <IndexTable
                resourceName={resourceName}
                itemCount={DServices.length}
                selectedItemsCount={
                  allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                  { title: 'Order' },
                  { title: 'Digital Services' },
                  { title: 'Amount' },
                  { title: 'Time' },
                  { title: 'Approve status' },
                ]}
              >
                {DigitalService}
              </IndexTable>
              <div
                style={{
                  maxWidth: '700px',
                  margin: 'auto',
                  border: '1px solid var(--p-color-border)',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="label-perpage">
                    <p>Row per page:- </p>
                  </div>
                  <Select
                    options={currentServOptions}
                    onChange={handleSelectServiceChange}
                    value={serviceSelected}
                  />
                </div>
                <Pagination
                  onPrevious={handlePreviousSerPage}
                  onNext={handlenextservices}
                  hasNext={
                    currentServicePage < Math.ceil(DServices.length / pageLimit)
                  }
                  hasPrevious={currentServicePage > 1}
                  type="table"
                  label={`${currentServicePage} of ${DServices.length} service`}
                />
              </div>
            </LegacyCard>
          </Card>
        </div>
        <div className="recent-order">
          <Card roundedAbove="md" background="bg-surface-secondary">
            <div className="tranding-product">
              <h4 className="tranding-text">Transaction</h4>
            </div>
            <LegacyCard>
              <IndexTable
                resourceName={resourceName}
                itemCount={Transaction.length}
                selectedItemsCount={
                  allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                  { title: 'Order' },
                  { title: 'Amount' },
                  { title: 'Payment status' },
                ]}
              >
                {TransactionHistory}
              </IndexTable>
              <div
                style={{
                  maxWidth: '700px',
                  margin: 'auto',
                  border: '1px solid var(--p-color-border)',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="label-perpage">
                    <p>Row per page:- </p>
                  </div>
                  <Select
                    options={currentTranOptions}
                    onChange={handleSelectTransactionChange}
                    value={transaction}
                  />
                </div>
                <Pagination
                  onPrevious={handlePreviousTranPage}
                  onNext={handlenextTransaction}
                  hasNext={
                    currentTransactionPage <
                    Math.ceil(DServices.length / pageLimit)
                  }
                  hasPrevious={currentTransactionPage > 1}
                  type="table"
                  label={`${currentTransactionPage} of ${Transaction.length} transaction`}
                />
              </div>
            </LegacyCard>
          </Card>
        </div>
      </div>
    </div>
  );
}
