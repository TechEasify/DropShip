import React, { useState, useEffect } from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import clsx from 'clsx';
import { Drawer, AppBar, Toolbar, CssBaseline, Box } from '@mui/material';
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
import { RenderAdminRoutes, isLoggedIn } from './helper';
import { localStorageConstant } from '../constant';
import Memberships from '../components/Memberships/Memberships';
import Wallet from '../modules/Billing/pages/Wallet';
import Productview from '../components/Productview';
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
import { SearchIcon } from '@shopify/polaris-icons';

const drawerWidth = 230;

const nav = [
  {
    text: 'My dropshippy',
    icon: 'pf-i pf-i-24 pf-i-chart-pie',
    isTree: false,
    treeItem: [],
    link: '/admin',
  },
  {
    text: 'Orders',
    icon: 'pf-i pf-i-24 pf-i-format-list-bulleted',
    isTree: false,
    treeItem: [],
    link: '/admin/orders',
  },
  {
    text: 'Stores',
    icon: 'pf-i pf-i-24 pf-i-store',
    isTree: false,
    treeItem: [],
    link: '/admin/store',
  },
  {
    text: 'Vendor',
    icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-package-variant-closed pf-text-gray-400',
    isTree: false,
    treeItem: [],
    link: '/admin/vendor',
  },
  {
    text: 'File library',
    icon: 'pf-i pf-i-24 pf-i-folder-multiple-image',
    isTree: false,
    treeItem: [],
    link: '/admin/library',
  },
  {
    text: 'Manage Products',
    icon: 'pf-i pf-i-24 pf-i-credit-card-outline',
    isTree: true,
    treeItem: [
      {
        text: 'Products',
        link: '/admin/manageable/products',
      },
      {
        text: 'Category',
        link: '/admin/manageable/category',
      },
    ],
    link: '/admin/manageable',
  },
  {
    text: 'Manage Memberships',
    icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-cards pf-text-red-700',
    isTree: false,
    treeItem: [],
    link: '/admin/managememberships',
  },
  {
    text: 'Manage Tiers',
    icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-cards pf-text-red-700',
    isTree: false,
    treeItem: [],
    link: '/admin/managetiers',
  },
  {
    text: 'Manage Digital Service',
    icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-cards pf-text-red-700',
    isTree: false,
    treeItem: [],
    link: '/admin/managedigitalservice',
  },
  {
    text: 'Admin Digital Service',
    icon: 'pf-i pf-i-24 pf-mb-2 pf-mr-8 pf-i-cards pf-text-red-700',
    isTree: false,
    treeItem: [],
    link: '/admin/admindigitalservice',
  },
  // {
  //     text: 'Billing',
  //     icon: 'pf-i pf-i-24 pf-i-credit-card-outline',
  //     isTree: true,
  //     treeItem: [
  //         {
  //             text: 'Payments',
  //             link: '/billing/payments',
  //         },
  //         {
  //             text: 'Billing methods',
  //             link: '/billing/methods',
  //         },
  //         {
  //             text: 'Wallet',
  //             link: '/billing/wallet',
  //         },
  //         {
  //             text: 'Legal Info',
  //             link: '/billing/legal-info',
  //         },
  //     ],
  //     link: '/billing',
  // },
  {
    text: 'Settings',
    icon: 'pf-i pf-i-24 pf-i-settings',
    isTree: true,
    treeItem: [
      {
        text: 'My account',
        link: '/admin/settings/my-account',
      },
      {
        text: 'Notifications',
        link: '/admin/settings/notifications',
      },
    ],
    link: '/admin/settings',
  },
  {
    text: 'Help',
    icon: 'pf-i pf-i-24 pf-i-help-circle',
    isTree: false,
    treeItem: [],
    link: '/admin',
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
    backgroundColor: 'rgba(241, 241, 241, 1)',
  },
}));

const AdminLayout = ({ children, window }) => {
  console.log(children, 'children');
  const classes = useStyle();
  const location = useLocation();
  const prefix = location.pathname.split('/admin')[1];
  const path = location.pathname.split('/admin')[2];
  const [expandBill, setExpandBill] = useState(false);
  const [expandSetting, setExpandSetting] = useState(false);
  const [expandproduct, setExpandProduct] = useState(false);

  const [state, setState] = useState({
    left: false,
  });
  const [value, setValue] = useState('');

  const handleChange = () => {
    setValue(newValue);
  };

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

    console.log(isKeepOpenItem, 'isKeepOpenItem');

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
      <div id="dashboard-sidebar" className="dashboard__sidebar">
        <ul className="pf-m-0 pf-px-0 pf-py-8" id="sidebar-ul">
          {nav.map((item) => (
            <div key={item.text}>
              {item.text !== 'Billing' &&
                item.text !== 'Manage Products' &&
                item.text !== 'Settings' && (
                  <li className="panel" key={item.text}>
                    <Link
                      className={clsx(
                        'pf-link-block pf-px-24 pf-py-8',
                        item.link === `/${prefix}` ? 'active' : ''
                      )}
                      style={{ cursor: 'pointer' }}
                      to={item.link}
                    >
                      <span className={item.icon} />
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
                    className={`pf-pl-24 pf-bg-white collapse ${
                      expandBill && 'in'
                    }`}
                    id="sidebar-ul-9"
                  >
                    {item.treeItem.map((treeItem) => (
                      <li key={treeItem.text}>
                        <Link
                          className={`pf-link-block pf-px-24 pf-py-8 ${
                            treeItem.link === `/${prefix}/${path}`
                              ? 'active'
                              : ''
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
                      <span className={item.icon} />
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
                    className={`pf-pl-24 pf-bg-white collapse ${
                      expandproduct && 'in'
                    }`}
                    id="sidebar-ul-9"
                  >
                    {item.treeItem.map((treeItem) => (
                      <li key={treeItem.text}>
                        <Link
                          className={`pf-link-block pf-px-24 pf-py-8 ${
                            treeItem.link === `/${prefix}/${path}`
                              ? 'active'
                              : ''
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
                    className={`pf-pl-24 pf-bg-white collapse ${
                      expandSetting && 'in'
                    }`}
                    id="sidebar-ul-9"
                  >
                    {item.treeItem.map((treeItem) => (
                      <li key={treeItem.text}>
                        <Link
                          className={`pf-link-block pf-px-24 pf-py-8 ${
                            treeItem.link === `/${prefix}/${path}`
                              ? 'active'
                              : ''
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
    setExpandProduct(prefix === 'manageable');
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
                  <div className="headerbar">
                    <div className="drawer-icon">
                      {['left'].map((anchor) => (
                        <React.Fragment key={anchor}>
                          <IconButton
                            color="black"
                            aria-label="open drawer"
                            edge="start"
                            onClick={toggleDrawer(anchor, true)}
                          >
                            <MenuIcon>{anchor}</MenuIcon>
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
                    <div className="search-bar">
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
          {console.log(classes.content, 'classes.content')}
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

const ROUTESADMIN = [
  {
    path: '/admin',
    key: 'ADMIN_ROOT',
    exact: true,
    component: () => {
      const userLogInSuccess = isLoggedIn();
      return userLogInSuccess ? (
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      ) : (
        <Login />
      );
    },
  },
  {
    path: '/admin/auth',
    key: 'ADMIN_AUTH',
    component: RenderAdminRoutes,
    routes: [
      {
        path: '/admin/auth',
        key: 'ADMIN_ROOT',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? <Redirect to="/" /> : <Login />;
        },
      },
      {
        path: '/admin/auth/login',
        key: 'ADMIN_ROOT',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? <Redirect to="/" /> : <Login />;
        },
      },
      {
        path: '/admin/auth/register',
        key: 'ADMIN_REGISTER',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? <Redirect to="/" /> : <Register />;
        },
      },
      {
        path: '/admin/auth/forgot',
        key: 'ADMIN_RESETPWD',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? <Redirect to="/" /> : <ForgotPwd />;
        },
      },
      {
        path: '/admin/auth/logout',
        key: 'ADMIN_LOGOUT',
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
    path: '/admin/template',
    key: 'ADMIN_TEMPLATE',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? (
        <RenderAdminRoutes {...props} />
      ) : (
        <Redirect to="/" />
      );
    },
    routes: [
      {
        path: '/admin/template',
        key: 'ADMIN_ROOT',
        exact: true,
        component: () => (
          <AdminLayout>
            <Template />
          </AdminLayout>
        ),
      },
      {
        path: '/admin/template/create',
        key: 'ADMINTEMPLATE_CREATE',
        exact: true,
        component: () => <CreateProductTemplate />,
      },
      {
        path: '/admin/template/1',
        key: 'ADMINTEMPLATE_DETAIL',
        exact: true,
        component: () => (
          <AdminLayout>
            <ProductTemplateDetail />
          </AdminLayout>
        ),
      },
      {
        path: '/admin/template/view',
        key: 'ADMINTEMPLATE_DETAIL',
        exact: true,
        component: () => <Productview />,
      },
    ],
  },
  {
    path: '/admin/orders',
    key: 'Orders',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? (
        <RenderAdminRoutes {...props} />
      ) : (
        <Redirect to="/" />
      );
    },
    routes: [
      {
        path: '/admin/orders',
        key: 'ADMINORDERS_ROOT',
        exact: true,
        component: () => (
          <AdminLayout>
            <Orders />
          </AdminLayout>
        ),
      },
      {
        path: '/admin/orders/update',
        key: 'ADMINORDERS_UPDATE',
        exact: true,
        component: () => (
          <AdminLayout>
            <OrdersUpdate />
          </AdminLayout>
        ),
      },
      {
        path: '/admin/orders/testorder',
        key: 'ADMINORDERS_TESTORDER',
        exact: true,
        component: () => (
          <AdminLayout>
            <TestOrder />
          </AdminLayout>
        ),
      },
      {
        path: '/admin/orders/shipping',
        key: 'ADMINORDERS_SHIPPING',
        exact: true,
        component: () => (
          <AdminLayout>
            <OrdersShipping />
          </AdminLayout>
        ),
      },
      {
        path: '/admin/orders/shippingmultiple',
        key: 'ADMINORDERS_SHIPPINGMULTIPLE',
        exact: true,
        component: () => (
          <AdminLayout>
            <TestMultiShipping />
          </AdminLayout>
        ),
      },
      {
        path: '/admin/orders/review',
        key: 'ADMINORDERS_REVIEW',
        exact: true,
        component: () => (
          <AdminLayout>
            <OrdersReview />
          </AdminLayout>
        ),
      },
    ],
  },
  {
    path: '/admin/store',
    key: 'ADMIN_STORE',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? (
        <RenderAdminRoutes {...props} />
      ) : (
        <Redirect to="/" />
      );
    },
    routes: [
      {
        path: '/admin/store',
        key: 'ADMINSTORE_ROOT',
        exact: true,
        component: () => (
          <AdminLayout>
            <Default />
          </AdminLayout>
        ),
      },
      {
        path: '/admin/store/connect',
        key: 'ADMINSTORE_CONNECT',
        exact: true,
        component: () => (
          <AdminLayout>
            <Connect />
          </AdminLayout>
        ),
      },
    ],
  },
  {
    path: '/admin/library',
    key: 'ADMIN_LIBRARY',
    component: RenderAdminRoutes,
    routes: [
      {
        path: '/admin/library',
        key: 'ADMINLIBRARY_ROOT',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? (
            <AdminLayout>
              <UploadFile />
            </AdminLayout>
          ) : (
            <Login />
          );
        },
      },
    ],
  },
  {
    path: '/admin/manageable',
    key: 'ADMIN_MANAGEABLE',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? <RenderAdminRoutes {...props} /> : <Redirect to="/" />;
    },
    routes: [
      {
        path: '/admin/manageable',
        key: 'ADMIN_MANAGEABLE_ROOT',
        exact: true,
        component: () => <Redirect to="/manageable/products" />,
      },
      {
        path: '/admin/manageable/products',
        key: 'ADMIN_MANAGEABLE_PRODUCT',
        exact: true,
        component: () => (
          <AdminLayout>
            <Products />
          </AdminLayout>
        ),
      },
      {
        path: '/admin/manageable/category',
        key: 'ADMIN_MANAGEABLE_EDIT',
        exact: true,
        component: () => (
          <AdminLayout>
            <Category />
          </AdminLayout>
        ),
      },
      {
        path: '/admin/manageable/editproduct',
        key: 'ADMIN_MANAGEABLE_EDIT',
        exact: true,
        component: () => (
          <Editproduct />
        ),
      },
      {
        path: '/admin/manageable/editproduct',
        key: 'ADMIN_MANAGEABLE_EDIT',
        exact: true,
        component: () => (
          <Editdesign />
        ),
      },
    ],
  },
  {
    path: '/admin/vendor',
    key: 'ADMIN_VENDOR',
    component: RenderAdminRoutes,
    routes: [
      {
        path: '/admin/vendor',
        key: 'ADMIN_VENDOR_ROOT',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? (
            <AdminLayout>
              <Venders />
            </AdminLayout>
          ) : (
            <Login />
          );
        },
      },
      {
        path: '/admin/vendor/detail',
        key: 'ADMIN_VENDOR_ROOT',
        exact: true,
        component: () => {
          const userLogInSuccess = isLoggedIn();
          return userLogInSuccess ? (
            <AdminLayout>
              <VenderDetail />
            </AdminLayout>
          ) : (
            <Login />
          );
        },
      },
    ],
  },
  {
    path: '/admin/managememberships',
    key: 'ADMIN_MANAGEMEMBERSHIPS',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? (
        <RenderAdminRoutes {...props} />
      ) : (
        <Redirect to="/" />
      );
    },
    routes: [
      {
        path: '/admin/managememberships',
        key: 'ADMIN_MANAGEMEMBERSHIPS_ROOT',
        exact: true,
        component: () => (
          <AdminLayout>
            <ManageMembership />
          </AdminLayout>
        ),
      },
    ],
  },
  {
    path: '/admin/managetiers',
    key: 'ADMIN_MANAGETIERS',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? (
        <RenderAdminRoutes {...props} />
      ) : (
        <Redirect to="/" />
      );
    },
    routes: [
      {
        path: '/admin/managetiers',
        key: 'ADMINMANAGETIERS_ROOT',
        exact: true,
        component: () => (
          <AdminLayout>
            <ManageTiers />
          </AdminLayout>
        ),
      },
    ],
  },
  {
    path: '/admin/managedigitalservice',
    key: 'ADMIN_MANAGEDIGITALSERVICE',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? (
        <RenderAdminRoutes {...props} />
      ) : (
        <Redirect to="/" />
      );
    },
    routes: [
      {
        path: '/admin/managedigitalservice',
        key: 'ADMIN_MANAGEDIGITALSERVICE_ROOT',
        exact: true,
        component: () => (
          <AdminLayout>
            <ManageDigitalService />
          </AdminLayout>
        ),
      },
    ],
  },
  {
    path: '/admin/admindigitalservice',
    key: 'ADMIN_ADMINDIGITALSERVICE',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? (
        <RenderAdminRoutes {...props} />
      ) : (
        <Redirect to="/" />
      );
    },
    routes: [
      {
        path: '/admin/admindigitalservice',
        key: 'ADMIN_ADMINDIGITALSERVICE_ROOT',
        exact: true,
        component: () => (
          <AdminLayout>
            <AdminDegitalService />
          </AdminLayout>
        ),
      },
    ],
  },
  {
    path: '/admin/settings',
    key: 'ADMINSETTINGS_ROOT',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? (
        <RenderAdminRoutes {...props} />
      ) : (
        <Redirect to="/" />
      );
    },
    routes: [
      {
        path: '/admin/settings',
        key: 'ADMIN_SETTINGS',
        exact: true,
        component: () => <Redirect to="/admin/settings/my-account" />,
      },
      {
        path: '/admin/settings/my-account',
        key: 'ADMINSETTINGS_MY_ACCOUNT',
        exact: true,
        component: () => (
          <AdminLayout>
            <MyAccount />
          </AdminLayout>
        ),
      },
      {
        path: '/admin/settings/notifications',
        key: 'ADMINSETTINGS_NOTIFICATIONS',
        exact: true,
        component: () => (
          <AdminLayout>
            <Notifications />
          </AdminLayout>
        ),
      },
    ],
  },
  {
    path: '/admin/settingdigitalservice',
    key: 'ADMIN_SETTINGDIGITALSERVICE',
    component: (props) => {
      const isUserLogin = isLoggedIn();
      return isUserLogin ? (
        <RenderAdminRoutes {...props} />
      ) : (
        <Redirect to="/" />
      );
    },
    routes: [
      {
        path: '/admin/settingdigitalservice',
        key: 'ADMIN_SETTINGDIGITALSERVICE_ROOT',
        exact: true,
        component: () => (
          <AdminLayout>
            <SettingDigitalService />
          </AdminLayout>
        ),
      },
    ],
  },
];

export { RenderAdminRoutes };
export default ROUTESADMIN;
