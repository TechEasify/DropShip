import React from 'react';
import { useHistory } from 'react-router-dom';

export function NewOrders(props) {
  const history = useHistory();
  return (
    <div className="modal-dialog modal-md">
      <div className="modal-content-wrapper">
        <div className="modal-content">
          <div className="modal-header" style={{ paddingTop: 35 }}>
            <div className="pf-d-flex pf-flex-wrap pf-justify-content-between pf-align-items-center">
              <div className="order-1 basis-md-auto basis-80">
                <h4 className="pf-h3 pf-m-0">Start new order</h4>
              </div>
              <div className="order-3 text-right basis-md-auto basis-20" onClick={props.Close}>
                <span className="pf-i pf-i-32 pf-i-close pf-modal__close-icon" />
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div className="order-type-picker">
              {/* <h6 className="pf-mt-0 pf-mb-24">Select type</h6> */}
              <div className="row row-flex row-flex--center">
                <div className="col-md-6">
                  <div className="row no-gutters pf-px-16 pf-border pf-d-flex pf-flex-wrap text-center order-type-picker-panel order-type-picker-panel--basic pf-py-24">
                    <div className="col-12">
                      <img className='img-basic' src="https://www.printful.com/static/images/layout/orders/box.svg?v=2" />
                    </div>
                    <div className="col-12">
                      <h3 className="pf-m-0 pf-h3">Basic order</h3>
                    </div>
                    <div className="col-12 pf-mt-12 ">
                      <span>
                        <span style={{ fontSize: 12 }}>Customize any of our 234 products</span>
                      </span>
                    </div>
                    <div onClick={() => { history.push('/orders/update'); }}>
                      <a
                        href="#"
                        className="pf-mt-24 pf-btn pf-btn-block pf-btn-primary pf-align-self-end"
                      >
                        Create your order
                      </a>
                    </div>
                  </div>
                </div>
                <div className="pf-mt-24 pf-mt-md-0 col-md-6">
                  <div className="row no-gutters pf-px-16 pf-border pf-d-flex pf-flex-wrap text-center order-type-picker-panel order-type-picker-panel--basic pf-py-24">
                    <div className="col-12">
                      <img src="https://www.printful.com/static/images/layout/orders/sample-order-black.svg" className='img-basic' />
                    </div>
                    <div className="col-12">
                      <h3 className="pf-m-0 pf-h4 pf-text-muted">Test your designs</h3>
                    </div>
                    <div className="col-12 pf-mt-12 pf-text-muted">
                      <div>
                        <p style={{ fontSize: 12 }}>
                        Save 20% on 3 sample products of your choice
                        </p>
                        <a href='#'>Learn how to get more</a>
                      </div>
                      <div onClick={() => { history.push('/orders/testorder'); }}>
                      <a
                        href="#"
                        className="pf-mt-24 pf-btn pf-btn-block pf-btn-primary pf-align-self-end"
                      >
                        Create your order
                      </a>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer pf-d-none" />
        </div>
      </div>
    </div>
  );
}
