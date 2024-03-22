import React from 'react';

export default () => (
  <div className="container-fluid dashboard__container clearfix">
    <div className>
      <div className="container">
        <div
          id="pf-breadcrumbs"
          className="pf-pl-16 pf-pl-sm-0 pf-p-0 pf-pr-8 pf-pr-sm-0 "
        >
          <ul className="pf-breadcrumbs hide-last-- hide-only">
            <div>
              <li>
                <a href="/dashboard/store">Stores</a>
              </li>
              <li>
                <span>Connect to an ecommerce platform</span>
              </li>
            </div>
            <span className="nav-arrow left hidden" />
            <span className="nav-arrow right hidden" />
          </ul>
        </div>
        <h1 className="pf-h2 pf-mt-24 pf-mb-32">
          Connect to an ecommerce platform
        </h1>
        <div className="row integrations">
          <div className="col-md-3 col-sm-4 col-xs-6 integrations__container pf-mb-32 pf-d-flex">
            <div
              className="pf-border-light pf-p-16 integrations__item pf-d-flex"
              onClick="openUrl('shopify','https://www.dropshippy.com/dashboard/shopify/register', event, 2236557);"
            >
              <div className="pf-mb-16 pf-d-flex">
                <span>
                  <img
                    width={56}
                    height={56}
                    src="https://files.cdn.printful.com/upload/integration-comp/cb/cb14c4ed89b4523a1f8affb6ed7f3fa3_t?v=1590473065"
                    alt="Shopify"
                  />
                </span>
                <span className="pf-pl-16 break-word">
                  <h4 className="pf-h4 pf-m-0">
                    Shopify
                    <i
                      className="pf-text-gray pf-i pf-i-information"
                      title
                      data-toggle="tooltip"
                      data-delay='{"show":"100", "hide":"700"}'
                      data-original-title='
                                      Disclaimer: dropshippy might earn a commission from signups or purchases completed via this link. <a href="/faq/terms-policies-returns/acceptable-content-guidelines/408-what-is-dropshippy-s-affiliate-disclosure-" class="pf-link" target="_blank">Read more here</a>'
                    />
                  </h4>
                  <p className="pf-ui-caption pf-m-0">Platform </p>
                </span>
              </div>
              <p className="text-muted pf-ui-body pf-mb-16">
                Ecommerce platform with everything you need to sell online.
              </p>
              <a
                onClick="openUrl('shopify','https://www.dropshippy.com/dashboard/shopify/register', event, 2236557);"
                className="pf-btn pf-btn-secondary pf-btn-block"
                title="Connect with Shopify"
                style={{ marginTop: 'auto' }}
              >
                Connect
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard__fullwidth">
        <div className="pf-py-64 pf-large-volume-block pf-bg-lighter dashboard__fullwidth">
          <div className="container text-center">
            <div className="row">
              <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                <div className="pf-mt-32">
                  <a
                    className="pf-btn pf-btn-primary pf-btn-lg pf-btn-animated "
                    href="/integrations"
                    target="_self"
                    onClick
                    title="Compare platforms"
                    data-storename
                    data-custom-redirect-url
                    role="button"
                  >
                    Compare platforms
                    <i className="pf-i pf-i-chevron-right pf-i-24 pf-bold" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
