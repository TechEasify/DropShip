import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';

const index = () => {
    const data = {
        product_id: '2',
        product_title: 'test1',
        product_handle: 'test1',
        price: '10',
        shipping_price: '10',
        retail_price: '100',
        shipping_time: '1 - 2 ',
        sample_order_price: '10.00',
        description: 'test1',
        preferred_background_color: '#121a8a',
        featured_image: 'https://shopifyapp.iihtsrt.com/public/assets/uploads/product_images/product_1.png',
        product_sku: '12345',
        quantity: '10',
        is_custom: '1',
        product_type: 'test',
        product_vendor: 'test',
        tags: ['test', 'dfsdf'],
        order: '10',
        created_at: '2023-04-21 11:07:21',
        updated_at: '2023-05-01 05:34:26'
    };

    const [productSvgProperties, setProductSvgProperties] = useState({
        product_image_x: 50,
        product_image_y: 50,
        product_image_width: 400,
        product_image_height: 900,
        logo_image_url: 'https://cdn.shopify.com/s/files/1/0654/6168/2428/files/logo.png?v=1681700073',
        logo_image_x: 175,
        logo_image_y: 490,
        logo_image_width: 150,
        logo_image_height: 100
    });

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _productSvgProperties = { ...productSvgProperties };
        _productSvgProperties[`${name}`] = val;

        setProductSvgProperties(_productSvgProperties);
    };
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _productSvgProperties = { ...productSvgProperties };
        _productSvgProperties[`${name}`] = val;

        setProductSvgProperties(_productSvgProperties);
    };

    return (
        <>
            <div className="flex p-fluid">
                <div>
                    <div className="card m-3 border-1 surface-border shadow-2 max-w-max">
                        <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                            <div className="flex align-items-center">
                                <i className="pi pi-tag mr-2" />
                                <span className="font-semibold">{data.tags}</span>
                            </div>
                            {/* <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                        </div>
                        <div className="flex flex-column align-items-center text-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 500 1000" style={{ background: 'gray' }}>
                                <image
                                    x={productSvgProperties.product_image_x}
                                    y={productSvgProperties.product_image_y}
                                    width={productSvgProperties.product_image_width}
                                    height={productSvgProperties.product_image_height}
                                    href="https://cdn.shopify.com/s/files/1/0654/6168/2428/files/product.png?v=1681700073"
                                />
                                <image
                                    id="Logo-02"
                                    x={productSvgProperties.logo_image_x}
                                    y={productSvgProperties.logo_image_y}
                                    width={productSvgProperties.logo_image_width}
                                    height={productSvgProperties.logo_image_height}
                                    href={productSvgProperties.logo_image_url}
                                />
                                <text xmlns="http://www.w3.org/2000/svg" x="250" y="560" fill="red" text-anchor="middle" textLength="300" lengthAdjust="spacingAndGlyphs" fontSize="40px" style={{ display: 'none' }}>
                                    <tspan>Techeasify</tspan>
                                </text>
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{data.product_title}</div>
                            <div className="mb-3">{data.description}</div>
                        </div>
                        <hr />
                        <div className="flex align-items-center justify-content-between">
                            <div>
                                <div className="text-l font-semibold">You Pay : ${data.price}</div>
                                <div className="text-l font-semibold">You Sell : ${data.retail_price}</div>
                            </div>
                            <div>
                                <div className="text-l font-semibold">Profit</div>
                                <div className="text-l font-semibold text-green-500">${data.retail_price - data.price}</div>
                            </div>
                            {/* <Button icon="pi pi-shopping-cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'} /> */}
                        </div>
                    </div>
                </div>
                <div className="align-self-center">
                    {/* <div className="flex gap-3">
                        <div className="field">
                            <label htmlFor="productImageX" className="block">
                                Product Image X
                            </label>
                            <InputNumber id="productImageX" value={productSvgProperties.product_image_x} onChange={(e) => onInputNumberChange(e, 'product_image_x')} required autoFocus />
                        </div>
                        <div className="field">
                            <label htmlFor="productImageY" className="block">
                                Product Image Y
                            </label>
                            <InputNumber id="productImageY" value={productSvgProperties.product_image_y} onChange={(e) => onInputNumberChange(e, 'product_image_y')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="productImageY" className="block">
                                Product Image Width
                            </label>
                            <InputNumber id="productImageWidth" value={productSvgProperties.product_image_width} onChange={(e) => onInputNumberChange(e, 'product_image_width')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="productImageY" className="block">
                                Product Image Height
                            </label>
                            <InputNumber id="productImageHeight" value={productSvgProperties.product_image_height} onChange={(e) => onInputNumberChange(e, 'product_image_height')} required />
                        </div>
                    </div> */}
                    <div className="">
                        <div className="field w-full">
                            <label htmlFor="logoImageUrl" className="block">
                                Logo Image Url
                            </label>
                            <InputText id="logoImageUrl" value={productSvgProperties.logo_image_url} onChange={(e) => onInputChange(e, 'logo_image_url')} required autoFocus />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="field">
                            <label htmlFor="logoImageX" className="block">
                                Logo Image X
                            </label>
                            <InputNumber id="logoImageX" value={productSvgProperties.logo_image_x} onChange={(e) => onInputNumberChange(e, 'logo_image_x')} required autoFocus />
                        </div>
                        <div className="field">
                            <label htmlFor="logoImageY" className="block">
                                Logo Image Y
                            </label>
                            <InputNumber id="logoImageY" value={productSvgProperties.logo_image_y} onChange={(e) => onInputNumberChange(e, 'logo_image_y')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="logoImageY" className="block">
                                Logo Image Width
                            </label>
                            <InputNumber id="logoImageWidth" value={productSvgProperties.logo_image_width} onChange={(e) => onInputNumberChange(e, 'logo_image_width')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="logoImageY" className="block">
                                Logo Image Height
                            </label>
                            <InputNumber id="logoImageHeight" value={productSvgProperties.logo_image_height} onChange={(e) => onInputNumberChange(e, 'logo_image_height')} required />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;
