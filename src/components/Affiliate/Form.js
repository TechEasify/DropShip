/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function Form(props) {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" onClick={props.Close}>
          <span aria-hidden="true">×</span>

          <span className="sr-only">Close</span>
        </button>

        <div>
          <h3 className="pf-ui-subheading-lg pf-m-0">Affiliate registration</h3>
        </div>
      </div>

      <div className="modal-body">
        <div>
          <div className="row pf-mb-24">
            <div className="col-md-10">
              <p className="pf-ui-body pf-mb-0">
                Please fill out our application form. We'll review and let you know
                via email whether you're approved.
              </p>

              {/**/}
            </div>
          </div>

          <div className="row pf-mb-24">
            <div className="col-md-12">
              <div className="col-md-7 pf-p-0">
                <h5 className="pf-h5 pf-mb-8">Full name</h5>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  className="inspectletIgnore"
                  aria-required="true"
                  aria-invalid="false"
                />

                {/**/}
              </div>
            </div>
          </div>

          <div className="row pf-mb-24">
            <div className="col-md-12">
              <div className="col-md-7 pf-p-0">
                <h5 className="pf-h5 pf-mb-8">Your website</h5>

                <input
                  type="text"
                  name="website"
                  placeholder="http://"
                  aria-required="true"
                  aria-invalid="false"
                />

                {/**/}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 affiliate-intro__traffic-options">
              <h5 className="pf-h5 pf-mb-16">
                How will you bring traffic to dropshippy?
              </h5>

              <div
                className="pf-mb-16"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <input
                      type="checkbox"
                      name="traffic"
                      id="myWebsite"
                      true-value={1}
                      false-value={0}
                      aria-invalid="false"
                    />
                  </div>

                  <div className="pf-ml-8">
                    <label htmlFor="myWebsite" className="pf-ui-body pf-m-0">
                      My website
                    </label>

                    <p className="text-muted small pf-m-0 pf-ui-caption">
                      I'll place ads and create content on a website that I own
                    </p>
                  </div>
                </div>

                {/**/}

                {/**/}
              </div>
              <div
                className="pf-mb-16"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <input
                      type="checkbox"
                      name="traffic"
                      id="paidAds"
                      true-value={1}
                      false-value={0}
                      aria-invalid="false"
                    />
                  </div>

                  <div className="pf-ml-8">
                    <label htmlFor="paidAds" className="pf-ui-body pf-m-0">
                      Paid ads
                    </label>

                    <p className="text-muted small pf-m-0 pf-ui-caption">
                      I'll buy ad placements in search engines, other websites,
                      rented email lists
                    </p>
                  </div>
                </div>

                {/**/}

                {/**/}
              </div>
              <div
                className="pf-mb-16"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <input
                      type="checkbox"
                      name="traffic"
                      id="promotionalEmails"
                      true-value={1}
                      false-value={0}
                      aria-invalid="false"
                    />
                  </div>

                  <div className="pf-ml-8">
                    <label
                      htmlFor="promotionalEmails"
                      className="pf-ui-body pf-m-0"
                    >
                      Promotional emails
                    </label>

                    <p className="text-muted small pf-m-0 pf-ui-caption">
                      I have my own email list
                    </p>
                  </div>
                </div>

                {/**/}

                {/**/}
              </div>
              <div
                className="pf-mb-16"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <input
                      type="checkbox"
                      name="traffic"
                      id="socialMedia"
                      true-value={1}
                      false-value={0}
                      aria-invalid="false"
                    />
                  </div>

                  <div className="pf-ml-8">
                    <label htmlFor="socialMedia" className="pf-ui-body pf-m-0">
                      Social media
                    </label>

                    <p className="text-muted small pf-m-0 pf-ui-caption">
                      I have my own social media accounts
                    </p>
                  </div>
                </div>

                {/**/}

                {/**/}
              </div>
              <div
                className="pf-mb-16"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <input
                      type="checkbox"
                      name="traffic"
                      id="other"
                      true-value={1}
                      false-value={0}
                      aria-invalid="false"
                    />
                  </div>

                  <div className="pf-ml-8">
                    <label htmlFor="other" className="pf-ui-body pf-m-0">
                      Other
                    </label>

                    <p className="text-muted small pf-m-0 pf-ui-caption" />
                  </div>
                </div>
              </div>
              <div className="affiliate-intro__accept-terms pf-mt-24">
                <div className="row pf-mb-8 pf-mt-24">
                  <div className="col-md-12">
                    <div style={{ display: 'flex' }}>
                      <div>
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          id="termsAccepted"
                          aria-invalid="false"
                        />
                      </div>

                      <div className="pf-ml-8">
                        <label
                          htmlFor="termsAccepted"
                          className="pf-ui-caption text-muted pf-m-0"
                        >
                          I agree to dropshippy’s affiliate program

                          <a
                            className="pf-link"
                            target="_blank"
                            href="/policies/affiliate"
                          >
                            Terms of Service
                          </a>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div style={{ display: 'flex' }}>
                      <div>
                        <input
                          type="checkbox"
                          name="subscriptionAccepted"
                          id="subscriptionAccepted"
                          true-value={1}
                          false-value={0}
                        />
                      </div>

                      <div className="pf-ml-8">
                        <label
                          htmlFor="subscriptionAccepted"
                          className="pf-ui-caption text-muted pf-m-0"
                        >
                          I'd like to receive emails about the affiliate program.
                          <br />

                          <i>You can unsubscribe at any time</i>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <div>
          <button className="pf-btn pf-btn-primary" type="button">Submit</button>
        </div>
      </div>
    </div>

  );
}
