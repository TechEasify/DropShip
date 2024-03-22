import React from 'react';

export default function Header(props) {
  return (
    <>
      <div className="modal-header order-flow-modal-mobile">
        <div className="pf-d-flex pf-flex-wrap pf-justify-content-between pf-align-items-center">
          <div className="order-1 basis-md-auto basis-80">
            <h4 className="pf-h3 pf-m-0">Add products</h4>
          </div>
          <div className="order-3 text-right basis-md-auto basis-20" onClick={props.Close}>
            <span className="pf-i pf-i-32 pf-i-close pf-modal__close-icon" />
          </div>
        </div>
      </div>
    </>
  );
}
