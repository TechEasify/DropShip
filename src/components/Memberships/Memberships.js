import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { BarChart } from '@mui/x-charts';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import Slider from 'react-slick';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const card = (
    <>
        <CardContent>
            <h5>
                Printful Growth
            </h5>
            <hr />
            <h6 component="div">
                {bull}Up to 20% off DTG products
            </h6>
            <br />
            <h6 component="div">
                {bull}Up to 30% off other categories
            </h6>
            <br />
            <h6 component="div">
                {bull}Product branding discounts of 7%
            </h6>
            <br />
            <h6 component="div">
                {bull}Personalized product transfer assistance
            </h6>
        </CardContent>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <hr />
        <div className='card-btn'>
            <div className='trial'>
                <div className='month-text'>
                    <h5>$24.99/month</h5>
                </div>
                <div className='trial-btn'>
                    <Button variant="contained" className='free-btn'>Start free trial</Button>
                </div>
            </div>
            <div className='free-year'>
                <h5>Free for a year</h5>
                <h6>Once you sell $12K+</h6>
            </div>
        </div>

    </>
);

const card2 = (
    <>
        <CardContent>
            <h5>
                Business
            </h5>
            <hr />
            <h6 component="div">
                {bull}Up to 22% off DTG products
            </h6>
            <br />
            <h6 component="div">
                {bull}Up to 33% off other categories
            </h6>
            <br />
            <h6 component="div">
                {bull}Product branding discounts of 9%
            </h6>
            <br />
            <h6 component="div">
                {bull}Sample order discounts increased by 25%
            </h6>
            <br />
            <h6 component="div">
                {bull}Free digitization for all embroidered products
            </h6>
            <br />
            <h6 component="div">
                {bull}Personalized product transfer assistance
            </h6>
            <br />
            <h6 component="div">
                {bull}Priority support
            </h6>
            <br />
            <h6 component="div">
                {bull}Large front print for select products
            </h6>
        </CardContent>
        <hr />
        <div className='year-text'>
            <h5>Free for a year</h5>
            <h6>Once you sell $12K+</h6>
        </div>
    </>
);

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}

function Memberships() {
    const [value, setValue] = useState('1');
    const [progress, setProgress] = useState(10);
    const [slideValue, setSlideValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    console.log(value, "value");
    return (
        <>
            <div className='main-div'>
                <div
                    className="modal-dialog"
                    style={{ minWidth: '70vw', minHeight: '70vh', paddingTop: 50 }}
                >
                    <div className='member-text'>
                        <h1 className='mem-text'>Membership</h1>
                        <h3>Become a member to accelerate your growth</h3>
                    </div>
                    <br />
                    <Box sx={{ minWidth: 275 }} className="membership-box">
                        <Card variant="outlined" className='card-member'>{card}</Card>
                        <Card variant="outlined" className='card-Business'>{card2}</Card>
                    </Box>
                </div>
            </div>
            <div className='free-memberships'>
                <div className='trial-member'>
                    <h2 className='free-text'>Free membership trial</h2>
                    <p className='cancle-mem'>Try Printful Growth for free. We won’t charge you for the first 14 days and you can cancel the membership at any time.</p>
                </div>
                <div className='trial-btn free-trial'>
                    <Button variant="contained" className='free-btn'>Start free trial</Button>
                </div>
            </div>
            <div className='sales'>
                <div className='heading-tabs'>
                    <div className='heading-sales'>
                        <h2 className='category-heading'>Your Sales</h2>
                    </div>
                    <div className='switch-tab'>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab style={{ paddingTop: "26px", fontSize: "10px" }} className='tab-one' label="Growth" value="1" />
                                        <Tab style={{ paddingTop: "26px", fontSize: "10px" }} className='tab-two' label="Business" value="2" />
                                    </TabList>
                                </Box>
                            </TabContext>
                        </Box>
                    </div>
                </div>
                <div className='chart'>
                    <div className='chart-detail'>
                        <Card sx={{ Width: 600, padding: 5 }}>
                            <h2 className='chart-head'>Your last 12 months</h2>
                            <p>February 20, 2023 - February 19, 2024</p>
                            <hr />
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                                width={300}
                                height={300}
                            />
                        </Card>
                    </div>
                    <div className='chart-rounded'>
                        <Card sx={{ padding: 5 }}>
                            <h2 className='chart-head'>Your goal</h2>
                            <p>Become a member <strong>now</strong> for <strong>$24.99</strong> a month</p>
                            <hr />
                            <br />
                            <br />
                            <br />
                            <div className='chart-detail'>
                                <div className='circuler-chart'>
                                    <CircularProgressWithLabel value={progress} />
                                </div>
                                <div className='chart-content'>
                                    <h4 className='chart-text'>$0/$12K</h4>
                                    <p>Sell $12K+ and get Printful Growth for free for a year</p>
                                    <br />
                                    <Button variant="contained" className='free-btn'>Start free trial</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className='saving-member'>
                    <h2 className='category-heading'>Membership savings calculator</h2>
                    <div className='membership-calculator'>
                        <div className='mem-slider'>
                            <Card sx={{ maxWidth: 400, padding: 3, height: 400 }}>
                                <Slider {...settings}>
                                    <div>
                                        <img src="https://files.cdn.printful.com/o/upload/product-catalog-img/20/2079a3ee4cc472ad952fe16654f274cd_l" alt="Image 1" style={{ height: 'auto', width: '100%' }} />
                                    </div>
                                    <div>
                                        <img src="https://files.cdn.printful.com/o/upload/product-catalog-img/fd/fdb7214913fd3c6c56d683e1f8997c58_l" alt="Image 2" style={{ height: 'auto', width: '100%' }} />
                                    </div>
                                </Slider>
                            </Card>
                        </div>
                        <div className='saving-text'>
                            <Card sx={{ maxWidth: 345, padding: 3 }}>
                                <h3>Unisex Heavy Blend Hoodie | Gildan 18500</h3>
                                <h5 className='example'>Example</h5>
                                <p className='buy-text'>You buy for <strong>$20.95</strong> or <strong style={{ color: "#426900" }}>$17.75 with Printful Growth</strong></p>
                                <p>You sell for <strong>$14.99</strong></p>
                                <br />
                                <div class="slidecontainer">
                                    <input type="range" min="1" max="50" value={slideValue} onChange={(e) => setSlideValue(e.target.value)} />
                                    <p className='slide-value'>{slideValue}</p>
                                </div>
                                <p>Your approximate profit</p>
                                <p className='buy-text'>$0 or <strong style={{ color: "#426900" }}>$0 with Printful Growth</strong></p>
                                <p className='buy-text'>Your savings with <strong style={{ color: "#426900" }}>Printful Growth</strong></p>
                                <p style={{ color: "#426900", fontSize: "24px", fontWeight: "600" }}>$0</p>
                                <br />
                                <p>The profit is just an approximation. The product price can vary depending on where we fulfill it and what currency you use.</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className='free-memberships'>
                <div className='meet-member'>
                    <h2 className='free-text'>Meet your membership goals <br /> and get the perks for free</h2>
                    <p className='cancle-mem'>Once you reach your sales goals, secure a membership for free for a year</p>
                </div>
                {/* <div className='trial-btn free-trial'>
                    
                </div> */}
            </div>
            <br />
            <div className='FAQ'>
                <div className='heading-faq'>
                    <h2 className='faq-head'>FAQ</h2>
                </div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        What’s a Printful membership?
                    </AccordionSummary>
                    <AccordionDetails>
                        Printful memberships give you access to discounts of up to 30% with Printful Growth and up to 33% with Printful Business and other valuable benefits that will help accelerate the growth of your business. By becoming a member, you can enter two free membership tiers when your yearly accumulated sales reach a certain threshold—$12K for Printful Growth and $60K for Printful Business. If you haven’t reached yearly sales yet, you can subscribe to a paid Printful Growth membership and take full advantage of the benefits.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Can I pay for a yearly membership?
                    </AccordionSummary>
                    <AccordionDetails>
                        No, you can only buy a 30-day subscription plan. At the end of your 30-day billing cycle, we’ll check your sales progress, and you’ll be granted a free membership once you reach the yearly sales threshold of $12K for the Printful Growth or $60K for Printful Business membership.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        How are my Printful Growth membership payments handled if I have registered via Shopify?
                    </AccordionSummary>
                    <AccordionDetails>
                        If you have registered via Shopify, your membership payment is handled by Shopify directly.
                    </AccordionDetails>
                </Accordion>
            </div>
            <br />
        </>
    )
}

export default Memberships