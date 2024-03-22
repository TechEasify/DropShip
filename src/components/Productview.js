import React, { useState } from 'react'
import { Button, Dialog, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useHistory } from 'react-router-dom';

function Productview() {
    const history = useHistory();
    const [detail, setDetail] = useState(false)
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const handleClose = () => {
        history.push('/template');
    };

    return (
        <>
            <div open={open} onClose={handleClose} fullWidth maxWidth="xl">
                <Grid container>
                    <Grid item xs={6} sx={{ position: 'relative' }}>
                        <Button
                            onClick={handleClose}
                            className='close-btn'
                        >
                            <CloseIcon />
                        </Button>
                        <div className='img-slider'>
                            <Slider {...settings}>
                                <div>
                                    <img src="https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png" alt="Image 1" style={{ height: 'auto', width: '100%' }} />
                                </div>
                                <div>
                                    <img src="https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png" alt="Image 2" style={{ height: 'auto', width: '100%' }} />
                                </div>
                            </Slider>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="column" justifyContent="space-between" sx={{ width: "100%", height: '100%', marginTop: "10px" }}>
                            <Grid item>
                                <Typography variant="h3">Liquid Foundation - Mahogany
                                </Typography>
                                <div className='stock-main-head'>
                                    <span className='stock-bar'>100 in stock</span>
                                </div>
                                <div className='detail-bar'>
                                    <span class="sc-BeQoi ccUqQQ">By <u>FL Beauty</u> - From 🇺🇸<strong>United States</strong></span>
                                </div>
                                <div className='content-detail'>
                                    <Typography paragraph>
                                        Our liquid foundation delivers long-lasting, medium coverage while remaining weightless and fresh on your skin. Finally, the foundation you've been yearning for – so impeccable that no powder is needed to set it. It flawlessly blurs imperfections, including discoloration and unevenness, without caking or masking your skin's natural radiance.


                                        Ingredients: Aqua (Water), Cyclopentasiloxane, Cera Alba (Beeswax), Stearyl Dimethicone, Isododecane, Cetyl Ethlhexanoate, Microcrystalline Wax, Cetyl PEG/PPG-10/1 Dimethicone, Glyceryl Laurate, Mica, Disteardimonium Hectorite, Methylparaben, Ethylparaben, Tocopheryl Acetate (Vitamin E), Ascorbyl Palmitate (Vitamin C), Chamomilla Recutita (Matricaria) Extract, Sodium Hyaluronate. MAY CONTAIN (+/-): Iron Oxides(CI 177491, CI 177492, CI 177499),Titanium Dioxide (CI 177891)
                                    </Typography>
                                </div>
                                <div className='sell-btn'>
                                    <FormControl>
                                        <h4>How do you want to sell:</h4>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                        >
                                            <FormControlLabel value="Dropshipbranded" control={<Radio />} label="Dropship branded" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <hr />
                                <div className='card-alltext'>
                                    <div className='card-pay'>
                                        <h5 className='card-text'>
                                            You Pay:
                                            $11.40
                                        </h5>
                                        <h5>Shipping charges: $5</h5>
                                        <p>You sell: $37</p>
                                    </div>
                                    <div className='card-profit'>
                                        <h5>Profit: </h5>
                                        <h5 style={{ color: "green" }}>
                                            $20.60
                                        </h5>
                                    </div>
                                </div>
                                <hr />
                                <h4>Processing Time</h4>
                                <div className='sc-hTtwUo bqJrzS'>
                                    <span>1-2 business days (24-48 hours)</span>
                                </div>
                                <div className='cost-detail'>
                                    <h6>Shipping Time & Cost</h6>
                                    <div className='dialog-price'>
                                        <span className='shipinfo'>🇺🇸 United States </span>
                                        <div className='sc-hTtwUo bqJrzS'>
                                            <span>(4-5 business days)</span>
                                        </div>
                                        <div className='sc-hTtwUo bqJrzS'>
                                            <h4>$5.00/ $1.00</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='addpro-btn'>
                                    <div className='button-pro'>
                                        <Button className='order-sample'>Order Sample</Button>
                                    </div>
                                    <div className='product-btn'>
                                        <Button className='AddtoProducts'>+ Add to Products</Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <br />
                <br />
                <br />
            </div>
        </>
    )
}

export default Productview