import getConfig from 'next/config';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { ColorPicker } from 'primereact/colorpicker';
import { Chips } from 'primereact/chips';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import { Badge } from 'primereact/badge';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';

const ProductCrud = () => {
    let emptyProduct = {
        product_id: null,
        product_title: '',
        product_handle: '',
        price: 0,
        shipping_price: 0,
        shipping_time: '',
        retail_price: 0,
        description: '',
        featured_image: '',
        product_sku: '',
        quantity: 0,
        preferred_background_color: '#fff',
        sample_order_price: 0,
        product_type: '',
        product_vendor: '',
        tags: '',
        order: 0,
        is_custom: 0
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then((data) => {
            console.log(data.data);
            setProducts(data.data);
        });
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);
        const productService = new ProductService();

        if (product.product_title.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.product_id) {
                productService.saveProduct(_product).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        const index = findIndexById(product.product_id);
                        _products[index] = res.data;
                        setProducts(_products);
                        setProductDialog(false);
                        setProduct(emptyProduct);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Product not Updated', life: 3000 });
                    }
                });
            } else {
                productService.saveProduct(_product).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        _products.push(res.data);
                        setProducts(_products);
                        setProductDialog(false);
                        setProduct(emptyProduct);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Product not Created', life: 3000 });
                    }
                });
            }
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        const productService = new ProductService();

        productService.deleteProduct(product.product_id).then((res) => {
            console.log(res);
            if (res.status == 200) {
                let _products = products.filter((val) => val.product_id !== product.product_id);
                setProducts(_products);
                setDeleteProductDialog(false);
                setProduct(emptyProduct);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Product not Deleted', life: 3000 });
            }
        });
    };

    const findIndexById = (product_id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].product_id === product_id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    //On change Events for custom fields
    const onDurationChange = (e) => {
        let _product = { ...product };
        _product['duration'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputSwitchChange = (e, name) => {
        const val = e.target && e.target.value ? '1' : '0';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputColorChange = (e, name) => {
        const val = e.target && e.target.value;
        let _product = { ...product };
        _product[`${name}`] = '#' + val;

        setProduct(_product);
    };

    const onInputFileChange = async (e, name) => {
        const file = e.files[0];

        const val = e.files && e.files[0];
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    //Templates for column data
    const productIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.product_id}
            </>
        );
    };
    const productTitleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Title</span>
                {rowData.product_title}
            </>
        );
    };
    const productHandleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Handle</span>
                {rowData.product_handle}
            </>
        );
    };
    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {rowData.price}
            </>
        );
    };
    const shippingPriceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Shipping Price</span>
                {rowData.shipping_price}
            </>
        );
    };
    const shippingTimeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Shipping Time</span>
                {rowData.shipping_time}
            </>
        );
    };
    const retailPriceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Retail Price</span>
                {rowData.retail_price}
            </>
        );
    };
    const descriptionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Description</span>
                {rowData.description}
            </>
        );
    };
    const featuredImageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Featured Image</span>
                <img src={rowData.featured_image} alt={rowData.product_title} className="w-full" />
            </>
        );
    };
    const productSkuBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Sku</span>
                {rowData.product_sku}
            </>
        );
    };
    const quantityBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Quantity</span>
                {rowData.quantity}
            </>
        );
    };
    const preferredBackgroundColorBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Preferred Background</span>
                <span className="h-2rem w-2rem shadow-4 border-round-md" style={{ backgroundColor: rowData.preferred_background_color }}>
                    {/* {rowData.preferred_background_color} */}
                </span>
            </>
        );
    };
    const sampleOrderPriceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Sample Order Price</span>
                {rowData.sample_order_price}
            </>
        );
    };
    const productTypeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Type</span>
                {rowData.product_type}
            </>
        );
    };
    const productVendorBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Vendor</span>
                {rowData.product_vendor}
            </>
        );
    };
    const tagsBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tags</span>
                {rowData.tags.map((tag, tagIndex) => {
                    return <Badge value={tag} key={tagIndex}></Badge>;
                })}
            </>
        );
    };
    const orderBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Order</span>
                {rowData.order}
            </>
        );
    };
    const isCustomBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Custom</span>
                {rowData.is_custom === '1' ? 'Yes' : 'No'}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            {/* <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} /> */}
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={products}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        showGridlines
                        rowsPerPageOptions={[5, 10, 25]}
                        // className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="400px"
                    >
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="product_id" header="Id" sortable body={productIdBodyTemplate}></Column>
                        <Column style={{ width: 'min-content', minWidth: '5rem' }} field="featured_image" header="Image" sortable body={featuredImageBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="product_title" header="Title" sortable body={productTitleBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="product_handle" header="Handle" sortable body={productHandleBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="price" header="Price" sortable body={priceBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="shipping_price" header="Shipping Price" sortable body={shippingPriceBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="shipping_time" header="Shipping Time" sortable body={shippingTimeBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="retail_price" header="Retail Price" sortable body={retailPriceBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="description" header="Description" sortable body={descriptionBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="product_sku" header="Sku" sortable body={productSkuBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="quantity" header="Quantity" sortable body={quantityBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="preferred_background_color" header="Preferred Background" sortable body={preferredBackgroundColorBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="sample_order_price" header="Sample Order Price" sortable body={sampleOrderPriceBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="product_type" header="Type" sortable body={productTypeBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="product_vendor" header="Vendor" sortable body={productVendorBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem', flexWrap: 'wrap', gap: '2px' }} field="tags" header="Tags" sortable body={tagsBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="order" header="Order" sortable body={orderBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="is_custom" header="Custom" sortable body={isCustomBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem' }} field="Actions" header="Actions" body={actionBodyTemplate} frozen={true} alignFrozen="right"></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '700px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {/* {product.image && <img src={`${contextPath}/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
                        <div className="field">
                            <label htmlFor="productTitle">product Title</label>
                            <InputText id="productTitle" value={product.product_title} onChange={(e) => onInputChange(e, 'product_title')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.product_title })} />
                            {submitted && !product.product_title && <small className="p-invalid">Product Title is required.</small>}
                        </div>
                        {/* <div className="field">
                            <label htmlFor="productHandle">Product Handle</label>
                            <InputText id="productHandle" value={product.product_handle} onChange={(e) => onInputChange(e, 'product_handle')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.product_handle })} />
                            {submitted && !product.product_handle && <small className="p-invalid">Product Handle is required.</small>}
                        </div> */}
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} min={0} />
                            </div>
                            <div className="field col">
                                <label htmlFor="retailPrice">Retail Price</label>
                                <InputNumber id="retailPrice" value={product.retail_price} onValueChange={(e) => onInputNumberChange(e, 'retail_price')} min={0} />
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="sampleOrderPrice">Sample Order Price</label>
                                <InputNumber id="sampleOrderPrice" value={product.sample_order_price} onValueChange={(e) => onInputNumberChange(e, 'sample_order_price')} min={0} />
                            </div>
                            <div className="field col">
                                <label htmlFor="shippingPrice">Shipping Price</label>
                                <InputNumber id="shippingPrice" value={product.shipping_price} onValueChange={(e) => onInputNumberChange(e, 'shipping_price')} min={0} />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="shippingTime">Shipping Time</label>
                                <InputText id="shippingTime" value={product.shipping_time} onChange={(e) => onInputChange(e, 'shipping_time')} />
                            </div>
                            <div className="field col">
                                <label htmlFor="productSku">Product Sku</label>
                                <InputText id="productSku" value={product.product_sku} onChange={(e) => onInputChange(e, 'product_sku')} />
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="isCustom">Custom</label>
                                <InputSwitch id="isCustom" name="is_custom" className="block" checked={product.is_custom === '1' ? true : false} onChange={(e) => onInputSwitchChange(e, 'is_custom')} />
                            </div>
                            <div className="field col">
                                <label htmlFor="preferredBackgroundColor" className="w-full">
                                    Preferred Background Color
                                </label>
                                <ColorPicker id="preferred_background_color" format="hex" value={product.preferred_background_color} onChange={(e) => onInputColorChange(e, 'preferred_background_color')} className={'w-2rem'} />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="featuredImage">Featured Image</label>
                            {/* <InputNumber id="featuredImage" value={product.featured_image} onChange={(e) => onInputChange(e, 'featured_image')} name="featured_image" /> */}
                            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} onSelect={(e) => onInputFileChange(e, 'featured_image')} customUpload />
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} min={0} />
                            </div>
                            <div className="field col">
                                <label htmlFor="order">Order</label>
                                <InputNumber id="order" value={product.order} onValueChange={(e) => onInputNumberChange(e, 'order')} min={0} />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="tags">Tags</label>
                            <Chips id="tags" value={product.tags} onChange={(e) => onInputChange(e, 'tags')} name="tags" />
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="productType">Product Type</label>
                                <InputText id="productType" value={product.product_type} onChange={(e) => onInputChange(e, 'product_type')} />
                            </div>
                            <div className="field col">
                                <label htmlFor="productVendor">Product Vendor</label>
                                <InputText id="productVendor" value={product.product_vendor} onChange={(e) => onInputChange(e, 'product_vendor')} />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.product_title}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default ProductCrud;
