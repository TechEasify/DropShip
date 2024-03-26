import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import { Button } from '@shopify/polaris';

function Tag(props) {
    const { label, onDelete, ...other } = props;
    return (
        <div {...other}>
            <span>{label}</span>
            <CloseIcon onClick={onDelete} />
        </div>
    );
}

Tag.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

const initialRows = [
    { id: 1, image: 'Snow', name: 'Jon', status: 'Deactive', tags: ["agasga, agasgag, rhreh"] },
    { id: 2, image: 'Lannister', name: 'Cersei', status: 'Active', tags: ["aga, eguweh, rhreh"] },
    { id: 3, image: 'Lannister', name: 'Jaime', status: 'Deactive', tags: ["agasgag, rhreh"] },
    { id: 4, image: 'Stark', name: 'Arya', status: 'Active', tags: ["agasga, agasgag"] },
];

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
];

function Category() {
    const [newCategory, setNewCategory] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [rows, setRows] = useState(initialRows);

    const [categoryData, setCategoryData] = useState({
        id: null,
        name: '',
        image: null,
        status: '',
        tags: [],
    });

    const [errors, setErrors] = useState({
        name: '',
        image: '',
        status: '',
        tags: '',
    });
    const [loading, setLoading] = useState(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'image', headerName: 'Image', width: 130, renderCell: (params) => <CategoryWithImage {...params} /> },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => <EditButton params={params.row} onEdit={handleEdit} />,
        },
    ];

    const handleEdit = (category) => {
        setCategoryData(category);
        setNewCategory(true);
    };

    function CategoryWithImage(params) {
        return <Avatar src={getImageForProduct(params.row.image)} alt={params.row.image} style={{ width: 40, height: 40 }} />;
    }

    function getImageForProduct(category) {
        return category;
    }

    function EditButton({ params, onEdit }) {
        return (
            <>
                <Button className="download-btn" variant="contained" color="primary" onClick={() => onEdit(params)}>
                    <EditIcon />
                </Button>
            </>
        );
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
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
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            image: '',
        }));
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSwitchChange = (event) => {
        const { name, checked } = event.target;
        setCategoryData((prevData) => ({
            ...prevData,
            [name]: checked ? 'Active' : 'Deactive',
        }));
    };

    const handleSubmit = () => {
        if (validateForm()) {
            if (categoryData.id !== null) {
                const updatedRows = rows.map(row => {
                    if (row.id === categoryData.id) {
                        return {
                            ...row,
                            name: categoryData.name,
                            image: categoryData.image,
                            status: categoryData.status,
                            tags: categoryData.tags,
                        };
                    }
                    return row;
                });
                setRows(updatedRows);
            } else {
                const newId = rows.length + 1;
                const newCategory = {
                    id: newId,
                    name: categoryData.name,
                    image: categoryData.image,
                    status: categoryData.status,
                    tags: categoryData.tags,
                };
                setRows([...rows, newCategory]);
            }
            setCategoryData({
                id: null,
                name: '',
                image: null,
                status: '',
                tags: [],
            });
            setNewCategory(false);
        }
    };

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = { ...errors };

        if (!categoryData.name) {
            newErrors.name = 'Name is required';
            formIsValid = false;
        } else {
            newErrors.name = '';
        }

        if (!categoryData.image) {
            newErrors.image = 'Image is required';
            formIsValid = false;
        } else {
            newErrors.image = '';
        }

        if (categoryData.tags.length === 0) {
            newErrors.tags = 'At least one tag is required';
            formIsValid = false;
        } else {
            newErrors.tags = '';
        }

        setErrors(newErrors);

        return formIsValid;
    };

    const handleDeleteTag = (index) => {
        const newTags = [...categoryData.tags];
        newTags.splice(index, 1);
        setCategoryData((prevData) => ({
            ...prevData,
            tags: newTags,
        }));
    };

    return (
        <>
            <div className="category-main">
                {newCategory ?
                    <>
                        <div className="new-category">
                            <div className="main-text">
                                {categoryData.id !== null ? <h2 className='category-heading'>Edit Category</h2> : <h2 className='category-heading'>New Category</h2>}
                                <Button className="category-btn" onClick={() => setNewCategory(false)}>close</Button>
                            </div>
                            <div className="category-name">
                                <div className='category-text'>
                                    <h6 className="cat-text">Name</h6>
                                </div>
                                <div className='category-input'>
                                    <input
                                        type="text"
                                        name="name"
                                        maxLength={35}
                                        className="form-control inspectletIgnore newcategory"
                                        onChange={handleInputChange}
                                        value={categoryData.name}
                                    />
                                </div>
                            </div>
                            <span className="error">{errors.name}</span>
                            <div className="category-name">
                                <div className='category-text'>
                                    <h6 className="cat-text">Photo</h6>
                                </div>
                                <div className='category-input'>
                                    <input
                                        className="category-img"
                                        name="image"
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        id="file-upload"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                            <span className="error">{errors.image}</span>
                            <div className='category-input'>
                                <div className="preview-image">
                                    {loading ? (
                                        <Skeleton variant="circular" width={100} height={100} />
                                    ) : (
                                        imagePreview && <Avatar src={imagePreview} alt="Preview" style={{ width: 100, height: 100 }} />
                                    )}
                                </div>
                            </div>
                            <div className="category-name">
                                <div className='category-text'>
                                    <h6 className="cat-text">Tag</h6>
                                </div>
                                <div className='category-input'>
                                    <Autocomplete
                                        multiple
                                        className='AutoTag'
                                        id="tags-filled"
                                        options={top100Films.map((option) => option.title)}
                                        value={categoryData.tags}
                                        onChange={(event, newValue) => {
                                            setCategoryData((prevData) => ({
                                                ...prevData,
                                                tags: newValue,
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
                            <span className="error">{errors.tags}</span>
                            <div className='category-input'>
                                <div className="rendered-tags">
                                    {categoryData.tags.map((option, index) => (
                                        <Chip key={index} variant="outlined" label={option} onDelete={() => handleDeleteTag(index)} />
                                    ))}
                                </div>
                            </div>
                            {newCategory && (
                                <div style={{ display: "flex" }}>
                                    <div className='category-text'>
                                        <h6 className="cat-text">Status</h6>
                                    </div>
                                    <div className='category-input'>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Switch checked={categoryData.status === 'Active'} onChange={handleSwitchChange} name="status" />}
                                                label={categoryData.status}
                                            />
                                        </FormGroup>
                                    </div>
                                </div>
                            )}
                            <Button className="category-btn" onClick={handleSubmit}>Submit</Button>
                        </div>
                        <br />
                    </>
                    :
                    <>
                        <div className='category-head'>
                            <h2 className='category-heading'>Category</h2>
                            <Button className='category-btn' onClick={() => setNewCategory(true)}>New Category</Button>
                        </div>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pagination
                                pageSize={5}
                                rowsPerPageOptions={[5, 10]}
                                checkboxSelection
                            />
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default Category;
