import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
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
        product_image_url: 'https://cdn.shopify.com/s/files/1/0654/6168/2428/files/product_image.png?v=1683802059',
        product_image_x: 170,
        product_image_y: 70,
        product_image_width: 160,
        product_image_height: 0,
        label_image_url: 'https://cdn.shopify.com/s/files/1/0654/6168/2428/files/label_image.png?v=1683802059',
        label_image_x: 50,
        label_image_y: 200,
        label_image_width: 400,
        label_image_height: 0,
        logo_image_url: 'https://cdn.shopify.com/s/files/1/0654/6168/2428/files/logo_image.png?v=1683802059',
        logo_image_x: 210,
        logo_image_y: 215,
        logo_image_width: 80,
        logo_image_height: 0,
        text_data: '',
        text_x: 385,
        text_y: 350,
        text_length: 80,
        text_font_size: 20
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500" style={{ background: 'gray' }}>
                                <image
                                    x={productSvgProperties.product_image_x}
                                    y={productSvgProperties.product_image_y}
                                    width={productSvgProperties.product_image_width}
                                    // height={productSvgProperties.product_image_height}
                                    href={productSvgProperties.product_image_url}
                                />
                                <image
                                    x={productSvgProperties.label_image_x}
                                    y={productSvgProperties.label_image_y}
                                    width={productSvgProperties.label_image_width}
                                    // height={productSvgProperties.label_image_height}
                                    href={productSvgProperties.label_image_url}
                                />
                                <image
                                    id="Logo-02"
                                    x={productSvgProperties.logo_image_x}
                                    y={productSvgProperties.logo_image_y}
                                    width={productSvgProperties.logo_image_width}
                                    // height={productSvgProperties.logo_image_height}
                                    href={productSvgProperties.logo_image_url}
                                />
                                <text
                                    xmlns="http://www.w3.org/2000/svg"
                                    x={productSvgProperties.text_x}
                                    y={productSvgProperties.text_y}
                                    fill="red"
                                    text-anchor="middle"
                                    textLength={productSvgProperties.text_length}
                                    fontSize={`${productSvgProperties.text_font_size}px`}
                                    lengthAdjust="spacingAndGlyphs"
                                >
                                    {productSvgProperties.text_data.length > 0 &&
                                        productSvgProperties.text_data.split('\n').map((addressLine, addressLineIndex) => {
                                            return (
                                                <tspan x={productSvgProperties.text_x} dy={`${0.6 * (addressLineIndex == 0 ? 1 : 1.5)}em`}>
                                                    {addressLine}
                                                </tspan>
                                            );
                                        })}
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
                    {/* product form */}
                    <div className="">
                        <div className="field w-full">
                            <label htmlFor="logoImageUrl" className="block">
                                Product Image Url
                            </label>
                            <InputText id="productImageUrl" value={productSvgProperties.product_image_url} onChange={(e) => onInputChange(e, 'product_image_url')} required autoFocus />
                        </div>
                    </div>
                    <div className="flex gap-3">
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
                        {/* <div className="field">
                            <label htmlFor="productImageHeight" className="block">
                                Product Image Height
                            </label>
                            <InputNumber id="productImageHeight" value={productSvgProperties.product_image_height} onChange={(e) => onInputNumberChange(e, 'product_image_height')} required />
                        </div> */}
                    </div>
                    {/* label form */}
                    <div className="">
                        <div className="field w-full">
                            <label htmlFor="labelImageUrl" className="block">
                                Label Image Url
                            </label>
                            <InputText id="labelImageUrl" value={productSvgProperties.label_image_url} onChange={(e) => onInputChange(e, 'label_image_url')} required autoFocus />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="field">
                            <label htmlFor="labelImageX" className="block">
                                Label Image X
                            </label>
                            <InputNumber id="labelImageX" value={productSvgProperties.label_image_x} onChange={(e) => onInputNumberChange(e, 'label_image_x')} required autoFocus />
                        </div>
                        <div className="field">
                            <label htmlFor="labelImageY" className="block">
                                Label Image Y
                            </label>
                            <InputNumber id="labelImageY" value={productSvgProperties.label_image_y} onChange={(e) => onInputNumberChange(e, 'label_image_y')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="labelImageY" className="block">
                                Label Image Width
                            </label>
                            <InputNumber id="labelImageWidth" value={productSvgProperties.label_image_width} onChange={(e) => onInputNumberChange(e, 'label_image_width')} required />
                        </div>
                        {/* <div className="field">
                            <label htmlFor="labelImageHeight" className="block">
                                Label Image Height
                            </label>
                            <InputNumber id="labelImageHeight" value={productSvgProperties.label_image_height} onChange={(e) => onInputNumberChange(e, 'label_image_height')} required />
                        </div> */}
                    </div>
                    {/* logo form */}
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
                            <label htmlFor="logoImageWidth" className="block">
                                Logo Image Width
                            </label>
                            <InputNumber id="logoImageWidth" value={productSvgProperties.logo_image_width} onChange={(e) => onInputNumberChange(e, 'logo_image_width')} required />
                        </div>
                        {/* <div className="field">
                            <label htmlFor="logoImageHeight" className="block">
                                Logo Image Height
                            </label>
                            <InputNumber id="logoImageHeight" value={productSvgProperties.logo_image_height} onChange={(e) => onInputNumberChange(e, 'logo_image_height')} required />
                        </div> */}
                    </div>
                    {/* text form */}
                    <div className="">
                        <div className="field w-full">
                            <label htmlFor="textData" className="block">
                                Address
                            </label>
                            {/* <InputText id="logoImageUrl" value={productSvgProperties.logo_image_url} onChange={(e) => onInputChange(e, 'logo_image_url')} required autoFocus /> */}
                            <InputTextarea id="textData" placeholder="Your Message" autoResize rows="3" cols="30" onChange={(e) => onInputChange(e, 'text_data')}>
                                {productSvgProperties.text_data}
                            </InputTextarea>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="field">
                            <label htmlFor="textX" className="block">
                                Text X
                            </label>
                            <InputNumber id="textX" value={productSvgProperties.text_x} onChange={(e) => onInputNumberChange(e, 'text_x')} required autoFocus />
                        </div>
                        <div className="field">
                            <label htmlFor="textY" className="block">
                                Text Y
                            </label>
                            <InputNumber id="textY" value={productSvgProperties.text_y} onChange={(e) => onInputNumberChange(e, 'text_y')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="textLength" className="block">
                                Text length
                            </label>
                            <InputNumber id="textLength" value={productSvgProperties.text_length} onChange={(e) => onInputNumberChange(e, 'text_length')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="textFontSize" className="block">
                                Text Font Size
                            </label>
                            <InputNumber id="textFontSize" value={productSvgProperties.text_font_size} onChange={(e) => onInputNumberChange(e, 'text_font_size')} required />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;
