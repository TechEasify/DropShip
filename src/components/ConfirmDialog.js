import React from 'react';

export default function ConfirmDialog(props) {
  const {
    title1,
    title2,
    action,
    handleOnclickConfirm,
    handleOnclickCancel,
    id,
  } = props;

  return (
    <>
      <div class="modal-content-wrapper">
        <div class="modal-content">
          <div class="modal-header">
            <div class="pf-d-flex pf-flex-wrap pf-justify-content-between pf-align-items-center">
              <div class="order-1 basis-md-auto basis-80">
                <h4 class="pf-h3 pf-m-0">Are you sure?</h4>
              </div>
              <div class="order-3 text-right basis-md-auto basis-20">
                <span
                  class="pf-i pf-i-32 pf-i-close pf-modal__close-icon"
                  onClick={handleOnclickCancel}
                ></span>
              </div>
            </div>
          </div>
          <div class="modal-body">
            <div>
              <p class="pf-m-0 pf-text-muted pf-ui-subheading">{title1}</p>
              <p class="pf-m-0 pf-text-muted pf-ui-subheading">{title2}</p>
            </div>
          </div>
          <div class="modal-footer">
            <div class="text-left">
              <a
                href="#"
                class="pf-btn pf-btn-primary pf-mr-12"
                onClick={() => handleOnclickConfirm(id)}
              >
                {action}
              </a>
              <a
                href="#"
                class="pf-btn pf-btn-secondary"
                onClick={handleOnclickCancel}
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
