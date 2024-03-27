import React, { useState } from 'react'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import { Button, Select } from '@shopify/polaris';

function ManageMembership() {
    const [managePlan, setManagePlan] = useState('free');
    const [tabValue, setTabValue] = useState('1');
    const [formData, setFormData] = useState({
        freeMonthly: {
            productCatalogue: [],
            ordersamples: '',
            support: '',
            freeTrial: ''
        },
        freePriceMonth: 0,
        starterPriceMonth: 29.99,
        growthPriceMonth: 59.99,
        trialDays: 0,
        expiry: 30,
        productSelection: [],
        featuredProduct: [],
        orderLimit: 0
    });

    const [annuallyData, setAnnuallyData] = useState({
        annually: {
            productCatalogue: [],
            annuallyOrderSamples: '',
            support: '',
            annualyTrial: ''
        },
        freePriceAnnual: 0,
        starterPriceAnnual: 19.99,
        growthPriceAnnual: 49.99,
        annuallyTrialDays: 0,
        annuallyExpiry: 365,
        productSelection: [],
        featuredProduct: [],
        orderLimit: 0
    });

    const [error, setError] = useState({
        freeMonthly: {
            productCatalogue: "",
            ordersamples: "",
            support: "",
            trial: ''
        },
        trialDays: '',
        expiry: '',
        productSelection: "",
        featuredProduct: "",
        orderLimit: ""
    })

    const [errors, setErrors] = useState({
        annually: {
            productCatalogue: '',
            annuallyOrderSamples: '',
            support: '',
            annualyTrial: ''
        },
        annuallyTrialDays: '',
        annuallyExpiry: '',
        productSelection: '',
        featuredProduct: '',
        orderLimit: ''
    })

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
    ];

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChange = (name, checked, category, e) => {
        setFormData(prevData => {
            const updatedFreeMonthly = { ...prevData.freeMonthly };
            if (category === 'productSelection') {
                delete updatedFreeMonthly.imagemockups;
                delete updatedFreeMonthly.labeldesigning;
                delete updatedFreeMonthly.logodesigning;
            }

            return {
                ...prevData,
                freeMonthly: {
                    ...updatedFreeMonthly,
                    [name]: checked ? 'Active' : 'Deactive'
                },
                [category]: {
                    ...prevData[category],
                    [name]: checked ? 'Active' : 'Deactive'
                },
                trialDays: category === 'manage-catalogue' && name === 'trialDays' ? parseInt(e.target.value) || 0 : prevData.trialDays,
                expiry: category === 'manage-catalogue' && name === 'expiry' ? parseInt(e.target.value) || 0 : prevData.expiry
            };
        });

        // Clear the error message when the value is changed
        setError(prevErrors => ({
            ...prevErrors,
            freeMonthly: {
                ...prevErrors.freeMonthly,
                [name]: ''
            },
            featuredProduct: {
                ...prevErrors.featuredProduct,
                [name]: ''
            },
            [name]: ''
        }));
    };

    const handleChangeAnnually = (name, checked, category, e) => {
        setAnnuallyData(prevData => {
            const updatedFreeMonthly = { ...prevData.annually };
            if (category === 'productSelection') {
                delete updatedFreeMonthly.imagemockups;
                delete updatedFreeMonthly.labeldesigning;
                delete updatedFreeMonthly.logodesigning;
            }

            return {
                ...prevData,
                annually: {
                    ...updatedFreeMonthly,
                    [name]: checked ? 'Active' : 'Deactive'
                },
                [category]: {
                    ...prevData[category],
                    [name]: checked ? 'Active' : 'Deactive'
                },
                annuallyTrialDays: category === 'manage-catalogue' && name === 'annuallyTrialDays' ? parseInt(e.target.value) || 0 : prevData.annuallyTrialDays,
                annuallyExpiry: category === 'manage-catalogue' && name === 'annuallyExpiry' ? parseInt(e.target.value) || 0 : prevData.annuallyExpiry
            };
        });
        // Clear the error message when the value is changed
        setErrors(prevErrors => ({
            ...prevErrors,
            annually: {
                ...prevErrors.annually,
                [name]: ''
            },
            featuredProduct: {
                ...prevErrors.featuredProduct,
                [name]: ''
            },
            [name]: ''
        }));
    };

    const handleSubmit = () => {
        // Submit logic here
        if (validateForm()) {
            console.log(formData, "formData");
        }
    };

    const handleAnnualSubmit = () => {
        if (validateFormAnnually()) {
            console.log(annuallyData, "annuallyData");
        }
    }

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = { ...error };

        if (!formData.freeMonthly.ordersamples) {
            newErrors.freeMonthly.ordersamples = 'Order Sample is required';
            formIsValid = false;
        } else {
            newErrors.freeMonthly.ordersamples = '';
        }

        if (!formData.freeMonthly.support) {
            newErrors.freeMonthly.support = 'Email/Chat Support is required';
            formIsValid = false;
        } else {
            newErrors.freeMonthly.support = '';
        }

        if (formData.freeMonthly.productCatalogue.length === 0) {
            newErrors.freeMonthly.productCatalogue = 'At least one tag is required';
            formIsValid = false;
        } else {
            newErrors.freeMonthly.productCatalogue = '';
        }

        if (formData.freeMonthly.freeTrial === 'Active' && formData.trialDays > 14 && formData.trialDays !== 0) {
            newErrors.trialDays = 'Maximum trial duration is 14 days';
            formIsValid = false;
        } else if (formData.trialDays === 0) {
            newErrors.trialDays = 'Trial days cannot be 0';
            formIsValid = false;
        } else {
            newErrors.trialDays = '';
        }

        setError(newErrors);

        return formIsValid;
    }

    const validateFormAnnually = () => {
        let formIsValid = true;
        const newErrors = { ...errors };

        if (!annuallyData.annually.annuallyOrderSamples) {
            newErrors.annually.annuallyOrderSamples = 'Order Sample is required';
            formIsValid = false;
        } else {
            newErrors.annually.annuallyOrderSamples = '';
        }

        if (!annuallyData.annually.support) {
            newErrors.annually.support = 'Order Sample is required';
            formIsValid = false;
        } else {
            newErrors.annually.support = '';
        }

        if (!annuallyData.annually.support) {
            newErrors.annually.support = 'Email/Chat Support is required';
            formIsValid = false;
        } else {
            newErrors.annually.support = '';
        }

        if (annuallyData.annually.productCatalogue.length === 0) {
            newErrors.annually.productCatalogue = 'At least one tag is required';
            formIsValid = false;
        } else {
            newErrors.annually.productCatalogue = '';
        }

        if (annuallyData.annually.annualyTrial === 'Active' && annuallyData.annuallyTrialDays > 60 && annuallyData.annuallyTrialDays !== 0) {
            newErrors.annuallyTrialDays = 'Maximum trial duration is 60 days';
            formIsValid = false;
        } else if (annuallyData.annuallyTrialDays === 0) {
            newErrors.annuallyTrialDays = 'Trial days cannot be 0';
            formIsValid = false;
        } else {
            newErrors.annuallyTrialDays = '';
        }

        setErrors(newErrors);

        return formIsValid;
    };

    const handleDeleteTag = (index) => {
        const newTags = [...formData.freeMonthly.productCatalogue];
        newTags.splice(index, 1);
        setFormData(prevData => ({
            ...prevData,
            freeMonthly: {
                ...prevData.freeMonthly,
                productCatalogue: newTags
            }
        }));
    };

    const handleDeleteAnnualyTag = (index) => {
        const newTags = [...annuallyData.annually.productCatalogue];
        newTags.splice(index, 1);
        setAnnuallyData(prevData => ({
            ...prevData,
            annually: {
                ...prevData.annually,
                productCatalogue: newTags
            }
        }));
    };

    const handleInc = () => {
        setFormData((prev) => ({
            ...prev,
            orderLimit: prev.orderLimit + 1
        }))

    }

    const handleDec = () => {
        setFormData((prev) => ({
            ...prev,
            orderLimit: prev.orderLimit - 1
        }))
    }

    const handleIncrement = () => {
        setAnnuallyData((prev) => ({
            ...prev,
            orderLimit: prev.orderLimit + 1
        }))

    }

    const handleDecrement = () => {
        setAnnuallyData((prev) => ({
            ...prev,
            orderLimit: prev.orderLimit - 1
        }))
    }

    const handleChangePlan = (value) => {
        setManagePlan(value)
    }

    const options = [
        { label: 'Free', value: 'free' },
        { label: 'Starter', value: 'starter' },
        { label: 'Growth', value: 'growth' },
    ];

    return (
        <>
            <div className='ManageMembership'>
                <h2 className='category-heading'>Manage Membership</h2>
                <div className='manage-membership'>
                    <div className='manage-head'>
                        <h6>Plan</h6>
                    </div>
                    <div className='manage-select'>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={managePlan}
                                    onChange={handleChangePlan}
                                    options={options}
                                    placeholder='Please Select Plan'
                                />
                            </FormControl>
                        </Box>
                    </div>
                </div>

                {
                    managePlan === "free" &&
                    <div className='membership-free'>
                        <div className='free-head'>
                            <h5 className='membership-heading'>Free Plan</h5>
                        </div>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={tabValue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                        <Tab label="Monthly" value="1" />
                                        <Tab label="Annually" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    {/* Display manage-catalogue only if Monthly tab is selected */}
                                    {tabValue === '1' && (
                                        <>
                                            <div className='price-manage'>
                                                <div className='price'>
                                                    <h6>Price</h6>
                                                </div>
                                                <div className='price-value'>
                                                    <input
                                                        type="number"
                                                        value={formData.freePriceMonth}
                                                        onChange={(e) => setFormData((prevData) => ({
                                                            ...prevData,
                                                            freePriceMonth: e.target.value
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>100+ Product Catalogue</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <Autocomplete
                                                        multiple
                                                        className='AutoTag'
                                                        id="tags-filled"
                                                        options={top100Films.map((option) => option.title)}
                                                        value={formData.freeMonthly.productCatalogue}
                                                        onChange={(event, newValue) => {
                                                            setFormData((prevData) => ({
                                                                ...prevData,
                                                                freeMonthly: {
                                                                    ...prevData.freeMonthly,
                                                                    productCatalogue: newValue
                                                                }
                                                            }));
                                                        }}
                                                        freeSolo
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: null,
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <span className="error">{error.freeMonthly.productCatalogue}</span>
                                            <div className='catalogue-input'>
                                                <div className="rendered-catalogue">
                                                    {formData.freeMonthly.productCatalogue.map((option, index) => (
                                                        <Chip key={index} variant="outlined" label={option} onDelete={() => handleDeleteTag(index)} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Trial</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.freeMonthly.trial} checked={formData.freeMonthly.trial === 'Active'} onChange={(e) => handleChange('trial', e.target.checked, 'freeMonthly')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            {
                                                formData.freeMonthly.trial === 'Active' &&
                                                <>
                                                    <div className='manage-catalogue'>
                                                        <div className='catalogue-text'>
                                                            <h6>Trial Days</h6>
                                                        </div>
                                                        <div className='catalogue-select'>
                                                            <input name='trialDays' value={formData.trialDays} onChange={(e) => handleChange('trialDays', true, 'manage-catalogue', e)} />
                                                        </div>
                                                    </div>
                                                    <span className="error">{error.trialDays}</span>
                                                </>
                                            }

                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Expiry</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <input name='expiry' disabled value={formData.expiry} onChange={(e) => handleChange('expiry', true, 'manage-catalogue', e)} />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Samples</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.freeMonthly.ordersamples} checked={formData.freeMonthly.ordersamples === 'Active'} onChange={(e) => handleChange('ordersamples', e.target.checked, 'freeMonthly')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <span className="error">{error.freeMonthly.ordersamples}</span>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Digital Services</h6>
                                                </div>
                                                <div className='digital-services'>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Logo Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.logodesigning} checked={formData.productSelection.logodesigning === 'Active'} onChange={(e) => handleChange('logodesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Label Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.labeldesigning} checked={formData.productSelection.labeldesigning === 'Active'} onChange={(e) => handleChange('labeldesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Image Mockups</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.imagemockups} checked={formData.productSelection.imagemockups === 'Active'} onChange={(e) => handleChange('imagemockups', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Packaging Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.packagingdesigning} checked={formData.productSelection.packagingdesigning === 'Active'} onChange={(e) => handleChange('packagingdesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Email/Chat Support for App Installation</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.freeMonthly.support} checked={formData.freeMonthly.support === 'Active'} onChange={(e) => handleChange('support', e.target.checked, 'freeMonthly')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <span className="error">{error.freeMonthly.support}</span>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Featured Product</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.featuredProduct.support} checked={formData.featuredProduct.support === 'Active'} onChange={(e) => handleChange('support', e.target.checked, 'featuredProduct')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Limit</h6>
                                                </div>
                                                <div className='order-limit'>
                                                    <div className='inc-btn'>
                                                        <Button onClick={handleDec} className='increment'>-</Button>
                                                    </div>
                                                    <div className='number'>
                                                        <input type='number' value={formData.orderLimit} disabled />
                                                    </div>
                                                    <div className='dec-btn'>
                                                        <Button onClick={handleInc} className='increment'>+</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='submit'>
                                                <Button className="free-btn" onClick={handleSubmit}>Submit</Button>
                                            </div>
                                        </>
                                    )}
                                </TabPanel>
                                <TabPanel value="2">
                                    {/* Display manage-catalogue only if Annually tab is selected */}
                                    {tabValue === '2' && (
                                        <>
                                            <div className='price-manage'>
                                                <div className='price'>
                                                    <h6>Price</h6>
                                                </div>
                                                <div className='price-value'>
                                                    <input
                                                        type="number"
                                                        value={annuallyData.freePriceAnnual}
                                                        onChange={(e) => setAnnuallyData((prevData) => ({
                                                            ...prevData,
                                                            freePriceAnnual: e.target.value
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>100+ Product Catalogue</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <Autocomplete
                                                        multiple
                                                        className='AutoTag'
                                                        id="tags-filled"
                                                        options={top100Films.map((option) => option.title)}
                                                        value={annuallyData.annually.productCatalogue}
                                                        onChange={(event, newValue) => {
                                                            setAnnuallyData((prevData) => ({
                                                                ...prevData,
                                                                annually: {
                                                                    ...prevData.annually,
                                                                    productCatalogue: newValue
                                                                }
                                                            }));
                                                        }}
                                                        freeSolo
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: null,
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <span className="error">{errors.annually.productCatalogue}</span>
                                            <div className='catalogue-input'>
                                                <div className="rendered-catalogue">
                                                    {annuallyData.annually.productCatalogue.map((option, index) => (
                                                        <Chip key={index} variant="outlined" label={option} onDelete={() => handleDeleteAnnualyTag(index)} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Trial</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.annually.annualyTrial} checked={annuallyData.annually.annualyTrial === 'Active'} onChange={(e) => handleChangeAnnually('annualyTrial', e.target.checked, 'annually')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            {
                                                annuallyData.annually.annualyTrial === 'Active' &&
                                                <>
                                                    <div className='manage-catalogue'>
                                                        <div className='catalogue-text'>
                                                            <h6>Trial Days</h6>
                                                        </div>
                                                        <div className='catalogue-select'>
                                                            <input name='annuallyTrialDays' value={annuallyData.annuallyTrialDays} onChange={(e) => handleChangeAnnually('annuallyTrialDays', true, 'manage-catalogue', e)} />
                                                        </div>
                                                    </div>
                                                    <span className="error">{errors.annuallyTrialDays}</span>
                                                </>
                                            }
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Expiry</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <input name='annuallyExpiry' disabled value={annuallyData.annuallyExpiry} onChange={(e) => handleChangeAnnually('annuallyExpiry', true, 'manage-catalogue', e)} />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Samples</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.annually.annuallyOrderSamples} checked={annuallyData.annually.annuallyOrderSamples === 'Active'} onChange={(e) => handleChangeAnnually('annuallyOrderSamples', e.target.checked, 'annually')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <span className="error">{errors.annually.annuallyOrderSamples}</span>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Digital Services</h6>
                                                </div>
                                                <div className='digital-services'>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Logo Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.logodesigning} checked={annuallyData.productSelection.logodesigning === 'Active'} onChange={(e) => handleChangeAnnually('logodesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Label Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.labeldesigning} checked={annuallyData.productSelection.labeldesigning === 'Active'} onChange={(e) => handleChangeAnnually('labeldesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Image Mockups</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.imagemockups} checked={annuallyData.productSelection.imagemockups === 'Active'} onChange={(e) => handleChangeAnnually('imagemockups', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Packaging Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.packagingdesigning} checked={annuallyData.productSelection.packagingdesigning === 'Active'} onChange={(e) => handleChangeAnnually('packagingdesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Email/Chat Support for App Installation</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.annually.support} checked={annuallyData.annually.support === 'Active'} onChange={(e) => handleChangeAnnually('support', e.target.checked, 'annually')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Featured Product</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.featuredProduct.support} checked={annuallyData.featuredProduct.support === 'Active'} onChange={(e) => handleChangeAnnually('support', e.target.checked, 'featuredProduct')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Limit</h6>
                                                </div>
                                                <div className='order-limit'>
                                                    <div className='inc-btn'>
                                                        <Button onClick={handleDecrement} className='increment'>-</Button>
                                                    </div>
                                                    <div className='number'>
                                                        <input type='number' value={annuallyData.orderLimit} disabled />
                                                    </div>
                                                    <div className='dec-btn'>
                                                        <Button onClick={handleIncrement} className='increment'>+</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='submit'>
                                                <Button className="free-btn" onClick={handleAnnualSubmit}>Submit</Button>
                                            </div>
                                        </>
                                    )}
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                }


                {
                    managePlan === "starter" &&
                    <div className='membership-free'>
                        <div className='free-head'>
                            <h5 className='membership-heading'>Starter Plan</h5>
                        </div>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={tabValue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                        <Tab label="Monthly" value="1" />
                                        <Tab label="Annually" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    {/* Display manage-catalogue only if Monthly tab is selected */}
                                    {tabValue === '1' && (
                                        <>
                                            <div className='price-manage'>
                                                <div className='price'>
                                                    <h6>Price</h6>
                                                </div>
                                                <div className='price-value'>
                                                    <input
                                                        type="number"
                                                        value={formData.starterPriceMonth}
                                                        onChange={(e) => setFormData((prevData) => ({
                                                            ...prevData,
                                                            starterPriceMonth: e.target.value
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>100+ Product Catalogue</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <Autocomplete
                                                        multiple
                                                        className='AutoTag'
                                                        id="tags-filled"
                                                        options={top100Films.map((option) => option.title)}
                                                        value={formData.freeMonthly.productCatalogue}
                                                        onChange={(event, newValue) => {
                                                            setFormData((prevData) => ({
                                                                ...prevData,
                                                                freeMonthly: {
                                                                    ...prevData.freeMonthly,
                                                                    productCatalogue: newValue
                                                                }
                                                            }));
                                                        }}
                                                        freeSolo
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: null,
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <span className="error">{error.freeMonthly.productCatalogue}</span>
                                            <div className='catalogue-input'>
                                                <div className="rendered-catalogue">
                                                    {formData.freeMonthly.productCatalogue.map((option, index) => (
                                                        <Chip key={index} variant="outlined" label={option} onDelete={() => handleDeleteTag(index)} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Trial</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.freeMonthly.trial} checked={formData.freeMonthly.trial === 'Active'} onChange={(e) => handleChange('trial', e.target.checked, 'freeMonthly')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            {
                                                formData.freeMonthly.trial === 'Active' &&
                                                <>
                                                    <div className='manage-catalogue'>
                                                        <div className='catalogue-text'>
                                                            <h6>Trial Days</h6>
                                                        </div>
                                                        <div className='catalogue-select'>
                                                            <input name='trialDays' value={formData.trialDays} onChange={(e) => handleChange('trialDays', true, 'manage-catalogue', e)} />
                                                        </div>
                                                    </div>
                                                    <span className="error">{error.trialDays}</span>
                                                </>
                                            }

                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Expiry</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <input name='expiry' disabled value={formData.expiry} onChange={(e) => handleChange('expiry', true, 'manage-catalogue', e)} />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Samples</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.freeMonthly.ordersamples} checked={formData.freeMonthly.ordersamples === 'Active'} onChange={(e) => handleChange('ordersamples', e.target.checked, 'freeMonthly')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <span className="error">{error.freeMonthly.ordersamples}</span>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Digital Services</h6>
                                                </div>
                                                <div className='digital-services'>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Logo Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.logodesigning} checked={formData.productSelection.logodesigning === 'Active'} onChange={(e) => handleChange('logodesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Label Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.labeldesigning} checked={formData.productSelection.labeldesigning === 'Active'} onChange={(e) => handleChange('labeldesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Image Mockups</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.imagemockups} checked={formData.productSelection.imagemockups === 'Active'} onChange={(e) => handleChange('imagemockups', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Packaging Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.packagingdesigning} checked={formData.productSelection.packagingdesigning === 'Active'} onChange={(e) => handleChange('packagingdesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Email/Chat Support for App Installation</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.freeMonthly.support} checked={formData.freeMonthly.support === 'Active'} onChange={(e) => handleChange('support', e.target.checked, 'freeMonthly')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Featured Product</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.featuredProduct.support} checked={formData.featuredProduct.support === 'Active'} onChange={(e) => handleChange('support', e.target.checked, 'featuredProduct')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Limit</h6>
                                                </div>
                                                <div className='order-limit'>
                                                    <div className='inc-btn'>
                                                        <Button onClick={handleDec} className='increment'>-</Button>
                                                    </div>
                                                    <div className='number'>
                                                        <input type='number' value={formData.orderLimit} disabled />
                                                    </div>
                                                    <div className='dec-btn'>
                                                        <Button onClick={handleInc} className='increment'>+</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='submit'>
                                                <Button className="free-btn" onClick={handleSubmit}>Submit</Button>
                                            </div>
                                        </>
                                    )}
                                </TabPanel>
                                <TabPanel value="2">
                                    {/* Display manage-catalogue only if Annually tab is selected */}
                                    {tabValue === '2' && (
                                        <>
                                            <div className='price-manage'>
                                                <div className='price'>
                                                    <h6>Price</h6>
                                                </div>
                                                <div className='price-value'>
                                                    <input
                                                        type="number"
                                                        value={annuallyData.starterPriceAnnual}
                                                        onChange={(e) => setAnnuallyData((prevData) => ({
                                                            ...prevData,
                                                            starterPriceAnnual: e.target.value
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>100+ Product Catalogue</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <Autocomplete
                                                        multiple
                                                        className='AutoTag'
                                                        id="tags-filled"
                                                        options={top100Films.map((option) => option.title)}
                                                        value={annuallyData.annually.productCatalogue}
                                                        onChange={(event, newValue) => {
                                                            setAnnuallyData((prevData) => ({
                                                                ...prevData,
                                                                annually: {
                                                                    ...prevData.annually,
                                                                    productCatalogue: newValue
                                                                }
                                                            }));
                                                        }}
                                                        freeSolo
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: null,
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <span className="error">{errors.annually.productCatalogue}</span>
                                            <div className='catalogue-input'>
                                                <div className="rendered-catalogue">
                                                    {annuallyData.annually.productCatalogue.map((option, index) => (
                                                        <Chip key={index} variant="outlined" label={option} onDelete={() => handleDeleteAnnualyTag(index)} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Trial</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.annually.annualyTrial} checked={annuallyData.annually.annualyTrial === 'Active'} onChange={(e) => handleChangeAnnually('annualyTrial', e.target.checked, 'annually')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            {
                                                annuallyData.annually.annualyTrial === 'Active' &&
                                                <>
                                                    <div className='manage-catalogue'>
                                                        <div className='catalogue-text'>
                                                            <h6>Trial Days</h6>
                                                        </div>
                                                        <div className='catalogue-select'>
                                                            <input name='annuallyTrialDays' value={annuallyData.annuallyTrialDays} onChange={(e) => handleChangeAnnually('annuallyTrialDays', true, 'manage-catalogue', e)} />
                                                        </div>
                                                    </div>
                                                    <span className="error">{errors.annuallyTrialDays}</span>
                                                </>
                                            }
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Expiry</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <input name='annuallyExpiry' disabled value={annuallyData.annuallyExpiry} onChange={(e) => handleChangeAnnually('annuallyExpiry', true, 'manage-catalogue', e)} />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Samples</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.annually.annuallyOrderSamples} checked={annuallyData.annually.annuallyOrderSamples === 'Active'} onChange={(e) => handleChangeAnnually('annuallyOrderSamples', e.target.checked, 'annually')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <span className="error">{errors.annually.annuallyOrderSamples}</span>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Digital Services</h6>
                                                </div>
                                                <div className='digital-services'>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Logo Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.logodesigning} checked={annuallyData.productSelection.logodesigning === 'Active'} onChange={(e) => handleChangeAnnually('logodesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Label Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.labeldesigning} checked={annuallyData.productSelection.labeldesigning === 'Active'} onChange={(e) => handleChangeAnnually('labeldesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Image Mockups</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.imagemockups} checked={annuallyData.productSelection.imagemockups === 'Active'} onChange={(e) => handleChangeAnnually('imagemockups', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Packaging Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.packagingdesigning} checked={annuallyData.productSelection.packagingdesigning === 'Active'} onChange={(e) => handleChangeAnnually('packagingdesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Email/Chat Support for App Installation</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.annually.support} checked={annuallyData.annually.support === 'Active'} onChange={(e) => handleChangeAnnually('support', e.target.checked, 'annually')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Featured Product</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.featuredProduct.support} checked={annuallyData.featuredProduct.support === 'Active'} onChange={(e) => handleChangeAnnually('support', e.target.checked, 'featuredProduct')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Limit</h6>
                                                </div>
                                                <div className='order-limit'>
                                                    <div className='inc-btn'>
                                                        <Button onClick={handleDecrement} className='increment'>-</Button>
                                                    </div>
                                                    <div className='number'>
                                                        <input type='number' value={annuallyData.orderLimit} disabled />
                                                    </div>
                                                    <div className='dec-btn'>
                                                        <Button onClick={handleIncrement} className='increment'>+</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='submit'>
                                                <Button className="free-btn" onClick={handleAnnualSubmit}>Submit</Button>
                                            </div>
                                        </>
                                    )}
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                }

                {
                    managePlan === "growth" &&
                    <div className='membership-free'>
                        <div className='free-head'>
                            <h5 className='membership-heading'>Growth Plan</h5>
                        </div>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={tabValue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                        <Tab label="Monthly" value="1" />
                                        <Tab label="Annually" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    {/* Display manage-catalogue only if Monthly tab is selected */}
                                    {tabValue === '1' && (
                                        <>
                                            <div className='price-manage'>
                                                <div className='price'>
                                                    <h6>Price</h6>
                                                </div>
                                                <div className='price-value'>
                                                    <input
                                                        type="number"
                                                        value={formData.growthPriceMonth}
                                                        onChange={(e) => setFormData((prevData) => ({
                                                            ...prevData,
                                                            growthPriceMonth: e.target.value
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>100+ Product Catalogue</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <Autocomplete
                                                        multiple
                                                        className='AutoTag'
                                                        id="tags-filled"
                                                        options={top100Films.map((option) => option.title)}
                                                        value={formData.freeMonthly.productCatalogue}
                                                        onChange={(event, newValue) => {
                                                            setFormData((prevData) => ({
                                                                ...prevData,
                                                                freeMonthly: {
                                                                    ...prevData.freeMonthly,
                                                                    productCatalogue: newValue
                                                                }
                                                            }));
                                                        }}
                                                        freeSolo
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: null,
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <span className="error">{error.freeMonthly.productCatalogue}</span>
                                            <div className='catalogue-input'>
                                                <div className="rendered-catalogue">
                                                    {formData.freeMonthly.productCatalogue.map((option, index) => (
                                                        <Chip key={index} variant="outlined" label={option} onDelete={() => handleDeleteTag(index)} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Trial</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.freeMonthly.trial} checked={formData.freeMonthly.trial === 'Active'} onChange={(e) => handleChange('trial', e.target.checked, 'freeMonthly')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            {
                                                formData.freeMonthly.trial === 'Active' &&
                                                <>
                                                    <div className='manage-catalogue'>
                                                        <div className='catalogue-text'>
                                                            <h6>Trial Days</h6>
                                                        </div>
                                                        <div className='catalogue-select'>
                                                            <input name='trialDays' value={formData.trialDays} onChange={(e) => handleChange('trialDays', true, 'manage-catalogue', e)} />
                                                        </div>
                                                    </div>
                                                    <span className="error">{error.trialDays}</span>
                                                </>
                                            }

                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Expiry</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <input name='expiry' disabled value={formData.expiry} onChange={(e) => handleChange('expiry', true, 'manage-catalogue', e)} />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Samples</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.freeMonthly.ordersamples} checked={formData.freeMonthly.ordersamples === 'Active'} onChange={(e) => handleChange('ordersamples', e.target.checked, 'freeMonthly')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <span className="error">{error.freeMonthly.ordersamples}</span>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Digital Services</h6>
                                                </div>
                                                <div className='digital-services'>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Logo Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.logodesigning} checked={formData.productSelection.logodesigning === 'Active'} onChange={(e) => handleChange('logodesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Label Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.labeldesigning} checked={formData.productSelection.labeldesigning === 'Active'} onChange={(e) => handleChange('labeldesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Image Mockups</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.imagemockups} checked={formData.productSelection.imagemockups === 'Active'} onChange={(e) => handleChange('imagemockups', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Packaging Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={formData.productSelection.packagingdesigning} checked={formData.productSelection.packagingdesigning === 'Active'} onChange={(e) => handleChange('packagingdesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Email/Chat Support for App Installation</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.freeMonthly.support} checked={formData.freeMonthly.support === 'Active'} onChange={(e) => handleChange('support', e.target.checked, 'freeMonthly')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Featured Product</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={formData.featuredProduct.support} checked={formData.featuredProduct.support === 'Active'} onChange={(e) => handleChange('support', e.target.checked, 'featuredProduct')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Limit</h6>
                                                </div>
                                                <div className='order-limit'>
                                                    <div className='inc-btn'>
                                                        <Button onClick={handleDec} className='increment'>-</Button>
                                                    </div>
                                                    <div className='number'>
                                                        <input type='number' value={formData.orderLimit} disabled />
                                                    </div>
                                                    <div className='dec-btn'>
                                                        <Button onClick={handleInc} className='increment'>+</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='submit'>
                                                <button className="free-btn" onClick={handleSubmit}>Submit</button>
                                            </div>
                                        </>
                                    )}
                                </TabPanel>
                                <TabPanel value="2">
                                    {/* Display manage-catalogue only if Annually tab is selected */}
                                    {tabValue === '2' && (
                                        <>
                                            <div className='price-manage'>
                                                <div className='price'>
                                                    <h6>Price</h6>
                                                </div>
                                                <div className='price-value'>
                                                    <input
                                                        type="number"
                                                        value={annuallyData.growthPriceAnnual}
                                                        onChange={(e) => setAnnuallyData((prevData) => ({
                                                            ...prevData,
                                                            growthPriceAnnual: e.target.value
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>100+ Product Catalogue</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <Autocomplete
                                                        multiple
                                                        className='AutoTag'
                                                        id="tags-filled"
                                                        options={top100Films.map((option) => option.title)}
                                                        value={annuallyData.annually.productCatalogue}
                                                        onChange={(event, newValue) => {
                                                            setAnnuallyData((prevData) => ({
                                                                ...prevData,
                                                                annually: {
                                                                    ...prevData.annually,
                                                                    productCatalogue: newValue
                                                                }
                                                            }));
                                                        }}
                                                        freeSolo
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: null,
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <span className="error">{errors.annually.productCatalogue}</span>
                                            <div className='catalogue-input'>
                                                <div className="rendered-catalogue">
                                                    {annuallyData.annually.productCatalogue.map((option, index) => (
                                                        <Chip key={index} variant="outlined" label={option} onDelete={() => handleDeleteAnnualyTag(index)} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Trial</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.annually.annualyTrial} checked={annuallyData.annually.annualyTrial === 'Active'} onChange={(e) => handleChangeAnnually('annualyTrial', e.target.checked, 'annually')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            {
                                                annuallyData.annually.annualyTrial === 'Active' &&
                                                <>
                                                    <div className='manage-catalogue'>
                                                        <div className='catalogue-text'>
                                                            <h6>Trial Days</h6>
                                                        </div>
                                                        <div className='catalogue-select'>
                                                            <input name='annuallyTrialDays' value={annuallyData.annuallyTrialDays} onChange={(e) => handleChangeAnnually('annuallyTrialDays', true, 'manage-catalogue', e)} />
                                                        </div>
                                                    </div>
                                                    <span className="error">{errors.annuallyTrialDays}</span>
                                                </>
                                            }
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Expiry</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <input name='annuallyExpiry' disabled value={annuallyData.annuallyExpiry} onChange={(e) => handleChangeAnnually('annuallyExpiry', true, 'manage-catalogue', e)} />
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Samples</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.annually.annuallyOrderSamples} checked={annuallyData.annually.annuallyOrderSamples === 'Active'} onChange={(e) => handleChangeAnnually('annuallyOrderSamples', e.target.checked, 'annually')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <span className="error">{errors.annually.annuallyOrderSamples}</span>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Digital Services</h6>
                                                </div>
                                                <div className='digital-services'>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Logo Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.logodesigning} checked={annuallyData.productSelection.logodesigning === 'Active'} onChange={(e) => handleChangeAnnually('logodesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Label Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.labeldesigning} checked={annuallyData.productSelection.labeldesigning === 'Active'} onChange={(e) => handleChangeAnnually('labeldesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Image Mockups</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.imagemockups} checked={annuallyData.productSelection.imagemockups === 'Active'} onChange={(e) => handleChangeAnnually('imagemockups', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='digital'>
                                                        <div className='digital-text'>
                                                            <h6>Packaging Designing</h6>
                                                        </div>
                                                        <div className='digital-select'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label={annuallyData.productSelection.packagingdesigning} checked={annuallyData.productSelection.packagingdesigning === 'Active'} onChange={(e) => handleChangeAnnually('packagingdesigning', e.target.checked, 'productSelection')} />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Email/Chat Support for App Installation</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.annually.support} checked={annuallyData.annually.support === 'Active'} onChange={(e) => handleChangeAnnually('support', e.target.checked, 'annually')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Featured Product</h6>
                                                </div>
                                                <div className='catalogue-select'>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch />} label={annuallyData.featuredProduct.support} checked={annuallyData.featuredProduct.support === 'Active'} onChange={(e) => handleChangeAnnually('support', e.target.checked, 'featuredProduct')} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className='manage-catalogue'>
                                                <div className='catalogue-text'>
                                                    <h6>Order Limit</h6>
                                                </div>
                                                <div className='order-limit'>
                                                    <div className='inc-btn'>
                                                        <Button onClick={handleDecrement} className='increment'>-</Button>
                                                    </div>
                                                    <div className='number'>
                                                        <input type='number' value={annuallyData.orderLimit} disabled />
                                                    </div>
                                                    <div className='dec-btn'>
                                                        <Button onClick={handleIncrement} className='increment'>+</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='submit'>
                                                <Button className="free-btn" onClick={handleAnnualSubmit}>Submit</Button>
                                            </div>
                                        </>
                                    )}
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                }

            </div>
            <br />
        </>
    )
}

export default ManageMembership;
