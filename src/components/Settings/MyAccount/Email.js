import React from 'react';

export default (props) => (
  <form className="form-horizontal defaults-main-form">
    <h5 className="pf-my-0 page-title">Change Email</h5>
    <div className="underlined" />
    <div className="row">
      <div className="col-md-12">
        <div className="form-group required">
          <label className="col-sm-4 control-label">Email:</label>
    
          <div className="col-sm-5">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="inspectletIgnore"
              aria-required="false"
              aria-invalid="false"
            />
      
            {/**/}
          </div>
        </div>
  
        <div className="form-group required">
          <label className="col-sm-4 control-label">Current password:</label>
    
          <div className="col-sm-5">
            <input
              type="password"
              name="password"
              data-vv-validate-on="blur"
              className="form-control"
              aria-required="true"
              aria-invalid="false"
            />
      
            {/**/}
          </div>
        </div>
  
        <div className="form-group">
          <div className="col-md-8 offset-sm-4 margin-top-20">
            <input
              type="submit"
              className="pf-btn pf-btn-primary"
              defaultValue="Change email"
            />
      
            <a className="pf-btn pf-btn-secondary pf-ml-8" onClick={props.Cancel}>Cancel</a>
          </div>
        </div>
      </div>
    </div>
  </form>
);
