import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Forgot() {
  const history = useHistory();
  return (
    <div id="content" className="pf-mt-0">
      <div className="container-fluid pf-p-0 main-auth">
        <div className="row main-auth__wrap no-gutters">
          <div className="col-xs-12 col-md-6 pf-py-64 pf-p-md-64 main-auth__info">
            <div className="mini-logo text-center">
              <a href="" rel="home" className="logo-link">
                DropShippy
              </a>
            </div>
           

            <div className="main-auth__vertical-align--parent">
              <div className="main-auth__vertical-align--child">
                <div className="form-wrapper main-auth__form pf-pt-64 pf-pt-md-0 clearfix">
                  <h1 className="pf-h2 pf-m-0">Password reset</h1>


                  <p className="pf-ui-body pf-text-muted">
                    Enter your email, and we&apos;ll send you a password reset link. This may take a few minutes!
                  </p>

                  <form id="w0" href="#">
                    <input type="hidden" name="_csrf" value="7LDVf0S8h0DGR0RL6yyutneo86uQe_CNSC3vXa58pri23rcYK8TdJ5MlCSDeYO_jHvve-Ps4lLQrTpk5mS7j4Q==" />
                    <div className="pf-mt-24">
                      <div className="form-group field-customer-email required has-error">
                        <label className="control-label" htmlFor="customer-email">Email</label>
                        <input type="text" id="customer-email" className="form-control inspectletIgnore" name="Customer[email]" />
                        <div className="help-block">Please enter your email</div>
                      </div>
                    </div>

                    <div className="clearfix">
                      <input type="submit" className="pf-btn pf-btn-primary" value="Send reset email" />
                    </div>

                  </form>
                  <hr className="pf-my-24" />
                  <a href="" onClick={() => history.push('/auth/login')} title="Sign in">Sign in</a>
                  <span className="pf-text-muted pf-bold pf-mx-8">·</span>
                  <a href="" onClick={() => history.push('/auth/register')} title="Sign up">Sign up</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 hidden-xs hidden-sm  main-auth__wrap__image" >
            <div className="main-auth__wrap__image__overlay" />
          </div>
        </div>
      </div>

    </div>
  );
}
