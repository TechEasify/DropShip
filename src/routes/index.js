import React, { useState, useEffect } from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  Box,

} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Template,
  CreateProductTemplate,
  ProductTemplateDetail,
} from '../modules/ProductTemplate/pages';

import { Register, Login, ForgotPwd } from '../modules/Authentication/pages';

import {
  User,
  Currency,
  Language,
  Notification,
  Footer,
  Catalog,
} from '../components/index';

import { Dashboard } from '../modules/Dashboard/pages';
import { UploadFile } from '../modules/FileLibrary/pages';
import {
  Orders,
  OrdersUpdate,
  OrdersShipping,
  OrdersReview,
} from '../modules/Orders/pages';
import { Payments, Methods, Legal, AddMethods } from '../modules/Billing/pages';
import { MyAccount, Notifications } from '../modules/Settings/pages';
import { Default, Connect } from '../modules/Store/pages';
import { RenderRoutes, isLoggedIn } from './helper';
import { localStorageConstant } from '../constant';
import Memberships from '../components/Memberships/Memberships';
import Wallet from '../modules/Billing/pages/Wallet';
import Productview from '../components/Productview';
import Warehouse from '../components/Warehouse/Warehouse';
import Venders from '../components/Venders/Venders';
import VenderDetail from '../components/Venders/VenderDetail';
import ManageableProduct from '../components/ManageableProduct/Products';
import EditableProduct from '../components/ManageableProduct/Category';
import Category from '../components/ManageableProduct/Category';
import Products from '../components/ManageableProduct/Products';
import Editproduct from '../components/ManageableProduct/Editproduct';
import Editdesign from '../components/ManageableProduct/Editdesign';
import ManageMembership from '../components/ManageMemberships/ManageMembership';
import ManageTiers from '../components/ManageTiers/ManageTiers';
import ManageDigitalService from '../components/ManageDigitalService/ManageDigitalService';
import AdminDegitalService from '../components/AdminDegitalService/AdminDegitalService';
import ViewDigitalService from '../components/ViewDegitalService/ViewDigitalService';
import SettingDigitalService from '../components/ViewDegitalService/SettingDigitalService';
import TestOrder from '../modules/Orders/pages/TestOrder';
import TestMultiShipping from '../modules/Orders/pages/TestMultiShipping';


import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { TextField } from '@shopify/polaris';
import {
  SearchIcon
} from '@shopify/polaris-icons';

const drawerWidth = 230;

const nav = [
  {
    text: 'My dropshippy',
    icon: 'pf-i pf-i-24 pf-i-chart-pie',
    isTree: false,
    treeItem: [],
    link: '',
  },
  {
    text: 'Product catalog',
    icon: 'pf-i pf-i-24 pf-i-cloud-upload',
    isTree: false,
    treeItem: [],
    link: '/catalog',
  },
  {
    text: 'Orders',
    icon: 'pf-i pf-i-24 pf-i-format-list-bulleted',
    isTree: false,
    treeItem: [],
    link: '/orders',
  },
  {
    text: 'Selected Product',
    icon: 'pf-i pf-i-24 pf-i-drawing-box',
    isTree: false,
    treeItem: [],
    link: '/template',
  },
  // {
  //   text: 'Warehouse',
  //   icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-package-variant-closed pf-text-gray-400',
  //   isTree: false,
  //   treeItem: [],
  //   link: '/warehouse',
  // },
  {
    text: 'Venders',
    icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-package-variant-closed pf-text-gray-400',
    isTree: false,
    treeItem: [],
    link: '/venders',
  },
  {
    text: 'File library',
    icon: 'pf-i pf-i-24 pf-i-folder-multiple-image',
    isTree: false,
    treeItem: [],
    link: '/library',
  },
  {
    text: 'Manage Products',
    icon: 'pf-i pf-i-24 pf-i-credit-card-outline',
    isTree: true,
    treeItem: [
      {
        text: 'Products',
        link: '/manageable/products',
      },
      {
        text: 'Category',
        link: '/manageable/category',
      },
    ],
    link: '/manageable',
  },
  {
    text: 'Stores',
    icon: 'pf-i pf-i-24 pf-i-store',
    isTree: false,
    treeItem: [],
    link: '/store',
  },
  {
    text: 'Memberships',
    icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-cards pf-text-red-700',
    isTree: false,
    treeItem: [],
    link: '/memberships',
  },
  // {
  //   text: 'Manage Memberships',
  //   icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-cards pf-text-red-700',
  //   isTree: false,
  //   treeItem: [],
  //   link: '/managememberships',
  // },
  // {
  //   text: 'Manage Tiers',
  //   icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-cards pf-text-red-700',
  //   isTree: false,
  //   treeItem: [],
  //   link: '/managetiers',
  // },
  // {
  //   text: 'Manage Digital Service',
  //   icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-cards pf-text-red-700',
  //   isTree: false,
  //   treeItem: [],
  //   link: '/managedigitalservice',
  // },
  // {
  //   text: 'Admin Digital Service',
  //   icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-cards pf-text-red-700',
  //   isTree: false,
  //   treeItem: [],
  //   link: '/admindigitalservice',
  // },
  {
    text: 'View Digital Service',
    icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-cards pf-text-red-700',
    isTree: false,
    treeItem: [],
    link: '/viewdigitalservice',
  },
  {
    text: 'Billing',
    icon: 'pf-i pf-i-24 pf-i-credit-card-outline',
    isTree: true,
    treeItem: [
      {
        text: 'Payments',
        link: '/billing/payments',
      },
      {
        text: 'Billing methods',
        link: '/billing/methods',
      },
      {
        text: 'Wallet',
        link: '/billing/wallet',
      },
      {
        text: 'Legal Info',
        link: '/billing/legal-info',
      },
    ],
    link: '/billing',
  },
  {
    text: 'Settings',
    icon: 'pf-i pf-i-24 pf-i-settings',
    isTree: true,
    treeItem: [
      {
        text: 'My account',
        link: '/settings/my-account',
      },
      {
        text: 'Notifications',
        link: '/settings/notifications',
      },
    ],
    link: '/settings',
  },
  {
    text: 'Help',
    icon: 'pf-i pf-i-24 pf-i-help-circle',
    isTree: false,
    treeItem: [],
    link: '',
  },
];

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& .MuiPaper-elevation4': {
      boxShadow: '2px 3px 5px 1px #e5e5e5',
    },
    '& .MuiDrawer-paper': {
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
    maxWidth: '100vw',
  },

  drawerPaper: {
    width: drawerWidth,
  },

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  // toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "rgba(241, 241, 241, 1)",
  },
}));

const Layout = ({ children, window }) => {
  const classes = useStyle();
  const location = useLocation();
  const prefix = location.pathname.split('/')[1];
  const path = location.pathname.split('/')[2];
  const [expandBill, setExpandBill] = useState(false);
  const [expandSetting, setExpandSetting] = useState(false);
  const [expandproduct, setExpandProduct] = useState(false);

  const [state, setState] = useState({
    left: false,
  });
  const [value, setValue] = useState('');

  const handleChange = () => {
    setValue(newValue)
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
  
    const isKeepOpenItem =
      event.target.innerText === 'Manage Products' ||
      event.target.innerText === 'Settings' ||
      event.target.innerText === 'Billing';

    console.log(isKeepOpenItem, "isKeepOpenItem")
  
    if (!isKeepOpenItem) {
      setState({ ...state, [anchor]: open });
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        id="dashboard-sidebar"
        className="dashboard__sidebar"
      >
        <ul
          className="pf-m-0 pf-px-0 pf-py-8"
          id="sidebar-ul"
        >
          {nav.map((item) => (
            <div key={item.text}>
              {item.text !== 'Billing' && item.text !== 'Manage Products' && item.text !== 'Settings' && (
                <li className="panel" key={item.text}>
                  <Link
                    className={clsx(
                      'pf-link-block pf-px-24 pf-py-8',
                      item.link === `/${prefix}` ? 'active' : ''
                    )}
                    style={{ cursor: 'pointer' }}
                    to={item.link}
                  >
                    <span className={item.icon}/>
                    <span className="pf-ml-8">{item.text}</span>
                  </Link>
                </li>
              )}

              {item.text === 'Billing' && (
                <>
                  <li className="panel" key={item.text}>
                    <a
                      className={clsx(
                        'pf-link-block pf-px-24 pf-py-8',
                        item.link === `/${prefix}` ? 'active' : ''
                      )}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setExpandBill(!expandBill)}
                    >
                      <span className={item.icon} />
                      <span className="pf-ml-8">{item.text}</span>
                      <div>
                        {!expandBill ? (
                          <span
                            className="float-right pf-px-24 pf-py-8 collapsed"
                            role="button"
                            data-toggle="collapse"
                            data-parent="#sidebar-ul"
                            data-target="#sidebar-ul-5"
                            aria-expanded="false"
                          >
                            <i className="pf-i pf-i-18 pf-i-chevron-up" />
                          </span>
                        ) : (
                          <span
                            className="float-right pf-px-24 pf-py-8"
                            role="button"
                            data-toggle="collapse"
                            data-parent="#sidebar-ul"
                            data-target="#sidebar-ul-5"
                            aria-expanded="true"
                          >
                            <i className="pf-i pf-i-18 pf-i-chevron-up" />
                          </span>
                        )}
                      </div>
                    </a>
                  </li>
                  <ul
                    className={`pf-pl-24 pf-bg-white collapse ${expandBill && 'in'
                      }`}
                    id="sidebar-ul-9"
                  >
                    {item.treeItem.map((treeItem) => (
                      <li key={treeItem.text}>
                        <Link
                          className={`pf-link-block pf-px-24 pf-py-8 ${treeItem.link === `/${prefix}/${path}` ? 'active' : ''
                            }`}
                          to={treeItem.link}
                          style={{ cursor: 'pointer' }}
                        >
                          <span>{treeItem.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {item.text === 'Manage Products' && (
                <>
                  <li className="panel" key={item.text}>
                    <a
                      className={clsx(
                        'pf-link-block pf-px-24 pf-py-8',
                        item.link === `/${prefix}` ? 'active' : ''
                      )}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setExpandProduct(!expandproduct)}
                    >
                      <span className={item.icon}/>
                      <span className="pf-ml-8">{item.text}</span>
                      <div>
                        {!expandproduct ? (
                          <span
                            className="float-right pf-px-24 pf-py-8 collapsed"
                            role="button"
                            data-toggle="collapse"
                            data-parent="#sidebar-ul"
                            data-target="#sidebar-ul-5"
                            aria-expanded="false"
                          >
                            <i className="pf-i pf-i-18 pf-i-chevron-up" />
                          </span>
                        ) : (
                          <span
                            className="float-right pf-px-24 pf-py-8"
                            role="button"
                            data-toggle="collapse"
                            data-parent="#sidebar-ul"
                            data-target="#sidebar-ul-5"
                            aria-expanded="true"
                          >
                            <i className="pf-i pf-i-18 pf-i-chevron-up" />
                          </span>
                        )}
                      </div>
                    </a>
                  </li>
                  <ul
                    className={`pf-pl-24 pf-bg-white collapse ${expandproduct && 'in'
                      }`}
                    id="sidebar-ul-9"
                  >
                    {item.treeItem.map((treeItem) => (
                      <li key={treeItem.text}>
                        <Link
                          className={`pf-link-block pf-px-24 pf-py-8 ${treeItem.link === `/${prefix}/${path}` ? 'active' : ''
                            }`}
                          to={treeItem.link}
                          style={{ cursor: 'pointer' }}
                        >
                          <span>{treeItem.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {item.text === 'Settings' && (
                <>
                  <li className="panel" key={item.text}>
                    <a
                      className={clsx(
                        'pf-link-block pf-px-24 pf-py-8',
                        item.link === `/${prefix}` ? 'active' : ''
                      )}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setExpandSetting(!expandSetting)}
                    >
                      <span className={item.icon} style={{ paddingRight: 5 }} />
                      <span className="pf-ml-8">{item.text}</span>
                      <div>
                        {!expandSetting ? (
                          <span
                            className="float-right pf-px-24 pf-py-8 collapsed"
                            role="button"
                            data-toggle="collapse"
                            data-parent="#sidebar-ul"
                            data-target="#sidebar-ul-5"
                            aria-expanded="false"
                          >
                            <i className="pf-i pf-i-18 pf-i-chevron-up" />
                          </span>
                        ) : (
                          <span
                            className="float-right pf-px-24 pf-py-8"
                            role="button"
                            data-toggle="collapse"
                            data-parent="#sidebar-ul"
                            data-target="#sidebar-ul-5"
                            aria-expanded="true"
                          >
                            <i className="pf-i pf-i-18 pf-i-chevron-up" />
                          </span>
                        )}
                      </div>
                    </a>
                  </li>
                  <ul
                    className={`pf-pl-24 pf-bg-white collapse ${expandSetting && 'in'
                      }`}
                    id="sidebar-ul-9"
                  >
                    {item.treeItem.map((treeItem) => (
                      <li key={treeItem.text}>
                        <Link
                          className={`pf-link-block pf-px-24 pf-py-8 ${treeItem.link === `/${prefix}/${path}` ? 'active' : ''
                            }`}
                          to={treeItem.link}
                          style={{ cursor: 'pointer' }}
                        >
                          <span>{treeItem.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </ul>
      </div>
      <Divider />
    </Box>
  );

  useEffect(() => {
    setExpandBill(prefix === 'billing');
    setExpandSetting(prefix === 'settings');
    setExpandProduct(prefix === 'manageable')
  }, [prefix]);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appBar}>
          <Toolbar>
            <div
              id="dashboard-header"
              className="dashboard__header pf-bg-white pf-ui-body"
            >
              <div className="dashboard__menu">
                  <div className="row">
                    <div className='headerbar'>
                      <div className='drawer-icon'>
                        {['left'].map((anchor) => (
                          <React.Fragment key={anchor}>
                            <IconButton
                              color="black"
                              aria-label="open drawer"
                              edge="start"
                              onClick={toggleDrawer(anchor, true)}
                            >
                              <MenuIcon>
                                {anchor}
                              </MenuIcon>
                            </IconButton>
                            <Drawer
                              anchor={anchor}
                              open={state[anchor]}
                              onClose={toggleDrawer(anchor, false)}
                            >
                              {list(anchor)}
                            </Drawer>
                          </React.Fragment>
                        ))}
                      </div>
                      <div className='search-bar'>
                        <TextField
                          value={value}
                          onChange={handleChange}
                          autoComplete="off"
                          placeholder="Search"
                        />
                      </div>
                      <div className="other-icon">
                        <ul
                          id="userbar"
                          className="pf-p-0 pf-m-0 pf-d-inline-block"
                        >
                          <Language />
                          <Currency />
                          <Notification />
                          <User />

                          {/* <li className="pf-d-inline-block">
                          <Link
                            className="pf-btn pf-btn-primary pf-ml-24 pf-mr-8 pf-mt-12"
                            id="dashboard-new-order"
                            to="/orders"
                          >
                            New order{' '}
                          </Link>
                        </li> */}
                        </ul>
                      </div>
                    </div>
                    {/* <div
                        id="sitewide-search-225d772b"
                        className="sitewide-search__user-bar pf-mt-12"
                      >
                        <div
                          id="sitewide-search"
                          className="pf-w-100 pf-py-8 pf-py-sm-12 pf-py-md-0"
                        >
                          <div className=" sitewide-search--closed">
                            <span className="pf-i pf-i-24 pf-i-magnify pf-position-absolute pf-mx-12 pf-my-8" />
                            <input
                              placeholder="Search products, services, articles, and more"
                              type="search"
                              id="sitewide-search-input"
                              name="sitewide-search-input"
                              autoComplete="off"
                              className=" pf-px-48"
                            />
                            <input
                              style={{
                                opacity: 0,
                                position: 'absolute',
                                left: 0,
                                zIndex: -1,
                              }}
                            />
                            <div className="pf-i pf-i-24 pf-i-close pf-position-absolute pf-px-12 pf-py-8" />
                          </div>
                        </div>
                      </div> */}
                  </div>
                </div>
              </div>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
          <div>
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
};

const ROUTES = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: () => {
      const userLogInSuccess = isLoggedIn();
      return userLogInSuccess ? (
        <Layout>
          <Dashboard />
        </Layout>
      ) : (
        <Login />
      );
    },
  },
  {
    path: '/auth',
    key: 'AUTH',
    component: RenderRoutes,
    routes: [
      {
        path: '/auth',
        key: 'AUTH_ROOT',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? <Redirect to="/" /> : <Login />;
        },
      },
      {
        path: '/auth/login',
        key: 'AUTH_ROOT',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? <Redirect to="/" /> : <Login />;
        },
      },
      {
        path: '/auth/register',
        key: 'AUTH_REGISTER',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? <Redirect to="/" /> : <Register />;
        },
      },
      {
        path: '/auth/forgot',
        key: 'AUTH_RESETPWD',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? <Redirect to="/" /> : <ForgotPwd />;
        },
      },
      {
        path: '/auth/logout',
        key: 'AUTH_LOGOUT',
        exact: true,
        component: () => {
          const removeItem = Object.values(localStorageConstant);
          removeItem.forEach((item) => localStorage.removeItem(item));

          return <Login />;
        },
      },
    ],
  },
  {
    path: '/template',
    key: 'TEMPLATE',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
    },
    routes: [
      {
        path: '/template',
        key: 'TEMPLATE_ROOT',
        exact: true,
        component: () => (
          <Layout>
            <Template />
          </Layout>
        ),
      },
      {
        path: '/template/create',
        key: 'TEMPLATE_CREATE',
        exact: true,
        component: () => (
          <CreateProductTemplate />
        ),
      },
      {
        path: '/template/1',
        key: 'TEMPLATE_DETAIL',
        exact: true,
        component: () => (
          <Layout>
            <ProductTemplateDetail />
          </Layout>
        ),
      },
      {
        path: '/template/view',
        key: 'TEMPLATE_DETAIL',
        exact: true,
        component: () => (
          <Productview />
        ),
      },
    ],
  },
  {
    path: '/library',
    key: 'LIBRARY',
    component: RenderRoutes,
    routes: [
      {
        path: '/library',
        key: 'LIBRARY_ROOT',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? (
            <Layout>
              <UploadFile />
            </Layout>
          ) : (
            <Login />
          );
        },
      },
    ],
  },
  {
    path: '/catalog',
    key: 'CATALOG',
    component: RenderRoutes,
    routes: [
      {
        path: '/catalog',
        key: 'CATALOG_ROOT',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? (
            <Layout>
              <Catalog />
            </Layout>
          ) : (
            <Login />
          );
        },
      },
    ],
  },
  // {
  //   path: '/warehouse',
  //   key: 'WAREHOUSE',
  //   component: RenderRoutes,
  //   routes: [
  //     {
  //       path: '/warehouse',
  //       key: 'WAREHOUSE_ROOT',
  //       exact: true,
  //       component: () => {
  //         const userLogInSuccess = isLoggedIn();
  //         return userLogInSuccess ? (
  //           <Layout>
  //             <Warehouse />
  //           </Layout>
  //         ) : (
  //           <Login />
  //         );
  //       },
  //     },
  //   ],
  // },
  {
    path: '/venders',
    key: 'VENDERS',
    component: RenderRoutes,
    routes: [
      {
        path: '/venders',
        key: 'VENDERS_ROOT',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? (
            <Layout>
              <Venders />
            </Layout>
          ) : (
            <Login />
          );
        },
      },
      {
        path: '/venders/detail',
        key: 'VENDERS_ROOT',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? (
            <Layout>
              <VenderDetail />
            </Layout>
          ) : (
            <Login />
          );
        },
      },
    ],
  },
  {
    path: '/orders',
    key: 'Orders',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
    },
    routes: [
      {
        path: '/orders',
        key: 'ORDERS_ROOT',
        exact: true,
        component: () => (
          <Layout>
            <Orders />
          </Layout>
        ),
      },
      {
        path: '/orders/update',
        key: 'ORDERS_UPDATE',
        exact: true,
        component: () => (
          <Layout>
            <OrdersUpdate />
          </Layout>
        ),
      },
      {
        path: '/orders/testorder',
        key: 'ORDERS_TESTORDER',
        exact: true,
        component: () => (
          <Layout>
            <TestOrder />
          </Layout>
        ),
      },
      {
        path: '/orders/shipping',
        key: 'ORDERS_SHIPPING',
        exact: true,
        component: () => (
          <Layout>
            <OrdersShipping />
          </Layout>
        ),
      },
      {
        path: '/orders/shippingmultiple',
        key: 'ORDERS_SHIPPINGMULTIPLE',
        exact: true,
        component: () => (
          <Layout>
            <TestMultiShipping />
          </Layout>
        ),
      },
      {
        path: '/orders/review',
        key: 'ORDERS_REVIEW',
        exact: true,
        component: () => (
          <Layout>
            <OrdersReview />
          </Layout>
        ),
      },
    ],
  },
  {
    path: '/billing',
    key: 'BILLING',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
    },
    routes: [
      {
        path: '/billing',
        key: 'BILLING_ROOT',
        exact: true,
        component: () => <Redirect to="/billing/payments" />,
      },
      {
        path: '/billing/payments',
        key: 'BILLING_PAYMENTS',
        exact: true,
        component: () => (
          <Layout>
            <Payments />
          </Layout>
        ),
      },
      {
        path: '/billing/methods',
        key: 'BILLING_METHODS',
        exact: true,
        component: () => (
          <Layout>
            <Methods />
          </Layout>
        ),
      },
      {
        path: '/billing/wallet',
        key: 'BILLING_METHODS',
        exact: true,
        component: () => (
          <Layout>
            <Wallet />
          </Layout>
        ),
      },
      {
        path: '/billing/legal-info',
        key: 'BILLING_LEGAL',
        exact: true,
        component: () => (
          <Layout>
            <Legal />
          </Layout>
        ),
      },
      {
        path: '/billing/methods/add',
        key: 'BILLING_LEGAL',
        exact: true,
        component: () => (
          <Layout>
            <AddMethods />
          </Layout>
        ),
      },
    ],
  },
  {
    path: '/manageable',
    key: 'MANAGEABLE',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
    },
    routes: [
      {
        path: '/manageable',
        key: 'MANAGEABLE_ROOT',
        exact: true,
        component: () => <Redirect to="/manageable/products" />,
      },
      {
        path: '/manageable/products',
        key: 'MANAGEABLE_PRODUCT',
        exact: true,
        component: () => (
          <Layout>
            <Products />
          </Layout>
        ),
      },
      {
        path: '/manageable/category',
        key: 'MANAGEABLE_EDIT',
        exact: true,
        component: () => (
          <Layout>
            <Category />
          </Layout>
        ),
      },
      {
        path: '/manageable/editproduct',
        key: 'MANAGEABLE_EDIT',
        exact: true,
        component: () => (
          <Editproduct />
        ),
      },
      {
        path: '/manageable/editproduct',
        key: 'MANAGEABLE_EDIT',
        exact: true,
        component: () => (
          <Editdesign />
        ),
      },
    ],
  },
  {
    path: '/settings',
    key: 'SETTINGS_ROOT',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
    },
    routes: [
      {
        path: '/settings',
        key: 'SETTINGS',
        exact: true,
        component: () => <Redirect to="/settings/my-account" />,
      },
      {
        path: '/settings/my-account',
        key: 'SETTINGS_MY_ACCOUNT',
        exact: true,
        component: () => (
          <Layout>
            <MyAccount />
          </Layout>
        ),
      },
      {
        path: '/settings/notifications',
        key: 'SETTINGS_NOTIFICATIONS',
        exact: true,
        component: () => (
          <Layout>
            <Notifications />
          </Layout>
        ),
      },
    ],
  },
  {
    path: '/store',
    key: 'STORE',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
    },
    routes: [
      {
        path: '/store',
        key: 'STORE_ROOT',
        exact: true,
        component: () => (
          <Layout>
            <Default />
          </Layout>
        ),
      },
      {
        path: '/store/connect',
        key: 'STORE_CONNECT',
        exact: true,
        component: () => (
          <Layout>
            <Connect />
          </Layout>
        ),
      },
    ],
  },
  {
    path: '/memberships',
    key: 'MEMBERSHIPS',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
    },
    routes: [
      {
        path: '/memberships',
        key: 'MEMBERSHIPS_ROOT',
        exact: true,
        component: () => (
          <Layout>
            <Memberships />
          </Layout>
        ),
      }
    ],
  },
  // {
  //   path: '/managememberships',
  //   key: 'MANAGEMEMBERSHIPS',
  //   component: (props) => {
  //     const isUserLogin = isLoggedIn();
  //     return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
  //   },
  //   routes: [
  //     {
  //       path: '/managememberships',
  //       key: 'MANAGEMEMBERSHIPS_ROOT',
  //       exact: true,
  //       component: () => (
  //         <Layout>
  //           <ManageMembership />
  //         </Layout>
  //       ),
  //     }
  //   ],
  // },
  // {
  //   path: '/managetiers',
  //   key: 'MANAGETIERS',
  //   component: (props) => {
  //     const isUserLogin = isLoggedIn();
  //     return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
  //   },
  //   routes: [
  //     {
  //       path: '/managetiers',
  //       key: 'MANAGETIERS_ROOT',
  //       exact: true,
  //       component: () => (
  //         <Layout>
  //           <ManageTiers />
  //         </Layout>
  //       ),
  //     }
  //   ],
  // },
  // {
  //   path: '/managedigitalservice',
  //   key: 'MANAGEDIGITALSERVICE',
  //   component: (props) => {
  //     const isUserLogin = isLoggedIn();
  //     return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
  //   },
  //   routes: [
  //     {
  //       path: '/managedigitalservice',
  //       key: 'MANAGEDIGITALSERVICE_ROOT',
  //       exact: true,
  //       component: () => (
  //         <Layout>
  //           <ManageDigitalService />
  //         </Layout>
  //       ),
  //     },
  //   ],
  // },
  // {
  //   path: '/admindigitalservice',
  //   key: 'ADMINDIGITALSERVICE',
  //   component: (props) => {
  //     const isUserLogin = isLoggedIn();
  //     return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
  //   },
  //   routes: [
  //     {
  //       path: '/admindigitalservice',
  //       key: 'ADMINDIGITALSERVICE_ROOT',
  //       exact: true,
  //       component: () => (
  //         <Layout>
  //           <AdminDegitalService />
  //         </Layout>
  //       ),
  //     }
  //   ],
  // },
  {
    path: '/viewdigitalservice',
    key: 'VIEWDIGITALSERVICE',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
    },
    routes: [
      {
        path: '/viewdigitalservice',
        key: 'VIEWDIGITALSERVICE_ROOT',
        exact: true,
        component: () => (
          <Layout>
            <ViewDigitalService />
          </Layout>
        ),
      }
    ],
  },
  {
    path: '/settingdigitalservice',
    key: 'SETTINGDIGITALSERVICE',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? <RenderRoutes {...props} /> : <Redirect to="/" />;
    },
    routes: [
      {
        path: '/settingdigitalservice',
        key: 'SETTINGDIGITALSERVICE_ROOT',
        exact: true,
        component: () => (
          <Layout>
            <SettingDigitalService />
          </Layout>
        ),
      }
    ],
  },
];

export { RenderRoutes };
export default ROUTES;
