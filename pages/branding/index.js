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

const Branding = () => {
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
            <div className="text-900 font-bold text-2xl mb-2">Branding</div>
            <div className="text-700 text-l mb-3 line-height-3">Personalize your product packaging and get it shipped with a branded invoice.</div>

            <div className="grid">
                <div className="col-12">
                    <div className="card grid justify-content-between">
                        <div className="align-self-center">
                            <h5>Cosmetics Brand</h5>
                            <p className="text-700 text-l mb-3 line-height-3">Personalize your product packaging and get it shipped with a branded invoice.</p>
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="brandName">Brand Name</label>
                                    <InputText id="brandName" type="text" placeholder="Brand Name" />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="fontStyle">Font Style</label>
                                    <Dropdown id="fontStyle" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <img src={`${contextPath}/demo/images/product/game-controller.jpg`} className="shadow-2 my-3 mx-0 w-full" />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <h5>Branded Invoice</h5>
                        <p className="text-700 text-l mb-3">Set up and preview your Branded Invoice in this section.</p>
                        <h5>Brand Information</h5>
                        <div className="p-fluid formgrid grid">
                            <div className="field mb-5 col-4">
                                <label htmlFor="storeInformation">Store Information</label>
                                <InputText id="storeInformation" type="text" placeholder="Brand Name" />
                            </div>
                            <div className="field mb-5 col-12 md:col-4">
                                <label htmlFor="websiteUrl">Website URL</label>
                                <InputText id="websiteUrl" type="text" placeholder="Enter website URL" />
                            </div>
                            <div className="field mb-5 col-12 md:col-4">
                                <label htmlFor="platform">Platform</label>
                                <InputText id="platform" type="text" placeholder="Preferred platform" />
                            </div>
                            <div className="field mb-5 col-12 md:col-6">
                                <label htmlFor="customerServiceEmail">Customer Service Email</label>
                                <InputText id="customerServiceEmail" type="text" placeholder="brandname@mail.com" />
                            </div>
                            <div className="field mb-5 col-12 md:col-6">
                                <label htmlFor="customerServicePhone">Customer Service Phone</label>
                                <InputText id="customerServicePhone" type="tel" placeholder="9999999999" />
                            </div>
                            <div className="field mb-5 col-12 md:col-4">
                                <label htmlFor="facebookPage">Facebook Page</label>
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">http://facebook.com/</span>
                                    <InputText id="facebookPage" type="url" placeholder="brandname" />
                                </div>
                            </div>
                            <div className="field mb-5 col-12 md:col-4">
                                <label htmlFor="twitterHandle">Twitter Handle</label>
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">http://twitter.com/</span>
                                    <InputText id="twitterHandle" type="url" placeholder="brandname" />
                                </div>
                            </div>
                            <div className="field mb-5 col-12 md:col-4">
                                <label htmlFor="instagramPage">Instagram Page</label>
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">http://instagram.com/</span>
                                    <InputText id="instagramPage" type="url" placeholder="brandname" />
                                </div>
                            </div>
                            <div className="field mb-5 col-12">
                                <label htmlFor="personalizedNote">Personalized Note To Customer (Optional)</label>
                                <InputTextarea id="personalizedNote" rows="4" placeholder='Add a personalized note for your customers like "Thanks for shopping with us"' />
                            </div>
                            <div className="field mb-5 col-12">
                                <label htmlFor="personalizedNote">Add a Brand Logo</label>
                                <FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} />
                            </div>
                            <div className="mb-5 col-12">
                                <button aria-label="Submit" className="p-button p-component">
                                    <span className="p-button-label p-c">Preview Invoice</span>
                                    <span role="presentation" className="p-ink"></span>
                                </button>
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

export default Branding;
