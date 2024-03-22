import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import ConfirmDelImg from './ConfirmDelete';

export default function PreviewImg(props) {
  const { name, src, size, createdAt, id, previewModal } = props;
  const [showModal, setModal] = useState(false);

  const handleShowModal = () => {
    setModal(!showModal);
  };

  return (
    <>
      <div className="modal-body" id="libraryPreviewModal">
        <div className="row library-preview__content">
          <div className="col-md-4 order-2 library-preview__detail-row">
            <div className="pf-p-12">
              <div className="row">
                <div className="col-md-12 text-right">
                  <button
                    data-dismiss="modal"
                    className="close pf-m-0"
                    style={{ height: '60px' }}
                  >
                    <i
                      className="pf-i pf-i-close pf-i-36"
                      onClick={previewModal}
                    ></i>
                    <i className="sr-only">Close</i>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h4 className="word-wrap-break pf-w-75">
                    <div className="file-name">
                      <div>{name}</div>
                    </div>
                  </h4>
                  <p className="pf-text-muted pf-m-0 pf-mb-4">{size}</p>
                  <p className="pf-text-muted pf-m-0 pf-mb-24">{createdAt}</p>
                  <p className="pf-text-red"></p>
                  <div></div>
                  <div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-4 pf-mb-12 col-md-9 pf-pr-sm-4 pf-pr-md-12">
                        <a
                          href={src}
                          className="pf-btn pf-btn-secondary pf-w-100"
                        >
                          Download file
                        </a>
                      </div>
                      <div className="col-xs-12 col-sm-4 pf-mb-12 col-md-9 pf-pr-sm-4 pf-pr-md-12">
                        <a
                          target="_blank"
                          href={src}
                          className="pf-btn pf-btn-secondary pf-w-100"
                        >
                          View full size
                        </a>
                      </div>
                      <div className="col-xs-12 col-sm-4 col-md-9 pf-pr-md-12">
                        <a
                          href="#"
                          className="pf-btn pf-btn-secondary pf-w-100"
                          onClick={handleShowModal}
                        >
                          Delete file
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 order-1 library-preview__image-row clearfix">
            <div className="row library-preview__image-wrapper pf-mx-0 pf-align-items-center">
              <div className="row library-preview__image pf-mx-0 pf-p-16 pf-py-xs-32 text-center">
                <div className="col-12 col-xs-10 pf-px-4 preview-image__wrap pf-my-auto">
                  <img
                    className="preview-image pf-px-0 pf-px-xs-16"
                    style={{ left: '60%' }}
                    src={src}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={showModal}
        onClose={() => handleShowModal()}
        fullWidth
        maxWidth="sm"
      >
        <ConfirmDelImg id={id} cancelDelImgModal={handleShowModal} />
      </Dialog>
    </>
  );
}
