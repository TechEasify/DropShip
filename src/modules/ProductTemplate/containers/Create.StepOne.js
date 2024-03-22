import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Category } from '@components/index';
import { GetCategories } from '../action';
const useQuery = () => new URLSearchParams(useLocation().search);

const TestComponent = ({ type }) => {
  const history = useHistory();
  return (
    <>
      <div className="col-6 col-md-4 col-xl-3 pf-mb-0 pf-mb-md-8 pf-mb-lg-16">
        <a
          role="button"
          draggable="false"
          className="product-item pf-mb-16 pf-mb-md-24 pf-mb-lg-32"
          onClick={() =>
            history.push(`/template/create?step=2&type=oil&design=front`)
          }
        >
          <div className="square-box">
            <div className="square-content">
              <img
                src="https://shopifyapp.iihtsrt.com/public/assets/uploads/collection/lavender.-without-logo.png"
                loading="lazy"
                alt="Essential Oil 10ml"
                style={{ width: '100%' }}
                width="254"
              />
              <span className="product-item__empty-content">
                <span className="pf-badge pf-badge-rect pf-badge--primary">
                  bestseller
                </span>
              </span>
            </div>
          </div>
          <div className="pf-p-12">
            <div className="product-item__detail pf-mb-12 pf-ui-body">
              Essential Oil 10ml
            </div>
            <div className="product-item__rating pf-ui-caption">
              <div className="star-rating__stars star-rating__stars--inline">
                <span className="icon-star star-rating__star" />
                <span className="icon-star star-rating__star" />
                <span className="icon-star star-rating__star" />
                <span className="icon-star star-rating__star" />
                <span className="icon-star-half star-rating__star" />
              </div>
              <span className="pf-m-0 pf-mt-4 pf-d-inline-block">
                462 reviews
              </span>
            </div>
            <div className="product-item__detail__price pf-my-12">
              <span className="discount-container pf-bold">
                <span>Starting from </span>
                <span className="current-price"> $7.95</span>
              </span>
            </div>
            <div className="swatches detail pf-m-0 pf-mb-12">
              <span className="swatches__item" title="Black #14191E">
                <span style={{ backgroundColor: 'rgb(20, 25, 30)' }} />
              </span>
              <span className="swatches__item" title="Navy #191C25">
                <span style={{ backgroundColor: 'rgb(25, 28, 37)' }} />
              </span>
              <span className="swatches__item" title="Dark Heather #37363B">
                <span style={{ backgroundColor: 'rgb(55, 54, 59)' }} />
              </span>
              <span className="swatches__item" title="Sport Grey #9B969C">
                <span style={{ backgroundColor: 'rgb(155, 150, 156)' }} />
              </span>
              <span className="swatches__item" title="White #F1F0F5">
                <span style={{ backgroundColor: 'rgb(241, 240, 245)' }} />
              </span>
            </div>
            <div className="product-item__sizes pf-pb-8 pf-text-muted pf-ui-caption pf-bold">
              S - 3XL
            </div>
            <span
              data-toggle="tooltip"
              title=""
              className="fulfillmentLabelContainer"
              data-original-title="Ships worldwide, stocked in the USA, Europe"
            >
              <span className="pf-badge pf-badge-location pf-badge--usa pf-mr-4">
                USA
              </span>
              <span className="pf-badge pf-badge-location pf-badge--eu pf-mr-4">
                EU
              </span>
            </span>
            <span
              data-toggle="tooltip"
              title=""
              className="product-item__label product-item__label--branding"
              data-original-title="Tear-away label"
            >
              <i className="pf-i pf-i-tag pf-i-18" />
            </span>
          </div>
        </a>
      </div>
    </>
  );
};

export default function CreateStepOne() {
  const history = useHistory();
  const query = useQuery();

  const [overview, setOverview] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categories.length > 0) {
      const initOverview = categories.map((category) => (
        <div
          className="col-xl-4 col-md-6 col-12 catalog__category pf-mb-16 pf-mb-md-24 pf-mb-lg-32"
          key={category.id}
        >
          <div
            className="catalog__category__inner ss"
            onClick={() =>
              history.push(`/template/create?step=2&type=oil&design=front`)
            }
          >
            <img
              src="https://shopifyapp.iihtsrt.com/public/assets/uploads/collection/lavender.-without-logo.png"
              className="catalog__category__thumbnail"
              alt=""
            />
            <h3 className="pf-h5 pf-p-12 pf-m-0 pf-py-0">{category.name}</h3>
          </div>
          {/* <div className="catalog__category__inner" onClick={() => history.push(`/template/create?step=1&name=${category.alias}`)}>
            <img src="https://shopifyapp.iihtsrt.com/public/assets/uploads/collection/lavender.-without-logo.png" className="catalog__category__thumbnail" alt="" />
            <h3 className="pf-h5 pf-p-12 pf-m-0 pf-py-0">{category.name}</h3>
          </div> */}
        </div>
      ));
      setOverview(initOverview);
    }
  }, [history, categories]);

  useEffect(() => {
    if (categories.length === 0) {
      setCategories([{ name: 'Test', id: 1, children: [] }]);
      // GetCategories()
      //   .then((resCategories) => {
      //     setCategories(resCategories.data);
      //   })
      //   .catch((err) => { console.error(err); });
    }
  }, [categories]);

  const onChooseCategory = (id) => {
    setOverview(
      [1, 2, 3, 4].map((item) => <TestComponent key={item} type="oil" />)
    );
  };

  const CategoryComponents = categories.map((category) => {
    if (query.get('name') === category.alias) {
      return (
        <Category
          name={category.name}
          kids={category.children}
          key={category.id}
          isExpand
          onChooseCategory={onChooseCategory}
        />
      );
    }

    return (
      <Category
        name={category.name}
        kids={category.children}
        key={category.id}
        onChooseCategory={onChooseCategory}
      />
    );
  });

  return (
    <>
    <div className='stepone-main'>
      {/* <div className="row pf-mr-8">
        <div className="col-md-9 pf-md-mb-0 pf-mb-16">
          <div className="col-12 text-left col-sm-6 col-md-9">
            <h3 className="pf-m-0 pf-h3">Choose product</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div>
            <span
              className="twitter-typeahead"
              style={{ position: 'relative', display: 'inline-block' }}
            >
              <input
                type="search"
                className="tt-hint"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  borderColor: 'transparent',
                  boxShadow: 'none',
                  opacity: 1,
                }}
              />
              <input
                placeholder="Search products..."
                type="search"
                className="tt-input"
                autoComplete="off"
                spellCheck="false"
                dir="auto"
                style={{
                  position: 'relative',
                  verticalAlign: 'top',
                  backgroundColor: 'transparent',
                }}
              />
              <pre
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  visibility: 'hidden',
                  whiteSpace: 'pre',
                }}
              />
              <div
                className="tt-menu"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: '100%',
                  zIndex: 6,
                  display: 'none',
                }}
              >
                <div className="tt-dataset tt-dataset-products" />
              </div>
            </span>
          </div>
        </div>
      </div>       */}
    </div>

      {/* <div>
        <div className="container-fluid">
          <div className="catalog__header" />
          <div>
            <div className="row">
              <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3 hidden-xs catalog__sidebar-floating">
                <div className="catalog__sidebar-content">
                  <ul className="catalog__sidebar-menu catalog__sidebar-menu--top-level hidden-xs">
                    <div className="catalog__sidebar-menu__current-item" />
                  </ul>
                </div>
              </div>
              <div className="col-xs-12 col-sm-8 col-md-9 col-lg-9 col-xl-9">
                <div className="catalog clearfix">
                  <div className="row row-flex pf-mt-16">{overview}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
