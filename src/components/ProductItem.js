import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Productview from './Productview';

export default function ProductItem() {
  const history = useHistory();
  const [detail, setDetail] = useState(false);
  const [orderbox, setOrderbox] = useState(false);

  const handleClickOpen = () => {
    setDetail(true);
  }

  return (
    <>

      <div className="product-templates-item product-templates-item--normal product-templates-grid-item col-6 col-xs-4 col-sm-4 col-md-4 col-lg-3">
        <div className="product-templates-item__inner pf-mb-24 pf-border">
          <label className="product-templates-grid-item__checkbox pf-p-8"><input type="checkbox" className="pf-ui-body" /></label>
          <div>
            <div className="thumbnail-node">
              <div
                className="product-templates-list-item__thumbnail"
                style={{
                  height: 198, backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundImage: 'url("https://shopifyapp.iihtsrt.com/public/assets/uploads/product_images/Screenshot%202023-04-15%20171418_7.png")',
                }}
              />
              <div className="overlay"><div><a className="btn btn-default choose" onClick={() => history.push("/template/view")}>View</a></div></div>
            </div>
            <div className="pf-mx-24 pf-mt-12">
              <div className="product-templates-item__title pf-h5 pf-mb-4">
                Essential Oil
              </div>
              <div className="product-templates-item__colors">
                <span title="White" className="pf-d-inline-block pf-mr-2 rounded-color-swatch" style={{ backgroundColor: 'rgb(229, 230, 225)' }} />
                <span title="Red" className="pf-d-inline-block pf-mr-2 rounded-color-swatch" style={{ backgroundColor: 'background-color: rgb(208, 15, 60)' }} />
              </div>
            </div>
            <div className="pf-mx-24">
              <div>
                <div className="pf-ui-caption">
                  <span className="pf-text-muted">Stock:</span>

                  <span>120</span>
                </div>
                <div className="pf-ui-caption">
                  <span className="pf-text-muted">Order Price:</span>

                  <span className="product-template-placements-output">
                    <span className="product-template-placements-output__main pf-font-size-none">
                      <a className="pf-text-dark pf-pointer pf-ui-caption" data-original-title="" title="">$120</a>

                    </span>

                    <span className="product-template-placements-output__templates pf-d-none">
                      <div id="placement-popover-1-4218970-front">
                        <div className="pf-text-dark">
                          <div className="pf-bold pf-mb-8">Front print</div>

                          <div style={{
                            width: 72, minWidth: 72, height: 72, backgroundSize: '32px 32px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundImage: 'url("")',
                          }}
                          />
                        </div>
                      </div>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
