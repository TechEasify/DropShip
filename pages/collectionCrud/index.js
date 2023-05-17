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
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { CollectionService } from '../../demo/service/CollectionService';
import { Badge } from 'primereact/badge';
import { Chips } from 'primereact/chips';

const CollectionCrud = () => {
    let emptyCollection = {
        collection_id: null,
        collection_name: '',
        collection_slug: '',
        collection_description: '',
        collection_image: '',
        tags: ''
    };

    const [collections, setCollections] = useState(null);
    const [collectionDialog, setCollectionDialog] = useState(false);
    const [deleteCollectionDialog, setDeleteCollectionDialog] = useState(false);
    const [deleteCollectionsDialog, setDeleteCollectionsDialog] = useState(false);
    const [collection, setCollection] = useState(emptyCollection);
    const [selectedCollections, setSelectedCollections] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    useEffect(() => {
        const collectionService = new CollectionService();
        collectionService.getCollections().then((data) => {
            console.log(data.data);
            setCollections(data.data);
        });
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setCollection(emptyCollection);
        setSubmitted(false);
        setCollectionDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCollectionDialog(false);
    };

    const hideDeleteCollectionDialog = () => {
        setDeleteCollectionDialog(false);
    };

    const hideDeleteCollectionsDialog = () => {
        setDeleteCollectionsDialog(false);
    };

    const saveCollection = () => {
        setSubmitted(true);
        const collectionService = new CollectionService();

        if (collection.collection_name.trim()) {
            let _collections = [...collections];
            let _collection = { ...collection };
            if (collection.collection_id) {
                collectionService.saveCollection(_collection).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        const index = findIndexById(collection.collection_id);
                        _collections[index] = res.data;
                        setCollections(_collections);
                        setCollectionDialog(false);
                        setCollection(emptyCollection);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Collection Updated', life: 3000 });
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Collection not Updated', life: 3000 });
                    }
                });
            } else {
                collectionService.saveCollection(_collection).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        _collections.push(res.data);
                        setCollections(_collections);
                        setCollectionDialog(false);
                        setCollection(emptyCollection);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Collection Created', life: 3000 });
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Collection not Created', life: 3000 });
                    }
                });
            }
        }
    };

    const editCollection = (collection) => {
        setCollection({ ...collection });
        setCollectionDialog(true);
    };

    const confirmDeleteCollection = (collection) => {
        setCollection(collection);
        setDeleteCollectionDialog(true);
    };

    const deleteCollection = () => {
        const collectionService = new CollectionService();

        collectionService.deleteCollection(collection.collection_id).then((res) => {
            console.log(res);
            if (res.status == 200) {
                let _collections = collections.filter((val) => val.collection_id !== collection.collection_id);
                setCollections(_collections);
                setDeleteCollectionDialog(false);
                setCollection(emptyCollection);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Collection Deleted', life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Collection not Deleted', life: 3000 });
            }
        });
    };

    const findIndexById = (collection_id) => {
        let index = -1;
        for (let i = 0; i < collections.length; i++) {
            if (collections[i].collection_id === collection_id) {
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
        setDeleteCollectionsDialog(true);
    };

    const onInputFileChange = async (e, name) => {
        const file = e.files[0];

        const val = e.files && e.files[0];
        let _collection = { ...collection };
        _collection[`${name}`] = val;

        setCollection(_collection);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _collection = { ...collection };
        _collection[`${name}`] = val;

        setCollection(_collection);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _collection = { ...collection };
        _collection[`${name}`] = val;

        setCollection(_collection);
    };

    const onInputSwitchChange = (e, name) => {
        const val = e.target && e.target.value ? '1' : '0';
        let _collection = { ...collection };
        _collection[`${name}`] = val;

        setCollection(_collection);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedCollections || !selectedCollections.length} /> */}
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

    const collectionIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.collection_id}
            </>
        );
    };
    const collectionSlugBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Collection Slug</span>
                {rowData.collection_slug}
            </>
        );
    };
    const collectionNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Collection Name</span>
                {rowData.collection_name}
            </>
        );
    };
    const collectionDescriptionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Collection Description</span>
                {rowData.collection_description}
            </>
        );
    };

    const collectionImageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Collection Image</span>
                <img src={rowData.collection_image} alt={rowData.collection_name} className="w-3rem" />
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

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editCollection(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteCollection(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Collections</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const collectionDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveCollection} />
        </>
    );
    const deleteCollectionDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCollectionDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCollection} />
        </>
    );
    const deleteCollectionsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCollectionsDialog} />
            {/* <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedCollections} /> */}
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={collections}
                        selection={selectedCollections}
                        onSelectionChange={(e) => setSelectedCollections(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        showGridlines
                        rowsPerPageOptions={[5, 10, 25]}
                        // className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} collections"
                        globalFilter={globalFilter}
                        emptyMessage="No collections found."
                        header={header}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="400px"
                    >
                        <Column style={{ width: 'max-content', minWidth: '5rem', maxWidth: '10rem' }} field="collection_id" header="ID" sortable body={collectionIdBodyTemplate}></Column>
                        <Column style={{ width: 'min-content', minWidth: '5rem', maxWidth: '10rem', justifyContent: 'center' }} field="collection_image" header="Image" sortable body={collectionImageBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem', maxWidth: '10rem' }} field="collection_name" header="Name" sortable body={collectionNameBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem', maxWidth: '10rem' }} field="collection_slug" header="Slug" sortable body={collectionSlugBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem', maxWidth: '100rem' }} field="collection_description" header="Description" sortable body={collectionDescriptionBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem', maxWidth: '10rem', flexWrap: 'wrap', gap: '2px' }} field="tags" header="Tags" sortable body={tagsBodyTemplate}></Column>
                        <Column style={{ width: 'max-content', minWidth: '5rem', maxWidth: '10rem' }} field="Actions" header="Actions" body={actionBodyTemplate} frozen={true} alignFrozen="right"></Column>
                    </DataTable>

                    <Dialog visible={collectionDialog} style={{ width: '700px' }} header="Collection Details" modal className="p-fluid" footer={collectionDialogFooter} onHide={hideDialog}>
                        {/* {collection.image && <img src={`${contextPath}/demo/images/collection/${collection.image}`} alt={collection.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
                        <div className="field">
                            <label htmlFor="collectionName">Collection Name</label>
                            <InputText
                                id="collectionName"
                                value={collection.collection_name}
                                onChange={(e) => onInputChange(e, 'collection_name')}
                                required
                                autoFocus
                                className={classNames({ 'p-invalid': submitted && !collection.collection_name })}
                            />
                            {submitted && !collection.collection_name && <small className="p-invalid">Package Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="collectionDescription">Description</label>
                            <InputTextarea id="collectionDescription" value={collection.collection_description} onChange={(e) => onInputChange(e, 'collection_description')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="collectionImage">Collection Image</label>
                            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} onSelect={(e) => onInputFileChange(e, 'collection_image')} customUpload />
                        </div>
                        <div className="field">
                            <label htmlFor="tags">Tags</label>
                            <Chips id="tags" value={collection.tags} onChange={(e) => onInputChange(e, 'tags')} name="tags" />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCollectionDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCollectionDialogFooter} onHide={hideDeleteCollectionDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {collection && (
                                <span>
                                    Are you sure you want to delete <b>{collection.collection_name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCollectionsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCollectionsDialogFooter} onHide={hideDeleteCollectionsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {collection && <span>Are you sure you want to delete the selected collections?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CollectionCrud;
