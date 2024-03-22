/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
// import { makeStyles } from '@mui/material/styles';
import { Modal, Backdrop, Fade } from '@mui/material';
import Form from '@components/Affiliate/Form';
import {makeStyles} from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export function Affiliate() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="pf-border pf-bg-white pf-py-64 pf-px-16 pf-px-sm-0">
        <div>
          <h2 className="pf-h2 pf-mt-0 pf-d-block pf-d-sm-none pf-mb-24">
            Become a dropshippy Affiliate
          </h2>
          <div className="row pf-pb-48 affiliate-intro__top-block">
            <div className="offset-sm-1 col-sm-6">
              <h2 className="pf-h2 pf-mt-0 pf-d-none pf-d-sm-block">
                Become a dropshippy Affiliate
              </h2>
              <p className="text-muted pf-ui-subheading pf-mb-0 pf-mt-24 pf-mt-sm-0">
                Link new customers to dropshippy and get 10% of their dropshippy order
                value! Start earning from the first order your customer makes, and
                keep receiving commission for 9 months.
              </p>
              <button className="pf-btn pf-btn-primary pf-mt-24" type="button" onClick={handleOpen}>
                Become an affiliate
              </button>
            </div>
            <div className="col-sm-4">
              <div className="youtube-video-container text-center">
                <div
                  className="youtube-video-container__video"
                  style={{
                    height: '100%',
                    maxHeight: '100%',
                    background:
                'url("https://img.youtube.com/vi/6zSrXHleGnA/hqdefault.jpg") center center / 100% no-repeat',
                  }}
                />
                <div
                  className="youtube-video-container__play"
                  style={{ height: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-1 col-md-10">
            <hr className="pf-m-0" />
          </div>
        </div>
        <div className="row pf-py-48 affiliate-intro__why-become">
          <div className="offset-sm-1 col-sm-10">
            <h3 className="pf-ui-subheading-lg pf-mt-0 pf-mb-32">
              Why become a dropshippy affiliate?
            </h3>
          </div>
          <div className="offset-sm-1 col-sm-3 affiliate-intro__illustration pf-mb-24 pf-mb-sm-0">
            <img
              src="https://www.dropshippy.com/static/images/site/affiliate/order-illustration.svg"
              alt="Earn 10% of every order"
            />
            <div>
              <h4 className="pf-h4 pf-mt-0 pf-mt-sm-16 pf-mb-8">
                Earn 10% of every order
              </h4>
              <p className="text-muted pf-ui-body pf-mb-0">
                your referred customer submits to dropshippy
              </p>
            </div>
          </div>
          <div className="col-sm-3 affiliate-intro__illustration pf-mb-24 pf-mb-sm-0">
            <img
              src="https://www.dropshippy.com/static/images/site/affiliate/recurring-commission-illustration.svg"
              alt="Recurring commission"
            />
            <div>
              <h4 className="pf-h4 pf-mt-0 pf-mt-sm-16 pf-mb-8">
                Recurring commission
              </h4>
              <p className="text-muted pf-ui-body pf-mb-0">
                for 9 months from the time your referred customer makes their first
                order
              </p>
            </div>
          </div>
          <div className="col-sm-3 affiliate-intro__illustration">
            <img
              src="https://www.dropshippy.com/static/images/site/affiliate/payments-illustration.svg"
              alt="Convenient payments"
            />
            <div>
              <h4 className="pf-h4 pf-mt-0 pf-mt-sm-16 pf-mb-8">
                Convenient payments
              </h4>
              <p className="text-muted pf-ui-body pf-mb-0">
                Receive your earnings through PayPal
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-1 col-md-10">
            <hr className="pf-m-0" />
          </div>
        </div>
        <div className="row pf-py-48 affiliate-intro__how-it-works">
          <div className="offset-sm-1 col-sm-10">
            <h3 className="pf-ui-subheading-lg pf-mt-0 pf-mb-24">
              How does it work?
            </h3>
          </div>
          <div className="offset-sm-1 col-sm-10">
            <div className="timeline">
              <div className="timeline__content-container">
                <div>
                  <div className="timeline__number">1</div>
                </div>
                <div className="timeline__info pf-ml-16">
                  <p className="pf-m-0 pf-ui-body">
                    Fill out our
                    <a href="#" id="showForm" className="pf-link">
                      affiliate application form
                    </a>
                  </p>
                </div>
              </div>
              <div className="timeline__line-container">
                <div className="timeline__line" />
              </div>
            </div>
            <div className="timeline">
              <div className="timeline__content-container">
                <div>
                  <div className="timeline__number">2</div>
                </div>
                <div className="timeline__info pf-ml-16">
                  <p className="pf-m-0 pf-ui-body">
                    Get your approval and unique link
                  </p>
                </div>
              </div>
              <div className="timeline__line-container">
                <div className="timeline__line" />
              </div>
            </div>
            <div className="timeline">
              <div className="timeline__content-container">
                <div>
                  <div className="timeline__number">3</div>
                </div>
                <div className="timeline__info pf-ml-16">
                  <p className="pf-m-0 pf-ui-body">
                    Share and promote the link with your audience
                  </p>
                </div>
              </div>
              <div className="timeline__line-container">
                <div className="timeline__line" />
              </div>
            </div>
            <div className="timeline">
              <div className="timeline__content-container">
                <div>
                  <div className="timeline__number">4</div>
                </div>
                <div className="timeline__info pf-ml-16">
                  <p className="pf-m-0 pf-ui-body">
                    Make money for every referred customer
                  </p>
                </div>
              </div>
              {/**/}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-1 col-md-10">
            <hr className="pf-m-0" />
          </div>
        </div>
        <div className="row affiliate-intro__more-details pf-py-48">
          <div className="offset-sm-1 col-sm-6">
            <h3 className="pf-ui-subheading-lg pf-mt-0 pf-mb-24">More details</h3>
            <ul className="pf-mb-0 pf-pl-16">
              <li className="pf-ui-body pf-mb-16 pf-mb-sm-12">
                <span className="text-muted">
                  Your commission is calculated based on the dropshippy product price
                  (not the customer's retail price excluding discounts, refunds,
                  shipping, and taxes)
                </span>
              </li>
              <li className="pf-ui-body pf-mb-16 pf-mb-sm-12">
                <span className="text-muted">
                  In order for a referral to be connected to your account, they need
                  to sign up to dropshippy within 30 days of opening your link
                </span>
              </li>
              <li className="pf-ui-body pf-mb-16 pf-mb-sm-12">
                <span className="text-muted">
                  An affiliate period lasts 9 months after your referred customer's
                  first order
                </span>
              </li>
              <li className="pf-ui-body pf-mb-16 pf-mb-sm-12">
                <span className="text-muted">
                  Minimum withdrawal sum is $25. Payments are made in USD via PayPal
                  in 1-3 business days
                </span>
              </li>
              <li className="pf-ui-body">
                <span className="text-muted">
                  You'll receive commission after an order has shipped
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-1 col-md-10">
            <hr className="pf-m-0" />
          </div>
        </div>
        <div className="row pf-pt-48">
          <div className="offset-sm-1 col-sm-10">
            <h3 className="pf-ui-subheading-lg pf-mt-0 pf-mb-24">
              Start making money today!
            </h3>
            <button className="pf-btn pf-btn-primary" type="button" onClick={handleOpen}>Become an affiliate</button>
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            style={{ width: 650, height: 600, overflowY: 'scroll' }}
          >
            <Form Close={handleClose} />
          </div>
        </Fade>
      </Modal>

    </>
  );
}
