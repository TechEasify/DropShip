/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Products } from '../../../components/index';
import { CheckVoucher } from '../action';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true,
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387',
  },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1',
    suggested: true,
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61',
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243',
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236',
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242',
  },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    suggested: true,
  },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809',
  },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500',
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691',
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true,
  },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500',
  },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672',
  },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246',
  },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98',
  },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81',
    suggested: true,
  },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869',
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850',
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856',
  },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373',
  },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590',
  },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389',
  },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670',
  },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508',
  },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970',
  },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47',
  },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239',
  },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721',
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963',
  },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649',
  },
  { code: 'TD', label: 'Chad', phone: '235' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262',
  },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868',
  },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan',
    phone: '886',
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255',
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    suggested: true,
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379',
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784',
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284',
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340',
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function OrdersReview() {
  const data = useSelector((state) => state.Orders);
  console.log(data);
  const [voucherInput, setVoucherInput] = useState('');
  const [voucher, setVoucher] = useState('');
  const [value, setValue] = useState('1');
  const [selectedValue, setSelectedValue] = useState('a');
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    note: '',
  });

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  const walletValue = localStorage.getItem('walletValue');

  const createOrder = (data, actions) => {
    console.log(actions, "actions");
    console.log(data, 'data');
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: walletValue,
          currency_code: "USD"
        }
      }]
    });
  };

  const onApprove = (data, actions) => {
    console.log('Payment approved:', data);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVoucher(voucherInput);
    }, 800);

    return () => clearTimeout(timeout);
  }, [voucherInput]);

  useEffect(() => {
    // CheckVoucher(voucher);
  }, [voucher]);

  const handleCountryChange = (event, newValue) => {
    setState({
      ...state,
      country: newValue ? newValue.code : '',
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const handleSelect = (event) => {
    setSelectedValue(event.target.value);
  }

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="container-fluid dashboard__container clearfix">
      <div className="headcrumbs pf-border-bottom pf-bg-white pf-ui-body dashboard__fullwidth">
        <div className="container">
          <div className="row pf-py-16 pf-align-items-center no-gutters">
            <div className="col-6 col-sm-4 col-md-3">
              <i className="pf-i pf-i-chevron-left pf-i-18 pf-text-gray" />
              <Link to="/orders" className="pf-link">
                <span>Back to all orders </span>
              </Link>
            </div>
            <div className="pf-d-none pf-d-sm-block col-sm-4 col-md-6 text-center">
              <div className="row text-center">
                <div className="col-12 col-md-4 pf-border-right pf-d-flex pf-align-items-md-center pf-justify-content-center pf-mt-8 order-info">
                  <span className="dropshippy-order-number " title={123}>
                    #123
                  </span>
                </div>
                <div className="col-12 col-md-4 pf-border-right pf-mt-8 order-info">
                  <img
                    className="order-info--logo pf-mr-4"
                    src="https://static.cdn.dropshippy.com/static/v767/images/integrations/personal-orders.svg"
                    alt="native"
                  />
                  <span>Personal orders</span>
                </div>
                <div className="col-12 col-md-4 pf-d-flex pf-align-items-md-center pf-justify-content-center pf-mt-8 order-info">
                  Jun 18 2020 08:34 PM
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-md-3 text-right" />
          </div>
          <hr className="pf-m-0 pf-d-sm-none" />
          <div className="row pf-d-block pf-d-sm-none pf-py-16 text-center">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <span className="dropshippy-order-number " title={123}>
                    #123
                  </span>
                </div>
                <div className="col-12 pf-mt-8">
                  <img
                    className="order-info--logo pf-mr-4"
                    src="https://static.cdn.dropshippy.com/static/v767/images/integrations/personal-orders.svg"
                    alt="native"
                  />
                  <span>Personal orders</span>
                </div>
                <div className="col-12 pf-mt-8">Jun 18 2020, 8:34pm </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container order-container pf-mb-16 pf-mb-sm-0 pf-p-0 pf-py-sm-32 pf-px-sm-16">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2 offset-xl-3">
            <div id="5eec324521249">
              <ul className="pf-steps  dashboard__fullwidth">
                <div className="pf-steps-wrap ">
                  <Link to="/orders/update" className="pf-steps__item ">
                    <div className="pf-steps__item__inner">
                      <span className="pf-steps__item__step">1</span>
                      <span className="pf-steps__item__title">Products</span>
                    </div>
                  </Link>
                  <Link to="/orders/shipping" className="pf-steps__item ">
                    <div className="pf-steps__item__inner">
                      <span className="pf-steps__item__step">2</span>
                      <span className="pf-steps__item__title">Shipping</span>
                    </div>
                  </Link>
                  <a href="#" className="pf-steps__item pf-steps__item--done">
                    <div className="pf-steps__item__inner">
                      <span className="pf-steps__item__step">3</span>
                      <span className="pf-steps__item__title">
                        Review Order
                      </span>
                    </div>
                  </a>
                </div>
                <span className="nav-arrow left hidden">
                  <i className="pf-i pf-i-chevron-left pf-i-24 pf-pt-0" />
                </span>
                <span className="nav-arrow right hidden">
                  <i className="pf-i pf-i-chevron-right pf-i-24 pf-pt-0" />
                </span>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container order-container order-review  ">
        <div className="row">
          <div className="col-12">
            <div
              data-vue-root="fjfGhooHeVCx84j0"
              data-vue-components='["order-review-items"]'
            >
              <div className="row no-gutters">
                <div className="col-12">
                  <div className="col-12 hidden-sm hidden-md hidden-lg">
                    <h4 className="pf-ml-12 pf-mt-24 pf-mb-16 pf-mr-8 inline">
                      Order items
                    </h4>
                    <a href="/orders/update" className="pf-link">
                      Edit
                    </a>
                  </div>
                </div>
                <div className="col-12 white-block pf-px-12 pf-py-24 pf-p-sm-32 pf-mb-12">
                  <div className="row">
                    <div className="col-12 hidden-xs">
                      <h4 className="pf-mt-0 pf-mb-16 pf-mr-8 inline">
                        Order items
                      </h4>
                      <a href="/orders/update" className="pf-link">
                        Edit
                      </a>
                    </div>
                    <div className="col-md-12">
                      <div id="review-order-items">
                        <div>
                          <table className="table order-item-table">
                            <thead>
                              <tr>
                                <th className="pf-pb-12">
                                  Product
                                  <span className="glyphicon glyphicon-info-sign" />
                                </th>
                                <th className="pf-pb-12"> </th>
                                <th className="pf-pb-12">Print file </th>
                                <th className="pf-pb-12">Qty</th>
                                <th className="pf-pb-12">
                                  Price
                                  <span className="glyphicon glyphicon-info-sign" />
                                </th>
                                <th className="pf-pb-12">
                                  Retail
                                  <span className="glyphicon glyphicon-info-sign" />
                                </th>
                                <th className="pf-pb-12"> </th>
                              </tr>
                            </thead>
                            <tbody>
                              <Products />
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="white-block pf-px-12 pf-py-24 pf-p-sm-32 pf-mb-12">
              <div className="row">
                <div className="col-md-12">
                  <h4 className="pf-h3 pf-mt-0 pf-mb-16">Shipping</h4>
                </div>
                <div className="col-md-4">
                  <h4 className="pf-h5 pf-mt-0">
                    Shipping from
                  </h4>
                  <div className="pf-mb-24 pf-mb-md-0">
                    <div className="shipped-from">
                      <div className="shipped-from__branch margin-bottom-10">
                        <span className="pf-mr-4 pf-badge pf-badge-location pf-badge--eu">
                          VN
                        </span>
                        <span> Shop address</span> {/**/}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <h4 className="pf-h5 pf-mt-0 pf-mb-16 pf-mr-8 inline">
                    Shipping to
                  </h4>
                  <Link to="/orders/shipping" className="pf-link">
                    Edit
                  </Link>
                  <p className="pf-mb-24 pf-mb-md-0 inspectlet-sensitive">
                    <span>Buyer Address</span>
                    <br />
                    <span>VietNam</span>
                    <br />
                    <span>Ho Chi Minh, </span>
                    <br />
                    <span>Vietnam</span>
                    <br />
                    <span>+84364240255</span>
                  </p>
                </div>
                <div className="col-md-4">
                  <h4 className="pf-h5 pf-mt-0 pf-mb-16 pf-mr-0 inline">
                    Shipping method
                  </h4>
                  <Link to="/orders/shipping" className="pf-link">
                    Edit
                  </Link>
                  <p className="pf-mb-0">Buyer Shipping method</p>
                </div>
              </div>
            </div>
            <form id="orderCreate">
              <div
                className="white-block pf-px-12 pf-py-24 pf-p-sm-32 pf-mb-12"
                id="coupon-code"
              >
                <div>
                  <div className="form-group row pf-mb-4">
                    <div className="col-md-8">
                      <label className="pf-mb-8">Discount Code</label>
                      <div>
                        <div className="row">
                          <div className="col-md-4">
                            <input
                              type="text"
                              placeholder="Discount code"
                              maxLength={85}
                              value={voucherInput}
                              onChange={(e) => setVoucherInput(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 pf-ui-caption pf-text-red pf-text-red" />
                  </div>
                </div>
              </div>
            </form>
            <div className="white-block pf-px-12 pf-py-24 pf-p-sm-32 pf-mb-12">
              <div className="row">
                <div className="col-md-12">
                  <h4 className="pf-h3 pf-mt-0 pf-mb-16">Payment</h4>
                </div>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Wallet" value="1" />
                        <Tab label="Other Methods" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1"></TabPanel>
                    <TabPanel value="2"></TabPanel>
                  </TabContext>
                </Box>

                {
                  value === "1" &&
                  <>

                    <div className='alert-message'>
                      <div className='contain-text'>
                        <p style={{ fontSize: 14, color: "#8a6d3b" }}>Each currency on Printful has its own Wallet, so please <b>add funds</b> to your USD Wallet to pay for this order. You can do this by going to the Billing section. This order will be saved as a draft.</p>
                      </div>
                      <div className='add-money'>
                        <Button
                          className="download-btn add-alert"
                          variant="contained"
                          color="primary"
                        >
                          Add Money
                        </Button>
                      </div>
                    </div>
                    <div data-v-9e1d1cd8="" class="payment-selection payment-wallet pf-d-flex pf-flex-row pf-p-16 relative__block"><div data-v-9e1d1cd8="" class="payment-wallet__info pf-d-flex pf-flex-column pf-flex-sm-row">
                      <div data-v-9e1d1cd8="" class="pf-ui-subheading payment-wallet__name pf-d-flex pf-align-items-center">
                        USD wallet
                      </div>
                      <div data-v-9e1d1cd8="" class="pf-text-muted pf-ui-caption pf-sm-ml-16">
                        <div data-v-9e1d1cd8="">Balance:</div>
                        <div data-v-9e1d1cd8="" class="pf-text-dark pf-h4">$0</div>
                      </div>
                    </div>
                      <div data-v-9e1d1cd8="" class="billing--disabled"></div>
                    </div>
                  </>
                }

                {
                  value === "2" &&
                  <>

                    <div className='billing-info'>
                      <div className='billing-heding'>
                        <h5>Billing info</h5>
                      </div>
                      <div className='select-manually'>
                        <div>
                          <Radio
                            checked={selectedValue === 'a'}
                            onChange={handleSelect}
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                          />
                          <span style={{ fontSize: 14 }}>Add manually</span>
                        </div>
                        <div>
                          <Radio
                            checked={selectedValue === 'b'}
                            onChange={handleSelect}
                            value="b"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'B' }}
                          />
                          <span style={{ fontSize: 14 }}>Same as shipping address</span>
                        </div>
                      </div>
                    </div>

                    {
                      selectedValue === "a" &&
                      <>
                        <div className='menually-address'>
                          <div className="row accodion-address">
                            <div className=" no-gutters col-sm-6 col-xs-12">
                              <div className="row" style={{ height: '100%' }}>
                                <div className="col-sm-12 col-xs-12">
                                  <div className="pf-form-group pf-mt-24 ">
                                    <label
                                      htmlFor="pf-form-input-1"
                                      className="pf-h5"
                                    >
                                      Full Name
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      name="name"
                                      onChange={handleChange}
                                      className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                      id="pf-form-input-1"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                              <div className="row" style={{ height: '100%' }}>
                                <div className="col-sm-12 col-xs-12">
                                  <div className="pf-form-group pf-mt-24">
                                    <label
                                      htmlFor="pf-form-input-2"
                                      className="pf-h5"
                                    >
                                      Address line 1
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      name="address"
                                      onChange={handleChange}
                                      className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                      id="pf-form-input-2"
                                    />
                                    <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                              <div className="row" style={{ height: '100%' }}>
                                <div className="col-sm-12 col-xs-12">
                                  <div className="pf-form-group pf-mt-24">
                                    <label
                                      htmlFor="pf-form-input-2"
                                      className="pf-h5"
                                    >
                                      Company (optional)
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      name="address"
                                      onChange={handleChange}
                                      className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                      id="pf-form-input-2"
                                    />
                                    <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                              <div className="row" style={{ height: '100%' }}>
                                <div className="col-sm-12 col-xs-12">
                                  <div className="pf-form-group pf-mt-24">
                                    <label
                                      htmlFor="pf-form-input-2"
                                      className="pf-h5"
                                    >
                                      Address line 2 (optional)
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      name="address"
                                      onChange={handleChange}
                                      className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                      id="pf-form-input-2"
                                    />
                                    <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                              <div className="row" style={{ height: '100%' }}>
                                <div className="col-sm-12 col-xs-12">
                                  <div className="form-group pf-mb-4 pf-mt-24">
                                    <label className="pf-h5">
                                      Phone
                                      <span className="pf-pl-4">
                                        <span className="label-help-text cgray">
                                          Only used for delivery, not marketing
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                  <div className="row phone-container">
                                    <div className="col-4 phone-container__code">
                                      <div className="pf-form-group ">
                                        <select
                                          data-no_results_text="No results match"
                                          name="phoneCountry"
                                          className="form-control"
                                          id="pf-form-input-10"
                                          style={{ display: 'none' }}
                                        />
                                        <div
                                          className="chosen-container chosen-container-single"
                                          style={{ width: '100%' }}
                                          id="pf_form_input_10_chosen"
                                        >
                                          <a className="chosen-single" tabIndex={-1}>
                                            <span>
                                              <span className="pf-mr-8 flag flag--sprite flag--sprite-vn" />
                                              +84
                                            </span>
                                            <div>
                                              <b />
                                            </div>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-8">
                                      <div className="pf-form-group ">
                                        <input
                                          required
                                          type="tel"
                                          name="phone"
                                          onChange={handleChange}
                                          className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                          id="pf-form-input-11"
                                        />
                                        <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                              <div className="row" style={{ height: '100%' }}>
                                <div className="col-sm-12 col-xs-12">
                                  <div className="form-group pf-mb-24">
                                    <label htmlFor="zip" className="control-label pf-h5">
                                      Country (required)
                                    </label>
                                    <Autocomplete
                                      id="country-select-demo"
                                      name="country"
                                      sx={{ width: 400 }}
                                      options={countries}
                                      autoHighlight
                                      // disabled={!active}
                                      value={countries.find((c) => c.code === state.country) || null} // Setting initial value based on state
                                      onChange={handleCountryChange}
                                      getOptionLabel={(option) => option.label}
                                      renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                          <img
                                            loading="lazy"
                                            width="20"
                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                            alt=""
                                          />
                                          {option.label}
                                        </Box>
                                      )}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Choose a country"
                                          inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                              <div className="row" style={{ height: '100%' }}>
                                <div className="col-sm-12 col-xs-12">
                                  <div className="pf-form-group pf-mt-24">
                                    <label
                                      htmlFor="pf-form-input-5"
                                      className="pf-h5"
                                    >
                                      Postal/Zip code
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      name="email"
                                      onChange={handleChange}
                                      className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                      id="pf-form-input-5"
                                    />
                                    <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                              <div className="row" style={{ height: '100%' }}>
                                <div className="col-sm-12 col-xs-12">
                                  <div className="pf-form-group pf-mt-24">
                                    <label
                                      htmlFor="pf-form-input-5"
                                      className="pf-h5"
                                    >
                                      City
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      name="email"
                                      onChange={handleChange}
                                      className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                      id="pf-form-input-5"
                                    />
                                    <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                              <div className="row" style={{ height: '100%' }}>
                                <div className="col-sm-12 col-xs-12">
                                  <div className="pf-form-group pf-mt-24">
                                    <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='bill-address'>
                          <div className='Billing-head'>
                            <h5>Billing Method</h5>
                          </div>
                          <div className='Billing-content'>
                            <p style={{ fontSize: 14, width: "50%", padding: 10, background: "#f8f8f8" }}>Please finish filling out Billing info to select a Billing method!</p>
                          </div>
                        </div>
                      </>
                    }

                    {
                      selectedValue === "b" &&
                      <>
                        <div className='shipping-detail'>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2-content"
                              id="panel2-header"
                            >
                              <Typography style={{ fontSize: 16 }}>Same as shipping address</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className="row accodion-address">
                                <div className=" no-gutters col-sm-6 col-xs-12">
                                  <div className="row" style={{ height: '100%' }}>
                                    <div className="col-sm-12 col-xs-12">
                                      <div className="pf-form-group pf-mt-24 ">
                                        <label
                                          htmlFor="pf-form-input-1"
                                          className="pf-h5"
                                        >
                                          Full Name
                                        </label>
                                        <input
                                          required
                                          type="text"
                                          name="name"
                                          onChange={handleChange}
                                          className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                          id="pf-form-input-1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                  <div className="row" style={{ height: '100%' }}>
                                    <div className="col-sm-12 col-xs-12">
                                      <div className="pf-form-group pf-mt-24">
                                        <label
                                          htmlFor="pf-form-input-2"
                                          className="pf-h5"
                                        >
                                          Address line 1
                                        </label>
                                        <input
                                          required
                                          type="text"
                                          name="address"
                                          onChange={handleChange}
                                          className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                          id="pf-form-input-2"
                                        />
                                        <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                  <div className="row" style={{ height: '100%' }}>
                                    <div className="col-sm-12 col-xs-12">
                                      <div className="pf-form-group pf-mt-24">
                                        <label
                                          htmlFor="pf-form-input-2"
                                          className="pf-h5"
                                        >
                                          Company (optional)
                                        </label>
                                        <input
                                          required
                                          type="text"
                                          name="address"
                                          onChange={handleChange}
                                          className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                          id="pf-form-input-2"
                                        />
                                        <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                  <div className="row" style={{ height: '100%' }}>
                                    <div className="col-sm-12 col-xs-12">
                                      <div className="pf-form-group pf-mt-24">
                                        <label
                                          htmlFor="pf-form-input-2"
                                          className="pf-h5"
                                        >
                                          Address line 2 (optional)
                                        </label>
                                        <input
                                          required
                                          type="text"
                                          name="address"
                                          onChange={handleChange}
                                          className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                          id="pf-form-input-2"
                                        />
                                        <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                  <div className="row" style={{ height: '100%' }}>
                                    <div className="col-sm-12 col-xs-12">
                                      <div className="form-group pf-mb-4 pf-mt-24">
                                        <label className="pf-h5">
                                          Phone
                                          <span className="pf-pl-4">
                                            <span className="label-help-text cgray">
                                              Only used for delivery, not marketing
                                            </span>
                                          </span>
                                        </label>
                                      </div>
                                      <div className="row phone-container">
                                        <div className="col-4 phone-container__code">
                                          <div className="pf-form-group ">
                                            <select
                                              data-no_results_text="No results match"
                                              name="phoneCountry"
                                              className="form-control"
                                              id="pf-form-input-10"
                                              style={{ display: 'none' }}
                                            />
                                            <div
                                              className="chosen-container chosen-container-single"
                                              style={{ width: '100%' }}
                                              id="pf_form_input_10_chosen"
                                            >
                                              <a className="chosen-single" tabIndex={-1}>
                                                <span>
                                                  <span className="pf-mr-8 flag flag--sprite flag--sprite-vn" />
                                                  +84
                                                </span>
                                                <div>
                                                  <b />
                                                </div>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-8">
                                          <div className="pf-form-group ">
                                            <input
                                              required
                                              type="tel"
                                              name="phone"
                                              onChange={handleChange}
                                              className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                              id="pf-form-input-11"
                                            />
                                            <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                  <div className="row" style={{ height: '100%' }}>
                                    <div className="col-sm-12 col-xs-12">
                                      <div className="form-group pf-mb-24">
                                        <label htmlFor="zip" className="control-label pf-h5">
                                          Country (required)
                                        </label>
                                        <Autocomplete
                                          id="country-select-demo"
                                          name="country"
                                          sx={{ width: 400 }}
                                          options={countries}
                                          autoHighlight
                                          // disabled={!active}
                                          value={countries.find((c) => c.code === state.country) || null} // Setting initial value based on state
                                          onChange={handleCountryChange}
                                          getOptionLabel={(option) => option.label}
                                          renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                              <img
                                                loading="lazy"
                                                width="20"
                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                alt=""
                                              />
                                              {option.label}
                                            </Box>
                                          )}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Choose a country"
                                              inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                              }}
                                            />
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                  <div className="row" style={{ height: '100%' }}>
                                    <div className="col-sm-12 col-xs-12">
                                      <div className="pf-form-group pf-mt-24">
                                        <label
                                          htmlFor="pf-form-input-5"
                                          className="pf-h5"
                                        >
                                          Postal/Zip code
                                        </label>
                                        <input
                                          required
                                          type="text"
                                          name="email"
                                          onChange={handleChange}
                                          className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                          id="pf-form-input-5"
                                        />
                                        <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                  <div className="row" style={{ height: '100%' }}>
                                    <div className="col-sm-12 col-xs-12">
                                      <div className="pf-form-group pf-mt-24">
                                        <label
                                          htmlFor="pf-form-input-5"
                                          className="pf-h5"
                                        >
                                          City
                                        </label>
                                        <input
                                          required
                                          type="text"
                                          name="email"
                                          onChange={handleChange}
                                          className="pf-form-control form-control inspectletIgnore pf-ui-body"
                                          id="pf-form-input-5"
                                        />
                                        <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                  <div className="row" style={{ height: '100%' }}>
                                    <div className="col-sm-12 col-xs-12">
                                      <div className="pf-form-group pf-mt-24">
                                        <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        <div className='bill-address'>
                          <div className='Billing-head'>
                            <h5>Billing Method</h5>
                          </div>
                          <div className='Billing-content'>
                            <div>
                              <Accordion>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2-content"
                                  id="panel2-header"
                                >
                                  <Typography style={{ fontSize: 16 }}>
                                    <div class="paypal-block__header">
                                      <div class="paypal-block">
                                        <img style={{ width: "100%", height: "auto" }} src='https://static.cdn.printful.com/static/images/layout/dashboard/paypal.svg' alt='paypal' />
                                      </div>
                                      <div className='paypal-name'>
                                        <p style={{ fontSize: 16 }}>PayPal</p>
                                      </div>
                                    </div>
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div className='paypal-content'>
                                    <p style={{ fontSize: 14 }}>Press the yellow PayPal button below to authorize your account</p>
                                  </div>
                                  <div className='paypal-btn'>
                                    <PayPalScriptProvider options={initialOptions}>
                                      <PayPalButtons
                                        createOrder={(data, actions) => createOrder(data, actions)}
                                        onApprove={(data, actions) => onApprove(data, actions)}
                                        style={{ layout: "horizontal", display: "block", width: 115, height: 44 }}
                                      />
                                    </PayPalScriptProvider>
                                  </div>
                                </AccordionDetails>
                              </Accordion>


                              <Accordion>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2-content"
                                  id="panel2-header"
                                >
                                  <Typography style={{ fontSize: 16 }}>
                                    <div class="paypal-block__header">
                                      <div class="paypal-block">
                                        <img style={{ width: "100%", height: "auto" }} src='https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/card.svg' alt='card' />
                                      </div>
                                      <div className='paypal-name'>
                                        <p style={{ fontSize: 16 }}>Payment card</p>
                                      </div>
                                    </div>
                                    <span className='adyen-checkout__payment-method__brands'>
                                      <span class="adyen-checkout__payment-method__image__wrapper DropinComponent-module_adyen-checkout__payment-method__image__wrapper__6NWzA adyen-checkout__payment-method__image__wrapper--outline">
                                        <img class="adyen-checkout__payment-method__image DropinComponent-module_adyen-checkout__payment-method__image__nB80V adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/visa.svg" alt="VISA" />
                                      </span>
                                      <span class="adyen-checkout__payment-method__image__wrapper DropinComponent-module_adyen-checkout__payment-method__image__wrapper__6NWzA adyen-checkout__payment-method__image__wrapper--outline">
                                        <img class="adyen-checkout__payment-method__image DropinComponent-module_adyen-checkout__payment-method__image__nB80V adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/mc.svg" alt="MasterCard" />
                                      </span>
                                      <span class="adyen-checkout__payment-method__image__wrapper DropinComponent-module_adyen-checkout__payment-method__image__wrapper__6NWzA adyen-checkout__payment-method__image__wrapper--outline">
                                        <img class="adyen-checkout__payment-method__image DropinComponent-module_adyen-checkout__payment-method__image__nB80V adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/amex.svg" alt="American Express" />
                                      </span>
                                    </span>
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div className='card-content'>
                                    <p>All fields are required unless marked otherwise.</p>
                                  </div>
                                  <div className='card-input'>
                                    <div className='card-number'>
                                      <p>Card number</p>
                                      <input id="adyen-checkout-encryptedCardNumber-1710128590702" data-fieldtype="encryptedCardNumber" type="text" inputmode="numeric" maxlength="24" autocomplete="cc-number" placeholder="1234 5678 9012 3456" aria-label="Card number" aria-invalid="false" aria-required="true" aria-describedby="adyen-checkout-encryptedCardNumber-1710128590702-ariaContext" class="js-iframe-input input-field" data-type="gsf" style={{ display: "block" }} />
                                    </div>
                                    <div className='card-cvv'>
                                      <div className='card-expiry'>
                                        <p>Expiry date</p>
                                        <input id="adyen-checkout-encryptedCardNumber-1710128590702" data-fieldtype="encryptedCardNumber" type="text" inputmode="numeric" maxlength="24" autocomplete="cc-number" placeholder="MM/YY" aria-label="Card number" aria-invalid="false" aria-required="true" class="js-iframe-input input-field" data-type="gsf" style={{ display: "block" }} />
                                      </div>
                                      <div className='card-expiry'>
                                        <p>CVC / CVV</p>
                                        <input id="adyen-checkout-encryptedCardNumber-1710128590702" data-fieldtype="encryptedCardNumber" type="text" inputmode="numeric" maxlength="3" autocomplete="cc-number" placeholder="3 digits" aria-label="Card number" aria-invalid="false" aria-required="true" class="js-iframe-input input-field" data-type="gsf" style={{ display: "block" }} />
                                      </div>
                                    </div>
                                  </div>
                                </AccordionDetails>
                              </Accordion>
                            </div>

                            <div data-v-29dd9fe8="" data-v-598cdd0a="" class="pf-position-relative pf-p-12 pf-p-sm-24 pf-banner pf-rounded--large payment_security_info d-sm-none pf-banner-success" data-test="payment-security-info-phgiB4qzAuLmTcQ" style={{ color: "hsl(122.98, 83.45%, 28.43%)" }}>
                              <div data-v-29dd9fe8="" class="pf-d-flex pf-flex-column pf-flex-sm-row">
                                <div data-v-29dd9fe8="" class="pf-pr-16 pf-mb-16 pf-mb-md-0">
                                  <img data-v-29dd9fe8="" draggable="false" src="https://static.cdn.printful.com/dist-pf/image-assets/padlock-icon.32cca8f802190aa830b959fd12cc2892.svg" alt="" class="pf-rounded-circle" />
                                </div>
                                <div data-v-29dd9fe8="">
                                  <div data-v-29dd9fe8="" class="pf-banner-content__width">
                                    <p data-v-29dd9fe8="" class="pf-mt-0 pf-ui-body pf-mb-0">Your data is safe—we don't store your card or billing method details, and we use industry-standard encryption to protect your personal information</p></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='save-billing'>
                            <FormGroup>
                              <FormControlLabel control={<Switch />} label="Save billing method" />
                            </FormGroup>
                          </div>
                        </div>
                        <div className='save-text'>
                          <div data-v-c198f1dc="" class="pf-position-absolute popover-arrow arrow--top-left"></div>
                          <div class="pf-p-24 pf-pr-40">
                            <div class="pf-d-flex">
                              <img className='save-img' src="https://static.cdn.printful.com/dist-pf/image-assets/save-method-icon.bbaf2d2946937ea937e1685c223c67ad.svg" alt="Save billing method icon" />
                              <p class="pf-ui-body pf-text-gray-700 pf-m-0">Saving this billing method speeds up the checkout process the next time you place an order. You can always add more or remove billing methods in your Dashboard under <i>Billing</i>.</p>
                            </div>
                          </div>
                        </div>
                      </>
                    }

                  </>
                }

              </div>
            </div>
            <div className="white-block pf-px-12 pf-py-24 pf-p-sm-32 pf-mb-64">
              <div id="covid-banner-anchor" />
              <div className="row">
                <div className="col-xs-11 col-sm-8 col-md-6 col-lg-4 center-block">
                  <div
                    className="row no-gutters pf-mb-16"
                    style={{ position: 'relative' }}
                  >
                    <div className="loading-overlay loading-overlay--alt" />
                    <div className="row no-gutters">
                      <div className="col-12">
                        <h3 className="pf-h3 pf-mb-16">Order breakdown</h3>
                      </div>
                    </div>
                    <div className="row no-gutters">
                      <div className="row no-gutters">
                        <div className="col-12">
                          <div>
                            <div className="pf-mb-16">
                              <div className="pf-border-bottom accordion pf-border pf-border-light pf-mb-16">
                                <div
                                  data-toggle="collapse"
                                  data-target=".accordion__header:hover + .accordion__content"
                                  className="accordion__header"
                                >
                                  <div className="row no-gutters pf-d-flex pf-justify-content-between pf-py-8 pf-pl-8 pf-pr-12">
                                    <div className="col pf-d-flex pf-justify-content-between pf-align-items-center pf-ml-2">
                                      <div className="pf-h5">Fulfillment</div>
                                      <div className="pf-d-flex pf-align-items-center">
                                        <div className="pf-ml-8 pf-h5">
                                          $12.27
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  aria-hidden="true"
                                  className="collapse accordion__content"
                                >
                                  <div className="row no-gutters">
                                    <div>
                                      <div>
                                        <div className="row no-gutters">
                                          <div className="col-12 pf-bg-lighter">
                                            <div className="row no-gutters">
                                              <div className="col-12 pf-h5 pf-pt-8 pf-pb-8 pf-pl-12 pf-pt-16 pf-pl-12">
                                                Fulfilled in Europe
                                              </div>
                                              <div className="col-12 pf-mb-12">
                                                <div className="col-12 pf-d-flex pf-justify-content-between pf-ui-body text-muted  pf-pl-24 pf-pr-12">
                                                  <div className="pf-pr-8">
                                                    Products and fulfillment
                                                  </div>
                                                  <div className="text-nowrap">
                                                    $12.27
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-12 text-right pf-h5 text-muted pf-pr-12 pf-py-8">
                                            $12.27
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 pf-d-flex pf-justify-content-between pf-ui-body pf-pb-16 pf-h5 pf-p-0">
                            <div className="pf-pr-8">Shipping</div>
                            <div className="text-nowrap">+$5.99</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row no-gutters">
                      <div className="col-12 pf-border-top">
                        <div className="row">
                          <div className="col-12 pf-d-flex pf-justify-content-between">
                            <h3 className="pf-h3 pf-mt-16 pf-mb-8">Total</h3>
                            <h3 className="pf-h3 pf-mt-16 pf-mb-8">$18.26</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <a
                    id="create-order"
                    className="pf-btn pf-btn-primary pf-btn-block pf-btn-lg pf-px-8 order-flow__button"
                    href=""
                    style={{ maxWidth: 250 }}
                  >
                    <i className="pf-i pf-i-lock pf-i-18 pf-mb-4 order-review__lock-icon" />
                    Submit your order
                  </a>
                  <div className="pf-mt-24 pf-text-muted">
                    By completing this order,
                    <br />I agree to dropshippy's
                    <a
                      className="pf-link"
                      href="/policies/terms-of-service"
                      target="_blank"
                    >
                      Terms of Service
                    </a>
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
