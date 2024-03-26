import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Button } from '@shopify/polaris';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Wallet() {
    const [wallets, setWallets] = useState(false);
    const [value, setValue] = useState(0);
    const [walletValue, setWalletValue] = useState(0);
    const [walletAmount, setWalletAmount] = useState(null);

    useEffect(() => {
        const storedWalletValue = localStorage.getItem('walletValue');
        if (storedWalletValue !== null) {
            setWalletAmount({ ...walletAmount, walletValue: storedWalletValue });
        } else {
            // If walletValue is null, initialize it with a default value
            setWalletAmount({ ...walletAmount, walletValue: 0 });
        }
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = () => {
        setWallets(true)
    }

    const handleBreadcrumbs = (e) => {
        e.preventDefault();
        setWallets(false)
        console.info('You clicked a breadcrumb.');
    }

    const handleSend = () => {
        const newTotalAmount = parseFloat(walletAmount.walletValue || 0) + parseFloat(walletValue);

        setWalletAmount({ ...walletAmount, walletValue: newTotalAmount.toString() });
        setWalletValue('');

        console.log("Sending wallet value:", walletValue);

        localStorage.setItem('walletValue', newTotalAmount.toString());

        setWallets(false);
    }

    console.log(walletAmount, "walletAmount");
    console.log(wallets, "walltes");

    return (
        <>

            {
                wallets ?
                    <>
                        <div className='inner-wallet'>
                            <div role="presentation" onClick={handleBreadcrumbs}>
                                <Breadcrumbs aria-label="breadcrumb" className='breadcrumbs-inner'>
                                    <Link className='breadcrumb-text' underline="hover" color="inherit" href="/billing/wallet">
                                        Dropship Wallet
                                    </Link>
                                    <Link
                                        underline="hover"
                                        color="inherit"
                                        href="/material-ui/getting-started/installation/"
                                        className='breadcrumb-text'
                                    >
                                        Dropship USD Wallet
                                    </Link>
                                </Breadcrumbs>
                            </div>
                            <h2>Billing: Dropship USD Wallet</h2>
                            <div className='tabs-wallet'>
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Item One" {...a11yProps(0)} style={{ marginTop: "10px", fontSize: "12px", color: "#fff", background: "#232323", borderRadius: "5px" }} />
                                        </Tabs>
                                    </Box>
                                    <h6>Amount</h6>
                                    <div className='input-filed'>
                                        <input
                                            label="USD"
                                            placeholder='USD'
                                            className='disable'
                                            disabled style={{ width: "50px", height: "39px", textAlign: "center", borderRadius: "5px 0px 0px 5px" }}
                                        />
                                        <input
                                            label="Add Value"
                                            style={{ width: "170px", height: "39px", textAlign: "center", borderRadius: "0px 5px 5px 0px" }}
                                            placeholder='Add Value' maxLength="15"
                                            value={walletValue}
                                            onChange={(e) => setWalletValue(e.target.value)}
                                        />
                                        <div className='Wallet-btn'>
                                            <Button
                                                className='product-btn'
                                                onClick={handleSend}
                                            >
                                                Send
                                            </Button>
                                        </div>
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </>
                    :
                    <div className='Wallet-main'>
                        <div className='wallet-top'>
                            <div className='wallet-head'>
                                <h2 className='category-heading'>Billing: Dropship Wallet</h2>
                            </div>
                            <br />
                            <div className='wallet-detail'>
                                <p className='wallet-text'>
                                    Each Wallet can only be used to pay for orders in the same currency (e.g. you can't pay for an order in EUR from your USD Wallet). It's not possible to transfer money from one Wallet to another. More on Printful Wallets in our FAQ.
                                </p>
                            </div>
                        </div>
                        <div className='FAQ-section'>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className='accordian-head'
                                >
                                    Benefits of using a Dropship Wallet
                                </AccordionSummary>
                                <div className='accordian-detail'>
                                    <div className='Secure-img'>
                                        <img src='https://static.cdn.printful.com/dist-pf/image-assets/icon_secure_payments.90dda922767bbe878cdb94be43aaf000.svg' style={{ width: "60px", height: "auto", margin: "auto" }} />
                                        <AccordionDetails>
                                            Secure payments and decreased fail rate. Adding money to your Wallet is safe and easy. Plus, by having funds in your Wallet, you’ll avoid the risk of failed orders due to insufficient funds.
                                        </AccordionDetails>
                                    </div>
                                    <div className='Secure-img'>
                                        <img src='https://static.cdn.printful.com/dist-pf/image-assets/icon_fewer_transactions.dc31de70d75656cbe3aed922141631ba.svg' style={{ width: "60px", height: "auto", margin: "auto" }} />
                                        <AccordionDetails>
                                            Secure payments and decreased fail rate. Adding money to your Wallet is safe and easy. Plus, by having funds in your Wallet, you’ll avoid the risk of failed orders due to insufficient funds.
                                        </AccordionDetails>
                                    </div>
                                    <div className='Secure-img'>
                                        <img src='https://static.cdn.printful.com/dist-pf/image-assets/icon_fewer_pending_payments.e1f328852915b7317f193f90ad73e474.svg' style={{ width: "60px", height: "auto", margin: "auto" }} />
                                        <AccordionDetails>
                                            Secure payments and decreased fail rate. Adding money to your Wallet is safe and easy. Plus, by having funds in your Wallet, you’ll avoid the risk of failed orders due to insufficient funds.
                                        </AccordionDetails>
                                    </div>
                                    <div className='Secure-img'>
                                        <img src='https://static.cdn.printful.com/dist-pf/image-assets/icon_more_payment_options.4a71afa3c7dcb2d46e202cbcdf30420c.svg' style={{ width: "60px", height: "auto", margin: "auto" }} />
                                        <AccordionDetails>
                                            Secure payments and decreased fail rate. Adding money to your Wallet is safe and easy. Plus, by having funds in your Wallet, you’ll avoid the risk of failed orders due to insufficient funds.
                                        </AccordionDetails>
                                    </div>
                                </div>
                            </Accordion>
                        </div>
                        <br />
                        <br />
                        <div className='Other-wallet'>
                            <h3 className='wallet-heading'>Other Wallets</h3>
                            <p>Wallets that are not used for more than 4 weeks will be automatically moved to Other Wallets.</p>
                            <div className='usd-wallet'>
                                <Card sx={{ minWidth: 275 }}>
                                    <div className='wallet-card'>
                                        <div className='wall-usd'>
                                            <h6>USD Wallet</h6>
                                        </div>
                                        <div className='right-wallet' onClick={handleClick}>
                                            <ChevronRightIcon className='wallet-arrow' />
                                        </div>
                                    </div>
                                    <div className='wallet-price'>
                                        <h3>${walletAmount && walletAmount.walletValue ? walletAmount.walletValue : "0.00"}</h3>
                                        <p>Auto-recharge: <span>Off</span></p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default Wallet;
