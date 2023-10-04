import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';
import Link from 'next/link';
import { PlanService } from '../../demo/service/PlanService';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';

const Plans = () => {
    const [plans, setPlans] = useState(null);
    const [filteredPlans, setFilteredPlans] = useState(null);
    const [selectDurationButtonValue, setSelectDurationButtonValue] = useState(null);
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    useEffect(() => {
        const planService = new PlanService();
        planService.getPlans().then((data) => {
            console.log(data.data);
            setPlans(data.data);
        });
    }, []);

    useEffect(() => {
        setSelectDurationButtonValue({ name: 'Monthly', code: 'Month' });
        plans && setFilteredPlans(plans.filter((plan) => plan.duration == 'Month'));
    }, [plans]);

    useEffect(() => {
        plans && setFilteredPlans(plans.filter((plan) => plan.duration == selectDurationButtonValue.code));
    }, [selectDurationButtonValue]);

    const durationChangeHandler = (e) => {
        setSelectDurationButtonValue(e.value);
    };

    const selectDurationButtonOptions = [
        { name: 'Monthly', code: 'Month' },
        { name: 'Yearly', code: 'Year' }
    ];

    return (
        <>
            {filteredPlans && (
                <>
                    <div className="text-900 font-bold text-6xl mb-4">Set up your store, pick a plan later</div>
                    <div className="text-700 text-xl mb-6 line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
                    <div className="text-center my-3">
                        <h5>Choose Your Plan</h5>
                        <SelectButton value={selectDurationButtonValue} onChange={(e) => durationChangeHandler(e)} options={selectDurationButtonOptions} optionLabel="name" />
                    </div>
                    <div className="grid">
                        {filteredPlans.map((plan, planIndex) => {
                            return (
                                <div key={planIndex} className="col-12 lg:col">
                                    <div className="p-1 h-full">
                                        <div className={`shadow-2 p-3 h-full flex flex-column ${plan.is_popular === '1' ? 'text-white bg-indigo-500' : 'bg-white'}`} style={{ borderRadius: '6px' }}>
                                            <div className={`text-900 font-medium text-4xl mb-2 ${plan.is_popular === '1' ? 'text-white' : 'text-black'}`}>{plan.package_name}</div>
                                            <div className={`text-600 ${plan.is_popular === '1' ? 'text-white' : 'text-black'}`}>{plan.description}</div>
                                            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                                            <div className="flex align-items-center">
                                                <span className={`font-bold text-2xl text-900  ${plan.is_popular === '1' ? 'text-white' : 'text-black'}`}>{plan.amount}</span>
                                                <span className={`ml-2 font-medium text-600  ${plan.is_popular === '1' ? 'text-white' : 'text-black'}`}>/ month</span>
                                            </div>
                                            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                                            <ul className="list-none p-0 m-0 flex-grow-1">
                                                <li className="flex align-items-center mb-3">
                                                    <i className={`pi pi-check-circle mr-2  ${plan.is_popular === '1' ? 'text-green-200' : 'text-green-500'}`}></i>
                                                    <span>{plan.trial_period_days} Days Trial Period</span>
                                                </li>
                                                <li className="flex align-items-center mb-3">
                                                    <i className={`pi pi-check-circle mr-2  ${plan.is_popular === '1' ? 'text-green-200' : 'text-green-500'}`}></i> <span>{plan.max_products} Unique Products</span>
                                                </li>
                                                {plan.has_personalized_branding === '1' && (
                                                    <li className="flex align-items-center mb-3">
                                                        <i className={`pi pi-check-circle mr-2  ${plan.is_popular === '1' ? 'text-green-200' : 'text-green-500'}`}></i> <span>Personalized Branding</span>
                                                    </li>
                                                )}
                                                {plan.has_branded_invoicing === '1' && (
                                                    <li className="flex align-items-center mb-3">
                                                        <i className={`pi pi-check-circle mr-2  ${plan.is_popular === '1' ? 'text-green-200' : 'text-green-500'}`}></i> <span>Branded Invoicing</span>
                                                    </li>
                                                )}
                                                {plan.can_customize_product_images === '1' && (
                                                    <li className="flex align-items-center mb-3">
                                                        <i className={`pi pi-check-circle mr-2  ${plan.is_popular === '1' ? 'text-green-200' : 'text-green-500'}`}></i> <span>Customize Product Image Background</span>
                                                    </li>
                                                )}
                                            </ul>
                                            <hr className="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                                            <Button label={`${plan.trial_period_days > 0? 'Try for free': 'Activate'}`} className={`p-3 w-full mt-auto ${plan.is_popular === '1' ? 'text-indigo-500 bg-white' : 'text-white bg-indigo-500'}`}></Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};

// Plans.getLayout = function getLayout(page) {
//     return (
//         <React.Fragment>
//             {page}
//         </React.Fragment>
//     );
// };

export default Plans;
