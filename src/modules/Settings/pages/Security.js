/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export function Security() {
  return (
    <>
      <div className="container-fluid dashboard__container clearfix">
        <div
          data-vue-root="2aUzctzBXoGuw41m"
          data-vue-components='["store-settings"]'
        >
          <div className="store-settings container__wrapper">
            <h2 className="pf-h2 pf-my-40">Settings: Security</h2>
            <div className="row">
              <div className="pf-d-none">
                <div className="row full-width-menu">
                  <div className="col-md-12">
                    <div className="full-width-menu__header visible-xs">
                      <button
                        type="button"
                        data-toggle="collapse"
                        data-target="#side-menu-collapse-settings"
                        className="collapsed"
                      >
                        <span>My Account: Users</span>
                        <span className="arrow" />
                      </button>
                    </div>
                    <nav
                      role="navigation"
                      className="sidebar-menu sidebar-menu-sm sidebar-menu--full-height"
                    >
                      <div
                        id="side-menu-collapse-settings"
                        className="collapse navbar-collapse"
                      >
                        <ul className="nav nav-pills nav-stacked padding-top-15 padding-bottom-20">
                          <li className="active">
                            <a
                              href="/dashboard/settings/account-settings"
                              title="My Account"
                              data-toggle="collapse"
                              data-target="#side-menu-collapse-settings.in"
                            >
                              My Account
                            </a>
                            <ul className="nav nav-pills nav-stacked second-level">
                              <li>
                                <a
                                  href="/dashboard/settings/account-notifications"
                                  title="Notifications"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  Notifications
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/dashboard/settings/account-users"
                                  title="Users"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  Users
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li style={{ display: 'none' }}>
                            <a
                              title="Stores"
                              data-toggle="collapse"
                              data-target="#side-menu-collapse-settings.in"
                            >
                              Stores
                            </a>
                            <ul className="nav nav-pills nav-stacked second-level">
                              <li>
                                <a
                                  title="Notifications"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  Notifications
                                </a>
                              </li>
                              <li>
                                <a
                                  title="Orders"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  Orders
                                </a>
                              </li>
                              <li>
                                <a
                                  title="API"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  API
                                </a>
                              </li>
                              <li>
                                <a
                                  title="Shipping"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  Shipping
                                </a>
                              </li>
                              <li>
                                <a
                                  title="Packing Slip"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  Packing Slip
                                </a>
                              </li>
                              <li>
                                <a
                                  title="Returns"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  Returns
                                </a>
                              </li>
                              <li>
                                <a
                                  title="Order Pack-Ins"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  Order Pack-Ins
                                </a>
                              </li>
                              <li style={{ display: 'none' }}>
                                <a
                                  title="Amazon Regions"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  Amazon Regions
                                </a>
                              </li>
                              <li style={{ display: 'none' }}>
                                <a
                                  title="Amazon GTIN Exemption"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  Amazon GTIN Exemption
                                </a>
                              </li>
                              <li style={{ display: 'none' }}>
                                <a
                                  title="Marketplaces"
                                  data-toggle="collapse"
                                  data-target="#side-menu-collapse-settings.in"
                                >
                                  Marketplaces
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="pf-pb-24 col-12">
                <div className="row" style={{ display: 'none' }}>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <form
                          autoComplete="off"
                          className="form-horizontal defaults-main-form"
                        >
                          <h5 className="pf-my-0 page-title">
                            Personal Information
                          </h5>
                          <div className="underlined" />
                          <div className="row">
                            <div className="col-md-12 margin-bottom-50">
                              <div className="form-group">
                                <label className="col-sm-4 control-label">
                                  Full name:
                                </label>
                                <div className="col-sm-5">
                                  <input
                                    type="text"
                                    placeholder="Full name"
                                    name="name"
                                    className="inspectletIgnore"
                                    aria-required="true"
                                    aria-invalid="false"
                                  />
                                </div>
                              </div>
                              <div className="form-group change-email-block">
                                <label className="col-sm-4 control-label">
                                  Email:
                                </label>
                                <div className="col-sm-5">
                                  <input
                                    type="text"
                                    disabled="disabled"
                                    placeholder="Email"
                                    name="email"
                                    className="disabled form-control inspectletIgnore"
                                    aria-required="false"
                                    aria-invalid="false"
                                  />
                                </div>
                                <div className="col-sm-1 pf-pt-8">
                                  <a href="#" className="margin-left-10">
                                    Change
                                  </a>
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="col-sm-4 control-label">
                                  Phone (optional):
                                </label>
                                <div className="col-sm-5">
                                  <input
                                    type="tel"
                                    placeholder="Phone (optional)"
                                    name="phone"
                                    autoComplete="off"
                                    className="inspectletIgnore"
                                    aria-required="false"
                                    aria-invalid="false"
                                  />
                                </div>
                              </div>
                              <input
                                type="number"
                                name="blank"
                                className="pf-d-none"
                              />
                              <div className="form-group field-customer-password_old">
                                <label className="col-sm-4 control-label">
                                  Password:
                                </label>
                                <div className="col-sm-5">
                                  <input
                                    type="password"
                                    defaultValue="********"
                                    disabled="disabled"
                                    name="password"
                                    className="form-control"
                                  />
                                  <div className="help-block" />
                                </div>
                                <div
                                  className="col-sm-1"
                                  style={{ paddingTop: 8 }}
                                >
                                  <a href="#" className="margin-left-10">
                                    Change
                                  </a>
                                </div>
                              </div>
                              <div className="form-group pf-mb-0">
                                <div className="col-md-8 offset-sm-4 margin-top-20">
                                  <input
                                    type="submit"
                                    className="pf-btn pf-btn-primary"
                                    defaultValue="Save changes"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-12">
                        <form className="form-horizontal defaults-main-form">
                          <h5 className="pf-my-0 page-title">Delete Account</h5>
                          <div className="underlined" />
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <div className="col-sm-8 offset-sm-4">
                                  <p>
                                    Permanently delete my dropshippy account and
                                    all my data. This cannot be undone.
                                  </p>
                                  <a className="pf-btn pf-btn-secondary pf-mt-12">
                                    Delete account
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div
                        tabIndex={-1}
                        aria-labelledby="null-label"
                        aria-hidden="true"
                        role="dialog"
                        className="modal fade zoom delete-account"
                      >
                        <div className="modal-dialog modal-md">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button type="button" className="close">
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                              </button>
                              <div className="pf-px-8">
                                <h4 className="pf-m-0">Tell us what's up</h4>
                                <div className="clearfix" />
                              </div>
                            </div>
                            <div className="modal-body">
                              <div className="pf-p-4">
                                <div className="row">
                                  <div className="col-md-12">
                                    <form>
                                      <div className="form-group">
                                        <div className="check-radio-list">
                                          <div>
                                            <label className="pf-mb-16">
                                              <input
                                                type="checkbox"
                                                defaultValue="confusing"
                                              />
                                              <span className="pf-ui-body pf-ml-4">
                                                dropshippy is confusing
                                              </span>
                                            </label>
                                          </div>
                                          <div>
                                            <label className="pf-mb-16">
                                              <input
                                                type="checkbox"
                                                defaultValue="cant_connect"
                                              />
                                              <span className="pf-ui-body pf-ml-4">
                                                I couldn't connect my store
                                              </span>
                                            </label>
                                          </div>
                                          <div>
                                            <label className="pf-mb-16">
                                              <input
                                                type="checkbox"
                                                defaultValue="high_prices"
                                              />
                                              <span className="pf-ui-body pf-ml-4">
                                                Prices were too high
                                              </span>
                                            </label>
                                          </div>
                                          <div>
                                            <label className="pf-mb-16">
                                              <input
                                                type="checkbox"
                                                defaultValue="not_selling"
                                              />
                                              <span className="pf-ui-body pf-ml-4">
                                                I'm not making sales
                                              </span>
                                            </label>
                                          </div>
                                          <div>
                                            <label className="pf-mb-16">
                                              <input
                                                type="checkbox"
                                                defaultValue="low_quality"
                                              />
                                              <span className="pf-ui-body pf-ml-4">
                                                The quality didn't meet my
                                                standards
                                              </span>
                                            </label>
                                          </div>
                                          <div>
                                            <label className="pf-mb-16">
                                              <input
                                                type="checkbox"
                                                defaultValue="another_service"
                                              />
                                              <span className="pf-ui-body pf-ml-4">
                                                I've found another fulfillment
                                                service
                                              </span>
                                            </label>
                                          </div>
                                          <div>
                                            <label className="pf-mb-16">
                                              <input
                                                type="checkbox"
                                                defaultValue="another_account"
                                              />
                                              <span className="pf-ui-body pf-ml-4">
                                                I have another dropshippy account
                                              </span>
                                            </label>
                                          </div>
                                          <div>
                                            <label className="pf-mb-16">
                                              <input
                                                type="checkbox"
                                                defaultValue="not_interested"
                                              />
                                              <span className="pf-ui-body pf-ml-4">
                                                I'm not interested in using
                                                dropshippy anymore
                                              </span>
                                            </label>
                                          </div>
                                          <div>
                                            <label className="pf-mb-16">
                                              <input
                                                type="checkbox"
                                                defaultValue="other"
                                              />
                                              <span className="pf-ui-body pf-ml-4">
                                                Other
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="support-info pf-border-bottom pf-border-top pf-py-24 pf-my-24">
                                        <span className="pf-h4 pf-mb-4">
                                          Anything we can do to change your
                                          mind?
                                        </span>
                                        <span className="pf-text-muted pf-mt-2">
                                          Call us <b>+1 (818) 351-7181</b> (9 AM
                                          - 8 PM EST)
                                        </span>
                                        <a href="mailto:support@dropshippy.com">
                                          support@dropshippy.com
                                        </a>
                                      </div>
                                      <div className="form-group pf-mb-0">
                                        <label className="control-label pf-bold pf-ui-body">
                                          Enter your password to confirm:
                                        </label>
                                        <div className="col-sm-6 pf-px-0">
                                          <input
                                            type="email"
                                            name="blank"
                                            placeholder="email"
                                            tabIndex={-1}
                                            style={{
                                              position: 'fixed',
                                              top: '-1000px',
                                            }}
                                          />
                                          <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            data-vv-validate-on="blur"
                                            className="form-control"
                                            aria-required="true"
                                            aria-invalid="false"
                                          />
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <div className="pf-px-4">
                                <a
                                  disabled="disabled"
                                  className="pf-btn pf-btn-primary pf-mr-8 pull-left"
                                >
                                  Delete my account
                                </a>
                                <a className="pf-btn pf-btn-secondary pull-left dismiss">
                                  Cancel
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        tabIndex={-1}
                        aria-labelledby="null-label"
                        aria-hidden="true"
                        role="dialog"
                        className="modal fade zoom delete-account"
                      >
                        <div className="modal-dialog modal-md">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button type="button" className="close">
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                              </button>
                              <div>
                                <div className="clearfix" />
                              </div>
                            </div>
                            <div className="modal-body">
                              <div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="support-info pf-border-bottom pf-border-top pf-py-24">
                                      <span className="pf-h4 pf-mb-4">
                                        Anything we can do to change your mind?
                                      </span>
                                      <span className="pf-text-muted pf-mt-2 ">
                                        Call us <b>+1 (818) 351-7181</b> (9 AM -
                                        8 PM EST)
                                      </span>
                                      <a href="mailto:support@dropshippy.com">
                                        support@dropshippy.com
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <div>
                                <a className="pf-btn pf-btn-primary margin-right-10 pull-left delete">
                                  Leave
                                </a>
                                <a className="button gray cdark pull-left dismiss">
                                  Cancel
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ display: 'none' }}>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-12">
                            <form className="form-horizontal defaults-main-form">
                              <h5 className="pf-my-0 page-title">
                                Change Email
                              </h5>
                              <div className="underlined" />
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group required">
                                    <label className="col-sm-4 control-label">
                                      Email:
                                    </label>
                                    <div className="col-sm-5">
                                      <input
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        className="inspectletIgnore"
                                        aria-required="false"
                                        aria-invalid="false"
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group required">
                                    <label className="col-sm-4 control-label">
                                      Current password:
                                    </label>
                                    <div className="col-sm-5">
                                      <input
                                        type="password"
                                        name="password"
                                        data-vv-validate-on="blur"
                                        className="form-control"
                                        aria-required="true"
                                        aria-invalid="false"
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <div className="col-md-8 offset-sm-4 margin-top-20">
                                      <input
                                        type="submit"
                                        className="pf-btn pf-btn-primary"
                                        defaultValue="Change email"
                                      />
                                      <a className="pf-btn pf-btn-secondary pf-ml-8">
                                        Cancel
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ display: 'none' }}>
                  <div className="col-md-12">
                    <div
                      className="pf-d-none pf-d-sm-block float-right"
                      style={{ marginTop: '-82px' }}
                    >
                      <a className="pf-btn pf-btn-secondary">
                        Reset to defaults
                      </a>
                    </div>
                    <div className="row">
                      <ul
                        className="pf-tabs secondary pf-mb-16 hidden"
                        style={{ top: 0 }}
                      >
                        <div className="tab-wrap">
                          <li className="tab active">
                            <a href="#">Email</a>
                          </li>
                          <li className="tab">
                            <a href="#">Dashboard</a>
                          </li>
                        </div>
                        <span className="nav-arrow left hidden" />
                        <span className="nav-arrow right hidden" />
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <p className="pf-mb-24 pf-text-muted pf-ui-caption">
                      By checking the boxes below, you agree to receive the
                      respective promotional or transactional emails from
                      dropshippy
                    </p>
                  </div>
                  <div className="col-md-12">
                    <div className="table notification-table">
                      <div className="row">
                        <div className="col-6" />
                        <div className="channel-row col-3">
                          Email
                        </div>
                        <div className="channel-row col-3">
                          Dashboard
                        </div>
                      </div>
                      <div>
                        <div className="row main-category">
                          <div className="col-6">General</div>
                        </div>
                        <div className="row sub-category item category-account_general_settings">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_general_settings"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_general_settings"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Discounts </span>
                            </p>
                            <div
                              id="sub_account_general_settings"
                              className="collapse info-text"
                            >
                              <p>
                                Get notified when you qualify for volume
                                discounts
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="row main-category">
                          <div className="col-6">News</div>
                        </div>
                        <div className="row sub-category item category-account_general_recommendations">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_general_recommendations"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_general_recommendations"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Product recommendations </span>
                            </p>
                            <div
                              id="sub_account_general_recommendations"
                              className="collapse info-text"
                            >
                              <p>
                                We'll send you new product recommendations your
                                store should try
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="row main-category">
                          <div className="col-6">Promo</div>
                        </div>
                        <div className="row sub-category item category-account_promo_intros">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_promo_intros"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_promo_intros"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Getting started </span>
                            </p>
                            <div
                              id="sub_account_promo_intros"
                              className="collapse info-text"
                            >
                              <p>
                                A step-by-step guide to help you get started
                                with dropshippy
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_promo_blog">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_promo_blog"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_promo_blog"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> dropshippy blog </span>
                            </p>
                            <div
                              id="sub_account_promo_blog"
                              className="collapse info-text"
                            >
                              <p>Receive our latest blog posts</p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_promo_warehouse_newsletter">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_promo_warehouse_newsletter"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_promo_warehouse_newsletter"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Warehouse newsletter </span>
                            </p>
                            <div
                              id="sub_account_promo_warehouse_newsletter"
                              className="collapse info-text"
                            >
                              <p>
                                The latest warehousing news and new feature
                                launches
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_promo_personalized">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_promo_personalized"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_promo_personalized"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Personalized updates </span>
                            </p>
                            <div
                              id="sub_account_promo_personalized"
                              className="collapse info-text"
                            >
                              <p>
                                The most tailored product and features updates
                                for you
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_promo_general_news">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_promo_general_news"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_promo_general_news"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> General dropshippy news </span>
                            </p>
                            <div
                              id="sub_account_promo_general_news"
                              className="collapse info-text"
                            >
                              <p>
                                Occasional news intended for everyone who uses
                                dropshippy
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_europe_news">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_europe_news"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_europe_news"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Europe news </span>
                            </p>
                            <div
                              id="sub_account_europe_news"
                              className="collapse info-text"
                            >
                              <p>New European product and update launches</p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_promo_quarterly_newsletter">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_promo_quarterly_newsletter"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_promo_quarterly_newsletter"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> dropshippy quarterly newsletter </span>
                            </p>
                            <div
                              id="sub_account_promo_quarterly_newsletter"
                              className="collapse info-text"
                            >
                              <p>A quarterly update on all things dropshippy</p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_promo_blog_monthly_newsletter">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_promo_blog_monthly_newsletter"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_promo_blog_monthly_newsletter"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> dropshippy blog monthly newsletter </span>
                            </p>
                            <div
                              id="sub_account_promo_blog_monthly_newsletter"
                              className="collapse info-text"
                            >
                              <p>
                                A list of our previous month's most popular
                                reads
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_promo_reminders">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_promo_reminders"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_promo_reminders"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Reminders </span>
                            </p>
                            <div
                              id="sub_account_promo_reminders"
                              className="collapse info-text"
                            >
                              <p>
                                Be notified about making extra by becoming an
                                Affiliate
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="row main-category">
                          <div className="col-6">Billing</div>
                        </div>
                        <div className="row sub-category item category-account_billing_deposit">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_billing_deposit"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_billing_deposit"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Money deposits </span>
                            </p>
                            <div
                              id="sub_account_billing_deposit"
                              className="collapse info-text"
                            >
                              <p>
                                A quick message letting you know money's been
                                added to your wallet
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_billing_issues">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_billing_issues"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_billing_issues"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Transaction issues </span>
                              <span className="asterisk">*</span>
                            </p>
                            <div
                              id="sub_account_billing_issues"
                              className="collapse info-text"
                            >
                              <p>
                                An alert that lets you know a transaction has
                                failed
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <span
                                className="tooltip-container"
                                data-original-title
                                title
                              />
                              <input type="checkbox" disabled="disabled" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="row main-category">
                          <div className="col-6">Taxes</div>
                        </div>
                        <div className="row sub-category item category-account_vat_info">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_vat_info"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_vat_info"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> VAT reminders </span>
                              <span className="asterisk">**</span>
                            </p>
                            <div
                              id="sub_account_vat_info"
                              className="collapse info-text"
                            >
                              <p>
                                Be notified when you should start charging VAT
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <span
                                className="tooltip-container"
                                data-original-title
                                title
                              />
                              <input type="checkbox" disabled="disabled" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_tax_sales_reminder">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_tax_sales_reminder"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_tax_sales_reminder"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Sales Tax Reminders </span>
                              <span className="asterisk">**</span>
                            </p>
                            <div
                              id="sub_account_tax_sales_reminder"
                              className="collapse info-text"
                            >
                              <p>We'll remind you to charge sales tax</p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <span
                                className="tooltip-container"
                                data-original-title
                                title
                              />
                              <input type="checkbox" disabled="disabled" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_tax_resale_certificate">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_tax_resale_certificate"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_tax_resale_certificate"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Tax exemption status </span>
                              <span className="asterisk">**</span>
                            </p>
                            <div
                              id="sub_account_tax_resale_certificate"
                              className="collapse info-text"
                            >
                              <p>
                                Know if your tax exemptions has been approved
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <span
                                className="tooltip-container"
                                data-original-title
                                title
                              />
                              <input type="checkbox" disabled="disabled" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="row main-category">
                          <div className="col-6">Programs</div>
                        </div>
                        <div className="row sub-category item category-account_wf_settings">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_wf_settings"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_wf_settings"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Warehousing settings </span>
                              <span className="asterisk">*</span>
                            </p>
                            <div
                              id="sub_account_wf_settings"
                              className="collapse info-text"
                            >
                              <p>
                                Product approvals, low stock reminders, and
                                shipping info
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <span
                                className="tooltip-container"
                                data-original-title
                                title
                              />
                              <input type="checkbox" disabled="disabled" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_programs_packins">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_programs_packins"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_programs_packins"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" /> <span> Pack-ins </span>
                              <span className="asterisk">*</span>
                            </p>
                            <div
                              id="sub_account_programs_packins"
                              className="collapse info-text"
                            >
                              <p>
                                We'll let you know when you're running low on
                                packing and when we receive them
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <span
                                className="tooltip-container"
                                data-original-title
                                title
                              />
                              <input type="checkbox" disabled="disabled" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="row main-category">
                          <div className="col-6">Feedback</div>
                        </div>
                        <div className="row sub-category item category-account_feedback_product">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_feedback_product"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_feedback_product"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" /> <span> Product </span>
                            </p>
                            <div
                              id="sub_account_feedback_product"
                              className="collapse info-text"
                            >
                              <p>
                                A quick reminder to review the products you
                                receive
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                        <div className="row sub-category item category-account_feedback_experience">
                          <a
                            data-toggle="collapse"
                            href="#sub_account_feedback_experience"
                            role="button"
                            aria-expanded="false"
                            aria-controls="account_feedback_experience"
                            className="category col-10 col-sm-6"
                          >
                            <p className="subcategory-name">
                              <span className="arrow" />
                              <span> Experience </span>
                            </p>
                            <div
                              id="sub_account_feedback_experience"
                              className="collapse info-text"
                            >
                              <p>
                                Share with us your product and interaction
                                experiences
                              </p>
                            </div>
                          </a>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="checkbox-container">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>
                      <span className="asterisk">*</span>
                      These messages need to be sent through at least one
                      channel
                    </p>
                    <p>
                      <span className="asterisk">* *</span>
                      Not possible to unsubscribe because these messages require
                      you take action
                    </p>
                    <div className="row buttons-row">
                      <div className="text-right padding-bottom-20 visible-xs col-12">
                        <a className="pf-btn pf-btn-secondary">
                          Reset to defaults
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="account-users" style={{ display: 'none' }}>
                  <div className="invite-others-button">
                    <a
                      data-target=".bs-modal"
                      className="pf-btn pf-btn-secondary"
                    >
                      Invite others
                    </a>
                  </div>
                  <div className="row hidden-sm hidden-xs header-text pf-h5 pf-border-bottom pf-ml-0 pf-mr-0">
                    <div className="col-3 pf-px-md-12">User</div>
                    <div className="col-3 pf-px-md-12">Role</div>
                    <div className="col-3 pf-px-md-12">Last Login</div>
                    <div className="col-3 pf-px-md-12" />
                  </div>
                  <div className="table-base row-text">
                    <table className="col-12">
                      <tbody style={{ position: 'relative' }}>
                        <tr className="row table-row col-12 pf-p-0 pf-ml-0">
                          <td className="pf-d-md-none pf-pt-12 pf-px-0 pf-ui-body col-5">
                            User
                          </td>
                          <td className="col-7 col-md-3 pf-p-md-12 pf-py-12 value inspectlet-sensitive users-name-and-email">
                            <span className="pf-ui-body">Duong Quoc Bao</span>
                            <span className="pf-d-block pf-ui-caption pf-text-muted">
                              dqbaoptit@gmail.com
                            </span>
                          </td>
                          <td className="pf-d-md-none col-5 row-text">Role</td>
                          <td className="col-7 col-md-3 value row-text pf-text-muted pf-pt-0 pf-pt-md-12">
                            Admin/Owner
                          </td>
                          <td className="pf-d-md-none col-5 row-text">
                            <span>Last Login</span>
                          </td>
                          <td className="col-7 col-md-auto value row-text pf-text-muted pf-pt-0 pf-pt-md-12">
                            <div>5 seconds ago</div>
                          </td>
                          <td className="col-12 col-md text-right value users-resend-remove-row pf-p-0 pf-p-md-12">
                            <hr className="pf-d-block pf-d-md-none pf-mt-12 pf-mb-12" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-center">
                      <div>
                        <div className="text-center pf-my-24">
                          <nav className="pf-d-inline-block" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    tabIndex={-1}
                    aria-labelledby="null-label"
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
                            <h5 className="modal-title">Invite user</h5>
                          </div>
                        </div>
                        <div className="modal-body">
                          <div>
                            <div className="pf-mb-8 cgray">
                              We'll send an email inviting your friend to join
                              your dropshippy account. Don't forget that Admins
                              have access to everything, while Users can't use
                              Billing and Reports sections, add/remove other
                              users, change user roles, or remove stores.
                            </div>
                            <form id="customerUsersInviteForm">
                              <div className="row account-users padding-left-15 padding-bottom-10 padding-top-20 padding-right-15">
                                <div className="col-12 pf-p-0">
                                  <input
                                    type="email"
                                    placeholder="E-Mail"
                                    className="email-input inspectletIgnore"
                                  />
                                  <div className="color_dark-red pf-mt-8 error messages" />
                                </div>
                                <div className="col-12 pf-p-0">
                                  <div className="dropdown role-select">
                                    <button
                                      type="button"
                                      data-toggle="dropdown"
                                      className="pf-btn pf-btn-default dropdown-toggle large pf-px-12"
                                    >
                                      <span className="select-label">User</span>
                                      <span className="pf-i-24 pf-i pf-i-chevron-down users-role-select-chevron" />
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li>
                                        <a data-value={0}>
                                          <span className="select-label">
                                            User
                                          </span>
                                          <div className="role-desc cgray">
                                            Permissions: Edit Orders, Manage
                                            Stores
                                          </div>
                                        </a>
                                      </li>
                                      <li>
                                        <a data-value={1}>
                                          <span className="select-label">
                                            Admin
                                          </span>
                                          <div className="role-desc cgray">
                                            Permission: Edit Orders, Manage
                                            Stores &amp; Billing, Remove Stores,
                                            Add/Remove Billing options, See
                                            Reports, Add/Remove users, Change
                                            user roles
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xs-12">
                                  <button
                                    id="inviteSubmitBT"
                                    type="submit"
                                    className="pf-btn pf-btn-primary"
                                  >
                                    Send invite
                                  </button>
                                </div>
                              </div>
                              <div
                                className="pf-mt-8 success-message"
                                style={{ display: 'none' }}
                              >
                                <div className="alert alert-success success messages inspectlet-sensitive" />
                              </div>
                              <div
                                className="color_dark-red pf-mt-8 error messages"
                                style={{ display: 'none' }}
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    tabIndex={-1}
                    aria-labelledby="null-label"
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
                            <h5 className="modal-title">Invite user</h5>
                          </div>
                        </div>
                        <div className="modal-body">
                          <div>
                            <div className="pf-mb-24">
                              Users can only be invited by admins!
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pf-mb-40" style={{}}>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12">
                        <p className="pf-text-muted">
                          To keep your Prinful account secure, we highly
                          recommend you enable two-factor authentication (2FA)
                          using an authenticator app or SMS.
                        </p>
                        <p className="pf-m-0 pf-text-muted">
                          Once you've enabled two-factor authentication, you'll
                          be required to enter a security code whenever you sign
                          into your dropshippy account.
                        </p>
                      </div>
                      <div className="col-12">
                        <h5 className="pf-h4 pf-mt-32 pf-mb-0">
                          Two factor authentication
                        </h5>
                        <hr className="pf-mt-16 pf-mb-0" />
                      </div>
                      <div className="col-12 col-sm-8 offset-sm-4 pf-mt-32">
                        <p className="pf-text-muted pf-mb-0">
                          Choose the two-factor authentication method you'd like
                          to set up for your dropshippy account.
                        </p>
                        <div className="pf-mt-32">
                          <button
                            className="pf-btn pf-btn-primary pf-mr-12"
                            type="button"
                          >
                            Set up app
                          </button>
                          <button
                            className="pf-btn pf-btn-primary"
                            type="button"
                          >
                            Set up SMS
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      tabIndex={-1}
                      aria-labelledby="null-label"
                      aria-hidden="true"
                      role="dialog"
                      className="modal fade zoom pf-modal"
                    >
                      <div className="modal-dialog modal-md">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close">
                              <span aria-hidden="true">×</span>
                              <span className="sr-only">Close</span>
                            </button>
                            <div>
                              <h4 className="pf-m-0">
                                Disable 2FA SMS authentication
                              </h4>
                            </div>
                          </div>
                          <div className="modal-body">
                            <div>
                              <div className="row">
                                <div className="col-md-12">
                                  <label className="pf-h4 pf-m-0">
                                    Enter your dropshippy password to confirm:
                                  </label>
                                  <input
                                    type="password"
                                    data-vv-validate-on="blur"
                                    className="form-control"
                                    aria-required="true"
                                    aria-invalid="false"
                                    style={{ background: 'rgb(255, 255, 255)' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <div className="text-left">
                              <a className="pf-btn pf-btn-secondary">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>{' '}
      </div>
    </>
  );
}
