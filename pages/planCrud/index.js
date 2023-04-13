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
import { PlanService } from '../../demo/service/PlanService';

const PlanCrud = () => {
    let emptyPlan = {
        package_id: null,
        package_name: '',
        description: '',
        is_popular: false,
        max_products: 0,
        has_personalized_branding: 0,
        has_branded_invoicing: 0,
        can_customize_product_images: 0,
        amount: 0,
        created_at: 0,
        updated_at: 0,
        trial_period_days: 0
    };

    const [plans, setPlans] = useState(null);
    const [planDialog, setPlanDialog] = useState(false);
    const [deletePlanDialog, setDeletePlanDialog] = useState(false);
    const [deletePlansDialog, setDeletePlansDialog] = useState(false);
    const [plan, setPlan] = useState(emptyPlan);
    const [selectedPlans, setSelectedPlans] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    useEffect(() => {
        const planService = new PlanService();
        planService.getPlans().then((data) => {
            console.log(data.data);
            setPlans(data.data);
        });
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setPlan(emptyPlan);
        setSubmitted(false);
        setPlanDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPlanDialog(false);
    };

    const hideDeletePlanDialog = () => {
        setDeletePlanDialog(false);
    };

    const hideDeletePlansDialog = () => {
        setDeletePlansDialog(false);
    };

    const savePlan = () => {
        setSubmitted(true);
        const planService = new PlanService();

        if (plan.package_name.trim()) {
            let _plans = [...plans];
            let _plan = { ...plan };
            if (plan.package_id) {
                planService.savePlan(_plan).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        const index = findIndexById(plan.package_id);
                        _plans[index] = _plan;
                        setPlans(_plans);
                        setPlanDialog(false);
                        setPlan(emptyPlan);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Plan Updated', life: 3000 });
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Plan not Updated', life: 3000 });
                    }
                });
            } else {
                planService.savePlan(_plan).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        _plans.push(_plan);
                        setPlans(_plans);
                        setPlanDialog(false);
                        setPlan(emptyPlan);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Plan Created', life: 3000 });
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Plan not Created', life: 3000 });
                    }
                });
            }
        }
    };

    const editPlan = (plan) => {
        setPlan({ ...plan });
        setPlanDialog(true);
    };

    const confirmDeletePlan = (plan) => {
        setPlan(plan);
        setDeletePlanDialog(true);
    };

    const deletePlan = () => {
        const planService = new PlanService();

        planService.deletePlan(plan.package_id).then((res) => {
            console.log(res);
            if (res.status == 200) {
                let _plans = plans.filter((val) => val.package_id !== plan.package_id);
                setPlans(_plans);
                setDeletePlanDialog(false);
                setPlan(emptyPlan);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Plan Deleted', life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Plan not Deleted', life: 3000 });
            }
        });
    };

    const findIndexById = (package_id) => {
        let index = -1;
        for (let i = 0; i < plans.length; i++) {
            if (plans[i].package_id === package_id) {
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
        setDeletePlansDialog(true);
    };

    // const onCategoryChange = (e) => {
    //     let _plan = { ...plan };
    //     _plan['category'] = e.value;
    //     setPlan(_plan);
    // };

    const onDurationChange = (e) => {
        let _plan = { ...plan };
        _plan['duration'] = e.value;
        setPlan(_plan);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _plan = { ...plan };
        _plan[`${name}`] = val;

        setPlan(_plan);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _plan = { ...plan };
        _plan[`${name}`] = val;

        setPlan(_plan);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedPlans || !selectedPlans.length} />
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

    const packageIdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.package_id}
            </>
        );
    };

    const packageNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.package_name}
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
    const durationBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Duration</span>
                {rowData.duration}
            </>
        );
    };

    const isPopularBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Popular</span>
                {rowData.is_popular}
            </>
        );
    };

    const maxProductsBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Max Products</span>
                {rowData.max_products}
            </>
        );
    };

    const hasPersonalizedBrandingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Personalised Branding</span>
                {rowData.has_personalized_branding}
            </>
        );
    };

    const hasBrandedInvoicingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Branded Invoiceing</span>
                {rowData.has_branded_invoicing}
            </>
        );
    };

    const canCustomizeProductImagesBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Customization</span>
                {rowData.can_customize_product_images}
            </>
        );
    };

    const amountBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Amount</span>
                {formatCurrency(rowData.amount)}
            </>
        );
    };
    const createdAtBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Created At</span>
                {formatCurrency(rowData.created_at)}
            </>
        );
    };
    const updatedAtBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Updated At</span>
                {formatCurrency(rowData.updated_at)}
            </>
        );
    };
    const trialPeriodDaysBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Trial Period Days</span>
                {formatCurrency(rowData.trial_period_days)}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editPlan(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletePlan(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Plans</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const planDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={savePlan} />
        </>
    );
    const deletePlanDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePlanDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletePlan} />
        </>
    );
    const deletePlansDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePlansDialog} />
            {/* <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedPlans} /> */}
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
                        value={plans}
                        selection={selectedPlans}
                        onSelectionChange={(e) => setSelectedPlans(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} plans"
                        globalFilter={globalFilter}
                        emptyMessage="No plans found."
                        header={header}
                        responsiveLayout="scroll"
                        scrollable
                    >
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '2rem' }}></Column> */}
                        <Column field="package_id" header="ID" sortable body={packageIdBodyTemplate}></Column>
                        <Column field="package_name" header="Name" sortable body={packageNameBodyTemplate}></Column>
                        <Column field="description" header="Description" sortable body={descriptionBodyTemplate}></Column>
                        <Column field="duration" header="Duration" sortable body={durationBodyTemplate}></Column>
                        <Column field="is_popular" header="Popular" sortable body={isPopularBodyTemplate}></Column>
                        <Column field="max_products" header="Max Products" sortable body={maxProductsBodyTemplate}></Column>
                        <Column field="has_personalized_branding" header="Personalized Branding" sortable body={hasPersonalizedBrandingBodyTemplate}></Column>
                        <Column field="has_branded_invoicing" header="Branded Invoicing" sortable body={hasBrandedInvoicingBodyTemplate}></Column>
                        <Column field="can_customize_product_images" header="Image Customization" sortable body={canCustomizeProductImagesBodyTemplate}></Column>
                        <Column field="amount" header="Amount" sortable body={amountBodyTemplate}></Column>
                        <Column field="created_at" header="Created At" sortable body={createdAtBodyTemplate}></Column>
                        <Column field="updated_at" header="Updated At" sortable body={updatedAtBodyTemplate}></Column>
                        <Column field="trial_period_days" header="Trial Days" sortable body={trialPeriodDaysBodyTemplate}></Column>

                        <Column field="Actions" header="Actions" body={actionBodyTemplate} frozen={true} alignFrozen="right"></Column>
                    </DataTable>

                    <Dialog visible={planDialog} style={{ width: '450px' }} header="Plan Details" modal className="p-fluid" footer={planDialogFooter} onHide={hideDialog}>
                        {/* {plan.image && <img src={`${contextPath}/demo/images/plan/${plan.image}`} alt={plan.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
                        <div className="field">
                            <label htmlFor="packageName">Package Name</label>
                            <InputText id="packageName" value={plan.package_name} onChange={(e) => onInputChange(e, 'package_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !plan.package_name })} />
                            {submitted && !plan.package_name && <small className="p-invalid">Package Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={plan.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label className="mb-3">Duration</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="duration1" name="duration" value="Month" onChange={onDurationChange} checked={plan.duration === 'Month'} />
                                    <label htmlFor="duration1">Month</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="duration2" name="duration" value="Year" onChange={onDurationChange} checked={plan.duration === 'Year'} />
                                    <label htmlFor="duration2">Year</label>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="packageTrialPeriodDays">Trial Period Days</label>
                            <InputNumber
                                id="packageTrialPeriodDays"
                                value={plan.trial_period_days}
                                onChange={(e) => onInputChange(e, 'trial_period_days')}
                                required
                                autoFocus
                                className={classNames({ 'p-invalid': submitted && !plan.trial_period_days })}
                            />
                            {submitted && !plan.trial_period_days && <small className="p-invalid">Trial Days is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="maxProducts">Max Products</label>
                            <InputNumber id="maxProducts" value={plan.max_products} onValueChange={(e) => onInputNumberChange(e, 'max_products')} min={0} />
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="hasPersonalizedBranding">Personalized Branding</label>
                                <InputSwitch id="hasPersonalizedBranding" name="has_personalized_branding" className="block" checked={plan.has_personalized_branding} onChange={(e) => onInputNumberChange(e, 'has_personalized_branding')} />
                            </div>
                            <div className="field col">
                                <label htmlFor="hasBrandedInvoicing">Branded Invoicing</label>
                                <InputSwitch id="hasBrandedInvoicing" name="has_branded_invoicing" className="block" checked={plan.has_branded_invoicing} onChange={(e) => onInputNumberChange(e, 'has_branded_invoicing')} />
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="popular">Popular</label>
                                <InputSwitch id="popular" name="is_popular" className="block" checked={plan.is_popular} onChange={(e) => onInputNumberChange(e, 'is_popular')} />
                            </div>
                            <div className="field col">
                                <label htmlFor="canCustomizeProductImages">Customize Product Images</label>
                                <InputSwitch id="canCustomizeProductImages" name="can_customize_product_images" className="block" checked={plan.can_customize_product_images} onChange={(e) => onInputNumberChange(e, 'can_customize_product_images')} />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="amount">Amount</label>
                            <InputNumber id="amount" value={plan.amount} onValueChange={(e) => onInputNumberChange(e, 'amount')} min={0} />
                        </div>
                    </Dialog>

                    <Dialog visible={deletePlanDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePlanDialogFooter} onHide={hideDeletePlanDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {plan && (
                                <span>
                                    Are you sure you want to delete <b>{plan.package_name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePlansDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePlansDialogFooter} onHide={hideDeletePlansDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {plan && <span>Are you sure you want to delete the selected plans?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default PlanCrud;
