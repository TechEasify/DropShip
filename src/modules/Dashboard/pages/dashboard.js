import React, { useState, useEffect } from 'react';

import { getProfileUser } from '../../../routes/helper';

const defaultAllSteps = [
  { text: 'Sign up for DropShippy', status: true },
  { text: 'Confirm your email', status: false },
  { text: 'Create a product template', status: false },
];

// import './dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState([]);
  // useEffect(() => {
  //   getProfileUser()
  //     .then((res) => setUser(res))
  //     .catch((err) => console.log(err));
  // });
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
                    It looks like you’ve been using dropshippy for a while now and
                    know the basics. Instead of the Welcome Guide, we’ll display
                    the newest and most relevant info for you.
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
              <div className="splide__track splide__track--slide splide__track--ltr" id="onboarding-steps-splide-slider-track"
                aria-live="polite" aria-atomic="true">
                <div className="splide__list" id="onboarding-steps-splide-slider-list pf-d-flex pf-justify-content-center" role="presentation">
                  {/* Slide 1 */}
                  <div data-splide-interval="" className="splide__slide is-active is-visible"
                    id="onboarding-steps-splide-slider-slide01" role="tabpanel" aria-roledescription="slide" aria-label="1 of 4"
                    style={{ 'marginRight': '16px', 'width': 'calc(25% - 12px)' }}>
                    <div className="pf-d-flex pf-flex-column pf-rounded--large pf-p-16 pf-h-100 pf-border pf-bg-white">
                      <img alt="Design your first product"
                        src="https://static.cdn.printful.com/static/v864/images/dashboard/onboarding/create-product-template.png"
                        className="img-responsive pf-m-auto" style={{ 'maxWidth': '195px' }} />
                      <div className="pf-d-flex pf-flex-column pf-h-100">
                        <div className="pf-ui-subheading">Step 1</div>
                        <h3 className="pf-h3 pf-m-0">Design your product</h3>
                        <div className="pf-ui-body pf-py-8">You’ll simply add any design to one of our hundreds of
                          premium-quality products.</div>
                        <div className="pf-ui-body">~ 25 minutes</div>
                        <div className="pf-d-flex pf-align-items-end pf-h-100">
                          <a id="create_product_template-action" href="/dashboard/product-templates" className="pf-w-100">
                            <button className="pf-w-100 pf-btn pf-mt-12 pf-btn-primary">
                              Start
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 2 */}
                  <div className="splide__slide is-visible is-next"
                    id="onboarding-steps-splide-slider-slide02" role="tabpanel" aria-roledescription="slide" aria-label="2 of 4"
                    style={{ 'marginRight': '16px', 'width': 'calc(25% - 12px)' }}>
                    <div className="pf-d-flex pf-flex-column pf-rounded--large pf-p-16 pf-h-100 pf-border pf-bg-white">
                      <img alt="Connect your store"
                        src="https://static.cdn.printful.com/static/v864/images/dashboard/onboarding/create-store.png"
                        className="img-responsive pf-m-auto" style={{ 'maxWidth': '195px' }} />
                      <div className="pf-d-flex pf-flex-column pf-h-100">
                        <div className="pf-ui-subheading">Step 2</div>
                        <h3 className="pf-h3 pf-m-0">Connect your store</h3>
                        <div className="pf-ui-body pf-py-8">You’ll easily connect your ecommerce platform to Printful in only a
                          few clicks.</div>
                        <div className="pf-ui-body">~ 10 minutes</div>
                        <div className="pf-d-flex pf-align-items-end pf-h-100">
                          <a id="create_store-action" href="/dashboard/store" className="pf-w-100">
                            <button className="pf-w-100 pf-btn pf-mt-12 pf-btn-secondary">
                              Start
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 3 */}
                  <div data-splide-interval="" className="splide__slide is-visible" id="onboarding-steps-splide-slider-slide03"
                    role="tabpanel" aria-roledescription="slide" aria-label="3 of 4"
                    style={{ 'marginRight': '16px', 'width': 'calc(25% - 12px)' }}>
                    <div className="pf-d-flex pf-flex-column pf-rounded--large pf-p-16 pf-h-100 pf-border pf-bg-white">
                      <img alt="Add products to store"
                        src="https://static.cdn.printful.com/static/v864/images/dashboard/onboarding/design-products.png"
                        className="img-responsive pf-m-auto" style={{ 'maxWidth': '195px' }} />
                      <div className="pf-d-flex pf-flex-column pf-h-100">
                        <div className="pf-ui-subheading">Step 3</div>
                        <h3 className="pf-h3 pf-m-0">Upload products to store</h3>
                        <div className="pf-ui-body pf-py-8">You’ll give your product some context with a title, description, and
                          price.</div>
                        <div className="pf-ui-body">~ 15 minutes</div>
                        <div className="pf-d-flex pf-align-items-end pf-h-100">
                          <a id="design_products-action" href="/dashboard/store?offerSync=1" className="pf-w-100">
                            <button disabled="disabled" className="pf-w-100 pf-btn pf-mt-12 pf-btn-secondary">
                              Start
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 4 */}
                  <div data-splide-interval="" className="splide__slide is-visible" id="onboarding-steps-splide-slider-slide04"
                    role="tabpanel" aria-roledescription="slide" aria-label="4 of 4"
                    style={{ 'marginRight': '16px', 'width': 'calc(25% - 12px)' }}>
                    <div className="pf-d-flex pf-flex-column pf-rounded--large pf-p-16 pf-h-100 pf-border pf-bg-white">
                      <img alt="Set up billing"
                        src="https://static.cdn.printful.com/static/v864/images/dashboard/onboarding/add-billing.png"
                        className="img-responsive pf-m-auto" style={{ 'maxWidth': '195px' }} />
                      <div className="pf-d-flex pf-flex-column pf-h-100">
                        <div className="pf-ui-subheading">Step 4</div>
                        <h3 className="pf-h3 pf-m-0">Set up billing</h3>
                        <div className="pf-ui-body pf-py-8">You’ll input your billing information to cover the fulfilment fee
                          each time you sell a product.</div>
                        <div className="pf-ui-body">~ 5 minutes</div>
                        <div className="pf-d-flex pf-align-items-end pf-h-100">
                          <a id="add_billing-action" href="/dashboard/billing/billing-methods/add" className="pf-w-100">
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
        </div>

        {/**/}
      </div>
    </div>
  );
}
