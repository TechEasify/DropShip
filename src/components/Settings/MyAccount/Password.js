import React from 'react';

export default (props) => (
  <form className="form-horizontal defaults-main-form">
    <h5 className="pf-my-0 page-title">Change Password</h5>
    
    <div className="underlined" />
    
    <div className="row">
      <div className="col-md-12">
        <div className="form-group required">
          <label className="col-sm-4 control-label">Current password:</label>
          
          <div className="col-sm-5">
            <input
              type="password"
              name="password"
              className="form-control"
              aria-required="true"
              aria-invalid="false"
            />
            
            {/**/}
          </div>
        </div>
        
        <div className="form-group required">
          <label className="col-sm-4 control-label">New password:</label>
          
          <div className="col-sm-5">
            <input
              type="password"
              name="passwordNew"
              className="form-control"
              aria-required="true"
              aria-invalid="false"
            />
            
            {/**/}
          </div>
        </div>
        
        <div className="form-group required">
          <label className="col-sm-4 control-label">Confirm password:</label>
          
          <div className="col-sm-5">
            <input
              type="password"
              name="passwordRepeat"
              className="form-control"
              aria-required="true"
              aria-invalid="false"
            />
            
            {/**/}
          </div>
        </div>
        
        <div className="form-group">
          <div className="col-md-8 offset-sm-4 margin-top-20">
            <button type="submit" className="pf-btn pf-btn-primary">
              Change password
              {/**/}
            </button>
            
            <button type="button" className="pf-btn pf-btn-secondary pf-ml-8" onClick={props.Cancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </form>
);
