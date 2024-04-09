import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Carousel } from 'react-bootstrap';
import { CirclePicker } from 'react-color';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

import { DialogActions } from '@mui/material';

import { dataURItoBlob } from '../utils';

import { SaveName } from '../action';

export default function CreateStepThree() {
  // return <></>;
  const dispatch = useDispatch();

  const { ProductTemplateFront, ProductTemplateBack } = useSelector(
    (state) => state
  );
  // console.log(ProductTemplateFront);
  console.log(ProductTemplateBack);

  const [sizes, setSizes] = useState([
    { name: 'XS', isChoose: true },
    { name: 'S', isChoose: false },
    { name: 'M', isChoose: false },
    { name: 'L', isChoose: false },
    { name: 'XL', isChoose: false },
    { name: '2XL', isChoose: false },
    { name: '3XL', isChoose: false },
    { name: '4XL', isChoose: false },
  ]);

  const onExportToPngs = () => {
    const zip = new JSZip();
    Object.entries(ProductTemplateFront.designs).forEach(([key, value]) => {
      if (value.design) {
        zip.file(`${key}.png`, dataURItoBlob(value.design));
      }
    });
    zip
      .generateAsync({ type: 'blob' })
      .then((content) => {
        FileSaver.saveAs(content, 'templates.zip');
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="pf-ui-body product-templates-review-step pf-mb-96">
        <div className="row">
          <div className="col-12 col-md-4 text-center">
            {/* <Carousel indicators={false}>
              {Object.values(ProductTemplateFront.designs).map(
                (value, index) => {
                  if (value.preview) {
                    return (
                      <Carousel.Item key={index}>
                        <img
                          className="img-fluid"
                          style={{ width: 400 }}
                          src={value.preview}
                          alt=""
                        />
                      </Carousel.Item>
                    );
                  }
                  return null;
                }
              )}
            </Carousel> */}
          </div>
          <div className="col-12 col-md-8">
            <div className="row">
              <div className="col-12">
                <strong>Product template title</strong>
              </div>
              <div className="col-12">
                <input
                  value={ProductTemplateBack.name}
                  type="text"
                  className="pf-mt-8 product-templates-review-step__title-input"
                  onChange={(e) => dispatch(SaveName(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogActions
        style={{ position: 'sticky', bottom: 0, backgroundColor: 'white' }}
      >
        <div className="dynamic-sticky-footer  pf-p-0 pf-py-md-16">
          <div className="dynamic-sticky-footer__second-wrap">
            <div className="dynamic-sticky-footer__second">
              <div className="container">
                <div>
                  <div className="row no-gutters pf-px-12 pf-px-md-0 pf-pt-8 pf-pt-md-0">
                    <div className="col-12 col-md-auto order-2 order-md-1 pf-d-flex pf-align-items-stretch">
                      <a
                        href="#"
                        className="pf-btn pf-btn-secondary pf-mr-12 pf-w-25 pf-w-md-auto"
                      >
                        Upload
                      </a>
                      <a
                        href="#"
                        className="pf-btn pf-btn-primary pf-w-75 pf-w-md-auto"
                        // onClick={onExportToPngs}
                      >
                        Export to PNGs
                        <span className="pf-i pf-i-loading pf-i-spin pf-i-24 pf-d-none  pf-ml-4" />
                      </a>
                    </div>
                    <div className="col-12 col-md-auto order-3 order-md-2">
                      <div className="pf-text-red pf-bold pf-pb-8 pf-pb-md-0 pf-px-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogActions>
    </>
  );
}
