import React, { useState, useEffect } from 'react';

import { getProfileUser } from '../../../routes/helper';
import { Card, Icon, Pagination } from '@shopify/polaris';
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

  console.log(location.pathname, 'location');

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
  ];

  const DServices = [
    {
      id: '120',
      order: '#120',
      digitalServices: 'logodesigning',
      amount: '$200',
      time: '10',
      approveStatus: <Badge progress="complete">Approve</Badge>,
    },
    {
      id: '121',
      order: '#121',
      digitalServices: 'labeldesigning',
      amount: '$500',
      time: '20',
      approveStatus: <Badge progress="complete">Pending</Badge>,
    },
    {
      id: '122',
      order: '#122',
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
      amount: '$100',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
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

  const DigitalService = DServices.map(
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

  const TransactionHistory = Transaction.map(
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
            <div className="row">
              <div className="col-md-2 pf-d-flex pf-justify-content-center">
                {/* <img
                src="https://www.dropshippy.com/static/images/dashboard/onboarding-left.svg"
                alt="Onboarding Illustration"
                className="pf-d-none pf-d-md-block"
                style={{ width: 165 }}
              /> */}
              </div>
              <div className="col-md-8 pf-d-flex  pf-justify-content-center">
                <div
                  className="splide__track splide__track--slide splide__track--ltr"
                  id="onboarding-steps-splide-slider-track"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div
                    className="splide__list"
                    id="onboarding-steps-splide-slider-list pf-d-flex pf-justify-content-center"
                    role="presentation"
                  >
                    {/* Slide 1 */}
                    <div
                      data-splide-interval=""
                      className="splide__slide is-active is-visible"
                      id="onboarding-steps-splide-slider-slide01"
                      role="tabpanel"
                      aria-roledescription="slide"
                      aria-label="1 of 4"
                      style={{ marginRight: '16px', width: 'calc(25% - 12px)' }}
                    >
                      <div className="pf-d-flex pf-flex-column pf-rounded--large pf-p-16 pf-h-100 pf-border pf-bg-white">
                        <img
                          alt="Design your first product"
                          src="https://static.cdn.printful.com/static/v864/images/dashboard/onboarding/create-product-template.png"
                          className="img-responsive pf-m-auto"
                          style={{ maxWidth: '195px' }}
                        />
                        <div className="pf-d-flex pf-flex-column pf-h-100">
                          <div className="pf-ui-subheading">Step 1</div>
                          <h3 className="pf-h3 pf-m-0">Design your product</h3>
                          <div className="pf-ui-body pf-py-8">
                            You’ll simply add any design to one of our hundreds
                            of premium-quality products.
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
                    </div>

                    {/* Slide 2 */}
                    <div
                      className="splide__slide is-visible is-next"
                      id="onboarding-steps-splide-slider-slide02"
                      role="tabpanel"
                      aria-roledescription="slide"
                      aria-label="2 of 4"
                      style={{ marginRight: '16px', width: 'calc(25% - 12px)' }}
                    >
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
                    </div>

                    {/* Slide 3 */}
                    <div
                      data-splide-interval=""
                      className="splide__slide is-visible"
                      id="onboarding-steps-splide-slider-slide03"
                      role="tabpanel"
                      aria-roledescription="slide"
                      aria-label="3 of 4"
                      style={{ marginRight: '16px', width: 'calc(25% - 12px)' }}
                    >
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
                            You’ll give your product some context with a title,
                            description, and price.
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
                    </div>

                    {/* Slide 4 */}
                    <div
                      data-splide-interval=""
                      className="splide__slide is-visible"
                      id="onboarding-steps-splide-slider-slide04"
                      role="tabpanel"
                      aria-roledescription="slide"
                      aria-label="4 of 4"
                      style={{ marginRight: '16px', width: 'calc(25% - 12px)' }}
                    >
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 pf-d-flex pf-justify-content-center">
                {/* <img
                src="https://www.dropshippy.com/static/images/dashboard/onboarding-right.svg"
                alt="Onboarding Illustration"
                className="pf-d-none pf-d-md-block"
                style={{ width: 165 }}
              /> */}
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
                }}
              >
                <Pagination
                  onPrevious={() => {
                    console.log('Previous');
                  }}
                  onNext={() => {
                    console.log('Next');
                  }}
                  type="table"
                  hasNext
                  label="1 of 50 product"
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
                }}
              >
                <Pagination
                  onPrevious={() => {
                    console.log('Previous');
                  }}
                  onNext={() => {
                    console.log('Next');
                  }}
                  type="table"
                  hasNext
                  label="1 of 50 orders"
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
                itemCount={orders.length}
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
                }}
              >
                <Pagination
                  onPrevious={() => {
                    console.log('Previous');
                  }}
                  onNext={() => {
                    console.log('Next');
                  }}
                  type="table"
                  hasNext
                  label="1 of 50 services"
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
                itemCount={orders.length}
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
                }}
              >
                <Pagination
                  onPrevious={() => {
                    console.log('Previous');
                  }}
                  onNext={() => {
                    console.log('Next');
                  }}
                  type="table"
                  hasNext
                  label="1 of 50 transaction"
                />
              </div>
            </LegacyCard>
          </Card>
        </div>
      </div>
    </div>
  );
}
