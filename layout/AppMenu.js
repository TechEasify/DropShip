import getConfig from 'next/config';
import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const model = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
        },
        {
            label: 'Manage',
            icon: 'pi pi-fw pi-briefcase',
            items: [
                {
                    label: 'Products',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Add Product',
                            icon: 'pi pi-fw pi-plus',
                            to: '/productCrud'
                        },
                        {
                            label: 'View Product',
                            icon: 'pi pi-fw pi-eye',
                            to: '/products'
                        }
                    ]
                },
                {
                    label: 'Collections',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Add Collection',
                            icon: 'pi pi-fw pi-plus',
                            to: '/collectionCrud'
                        }
                    ]
                },
                {
                    label: 'Plans',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Add Plan',
                            icon: 'pi pi-fw pi-plus',
                            to: '/planCrud'
                        },
                        {
                            label: 'View Plan',
                            icon: 'pi pi-fw pi-eye',
                            to: '/plans'
                        }
                    ]
                },
                {
                    label: 'Update Product Image',
                    icon: 'pi pi-fw pi-briefcase',
                    to: '/updateProductImage'
                },
                {
                    label: 'Select Products',
                    icon: 'pi pi-fw pi-briefcase',
                    to: '/selectProducts'
                },
                {
                    label: 'Branding',
                    icon: 'pi pi-fw pi-briefcase',
                    to: '/branding'
                },
                {
                    label: 'Push To Store',
                    icon: 'pi pi-fw pi-briefcase',
                    to: '/pushToStore'
                },
                {
                    label: 'Live On Store',
                    icon: 'pi pi-fw pi-briefcase',
                    to: '/liveOnStore'
                }
            ]
        },
        {
            label: 'Admin',
            icon: 'pi pi-fw pi-lock',
            items: [
                {
                    label: 'All Vendors',
                    icon: 'pi pi-fw pi-user',
                    to: '/allVendors'
                },
                {
                    label: 'All Orders',
                    icon: 'pi pi-fw pi-shopping-bag',
                    to: '/allOrders'
                }
            ]
        },
        {
            label: 'Authentication',
            icon: 'pi pi-fw pi-lock',
            items: [
                {
                    label: 'Login',
                    icon: 'pi pi-fw pi-briefcase',
                    to: '/login'
                },
                {
                    label: 'Sign Up',
                    icon: 'pi pi-fw pi-briefcase',
                    to: '/signup'
                }
            ]
        }
        // {
        //     label: 'UI Components',
        //     items: [
        //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
        //         { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
        //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
        //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
        //         { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
        //         { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
        //         { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
        //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
        //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
        //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
        //         { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
        //         { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
        //         { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
        //         { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
        //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
        //         { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        //     ]
        // },
        // {
        //     label: 'Prime Blocks',
        //     items: [
        //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
        //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-react', target: '_blank' }
        //     ]
        // },
        // {
        //     label: 'Utilities',
        //     items: [
        //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
        //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://www.primefaces.org/primeflex/', target: '_blank' }
        //     ]
        // },
        // {
        //     label: 'Pages',
        //     icon: 'pi pi-fw pi-briefcase',
        //     to: '/pages',
        //     items: [
        //         {
        //             label: 'Landing',
        //             icon: 'pi pi-fw pi-globe',
        //             to: '/landing'
        //         },
        //         {
        //             label: 'Auth',
        //             icon: 'pi pi-fw pi-user',
        //             items: [
        //                 {
        //                     label: 'Login',
        //                     icon: 'pi pi-fw pi-sign-in',
        //                     to: '/auth/login'
        //                 },
        //                 {
        //                     label: 'Error',
        //                     icon: 'pi pi-fw pi-times-circle',
        //                     to: '/auth/error'
        //                 },
        //                 {
        //                     label: 'Access Denied',
        //                     icon: 'pi pi-fw pi-lock',
        //                     to: '/auth/access'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Crud',
        //             icon: 'pi pi-fw pi-pencil',
        //             to: '/pages/crud'
        //         },
        //         {
        //             label: 'Timeline',
        //             icon: 'pi pi-fw pi-calendar',
        //             to: '/pages/timeline'
        //         },
        //         {
        //             label: 'Not Found',
        //             icon: 'pi pi-fw pi-exclamation-circle',
        //             to: '/pages/notfound'
        //         },
        //         {
        //             label: 'Empty',
        //             icon: 'pi pi-fw pi-circle-off',
        //             to: '/pages/empty'
        //         }
        //     ]
        // },
        // {
        //     label: 'Hierarchy',
        //     items: [
        //         {
        //             label: 'Submenu 1',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 1.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 1.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Submenu 2',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 2.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 2.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     label: 'Get Started',
        //     items: [
        //         {
        //             label: 'Documentation',
        //             icon: 'pi pi-fw pi-question',
        //             to: '/documentation'
        //         },
        //         {
        //             label: 'View Source',
        //             icon: 'pi pi-fw pi-search',
        //             url: 'https://github.com/primefaces/sakai-react',
        //             target: '_blank'
        //         }
        //     ]
        // }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
