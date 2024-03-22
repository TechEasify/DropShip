import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Select } from '@shopify/polaris';

const exceptThisSymbols = ["e", "E", "+", "-", "."];

function ManageDigitalService() {
    const [managePlan, setManagePlan] = useState('');
    const [digitalService, setDigitalService] = useState({
        id: 1,
        name: '',
        description: '',
        terms: '',
        duration: '',
        price: '',
    });
    const [tableData, setTableData] = useState([]);
    const [digitalForm, setDigitalForm] = useState(false);
    const [formError, setFormError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('tableData'));
        if (savedData) {
            setTableData(savedData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tableData', JSON.stringify(tableData));
    }, [tableData]);

    const handleChangePlan = (value) => {
        setManagePlan(value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDigitalService((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!digitalService.name || !digitalService.description || !digitalService.terms || !digitalService.price || !managePlan) {
            setFormError('Please fill in all required fields');
            return;
        }

        setFormError('');

        if (isEditing) {
            const updatedData = tableData.map((item) =>
                item.id === editingId ? { ...digitalService, plan: managePlan } : item
            );
            setTableData(updatedData);
            setIsEditing(false);
            setEditingId(null);
        } else {
            const newItem = {
                ...digitalService,
                id: tableData.length + 1,
                plan: managePlan
            };
            setTableData((prevData) => [...prevData, newItem]);
        }

        localStorage.setItem('tableData', JSON.stringify(tableData));
        // Reset form fields
        setDigitalService({
            id: tableData.length + 1,
            name: '',
            description: '',
            terms: '',
            duration: '',
            price: '',
        });
        setManagePlan('');

        setDigitalForm(false);
    };

    console.log(tableData, "tableData");

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'terms', headerName: 'Terms', width: 130 },
        { field: 'duration', headerName: 'Duration', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => {
                return (
                    <div style={{ display: "flex" }}>
                        <div className='edit-btn'>
                            <Button
                                className="download-btn" variant="contained" color="primary"
                                onClick={() => handleEdit(params.row.id)}
                            >
                                <EditIcon />
                            </Button>
                        </div>
                        <div className='edit-btn'>
                            <Button
                                className="download-btn" variant="contained" color="primary"
                                onClick={() => handleDelete(params.row.id)}
                            >
                                <DeleteIcon />
                            </Button>
                        </div>
                    </div>
                );
            },
        },
    ];

    const handleEdit = (id) => {
        const selectedItem = tableData.find((item) => item.id === id);
        setDigitalService(selectedItem);
        setManagePlan(selectedItem.plan);
        setIsEditing(true);
        setEditingId(id);
        setDigitalForm(true);
    };

    const handleDelete = (id) => {
        const updatedData = tableData.filter((item) => item.id !== id);
        setTableData(updatedData);
    };

    const handleClose = () => {
        setManagePlan('')
        setDigitalForm(false);
        setDigitalService({
            id: '',
            name: '',
            description: '',
            terms: '',
            duration: '',
            price: '',
        });
    }

    const options = [
        { label: 'Logo Designing', value: 'logodesigning' },
        { label: 'Label Designing', value: 'labeldesigning' },
        { label: 'Image Designing', value: 'imagedesigning' },
        { label: 'Packaging Designing', value: 'packagingdesigning' },
    ];

    return (
        <>
            <div className='digital-services'>
                {
                    digitalForm ?
                        <>
                            <form onSubmit={handleSubmit}>
                                <div className='manage-form'>
                                    <div className='digital-label'>
                                        <h2 className='category-heading'>Manage Digital Service Form</h2>
                                    </div>
                                    <div className='button-digital'>
                                        <Button className="digital-btn" onClick={handleClose}>
                                            close
                                        </Button>
                                    </div>
                                </div>
                                <div className='digital-menu'>
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
                                                    placeholder="Plan"
                                                    options={options}
                                                    onChange={handleChangePlan}
                                                />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                                {
                                    (managePlan === "logodesigning" ||
                                        managePlan === "labeldesigning" ||
                                        managePlan === "imagedesigning" ||
                                        managePlan === "packagingdesigning") &&
                                    <div className='digital-form'>
                                        <div className='designing-form'>
                                            <h5 className='designing-heading'>{managePlan === "logodesigning" ? "Logo Designing" :
                                                managePlan === "labeldesigning" ? "Label Designing" :
                                                    managePlan === "imagedesigning" ? "Image Designing" :
                                                        "Packaging Designing"}</h5>
                                        </div>
                                        <div className='designing-filed'>
                                            <div className='designing-text'>
                                                <h6>Name</h6>
                                            </div>
                                            <div className='designing-input'>
                                                <input type='text' name="name" value={digitalService.name} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className='designing-filed'>
                                            <div className='designing-text'>
                                                <h6>Description</h6>
                                            </div>
                                            <div className='designing-input'>
                                                <input type='text' name="description" value={digitalService.description} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className='designing-filed'>
                                            <div className='designing-text'>
                                                <h6>Terms</h6>
                                            </div>
                                            <div className='designing-input'>
                                                <input type='text' name="terms" value={digitalService.terms} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className='designing-filed'>
                                            <div className='designing-text'>
                                                <h6>Duration / Days</h6>
                                            </div>
                                            <div className='designing-input'>
                                                <input type="number" id="duration" name="duration" value={digitalService.duration} onChange={handleChange} onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()} />
                                            </div>
                                        </div>
                                        <div className='designing-filed'>
                                            <div className='designing-text'>
                                                <h6>Price</h6>
                                            </div>
                                            <div className='designing-input'>
                                                <input type='number' name="price" value={digitalService.price} onChange={handleChange} onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()} />
                                            </div>
                                        </div>
                                        <div className='designing-submit'>
                                            <Button className="submit-btn" type="submit">Submit</Button>
                                        </div>
                                    </div>
                                }
                            </form>
                        </>
                        :

                        <div className='digital-table'>
                            <div className='digital-label'>
                                <div className='digital-label'>
                                    <h2 className='category-heading'>Manage Digital Service</h2>
                                </div>
                                <div className='button-digital'>
                                    <Button className="digital-btn" onClick={() => setDigitalForm(true)}>Add Designing</Button>
                                </div>
                            </div>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={tableData}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    checkboxSelection
                                />
                            </div>
                        </div>
                }

                {
                    formError && <div style={{ color: 'red', fontSize: 15 }}>{formError}</div>
                }

            </div>
        </>
    );
}

export default ManageDigitalService;
