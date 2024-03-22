import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { localStorageConstant } from '../../../constant';
import { UserLogin, UserFindMe } from '../actions';

const validate = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function Login() {
  const [_error, setError] = useState({});
  const [_showPassword, setType] = useState(true);
  const history = useHistory();
  const handleAfterLogin = (data) => {
    history.push('/');

    // if (data && data.token) {
    //   // Set the accessToken to the localStorage.
    //   localStorage.setItem(localStorageConstant.ACCESS_TOKEN, data.token);
    //   UserFindMe().then((profile) => {
    //     if (profile) {
    //       localStorage.setItem(localStorageConstant.USER, JSON.stringify(profile));
    //     }
    //     history.push('/');
    //   }).catch((err) => {
    //     setError(err);
    //   });
    // }
  };

  const handleOnClickShowPassword = () => {
    setType(!_showPassword);
  };

  // Handle the form
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validate,
    onSubmit: (values) => {
      UserLogin(values).then((res) => {
        handleAfterLogin(res);
      }).catch((err) => {
        setError(err);
      });
    },
  });

  return (
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
                <div className="pf-mx-auto pf-py-md-96">
                  <div className="pf-my-0">
                    <div
                      data-vue-root="mGOpE2EvrMc5Qf5T"
                      data-vue-components='["login","recaptcha"]'
                    >
                      <div className="clearfix login-box">
                        <h1 className="pf-h2 pf-m-0 pf-pb-24">
                          Sign in to DropShippy
                        </h1>
                        {_error.message && (
                          <div className="alert alert-danger">
                            <strong>Error!</strong>
                            {_error.message}
                          </div>
                        )}
                        <form onSubmit={formik.handleSubmit}>
                          <div className="form-group">
                            <label
                              htmlFor="login-email"
                              className="control-label"
                            >
                              Email:
                            </label>
                            <input
                              type="email"
                              id="login-email"
                              name="email"
                              autoComplete="off"
                              className="form-control inspectletIgnore"
                              onChange={formik.handleChange}
                              value={formik.values.email}
                            />
                          </div>
                          <div className="login-box__password">
                            <div className="form-group">
                              <label
                                htmlFor="login-password"
                                className="control-label"
                              >
                                Password:
                              </label>                              <input
                                id="login-password"
                                name="password"
                                autoComplete="off"
                                type={_showPassword ? 'password' : 'input'}
                                className="form-control inspectletIgnore"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                style={{
                                  height: '38px',
                                  margin: 0,
                                  padding: '0 16px',
                                  color: '#222',
                                  borderRadius: 0,
                                }}
                              />
                            </div>
                            <div className="login-box__show-password pf-bg-lighter">
                              <input
                                onChange={handleOnClickShowPassword}
                                type="checkbox"
                                id="login-toggle-password"
                                className="pf-m-0"
                              />
                              <label>
                                Show
                              </label>
                            </div>
                          </div>
                          <div>
                            <input
                              type="submit"
                              className="pf-btn pf-mr-8 pf-mb-12 pf-btn-primary"
                              value="Sign in"
                            />
                          </div>
                        </form>
                        <div className="pf-d-flex pf-border-top pf-pt-8 pf-mt-4">
                          <a
                            href=""
                            onClick={() => history.push('/auth/register')}
                            className="pf-ui-body pf-embed-hide"
                          >
                            Sign up
                          </a>
                          <span className="pf-text-muted pf-bold pf-mx-8 pf-embed-hide">
                            ·
                          </span>
                          <a
                            href=""
                            onClick={() => history.push('/auth/forgot')}
                            className="pf-ui-body pf-embed-hide"
                          >
                            Forgot password?
                          </a>
                        </div>
                      </div>
                      <div>
                        <div
                          id="g-recaptcha"
                          data-sitekey="6LfobH0UAAAAAKVJ0gTaQS9RLFC0L7_QrwPb_QUZ"
                          data-badge="bottomright"
                          className="g-recaptcha"
                        >
                          <div
                            className="grecaptcha-badge"
                            data-style="bottomright"
                            style={{
                              width: '256px',
                              height: '60px',
                              display: 'block',
                              transition: 'right 0.3s ease 0s',
                              position: 'fixed',
                              bottom: '14px',
                              right: '-186px',
                              boxShadow: 'gray 0px 0px 5px',
                              borderRadius: '2px',
                              overflow: 'hidden',
                            }}
                          >
                            <div className="grecaptcha-logo">
                              <iframe
                                title="1"
                                src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LfobH0UAAAAAKVJ0gTaQS9RLFC0L7_QrwPb_QUZ&amp;co=aHR0cHM6Ly93d3cucHJpbnRmdWwuY29tOjQ0Mw..&amp;hl=en&amp;v=ADnAC3ZykfbIOflWgrKNsVVT&amp;size=invisible&amp;badge=bottomright&amp;cb=3oyrmf5qpnat"
                                width="256"
                                height="60"
                                role="presentation"
                                name="a-h8r0hqyzywna"
                                frameBorder="0"
                                scrolling="no"
                                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                              />
                            </div>
                            <div className="grecaptcha-error" />
                            <textarea
                              id="g-recaptcha-response"
                              name="g-recaptcha-response"
                              className="g-recaptcha-response"
                              style={{
                                width: '250px',
                                height: '40px',
                                border: '1px solid rgb(193, 193, 193)',
                                margin: '10px 25px',
                                padding: '0px',
                                resize: 'none',
                                display: 'none',
                              }}
                            />
                          </div>
                          <iframe title="2" style={{ display: 'none' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-md-6 main-auth__wrap__image"
        >
          <a
            className="login-new__overlay pf-link-block"
            href="https://www.dropshippy.com/covid-19"
          >
            <div className="login-new__overlay-text pf-p-md-64">
              <h3>Lorem Impsum</h3>
              <p>
                Lorem LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem

              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
