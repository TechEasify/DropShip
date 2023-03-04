import getConfig from 'next/config';
import { Menu } from 'primereact/menu';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { FileUpload } from 'primereact/fileupload';

const LiveOnStore = () => {
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null);
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    };
    return (
        <>
            <div className="text-900 font-bold text-2xl mb-3">Products</div>

            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h5>Cosmetics Brand</h5>
                        <p className="text-700 text-l mb-3 line-height-3">Personalize your product packaging and get it shipped with a branded invoice.</p>
                        <div className="grid justify-content-between">
                            <div className="col-12 lg:col-4 lg:pr-3">
                                <img src={`${contextPath}/demo/images/product/game-controller.jpg`} className="shadow-2 my-3 mx-0 w-full" />
                            </div>
                            <div className="col-12 lg:col-8 align-self-center">
                                <div className="flex justify-content-between">
                                    <div>
                                        <p className="mb-1">Cost</p>
                                        <p className="text-2xl font-semibold">$11.90</p>
                                    </div>
                                    <div>
                                        <p className="mb-1">Shipping</p>
                                        <p className="text-2xl font-semibold">$5</p>
                                    </div>
                                    <div>
                                        <p className="mb-1">Retail Price</p>
                                        <p className="text-2xl font-semibold">$48</p>
                                    </div>
                                    <div>
                                        <p className="mb-1">Profit</p>
                                        <p className="text-2xl font-semibold text-green-500">$36.10</p>
                                    </div>
                                </div>
                                <div className="p-fluid formgrid grid mt-4">
                                    <div className="field mb-4 w-full">
                                        <label htmlFor="personalizedNote">Personalized Note To Customer (Optional)</label>
                                        <InputTextarea id="personalizedNote" rows="4" placeholder='Add a personalized note for your customers like "Thanks for shopping with us"' />
                                    </div>
                                </div>
                                <div className="grid justify-content-between">
                                    <div className="flex gap-3 mb-2 lg:mb-0">
                                        <button className="p-button p-component p-button-rounded p-button-secondary p-button-outlined p-button-icon-only">
                                            <span className="p-button-icon p-c pi pi-trash"></span>
                                            <span className="p-button-label p-c">&nbsp;</span>
                                            <span role="presentation" className="p-ink"></span>
                                        </button>
                                        <button aria-label="Submit" className="p-button p-component">
                                            <span className="p-button-label p-c">Live on store</span>
                                            <span role="presentation" className="p-ink"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <h5>Cosmetics Brand</h5>
                        <p className="text-700 text-l mb-3 line-height-3">Personalize your product packaging and get it shipped with a branded invoice.</p>
                        <div className="grid justify-content-between">
                            <div className="col-12 lg:col-4 lg:pr-3">
                                <img src={`${contextPath}/demo/images/product/game-controller.jpg`} className="shadow-2 my-3 mx-0 w-full" />
                            </div>
                            <div className="col-12 lg:col-8 align-self-center">
                                <div className="flex justify-content-between">
                                    <div>
                                        <p className="mb-1">Cost</p>
                                        <p className="text-2xl font-semibold">$11.90</p>
                                    </div>
                                    <div>
                                        <p className="mb-1">Shipping</p>
                                        <p className="text-2xl font-semibold">$5</p>
                                    </div>
                                    <div>
                                        <p className="mb-1">Retail Price</p>
                                        <p className="text-2xl font-semibold">$48</p>
                                    </div>
                                    <div>
                                        <p className="mb-1">Profit</p>
                                        <p className="text-2xl font-semibold text-green-500">$36.10</p>
                                    </div>
                                </div>
                                <div className="p-fluid formgrid grid mt-4">
                                    <div className="field mb-4 w-full">
                                        <label htmlFor="personalizedNote">Personalized Note To Customer (Optional)</label>
                                        <InputTextarea id="personalizedNote" rows="4" placeholder='Add a personalized note for your customers like "Thanks for shopping with us"' />
                                    </div>
                                </div>
                                <div className="grid justify-content-between">
                                    <div className="flex gap-3 mb-2 lg:mb-0">
                                        <button className="p-button p-component p-button-rounded p-button-secondary p-button-outlined p-button-icon-only">
                                            <span className="p-button-icon p-c pi pi-trash"></span>
                                            <span className="p-button-label p-c">&nbsp;</span>
                                            <span role="presentation" className="p-ink"></span>
                                        </button>
                                        <button aria-label="Submit" className="p-button p-component">
                                            <span className="p-button-label p-c">Live no store</span>
                                            <span role="presentation" className="p-ink"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 flex justify-content-center gap-3">
                    <button aria-label="Submit" className="p-button p-component p-button-outlined">
                        <span className="p-button-icon p-c p-button-icon-left pi pi-arrow-left"></span>
                        <span className="p-button-label p-c">Previous</span>
                        <span role="presentation" className="p-ink"></span>
                    </button>
                    <button aria-label="Submit" className="p-button p-component">
                        <span className="p-button-icon p-c p-button-icon-right pi pi-arrow-right"></span>
                        <span className="p-button-label p-c">Next</span>
                        <span role="presentation" className="p-ink"></span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default LiveOnStore;
