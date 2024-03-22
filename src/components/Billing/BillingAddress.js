import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';

export default (props) => (
  <>
    <div>
      <div>
        <h4 className="pf-mt-40 pf-mb-16 col-sm-12">Billing address</h4>
        <div className="col-sm-12 ">
          <div className="row">
            <div className=" no-gutters col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="fullName" className="control-label pf-h5">
                      Full name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="name"
                      maxLength={35}
                      value={props.name}
                      onChange={props.onChange}
                      className="form-control inspectletIgnore"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="address1" className="control-label pf-h5">
                      Address line 1
                    </label>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      maxLength={80}
                      value={props.address1}
                      onChange={props.onChange}
                      className="form-control inspectletIgnore"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-4 order-flow-mobile-3 no-gutters col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="address2" className="control-label pf-h5">
                      Address line 2 (optional)
                    </label>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={props.address2}
                      onChange={props.onChange}
                      maxLength={35}
                      className="form-control inspectletIgnore"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-5 order-flow-mobile-4 no-gutters col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="city" className="control-label pf-h5">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      maxLength={32}
                      value={props.city}
                      onChange={props.onChange}
                      className="form-control inspectletIgnore"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-6 order-flow-mobile-5 no-gutters col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group inspectlet-sensitive">
                    <label htmlFor="country" className="control-label pf-h5">
                      Country
                    </label>
                    <select
                      name="country"
                      id="country"
                      data-vv-as="country"
                      data-placeholder=" "
                      value={props.country}
                      onChange={props.onChange}
                      className="form-control"
                      style={{ display: 'none' }}
                    >
                      <option value="true">Select country</option>
                      <option value="US">United States ( USA )</option>
                    </select>
                    <div
                      className="chosen-container chosen-container-single"
                      id="country_chosen"
                      style={{ width: '100%' }}
                    >
                      <a className="chosen-single" tabIndex={-1}>
                        <span>United States ( USA )</span>
                        <div>
                          <b />
                        </div>
                      </a>
                      <div className="chosen-drop">
                        <div className="chosen-search">
                          <input type="text" autoComplete="off" />
                        </div>
                        <ul className="chosen-results" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-7 order-flow-mobile-6 no-gutters col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="zip" className="control-label pf-h5">
                      ZIP
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip_code"
                      value={props.zip_code}
                      onChange={props.onChange}
                      maxLength={32}
                      className="form-control inspectletIgnore"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 order-flow-mobile-1 no-gutters col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="company" className="control-label pf-h5">
                      Company (optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={props.company}
                      onChange={props.onChange}
                      maxLength={35}
                      className="form-control inspectletIgnore"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-3 order-flow-mobile-8 no-gutters col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-sm-12 col-xs-12">
                  <div className="form-group row">
                    <label
                      htmlFor="phone"
                      className="control-label pf-h5 col-xs-12"
                    >
                      Phone (optional)
                    </label>
                    <div className="col-4 phone-container__code">
                      <MuiPhoneNumber defaultCountry={'us'} name='phone' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
