import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Layout, Checkbox, DropZone, Badge, Card, Select } from '@shopify/polaris';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ShopifyTable from './ShopifyTable';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const initialRows = [
    {
        id: 1,
        image: 'Snow',
        name: 'Jon',
        price: 60,
        shippingprice: 20,
        pricetodropshipping: 50,
        quantity: 2,
        feature: 'ajg',
        type: 'hair oil',
        status: 'Deactive',
        retail: "afasf  awrfasfaf",
        stock: 100,
        tags: ['afgbvasg', 'agasgreh'],
        collections: ['afgbvasg', 'agasgreh', 'ayfgasf'],
        weight: 270,
        category: 'free',
        sku: 'jgc',
        switchtooutofstock: false
    },
    {
        id: 2,
        image: 'Lannister',
        name: 'Cersei',
        price: 40,
        shippingprice: 20,
        pricetodropshipping: 10,
        quantity: 1,
        feature: 'aagasg',
        type: 'hair oil',
        status: 'Active',
        retail: "afasf  awrfasfaf",
        stock: 500,
        tags: ['afgbvasg', 'agasgreh'],
        collections: ['afgbvasg', 'agasgreh', 'ayfgasf'],
        weight: 260,
        category: 'primium ',
        sku: 'mosziag',
        switchtooutofstock: true
    },
    {
        id: 3,
        image: 'Lannister',
        name: 'Jaime',
        price: 50,
        shippingprice: 20,
        pricetodropshipping: 20,
        quantity: 5,
        feature: 'ajgagbagsb',
        type: 'oil',
        status: 'Deactive',
        retail: "afasffjbsf",
        stock: 5,
        tags: ['afgbvasg', 'agasgreh'],
        collections: ['afgbvasg', 'agasgreh', 'ayfgasf'],
        weight: 250,
        category: 'free',
        sku: 'Lannister',
        switchtooutofstock: false
    },
    {
        id: 4,
        image: 'Stark',
        name: 'Arya',
        price: 30,
        shippingprice: 20,
        pricetodropshipping: 40,
        quantity: 10,
        feature: 'oijln',
        type: 'hair oil',
        status: 'Active',
        retail: "afasf afhv awrfasfaf",
        stock: 10,
        tags: ['afgbvasg', 'agasgreh'],
        collections: ['afgbvasg', 'agasgreh', 'ayfgasf'],
        weight: 230,
        category: 'growth ',
        sku: 'oil',
        switchtooutofstock: true
    },
];

const options = [
    { label: 'Free', value: 'free' },
    { label: 'Primium', value: 'primium' },
    { label: 'Growth', value: 'growth' },
];

function Products() {
    const history = useHistory();
    const [editorData, setEditorData] = useState('');
    const [newCategory, setNewCategory] = useState(false);
    const [categoryData, setCategoryData] = useState({
        id: null,
        name: '',
        price: '',
        shippingprice: '',
        pricetodropshipping: '',
        quantity: '',
        description: '',
        feature: '',
        type: '',
        image: null,
        status: '',
        switchtooutofstock: '',
        weight: '',
        retail: '',
        stock: '',
        plan: '',
        category: '',
        sku: '',
        tags: [],
        collections: []
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [rows, setRows] = useState(initialRows);
    const [inStock, setInStock] = useState(true);
    const [errors, setErrors] = useState({
        name: '',
        price: '',
        shippingprice: '',
        pricetodropshipping: '',
        quantity: '',
        description: '',
        feature: '',
        type: '',
        image: '',
        status: '',
        switchtooutofstock: '',
        weight: '',
        retail: '',
        stock: '',
        plan: '',
        category: '',
        sku: '',
        tags: '',
        collections: ''
    });
    const [loading, setLoading] = useState(false);

    const handleEdit = (category) => {
        setCategoryData({
            ...category,
            planSelection: category.tags,
            collections: category.collections
        });
        setNewCategory(true);
    };

    const handleImageChange = (files) => {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            setLoading(true);

            reader.onloadend = () => {
                setTimeout(() => {
                    setCategoryData((prevData) => ({
                        ...prevData,
                        image: reader.result,
                    }));
                    setImagePreview(reader.result);
                    setLoading(false);
                }, 2000);
            };
            reader.readAsDataURL(file);
            setErrors((prevErrors) => ({
                ...prevErrors,
                image: '',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                image: 'Please select a valid image file.',
            }));
        }
    };

    const handleInputChange = (name, value) => {
        console.log(value, "value");
        if (name === 'plan') {
            setCategoryData((pre) => ({
                ...pre,
                plan: value
            }))
        } else if (name === "status") {
            setCategoryData((pre) => ({
                ...pre,
                status: value
            }))
            console.log(value, "status");
        } else if (name === 'switchtooutofstock') {
            setCategoryData((pre) => ({
                ...pre,
                switchtooutofstock: value
            }))
        }else if (name === "category") {
            setCategoryData((pre) => ({
                ...pre,
                category: value
            }))
            console.log(value, "category");
        } else {
            setCategoryData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
        setCategoryData((prevData) => ({
            ...prevData,
            description: data,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            description: '',
        }));
    };

    // console.log(editorData, "editorData");

    const handleSubmit = () => {
        if (validateForm()) {
            if (categoryData.id !== null) {
                const updatedRows = rows.map((row) => {
                    if (row.id === categoryData.id) {
                        return {
                            ...row,
                            name: categoryData.name,
                            description: categoryData.description,
                            price: categoryData.price,
                            status: categoryData.status,
                            switchtooutofstock: categoryData.switchtooutofstock,
                            shippingprice: categoryData.shippingprice,
                            pricetodropshipping: categoryData.pricetodropshipping,
                            plan: categoryData.plan,
                            quantity: categoryData.quantity,
                            feature: categoryData.feature,
                            type: categoryData.type,
                            image: categoryData.image,
                            weight: categoryData.weight,
                            retail: categoryData.retail,
                            stock: categoryData.stock,
                            category: categoryData.category,
                            sku: categoryData.sku,
                            tags: categoryData.tags,
                            collections: categoryData.collections,
                        };
                    }
                    return row;
                });
                setRows(updatedRows);
            } else {
                const newCategory = {
                    id: rows.length + 1,
                    name: categoryData.name,
                    description: categoryData.description,
                    price: categoryData.price,
                    shippingprice: categoryData.shippingprice,
                    pricetodropshipping: categoryData.pricetodropshipping,
                    status: categoryData.status,
                    switchtooutofstock: categoryData.switchtooutofstock,
                    plan: categoryData.plan,
                    quantity: categoryData.quantity,
                    feature: categoryData.feature,
                    type: categoryData.type,
                    image: categoryData.image,
                    weight: categoryData.weight,
                    retail: categoryData.retail,
                    stock: categoryData.stock,
                    status: categoryData.status,
                    category: categoryData.category,
                    sku: categoryData.sku,
                    tags: categoryData.tags,
                    collections: categoryData.collections,
                };
                setRows((prevRows) => [...prevRows, newCategory]);
            }

            // Reset form fields and related states
            setCategoryData({
                id: null,
                name: '',
                description: '',
                price: '',
                status: '',
                switchtooutofstock: '',
                shippingprice: '',
                pricetodropshipping: '',
                quantity: '',
                plan: '',
                feature: '',
                type: '',
                image: null,
                status: '',
                weight: '',
                retail: '',
                stock: '',
                category: '',
                sku: '',
                tags: [],
                collections: []
            });
            setNewCategory(false);
        }
        if (categoryData !== '') {
            console.log(categoryData, 'categoryData');
            history.push({ pathname: '/admin/manageable/editproduct', state: categoryData });
        }
    };

    // Function to validate form fields
    const validateForm = () => {
        let formIsValid = true;
        const newErrors = { ...errors };

        // Validate name field
        if (!categoryData.name) {
            newErrors.name = 'Name is required';
            formIsValid = false;
        } else {
            newErrors.name = '';
        }

         // Validate name field
         if (!categoryData.description) {
            newErrors.description = 'Description is required';
            formIsValid = false;
        } else {
            newErrors.description = '';
        }

        // Validate price field
        if (!categoryData.price) {
            newErrors.price = 'Price is required';
            formIsValid = false;
        } else {
            newErrors.price = '';
        }

        // Validate weight field
        if (!categoryData.weight) {
            newErrors.weight = 'weight is required';
            formIsValid = false;
        } else {
            newErrors.weight = '';
        }

        // Validate shippingprice field
        if (!categoryData.shippingprice) {
            newErrors.shippingprice = 'Shipping Price is required';
            formIsValid = false;
        } else {
            newErrors.shippingprice = '';
        }

        // Validate pricetodropshipping field
        if (!categoryData.pricetodropshipping) {
            newErrors.pricetodropshipping = 'Price to dropshipping is required';
            formIsValid = false;
        } else {
            newErrors.pricetodropshipping = '';
        }

        // Validate quantity field
        if (!categoryData.quantity) {
            newErrors.quantity = 'Quantity is required';
            formIsValid = false;
        } else {
            newErrors.quantity = '';
        }

        // Validate feature field
        if (!categoryData.feature) {
            newErrors.feature = 'Feature is required';
            formIsValid = false;
        } else {
            newErrors.feature = '';
        }

        // Validate type field
        if (!categoryData.type) {
            newErrors.type = 'Type is required';
            formIsValid = false;
        } else {
            newErrors.type = '';
        }

        // Validate image field
        if (!categoryData.image) {
            newErrors.image = 'Image is required';
            formIsValid = false;
        } else {
            newErrors.image = '';
        }

        // Validate tags field
        if (categoryData.tags.length === 0) {
            newErrors.tags = 'At least one tag is required';
            formIsValid = false;
        } else {
            newErrors.tags = '';
        }

        // Validate collections field
        if (categoryData.collections.length === 0) {
            newErrors.collections = 'At least one collections is required';
            formIsValid = false;
        } else {
            newErrors.collections = '';
        }

        // Validate category field
        if (!categoryData.category) {
            newErrors.category = 'category is required';
            formIsValid = false;
        } else {
            newErrors.category = '';
        }

        // Validate sku field
        if (!categoryData.sku) {
            newErrors.sku = 'sku is required';
            formIsValid = false;
        } else {
            newErrors.sku = '';
        }

        // Validate status field
        if (!categoryData.status) {
            newErrors.status = 'status is required';
            formIsValid = false;
        } else {
            newErrors.status = '';
        }

        // Validate retail field
        if (!categoryData.retail) {
            newErrors.retail = 'retail is required';
            formIsValid = false;
        } else {
            newErrors.retail = '';
        }

        // Validate stock field
        if (!categoryData.stock) {
            newErrors.stock = 'stock is required';
            formIsValid = false;
        } else {
            newErrors.stock = '';
        }

        // Validate plan field
        if (!categoryData.plan) {
            newErrors.plan = 'plan is required';
            formIsValid = false;
        } else {
            newErrors.plan = '';
        }

        // Update errors state
        setErrors(newErrors);

        return formIsValid;
    };

    const handleDeleteTag = (index) => {
        const newTags = [...categoryData.tags];
        const newcollections = [...categoryData.collections];
        newTags.splice(index, 1);
        setCategoryData((prevData) => ({
            ...prevData,
            tags: newTags,
            collections: newcollections
        }));
    };

    const option = [
        { label: 'Active', value: 'active' },
        { label: 'Draft', value: 'draft' }
    ]

    return (
        <>
            {newCategory ? (
                <>
                    <div className='product-main'>
                        <div className="main-text">
                            {categoryData.id !== null ? <h1 className='product-heading'>Edit Products</h1> : <h1 className='product-heading'>New Products</h1>}
                            <Button size="large" primary onClick={() => setNewCategory(false)}>
                                close
                            </Button>
                        </div>
                        <Layout>
                            <div className='otherfeild-product'>
                                <div className='text-field'>
                                    <div className='name-product'>
                                        <Card>
                                            <TextField
                                                label="Title"
                                                value={categoryData.name}
                                                onChange={(value) => handleInputChange('name', value)}
                                                error={errors.name}
                                                autoComplete="off"
                                            />
                                            <div className='ck-editor'>
                                                <p style={{ fontSize: 14 }}>Description</p>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={editorData}
                                                    onChange={handleEditorChange}
                                                    name="description"
                                                />
                                                {errors.description && (
                                                <div id=":r10:Error" class="Polaris-InlineError">
                                                    <div class="Polaris-InlineError__Icon">
                                                        <span class="Polaris-Icon">
                                                            <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                                                <path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z">
                                                                </path>
                                                                <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z">
                                                                </path>
                                                                <path fill-rule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z">
                                                                </path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    {errors.description}
                                                </div>
                                            )}
                                            </div>
                                        </Card>
                                    </div>
                                    <div className='product-img'>
                                        <Card>
                                            <div className='product-lebal'>
                                                <p style={{ fontSize: 15, fontWeight: 600 }}>Media</p>
                                            </div>
                                            <DropZone
                                                label="Photo"
                                                accept="image/*"
                                                type="image"
                                                error={errors.image}
                                                allowMultiple={true}
                                                onDrop={(files) => handleImageChange(files)}
                                            >
                                                {!imagePreview && (
                                                    <>
                                                        <div className='_Content_atpeq_47'>
                                                            <p>Add files</p>
                                                        </div>
                                                    </>
                                                )}
                                                {imagePreview && (
                                                    <img className='img-product' src={imagePreview} alt="Product" />
                                                )}
                                            </DropZone>
                                            {errors.image && (
                                                <div id=":r10:Error" class="Polaris-InlineError">
                                                    <div class="Polaris-InlineError__Icon">
                                                        <span class="Polaris-Icon">
                                                            <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                                                <path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z">
                                                                </path>
                                                                <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z">
                                                                </path>
                                                                <path fill-rule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z">
                                                                </path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    {errors.image}
                                                </div>
                                            )}
                                        </Card>
                                    </div>

                                    <div className='product-price'>
                                        <Card>
                                            <div className='product-lebal'>
                                                <p style={{ fontSize: 15 }}>Pricing</p>
                                            </div>
                                            <TextField
                                                type="number"
                                                label="Price"
                                                value={categoryData.price}
                                                onChange={(value) => handleInputChange('price', value)}
                                                error={errors.price}
                                                autoComplete="off"
                                            />
                                            <TextField
                                                type="number"
                                                label="Shipping Price"
                                                value={categoryData.shippingprice}
                                                onChange={(value) => handleInputChange('shippingprice', value)}
                                                error={errors.shippingprice}
                                                autoComplete="off"
                                            />
                                            <TextField
                                                type="number"
                                                label="Price to Dropshipping"
                                                value={categoryData.pricetodropshipping}
                                                onChange={(value) => handleInputChange('pricetodropshipping', value)}
                                                error={errors.pricetodropshipping}
                                                autoComplete="off"
                                            />
                                        </Card>
                                    </div>
                                    <div className='quantity-product'>
                                        <Card>
                                            <div className='product-lebal'>
                                                <p style={{ fontSize: 15 }}>Shipping</p>
                                            </div>
                                            <TextField
                                                type="number"
                                                label="Weight"
                                                value={categoryData.weight}
                                                onChange={(value) => handleInputChange('weight', value)}
                                                error={errors.weight}
                                                autoComplete="off"
                                            />
                                        </Card>
                                    </div>
                                    <div className='quantity-product'>
                                        <Card>
                                            <div className='product-lebal'>
                                                <p style={{ fontSize: 15, fontWeight: 600 }}>Inventory</p>
                                            </div>
                                            <TextField
                                                type="text"
                                                label="Retail"
                                                value={categoryData.retail}
                                                onChange={(value) => handleInputChange('retail', value)}
                                                error={errors.retail}
                                                autoComplete="off"
                                            />
                                            <TextField
                                                type="number"
                                                label="Stock"
                                                value={categoryData.stock}
                                                onChange={(value) => handleInputChange('stock', value)}
                                                error={errors.stock}
                                                autoComplete="off"
                                            />
                                            <Select
                                                label="Category"
                                                options={options}
                                                onChange={(value) => handleInputChange('category', value)}
                                                value={categoryData.category}
                                                error={errors.category}
                                            />
                                            <TextField
                                                label="Sku"
                                                value={categoryData.sku}
                                                onChange={(value) => handleInputChange('sku', value)}
                                                error={errors.sku}
                                                autoComplete="off"
                                            />
                                        </Card>
                                    </div>
                                </div>
                                <div className='product-status'>
                                    <div className='product-active'>
                                        <Card>
                                            <div className='product-lebal'>
                                                <p style={{ fontSize: 15 }}>Status</p>
                                            </div>
                                            <Select
                                                label="Status"
                                                options={option}
                                                onChange={(value) => handleInputChange('status', value)}
                                                value={categoryData.status}
                                                error={errors.status}
                                            />
                                        </Card>
                                    </div>
                                    <div className='product-active'>
                                        <Card>

                                            <FormControlLabel
                                                control={<Switch checked={categoryData.switchtooutofstock} onChange={(event) => handleInputChange('switchtooutofstock', event.target.checked)} />}
                                                label={inStock ? "In Stock" : "Out of Stock"}
                                            />
                                        </Card>
                                    </div>
                                    <div className='product-organization'>
                                        <Card>
                                            <div className='product-lebal'>
                                                <p style={{ fontSize: 15 }}>Product organization</p>
                                            </div>
                                            <TextField
                                                label="Type"
                                                value={categoryData.type}
                                                onChange={(value) => handleInputChange('type', value)}
                                                error={errors.type}
                                                autoComplete="off"
                                            />
                                            <TextField
                                                label="Collections"
                                                value={categoryData.collections.join(', ')}
                                                onChange={(value) => handleInputChange('collections', value.split(', '))}
                                                error={errors.collections}
                                            />
                                            <div className='tag-list'>
                                                {categoryData.collections.map((collections, index) => (
                                                    <Badge key={index} status="success" onDismiss={() => handleDeleteTag(index)}>
                                                        {collections}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <TextField
                                                label="Tag"
                                                value={categoryData.tags.join(', ')}
                                                onChange={(value) => handleInputChange('tags', value.split(', '))}
                                                error={errors.tags}
                                            />
                                            <div className='tag-list'>
                                                {categoryData.tags.map((tag, index) => (
                                                    <Badge key={index} status="success" onDismiss={() => handleDeleteTag(index)}>
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </Card>
                                    </div>
                                    <div className='plan-selection'>
                                        <Card>
                                            <div className='product-lebal'>
                                                <p style={{ fontSize: 15 }}>Select plan</p>
                                            </div>
                                            <Select
                                                label="Plan Selection"
                                                options={options}
                                                onChange={(value) => handleInputChange('plan', value)}
                                                value={categoryData.plan}
                                                error={errors.plan}
                                            />
                                        </Card>
                                    </div>
                                    <div className='quantity-product'>
                                        <Card>
                                            <div className='product-lebal'>
                                                <p style={{ fontSize: 15 }}>Quantity</p>
                                            </div>
                                            <TextField
                                                type="number"
                                                label="Quantity"
                                                value={categoryData.quantity}
                                                onChange={(value) => handleInputChange('quantity', value)}
                                                error={errors.quantity}
                                                autoComplete="off"
                                            />
                                            <TextField
                                                label="Feature"
                                                value={categoryData.feature}
                                                onChange={(value) => handleInputChange('feature', value)}
                                                error={errors.feature}
                                                autoComplete="off"
                                            />
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </Layout>

                        <div className='product-submit'>
                            <Button size="large" primary onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>

                    <br />
                </>
            ) : (
                <ShopifyTable
                    rows={rows}
                    setNewCategory={setNewCategory}
                    newCategory={newCategory}
                    handleEdit={handleEdit}
                />
            )}
        </>
    );
}

export default Products;

