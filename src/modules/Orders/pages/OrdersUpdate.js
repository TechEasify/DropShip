import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  Modal, Backdrop, Fade } from '@mui/material';
import { Header, SelectTabs, Title, Catalog } from '../../../components';

import './Orders.scss';
import { GetCategories, addProduct } from '../action';
import {makeStyles} from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Update(props) {
  console.log(props, "props OrderUpdate");
  return (
    <div
      className="modal-dialog"
      style={{ minWidth: '70vw', minHeight: '70vh', paddingTop: 50 }}
    >
      <div className="modal-content-wrapper">
        <div className="modal-content">
          <Header Close={props.Close} />
          <div className="modal-body">
            <div>
              <SelectTabs />
              <div>
                <div className="row pf-align-items-center">
                  <div className="col-12 text-left col-sm-6 col-md-9">
                    <h3 className="pf-m-0 pf-h3">Choose product</h3>
                  </div>
                  <div className="col-12 text-left col-sm-12 col-md-6 pf-d-none">
                    <h3 className="pf-m-0 pf-h3">Choose product</h3>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 text-left text-sm-right pf-py-8 pf-py-sm-0 pf-d-none">
                    <span className="styled-select pf-mt-16 pf-mt-md-0">
                      <select className="form-element pf-w-100">
                        <option value="all">All products</option>
                        <option value="in_stock">Products in stock</option>
                      </select>
                    </span>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 text-left text-sm-right">
                    <div className=" order-flow-modal-mobile-2 pf-mt-16 pf-mt-md-0">
                      <Title />
                    </div>
                  </div>
                </div>
              </div>
              <Catalog
                data={props.data}
                handleAddProduct={props.handleAddProduct}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrdersUpdate() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Orders.product);
  console.log(products, "products");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [data, setData] = useState([]);
  const test = {
    name: 'Hello',
    price: 20,
    quantity: 1,
  };
  const handleAddProduct = () => {
    products.push(test);
    dispatch(addProduct(products));
    setOpen(false);
    history.push('/orders/shipping');
  };

  useEffect(() => {
    GetCategories()
      .then((res) => {
        console.log(res, "response");
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    GetCategories()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="container-fluid dashboard__container clearfix">
        <div className="container order-container pf-mb-16 pf-mb-sm-0 pf-p-0 pf-py-sm-32 pf-px-sm-16">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2 offset-xl-3">
              <div id="5eeb818858309">
                <ul className="pf-steps  dashboard__fullwidth">
                  <div className="pf-steps-wrap ">
                    <a href="#" className="pf-steps__item pf-steps__item--done">
                      <div className="pf-steps__item__inner">
                        <span className="pf-steps__item__step">1</span>
                        <span className="pf-steps__item__title">Products</span>
                      </div>
                    </a>
                    <a href="#" className="pf-steps__item ">
                      <div className="pf-steps__item__inner">
                        <span className="pf-steps__item__step">2</span>
                        <span className="pf-steps__item__title">Shipping</span>
                      </div>
                    </a>
                    <a href="#" className="pf-steps__item ">
                      <div className="pf-steps__item__inner">
                        <span className="pf-steps__item__step">3</span>
                        <span className="pf-steps__item__title">
                          Review Order
                        </span>
                      </div>
                    </a>
                  </div>
                  <span className="nav-arrow left hidden">
                    <i className="pf-i pf-i-chevron-left pf-i-24 pf-pt-0" />
                  </span>
                  <span className="nav-arrow right hidden">
                    <i className="pf-i pf-i-chevron-right pf-i-24 pf-pt-0" />
                  </span>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container" id="sample-status-alert">
          <div />
        </div>
        <div className="container order-container ">
          <div className="row">
            <div className="col-12">
              <div id="order-items">
                <div className="order-products">
                  <div />
                  <div />
                  <div className="pf-pb-12 pf-pb-12 hidden-sm hidden-md hidden-lg hidden" />
                  <div className="white-block pf-p-sm-32 pf-pb-12 pf-pb-sm-0 pf-mb-12">
                    <div className="text-center">
                      <h3 className="pf-mt-32 pf-mb-0 pf-px-24 pf-px-sm-0">
                        Click "Add Product" to start your order
                      </h3>
                      <div className="pf-my-32">
                        <span
                          onClick={handleOpen}
                          className="pf-btn pf-btn-primary btn-arrow"
                        >
                          <div className="arrow hidden-xs" />
                          Add product
                        </span>
                        <Modal
                          open={open}
                          className={classes.modal}
                          onClose={handleClose}
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                        >
                          <Fade in={open}>
                            <div
                              tabIndex={-1}
                              aria-labelledby="modal-2-label"
                              aria-hidden="true"
                              role="dialog"
                              id="modal-2"
                              className="modal fade zoom  in"
                              style={{
                                opacity: 1,
                                display: 'block',
                                zIndex: 1050,
                                marginTop: 30,
                                minWidth: '70vw',
                                minHeight: '70vh',
                                transition:
                                  'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                              }}
                            >
                              <Update
                                Close={handleClose}
                                data={data}
                                handleAddProduct={handleAddProduct}
                              />
                            </div>
                          </Fade>
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <div className="white-block pf-px-12 pf-py-24 pf-p-sm-32 pf-mb-12 hidden-sm hidden-md hidden-lg hidden" />
                  <div className="white-block hidden" style={{ height: 160 }} />
                  <div className="white-block pf-p-12 pf-p-sm-32 pf-mb-0 pf-mb-sm-12 hidden" />
                  <div className="white-block pf-p-12 pf-p-sm-32 pf-mb-12 hidden" />
                  <div className="white-block pf-px-12 pf-py-24 pf-p-sm-32 pf-mb-12 hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
