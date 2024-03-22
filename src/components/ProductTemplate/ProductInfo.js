import React from 'react';

export default function ProductInfo({ name }) {
  return (
    <>
      <div>
        <div className="inline-product-picker clearfix pf-mb-16">
          <div>
            <h6 className="inline-product-picker__title pf-p-0 pf-mt-0 margin-bottom-5">
              {name}
            </h6>
            <a
              data-toggle="tooltip"
              data-placement="bottom"
              href="#"
              className="pf-link pf-ui-caption pf-mt-4"
              data-original-title=""
              title=""
            >
              <div className="star-rating__stars star-rating__stars--inline">
                <span className="icon-star star-rating__star" />
                <span className="icon-star star-rating__star" />
                <span className="icon-star star-rating__star" />
                <span className="icon-star star-rating__star" />
                <span className="icon-star-half star-rating__star" />
              </div>
              664 Reviews
            </a>
            <div className="pf-mt-32">
              <a href="#">
                <span className="pf-ui-caption">
                  Product info, pricing &amp; guidelines
                </span>
                <i className="pf-link pf-link-block pf-d-inline-block pf-ml-8 pf-i pf-i-open-in-new" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
