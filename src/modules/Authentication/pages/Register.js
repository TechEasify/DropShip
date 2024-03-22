import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { UserRegister, UserFindMe } from '../actions';
import { localStorageConstant } from '../../../constant';

const validate = Yup.object().shape({
  email: Yup.string().email().required('Email is required.'),
  password: Yup.string().required('Password is required.'),
  name: Yup.string().required('Full name is required.'),
});

export default function Register() {
  const [_error, setError] = useState({});
  const history = useHistory();

  const handleAfterRegister = (data) => {
    if (data && data.token) {
      // Set the accessToken to the localStorage.
      localStorage.setItem(localStorageConstant.ACCESS_TOKEN, data.token);
      UserFindMe().then((profile) => {
        if (profile) {
          localStorage.setItem(localStorageConstant.USER, JSON.stringify(profile));
        }
        history.push('/');
      }).catch((err) => {
        setError(err);
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: validate,
    onSubmit: (values) => {
      UserRegister(values).then((res) => {
        handleAfterRegister(res);
      }).catch((err) => {
        setError(err);
      });
    },
  });

  return (
    <div className="container-fluid pf-p-0 main-auth">
      <div className="row main-au th__wrap no-gutters">
        <div className="col-xs-12 col-md-6 pf-py-64 pf-p-md-64 main-auth__info">
          <div className="mini-logo text-center">
            <a href="#" rel="home" className="logo-link">
              DropShippy
            </a>
          </div>
          <div className="main-auth__vertical-align--parent">
            <div className="main-auth__vertical-align--child">
              <div className="form-wrapper main-auth__form pf-pt-64 pf-pt-md-0 clearfix">
                <div className="pf-mx-auto pf-py-md-96">
                  <div className="pf-my-0">
                    <div>
                      <div>
                        <div className="register-form">
                          <h1 className="pf-h2 pf-m-0 pf-pb-24">
                            Sign up to dropshippy
                          </h1>
                          {_error.message && (
                          <div className="alert alert-danger">
                            <strong>Error!</strong>
                            {`${_error.message}: ${_error.fields}`}
                          </div>
                          )}
                          <form onSubmit={formik.handleSubmit}>
                            <div className="pf-mb-16">
                              <label htmlFor="name" className="pf-mb-8 pf-ui-caption pf-bold">
                                Full name:
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className="inspectletIgnore"
                              />
                            </div>
                            <div className="pf-mb-16">
                              <label
                                htmlFor="email"
                                className="pf-mb-8 pf-ui-caption pf-bold"
                              >
                                Email:
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                className="inspectletIgnore"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                              />
                            </div>
                            <div className="pf-mb-16">
                              <label
                                htmlFor="password"
                                className="pf-mb-8 pf-ui-caption pf-bold"
                              >
                                Password:
                              </label>
                              <div className="register-form__password">
                                <input
                                  name="password"
                                  id="password"
                                  type="password"
                                  className="inspectletIgnore"
                                  onChange={formik.handleChange}
                                />
                                <div className="pf-h-100 pf-d-flex pf-d-md-none pf-align-items-center pf-border pf-border-left-0 pf-bg-lighter pf-px-8">
                                  <input
                                    type="checkbox"
                                    id="showPassword"
                                    className="pf-m-0"
                                  />
                                  <label
                                    htmlFor="showPassword"
                                    className="pf-mb-0 pf-ml-8"
                                  >
                                    Show
                                  </label>
                                </div>
                              </div>
                            </div>
                            <label htmlFor="hasAcceptedTerms">
                              <input
                                value={formik.values.agreeTerm}
                                type="checkbox"
                                id="hasAcceptedTerms"
                                name="hasAcceptedTerms"
                                true-value="1"
                                false-value="0"
                                className="pull-left"
                                aria-invalid="false"
                              />
                              <div className="pf-mb-16 pf-ml-24 pf-ui-caption pf-text-muted">
                                I agree to DropShippy&apos;s
                                <a
                                  className="pf-link"
                                  href="/policies/terms-of-service"
                                  target="_blank"
                                >
                                  Terms of Service
                                </a>
                                and
                                <a
                                  className="pf-link"
                                  href="/policies/privacy"
                                  target="_blank"
                                >
                                  Privacy Policy
                                </a>
                                .
                              </div>
                            </label>
                            <label htmlFor="subscribe">
                              <input
                                type="checkbox"
                                true-value="1"
                                name="subscribe"
                                id="subscribe"
                                false-value="0"
                                className="pull-left"
                              />
                              <div className="pf-mb-16 pf-ml-24 pf-ui-caption pf-text-muted">
                                I&apos;d like to receive emails from DropShippy to be
                                informed about the latest updates.
                                <br />
                                <i>You can unsubscribe at any time.</i>
                              </div>
                            </label>
                            <input
                              type="submit"
                              className="pf-btn pf-btn-primary pf-my-8 pf-mr-8 pf-w-100 pf-w-md-auto"
                              value="Sign up"
                            />
                          </form>
                          <p className="pf-mt-32 pf-mb-8 pf-ui-legal pf-text-muted">
                            DropShippy Address
                            {/* <a
                              href="mailto:support@dropshippy.com"
                              className="pf-link"
                            >
                              support@dropshippy.com
                            </a> */}
                          </p>
                          <div className="pf-d-flex pf-border-top pf-pt-8 pf-mt-4">
                            <a
                              href=""
                              onClick={() => history.push('/auth/login')}
                              className="pf-ui-body"
                            >
                              Sign in
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
                                src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LfobH0UAAAAAKVJ0gTaQS9RLFC0L7_QrwPb_QUZ&amp;co=aHR0cHM6Ly93d3cucHJpbnRmdWwuY29tOjQ0Mw..&amp;hl=en&amp;v=ADnAC3ZykfbIOflWgrKNsVVT&amp;size=invisible&amp;badge=bottomright&amp;cb=ccx66kpmj6xa"
                                width="256"
                                height="60"
                                role="presentation"
                                name="a-gsfxn0druvx9"
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
          // style={{ backgroundImage: "url('https://static.cdn.dropshippy.com/static/v767/images/layout/shirts.jpg')" }}
        >
          <div className="register-new__image-overlay pf-w-100 pf-h-100 pf-d-flex pf-justify-content-center pf-align-items-center">
            <ul className="register-new__benefits-list pf-w-100 list-unstyled pf-pb-64 pf-pt-40 pf-mx-auto pf-mb-0">
              <li className="register-new__benefits-list-item--desktop pf-px-24 pf-px-md-0 pf-mt-24 pf-d-none pf-d-md-block">
                <div className="pf-d-flex">
                  <div>
                    <div className="pf-pr-12 pf-pt-4">
                      <span className="pf-i pf-i-check pf-text-brown pf-i-24" />
                    </div>
                  </div>
                  <div className="pf-mb-32">
                    <h3 className="pf-h3 pf-m-0 pf-text-white">
                      Let&apos;s stay informed
                    </h3>
                    <div className="pf-text-white pf-mt-8">
                      <span className="wysiwyg pf-d-block">
                        <p>
                          Stay on top of
                          <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                          >
                            our DropShippy operations
                          </a>
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              {/* <li className="register-new__benefits-list-item pf-px-24 pf-px-md-0 pf-mt-24 pf-d-block pf-d-md-none">
                <div className="pf-d-flex">
                  <div>
                    <div className="pf-pr-12 pf-pt-4">
                      <span className="pf-i pf-i-check pf-text-brown pf-i-24" />
                    </div>
                  </div>
                  <div className="pf-mb-32">
                    <h3 className="pf-h3 pf-m-0 pf-text-white">
                      Let&apos;s stay informed
                    </h3>
                    <div className="pf-text-white pf-mt-8">
                      <span className="wysiwyg pf-d-block">
                        <p>
                          Stay on top of
                          <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                          >
                            our DropShippy operations
                          </a>
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="register-new__benefits-list-item--desktop pf-px-24 pf-px-md-0 pf-mt-24 pf-d-none pf-d-md-block">
                <div className="pf-d-flex">
                  <div>
                    <div className="pf-pr-12 pf-pt-4">
                      <span className="pf-i pf-i-check pf-text-brown pf-i-24" />
                    </div>
                  </div>
                  <div className="pf-mb-32">
                    <h3 className="pf-h3 pf-m-0 pf-text-white">
                      Let&apos;s stay safe
                    </h3>
                    <div className="pf-text-white pf-mt-8">
                      <span className="wysiwyg pf-d-block">
                        <p>
                          We&apos;re following health guidelines from the CDC and WHO
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="register-new__benefits-list-item pf-px-24 pf-px-md-0 pf-mt-24 pf-d-block pf-d-md-none">
                <div className="pf-d-flex">
                  <div>
                    <div className="pf-pr-12 pf-pt-4">
                      <span className="pf-i pf-i-check pf-text-brown pf-i-24" />
                    </div>
                  </div>
                  <div className="pf-mb-32">
                    <h3 className="pf-h3 pf-m-0 pf-text-white">
                      Let&apos;s stay safe
                    </h3>
                    <div className="pf-text-white pf-mt-8">
                      <span className="wysiwyg pf-d-block">
                        <p>
                          We&apos;re following health guidelines from the CDC and WHO
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="register-new__benefits-list-item--desktop pf-px-24 pf-px-md-0 pf-mt-24 pf-d-none pf-d-md-block">
                <div className="pf-d-flex">
                  <div>
                    <div className="pf-pr-12 pf-pt-4">
                      <span className="pf-i pf-i-check pf-text-brown pf-i-24" />
                    </div>
                  </div>
                  <div className="pf-mb-32">
                    <h3 className="pf-h3 pf-m-0 pf-text-white">
                      Let&apos;s keep going
                    </h3>
                    <div className="pf-text-white pf-mt-8">
                      <span className="wysiwyg pf-d-block">
                        <p>
                          <span>
                            Thank you all for your patience in this difficult
                            time
                          </span>
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="register-new__benefits-list-item pf-px-24 pf-px-md-0 pf-mt-24 pf-d-block pf-d-md-none">
                <div className="pf-d-flex">
                  <div>
                    <div className="pf-pr-12 pf-pt-4">
                      <span className="pf-i pf-i-check pf-text-brown pf-i-24" />
                    </div>
                  </div>
                  <div className="pf-mb-32">
                    <h3 className="pf-h3 pf-m-0 pf-text-white">
                      Let&apos;s keep going
                    </h3>
                    <div className="pf-text-white pf-mt-8">
                      <span className="wysiwyg pf-d-block">
                        <p>
                          <span>
                            Thank you all for your patience in this difficult
                            time
                          </span>
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
