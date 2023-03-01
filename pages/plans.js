import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { LayoutContext } from '../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';
import Link from 'next/link';

const Plans = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    return (
        <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
            <div className="text-900 font-bold text-6xl mb-4">Set up your store, pick a plan later</div>
            <div className="text-700 text-xl mb-6 line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>

            <div className="grid">
                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column surface-card" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-4xl mb-2">Basic</div>
                            <div className="text-600">What's included on Basic?</div>
                            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">$3.81</span>
                                <span className="ml-2 font-medium text-600">per month</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Basic reports</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Up to 1,000 inventory locations</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>2 staff accounts</span>
                                </li>
                            </ul>
                            <hr className="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                            <Button label="Try for free" className="p-3 w-full mt-auto"></Button>
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column surface-card" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-4xl mb-2">Standard</div>
                            <div className="text-600">What's included on Standard?</div>
                            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">$5.67</span>
                                <span className="ml-2 font-medium text-600">per month</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Professional reports</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Up to 1,000 inventory locations</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>5 staff accounts</span>
                                </li>
                            </ul>
                            <hr className="mb-3 mx-0 border-top-1 border-none surface-border" />
                            <Button label="Try for free" className="p-3 w-full"></Button>
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 flex flex-column surface-card" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-4xl mb-2">Premium</div>
                            <div className="text-600">What's included on Premium?</div>
                            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">$9.34</span>
                                <span className="ml-2 font-medium text-600">per month</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Custom report builder</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Up to 1,000 inventory locations</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>15 staff accounts</span>
                                </li>
                            </ul>
                            <hr className="mb-3 mx-0 border-top-1 border-none surface-border" />
                            <Button label="Try for free" className="p-3 w-full mt-auto"></Button>{' '}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Plans.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            {/* <AppConfig simple /> */}
        </React.Fragment>
    );
};

export default Plans;
