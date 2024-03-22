import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@shopify/polaris';

function ManageTiers() {
    const initialRows = [
        { id: 1, tiers: 'Jon', monthlySale: 500, yearlySale: 200, monthlyDiscount: 5, yearlyDiscount: 5, initMember: 'Deactive' },
        { id: 2, tiers: 'Cersei', monthlySale: 400, yearlySale: 300, monthlyDiscount: 5, yearlyDiscount: 5, initMember: 'Active' },
        { id: 3, tiers: 'Jaime', monthlySale: 300, yearlySale: 600, monthlyDiscount: 5, yearlyDiscount: 5, initMember: 'Deactive' },
        { id: 4, tiers: 'Arya', monthlySale: 500, yearlySale: 800, monthlyDiscount: 5, yearlyDiscount: 5, initMember: 'Active' },
    ];

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'tiers', headerName: 'Tiers', width: 130 },
        { field: 'initMember', headerName: 'InitMember', width: 130 },
        { field: 'monthlySale', headerName: 'MonthlySale', width: 130 },
        { field: 'yearlySale', headerName: 'YearlySale', width: 130 },
        { field: 'monthlyDiscount', headerName: 'MonthlyDiscount %', width: 130 },
        { field: 'yearlyDiscount', headerName: 'YearlyDiscount %', width: 130 },
        { field: 'totalDiscount', headerName: 'Total Discount', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 260,
            renderCell: (params) => <ActionButtons params={params.row} onEdit={handleEdit} onDelete={handleDelete} />,
        },
    ];

    const [rows, setRows] = useState(initialRows);
    const [tiersData, setTiersData] = useState([]);
    const [tiersName, setTiersName] = useState({
        id: null,
        tiers: '',
        initMember: false,
        monthlySale: 0,
        yearlySale: 0,
        monthlyDiscount: 0,
        yearlyDiscount: 0,
    });
    const [addTiers, setAddTiers] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [totalMonthlyDiscount, setTotalMonthlyDiscount] = useState(0);
    const [totalYearlyDiscount, setTotalYearlyDiscount] = useState(0);

    useEffect(() => {
        const monthlyDiscount = rows.reduce((total, row) => total + row.monthlyDiscount * row.monthlySale / 100, 0);
        setTotalMonthlyDiscount(monthlyDiscount);

        const yearlyDiscount = rows.reduce((total, row) => total + row.yearlyDiscount * row.yearlySale / 100, 0);
        setTotalYearlyDiscount(yearlyDiscount);

        setTiersData(rows);
    }, [rows]);

    function ActionButtons({ params, onEdit, onDelete }) {
        return (
            <>
                <div className='edit-btn'>
                    <Button className="download-btn" variant="contained" color="primary" onClick={() => onEdit(params)}>
                        <EditIcon />
                    </Button>
                </div>
                <div className='edit-btn'>
                    <Button className="download-btn" variant="contained" color="primary" onClick={() => onDelete(params)}>
                        <DeleteIcon />
                    </Button>
                </div>
            </>
        );
    }

    const handleEdit = (tier) => {
        setTiersName({
            id: tier.id,
            tiers: tier.tiers,
            initMember: tier.initMember === 'Active' ? true : false,
            monthlySale: tier.monthlySale,
            yearlySale: tier.yearlySale,
            monthlyDiscount: tier.monthlyDiscount,
            yearlyDiscount: tier.yearlyDiscount,
        });
        setEditMode(true);
        setAddTiers(true);
    };

    const handleDelete = (tier) => {
        const updatedRows = rows.filter((row) => row.id !== tier.id);
        setRows(updatedRows);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTiersName({ ...tiersName, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            const updatedRows = rows.map((row) => (row.id === tiersName.id ? tiersName : row));
            setRows(updatedRows);
            setTiersName({
                id: null,
                tiers: '',
                initMember: false,
                monthlySale: 0,
                yearlySale: 0,
                monthlyDiscount: 0,
                yearlyDiscount: 0,
            });
            setEditMode(false);
        } else {
            const newTier = {
                id: rows.length + 1,
                tiers: tiersName.tiers,
                initMember: tiersName.initMember ? 'Active' : 'Deactive',
                monthlySale: tiersName.monthlySale,
                yearlySale: tiersName.yearlySale,
                monthlyDiscount: tiersName.monthlyDiscount,
                yearlyDiscount: tiersName.yearlyDiscount,
            };
            setRows([...rows, newTier]);
            setTiersName({
                id: null,
                tiers: '',
                initMember: false,
                monthlySale: 0,
                yearlySale: 0,
                monthlyDiscount: 0,
                yearlyDiscount: 0,
            });
        }
        setAddTiers(false);
    };

    return (
        <>
            <div className="manage-tiers">
                {addTiers ? (
                    <>
                        <div className="main-text">
                            <h2 className='category-heading'>{editMode ? 'Edit Tier' : 'Add Tiers'}</h2>
                            <Button className="category-btn" onClick={() => setAddTiers(false)}>
                                close
                            </Button>
                        </div>
                        <div className="tiers-month">
                            <div className="tiers-text">
                                <h6>Initial Membership</h6>
                            </div>
                            <div className="tiers-filed">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch checked={tiersName.initMember} onChange={(e) => setTiersName({ ...tiersName, initMember: e.target.checked })} />}
                                        label={tiersName.initMember ? 'Active' : 'Deactive'}
                                    />
                                </FormGroup>
                            </div>
                        </div>

                        <div className="manage-membership">
                            <div className="manage-head">
                                <h6>Tiers</h6>
                            </div>
                            <div className="manage-select">
                                <input type="text" name="tiers" value={tiersName.tiers} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="manage-catalogue">
                            <div className="catalogue-text">
                                <h6>Monthly Sale</h6>
                            </div>
                            <div className="catalogue-select">
                                <input type="number" name="monthlySale" value={tiersName.monthlySale} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="manage-catalogue">
                            <div className="catalogue-text">
                                <h6>Yearly Sale</h6>
                            </div>
                            <div className="catalogue-select">
                                <input type="number" name="yearlySale" value={tiersName.yearlySale} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="manage-catalogue">
                            <div className="catalogue-text">
                                <h6>Monthly Discount</h6>
                            </div>
                            <div className="catalogue-select">
                                <input type="number" name="monthlyDiscount" value={tiersName.monthlyDiscount} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="manage-catalogue">
                            <div className="catalogue-text">
                                <h6>Yearly Discount</h6>
                            </div>
                            <div className="catalogue-select">
                                <input type="number" name="yearlyDiscount" value={tiersName.yearlyDiscount} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="Tiers-submit">
                            <Button className="submit-btn" onClick={handleSubmit}>
                                {editMode ? 'Update' : 'Submit'}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='tiers-table'>
                            <div className="tiers-head">
                                <div className="tiers-text">
                                    <h2 className='category-heading'>Manage Tiers</h2>
                                </div>
                                <Button className="category-btn" onClick={() => setAddTiers(true)}>
                                    Add Tiers
                                </Button>
                            </div>
                            <div style={{ height: 400 }}>
                                <DataGrid
                                    rows={rows.map(row => ({
                                        ...row,
                                        totalDiscount: row.monthlyDiscount * row.monthlySale / 100 + row.yearlyDiscount * row.yearlySale / 100
                                    }))}
                                    columns={columns}
                                    pagination
                                    pageSize={5}
                                    rowsPerPageOptions={[5, 10]}
                                    checkboxSelection
                                />
                            </div>
                            <div>
                                <p>Total Monthly Discount: {totalMonthlyDiscount}</p>
                                <p>Total Yearly Discount: {totalYearlyDiscount}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ManageTiers;
