/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default (props) => (
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" onClick={props.Close}>
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
                      <input type="checkbox" defaultValue="confusing" />

                      <span className="pf-ui-body pf-ml-4">
                        dropshippy is confusing
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="pf-mb-16">
                      <input type="checkbox" defaultValue="cant_connect" />

                      <span className="pf-ui-body pf-ml-4">
                        I couldn't connect my store
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="pf-mb-16">
                      <input type="checkbox" defaultValue="high_prices" />

                      <span className="pf-ui-body pf-ml-4">
                        Prices were too high
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="pf-mb-16">
                      <input type="checkbox" defaultValue="not_selling" />

                      <span className="pf-ui-body pf-ml-4">
                        I'm not making sales
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="pf-mb-16">
                      <input type="checkbox" defaultValue="low_quality" />

                      <span className="pf-ui-body pf-ml-4">
                        The quality didn't meet my standards
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="pf-mb-16">
                      <input type="checkbox" defaultValue="another_service" />

                      <span className="pf-ui-body pf-ml-4">
                        I've found another fulfillment service
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="pf-mb-16">
                      <input type="checkbox" defaultValue="another_account" />

                      <span className="pf-ui-body pf-ml-4">
                        I have another dropshippy account
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="pf-mb-16">
                      <input type="checkbox" defaultValue="not_interested" />

                      <span className="pf-ui-body pf-ml-4">
                        I'm not interested in using dropshippy anymore
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="pf-mb-16">
                      <input type="checkbox" defaultValue="other" />

                      <span className="pf-ui-body pf-ml-4">Other</span>
                    </label>
                  </div>

                  {/**/}
                </div>
              </div>

              <div className="support-info pf-border-bottom pf-border-top pf-py-24 pf-my-24">
                <span className="pf-h4 pf-mb-4">
                  Anything we can do to change your mind?
                </span>

                <span className="pf-text-muted pf-mt-2">
                  Call us

                  <b>+1 (818) 351-7181</b>

                  (9 AM - 8 PM EST)
                </span>

                <a href="mailto:support@dropshippy.com">support@dropshippy.com</a>
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
                    style={{ position: 'fixed', top: '-1000px' }}
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

                  {/**/}
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

        <a className="pf-btn pf-btn-secondary pull-left dismiss" onClick={props.Close}>Cancel</a>
      </div>
    </div>
  </div>

);
