import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import data from '../assets';

export default function ProductTemplateDetail() {
  const history = useHistory();
  const product = useSelector((state) => state.SelectProduct);
  console.log(product, "product templete Detail");
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="container-fluid dashboard__container clearfix">
        <div
          data-vue-root="3HDAIKCluxzpMPAF"
          data-vue-components='["router-view"]'
        >
          <div className="product-templates">
            <div
              className="product-templates-view-page pf-my-24 pf-ui-body"
              indexfilter="[object Object]"
              style={{ position: 'relative' }}
            >
              <div className="loading-overlay loading-overlay--alt" />
              <div className="product-templates-view-header pf-d-sm-flex pf-align-items-center pf-justify-content-between">
                <div className="product-templates-view-header__breadcrumbs">
                  <ul className="pf-breadcrumbs pf-p-0">
                    <li>
                      <a href="/catalog">Product catalog</a>
                    </li>
                    <li>
                      <span>Essential Oil</span>
                    </li>
                    <span className="nav-arrow left hidden" />
                    <span className="nav-arrow right hidden" />
                  </ul>
                </div>
                <div className="product-templates-view-header__actions pf-my-16 pf-my-sm-8 pf-d-flex">
                  <a className="pf-link-block pf-pointer pf-justify-items-center">
                    <i className="pf-i pf-i-delete pf-i-24 pf-text-gray" />
                    <span className="pf-link">Delete</span>
                  </a>
                </div>
              </div>
              <div className="product-templates-view-page__content">
                <div className="product-templates-view-page__title pf-mb-32">
                  <span className="pf-h2">Essential Oil</span>
                </div>
                <div className="product-templates-view-page__main row">
                  <div className="product-templates-view-page__image col-sm-6 col-md-5 col-lg-4">
                    <div
                      className="product-templates-view-image__container"
                      // style={{
                      //   width: '100%',
                      //   height: 450,
                      //   backgroundRepeat: 'no-repeat',
                      //   backgroundPosition: 'center center',
                      //   backgroundSize: 'cover',
                      //   backgroundImage:
                      //     'url("https://shopifyapp.iihtsrt.com/public/assets/uploads/collection/lavender.-without-logo.png")',
                      // }}
                    >
                      <Slider {...settings}>
                        <div>
                          <img
                            src='https://shopifyapp.iihtsrt.com/public/assets/uploads/collection/lavender.-without-logo.png'
                            alt="Image 1"
                            style={{ height: 'auto', width: '100%', borderRadius: "10px" }}
                          />
                        </div>
                        <div>
                          <img
                            src={data.label}
                            alt="Image 1"
                            style={{ height: 'auto', width: '100%', borderRadius: "10px" }}
                          />
                        </div>
                      </Slider>
                    </div>
                    <div className="product-templates-view-image__actions pf-mt-16">
                      <a
                        className="pf-link-block pf-pointer pf-justify-items-center pf-mr-12"
                        onClick={() => history.push('/template/create')}
                      >
                        <div className="edit-icon">
                          <div className="edit-product">
                            <i className="pf-i pf-i-pencil pf-i-24 pf-text-gray" />
                          </div>
                          <span className="pf-link">
                            Custommise your product
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="product-templates-view-page__details col-sm-6 col-md-7 col-lg-8">
                    <div className="pf-pl-md-16">
                      <div className="product-template-detail-item product-template-detail-item--product pf-mb-24">
                        <div className="pf-h5">Product</div>
                        <div className="pf-text-muted">
                          {product.productData.description !== undefined ? product.productData.description : "Our dummy product prices can change depending on where an order is fulfilled and which currency you use to pay for it. Each product has a fixed price for each location. Our North American products have a fixed USD price, and our products in Europe have a fixed EUR price. Products fulfilled in one location but charged in a different currency have a floating price. For example, let's say you're ordering a t-shirt that we only fulfill in the US and you're paying for it in EUR. The price you pay would be our USD price converted to EUR. The end price would also depend on that month's exchange rate, which is what makes it a floating price. If you're ordering a product that we fulfill in Europe and you're paying for it in EUR, you would pay our fixed EUR price."}
                        </div>
                      </div>
                      <div className="product-template-detail-item product-template-detail-item--price pf-mb-24">
                        <div className="pf-h5">Price</div>
                        <div className="pf-text-muted">
                          {product.productData.cost !== undefined ? product.productData.cost : 100}
                        </div>
                      </div>
                      <div className="product-template-detail-item product-template-detail-item--technique pf-mb-24">
                        <div className="pf-h5">Stock</div>
                        <div className="pf-text-muted">120</div>
                      </div>
                      <div className="product-template-detail-item product-template-detail-item--technique pf-mb-24">
                        <div className="pf-h5">Retail Price</div>
                        <div className="pf-text-muted">
                          {product.productData.retailPrice !== undefined ? product.productData.retailPrice : 150}
                        </div>
                      </div>
                      <div className="product-template-detail-item product-template-detail-item--print-files pf-mb-24">
                        <div className="pf-h5">Shipping Price</div>
                        <span className="product-template-placements-output">
                          <span className="product-template-placements-output__main pf-font-size-none">
                            <a
                              className="pf-ui-body pf-text-muted pf-pointer"
                              data-original-title=""
                              title=""
                            >
                              {product.productData.shipping !== undefined ? product.productData.shipping : 50}
                            </a>
                          </span>
                          <span className="product-template-placements-output__templates pf-d-none">
                            <div id="placement-popover-2-4924698-front">
                              <div className="pf-text-dark">
                                <div className="pf-bold pf-mb-8">$5</div>
                              </div>
                            </div>
                          </span>
                        </span>
                      </div>
                      <div className="product-template-details__actions">
                        <a
                          className="pf-btn pf-btn-primary pf-d-block pf-d-sm-inline-block pf-mb-12 pf-mr-sm-8 disabled"
                          data-original-title=""
                          title=""
                        >
                          Push to shopify store
                        </a>
                        <a className="pf-btn pf-btn-secondary pf-d-block pf-d-sm-inline-block">
                          Get your label design
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-templates-modals" />
          </div>
        </div>
      </div>
    </>
  );
}
