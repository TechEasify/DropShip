import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Methods() {
  const [collapse, setCollapse] = useState(false)
  return (
    <div className="container-fluid dashboard__container clearfix">
      <div>
        <div className="billing">
          <h2 className="pf-h2 pf-my-40">
            Billing: Billing methods
            <Link
              className="pf-btn float-none float-md-right pf-mt-12 pf-mt-md-0 pf-d-block pf-d-md-inline-block pf-btn-primary"
              style={{ color: '#FFF' }}
              to="methods/add"
            >
              Add new billing method
            </Link>
          </h2>
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
              <div className="row" style={{}}>
                <div className="col-xs-12">
                  <h4 className="pf-h4 pf-mb-16 pf-mt-0">
                    Primary account billing method
                  </h4>
                  <div className="billing__description pf-mb-24 ">
                    <span>
                      This is the primary billing method for your dropshippy
                      account. It'll be the default we use to charge you for
                      future transactions.
                    </span>
                  </div>
                  <div className="billing__default-billing-method padding-25 margin-bottom-15">
                    Please
                    <Link to="methods/add" className="link">
                      Add Billing Method
                    </Link>
                  </div>
                  <div id="stores">
                    <h4 className="pf-h4 pf-mb-16 billing__store-billing_methods__heading--main pf-pt-24 pf-mt-32">
                      Store billing settings
                    </h4>
                    <div className="billing__description margin-bottom-20 ">
                      <span>
                        Set a different billing method for each store. We'll
                        automatically use your account's primary billing method
                        unless otherwise specified.
                      </span>
                    </div>
                    <div className="col-xs-12 billing__store-billing_methods pf-mb-24">
                      <div className="row billing__store-billing_methods__heading pf-d-none pf-d-sm-flex">
                        <div className="col-xs-12 pf-p-12 col-sm-6">Store</div>
                        {/**/}
                        <div className="col-xs-12 pf-p-12 col-sm-6">
                          Store currency
                          <i className="pf-i pf-i-information pf-i-18 pf-text-gray" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="billing-history__toggle pf-py-24 pf-mt-32" onClick={() => setCollapse(!collapse)}>
                    <a
                      data-toggle="collapse"
                      data-target="#billing-history"
                      role="button"
                      aria-expanded={collapse}
                      className="pf-p-0"
                    >
                      <span className="arrow" />
                      <h4 className="pf-h4 pf-my-0 pf-d-inline-block">
                        Billing method changes
                      </h4>
                    </a>
                  </div>
                  {
                    collapse &&
                    <div id="billing-history">
                      <div className="billing-history pf-mb-24">
                        <div className="row">
                          <div className="col-xs-12 table-container">
                            <div
                              id="js--history-table-container"
                              className="history"
                            >
                              <div
                                id="DataTables_Table_0_wrapper"
                                className="dataTables_wrapper no-footer"
                              >
                                <div
                                  className="DTFC_ScrollWrapper"
                                  style={{
                                    position: 'relative',
                                    clear: 'both',
                                    height: 0,
                                  }}
                                >
                                  <div
                                    className="DTFC_LeftWrapper"
                                    style={{
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                    }}
                                    aria-hidden="true"
                                  >
                                    <div
                                      className="DTFC_LeftHeadWrapper"
                                      style={{
                                        position: 'relative',
                                        top: 0,
                                        left: 0,
                                        overflow: 'hidden',
                                      }}
                                    />
                                    <div
                                      className="DTFC_LeftBodyWrapper"
                                      style={{
                                        position: 'relative',
                                        top: 0,
                                        left: 0,
                                        overflow: 'hidden',
                                      }}
                                    >
                                      <div
                                        className="DTFC_LeftBodyLiner"
                                        style={{
                                          position: 'relative',
                                          top: 0,
                                          left: 0,
                                          overflowY: 'scroll',
                                        }}
                                      />
                                    </div>
                                    <div
                                      className="DTFC_LeftFootWrapper"
                                      style={{
                                        position: 'relative',
                                        top: 0,
                                        left: 0,
                                        overflow: 'hidden',
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="DTFC_RightWrapper"
                                    style={{
                                      position: 'absolute',
                                      top: 0,
                                      right: 0,
                                    }}
                                    aria-hidden="true"
                                  >
                                    <div
                                      className="DTFC_RightHeadWrapper"
                                      style={{
                                        position: 'relative',
                                        top: 0,
                                        left: 0,
                                      }}
                                    >
                                      <div
                                        className="DTFC_RightHeadBlocker DTFC_Blocker"
                                        style={{
                                          position: 'absolute',
                                          top: 0,
                                          bottom: 0,
                                        }}
                                      />
                                    </div>
                                    <div
                                      className="DTFC_RightBodyWrapper"
                                      style={{
                                        position: 'relative',
                                        top: 0,
                                        left: 0,
                                        overflow: 'hidden',
                                      }}
                                    >
                                      <div
                                        className="DTFC_RightBodyLiner"
                                        style={{
                                          position: 'relative',
                                          top: 0,
                                          left: 0,
                                          overflowY: 'scroll',
                                        }}
                                      />
                                    </div>
                                    <div
                                      className="DTFC_RightFootWrapper"
                                      style={{
                                        position: 'relative',
                                        top: 0,
                                        left: 0,
                                      }}
                                    >
                                      <div
                                        className="DTFC_RightFootBlocker DTFC_Blocker"
                                        style={{
                                          position: 'absolute',
                                          top: 0,
                                          bottom: 0,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="dataTables_scroll">
                                    <div
                                      className="dataTables_scrollHead"
                                      style={{
                                        overflow: 'hidden',
                                        position: 'relative',
                                        border: 0,
                                        width: '100%',
                                      }}
                                    >
                                      <div
                                        className="dataTables_scrollHeadInner"
                                        style={{
                                          boxSizing: 'content-box',
                                          width: 100,
                                          paddingRight: 0,
                                        }}
                                      >
                                        <table
                                          className="row-border nowrap dataTable no-footer"
                                          style={{ width: 100, marginLeft: 0 }}
                                          role="grid"
                                        >
                                          <thead>
                                            <tr role="row">
                                              <th
                                                className="sorting_disabled"
                                                rowSpan={1}
                                                colSpan={1}
                                                style={{ width: 0 }}
                                              >
                                                Account/Store
                                              </th>
                                              <th
                                                className="sorting_disabled"
                                                rowSpan={1}
                                                colSpan={1}
                                                style={{ width: 0 }}
                                              >
                                                Old Method
                                              </th>
                                              <th
                                                className="sorting_disabled"
                                                rowSpan={1}
                                                colSpan={1}
                                                style={{ width: 0 }}
                                              >
                                                New Method
                                              </th>
                                              <th
                                                className="sorting_disabled"
                                                rowSpan={1}
                                                colSpan={1}
                                                style={{ width: 0 }}
                                              >
                                                Changed by
                                              </th>
                                              <th
                                                className="sorting_disabled"
                                                rowSpan={1}
                                                colSpan={1}
                                                style={{ width: 0 }}
                                              >
                                                Date
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <td>
                                              Store
                                            </td>
                                            <td>
                                              Store
                                            </td>
                                            <td>
                                              Store
                                            </td>
                                            <td>
                                              Store
                                            </td>
                                            <td>
                                              Store
                                            </td>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    {/* <div
                                      className="dataTables_scrollBody"
                                      style={{
                                        position: 'relative',
                                        overflow: 'auto',
                                        width: '100%',
                                      }}
                                    >
                                      <table
                                        className="row-border nowrap dataTable no-footer"
                                        style={{ width: '100%' }}
                                        id="DataTables_Table_0"
                                        role="grid"
                                      >
                                        <thead>
                                          <tr role="row" style={{ height: 0 }}>
                                            <th
                                              className="sorting_disabled"
                                              rowSpan={1}
                                              colSpan={1}
                                              style={{
                                                width: 0,
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                borderTopWidth: 0,
                                                borderBottomWidth: 0,
                                                height: 0,
                                              }}
                                            >
                                              <div
                                                className="dataTables_sizing"
                                                style={{
                                                  height: 0,
                                                  overflow: 'hidden',
                                                }}
                                              >
                                                Account/Store
                                              </div>
                                            </th>
                                            <th
                                              className="sorting_disabled"
                                              rowSpan={1}
                                              colSpan={1}
                                              style={{
                                                width: 0,
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                borderTopWidth: 0,
                                                borderBottomWidth: 0,
                                                height: 0,
                                              }}
                                            >
                                              <div
                                                className="dataTables_sizing"
                                                style={{
                                                  height: 0,
                                                  overflow: 'hidden',
                                                }}
                                              >
                                                Old Method
                                              </div>
                                            </th>
                                            <th
                                              className="sorting_disabled"
                                              rowSpan={1}
                                              colSpan={1}
                                              style={{
                                                width: 0,
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                borderTopWidth: 0,
                                                borderBottomWidth: 0,
                                                height: 0,
                                              }}
                                            >
                                              <div
                                                className="dataTables_sizing"
                                                style={{
                                                  height: 0,
                                                  overflow: 'hidden',
                                                }}
                                              >
                                                New Method
                                              </div>
                                            </th>
                                            <th
                                              className="sorting_disabled"
                                              rowSpan={1}
                                              colSpan={1}
                                              style={{
                                                width: 0,
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                borderTopWidth: 0,
                                                borderBottomWidth: 0,
                                                height: 0,
                                              }}
                                            >
                                              <div
                                                className="dataTables_sizing"
                                                style={{
                                                  height: 0,
                                                  overflow: 'hidden',
                                                }}
                                              >
                                                Changed by
                                              </div>
                                            </th>
                                            <th
                                              className="sorting_disabled"
                                              rowSpan={1}
                                              colSpan={1}
                                              style={{
                                                width: 0,
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                borderTopWidth: 0,
                                                borderBottomWidth: 0,
                                                height: 0,
                                              }}
                                            >
                                              <div
                                                className="dataTables_sizing"
                                                style={{
                                                  height: 0,
                                                  overflow: 'hidden',
                                                }}
                                              >
                                                Date
                                              </div>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr className="odd">
                                            <td
                                              valign="top"
                                              colSpan={5}
                                              className="dataTables_empty"
                                            >
                                              No billing method changes yet.
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/**/}
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  <div className="pf-border-bottom pf-mb-64" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
