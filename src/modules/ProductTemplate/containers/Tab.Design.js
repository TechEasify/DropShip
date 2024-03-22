import React from 'react';

import AddImage from './AddImage';
import AddText from './AddText';

export default function TabDesign({
  onChooseImage,
  visible,
  onSaveTextObject,
  canvas,
}) {
  return (
    <>
      <div style={{ display: visible }}>
        <div>
          <div>
            <div className="pf-mb-24">
              <div>
                <div className="layer-picker__item__guideline-info" />
                <div>
                  <div>
                    <div>
                      <div className="row row-flex row-flex--center no-gutters">
                        <AddImage onChooseImage={onChooseImage} />
                        <AddText
                          onSaveTextObject={onSaveTextObject}
                          canvas={canvas}
                        />
                        {/* <div className="col-6 pf-py-4 pf-pr-8">
                          <div data-title="" data-toggle="" data-placement="top" data-html="true" className="layer-picker__type  pf-p-8 text-center pf-border">
                            <i className="pf-i pf-i-emoticon-happy-outline pf-i-24 pf-text-gray" />
                            <h6 className="pf-h6 pf-my-4">Add clipart</h6>
                            <p className="pf-m-0 pf-text-muted pf-ui-caption ">Use our clipart</p>
                          </div>
                        </div>
                        <div className="col-6 pf-py-4 ">
                          <div data-title="" data-toggle="" data-placement="top" data-html="true" className="layer-picker__type  pf-p-8 text-center pf-border">
                            <i className="pf-i pf-i-arrange-bring-to-front pf-i-24 pf-text-gray" />
                            <span className="pf-ml-4 pf-badge pf-badge-small pf-badge--primary pf-position-absolute" style={{ lineHeight: 14 }}>New</span>
                            <h6 className="pf-h6 pf-my-4">Add quick design</h6>
                            <p className="pf-m-0 pf-text-muted pf-ui-caption ">Edit our pre-made designs</p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
                <div className="pf-position-relative pf-d-none">
                  <h6 className="pf-border-top pf-h6 pf-mt-24 pf-mb-12 pf-pt-12">
                    Layers
                  </h6>
                </div>
                <div />
                <div className="nested-sortable" />
                <div className="alert alert-danger text-center hidden pf-p-12 pf-mt-16">
                  Please add a design!
                </div>
                <div className="layer-picker__item__options-picker pf-mt-16" />
              </div>
            </div>
            <div className="pf-mb-24 pf-px-8 product-push__design-fill-color-picker" />
            <div />
          </div>
        </div>
      </div>
    </>
  );
}
