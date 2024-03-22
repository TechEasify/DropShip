import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetInfoShipping } from '../action';
import Autocomplete from '@mui/material/Autocomplete';
import './Orders.scss';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

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

const Step = () => (
    <div className="container order-container pf-mb-16 pf-mb-sm-0 pf-p-0 pf-py-sm-32 pf-px-sm-16">
        <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2 offset-xl-3">
                <div id="5ef9c206c2b11">
                    <ul className="pf-steps  dashboard__fullwidth">
                        <div className="pf-steps-wrap ">
                            <Link to="/orders/update" className="pf-steps__item ">
                                <div className="pf-steps__item__inner">
                                    <span className="pf-steps__item__step">1</span>
                                    <span className="pf-steps__item__title">Products</span>
                                </div>
                            </Link>
                            <a href="#" className="pf-steps__item pf-steps__item--done">
                                <div className="pf-steps__item__inner">
                                    <span className="pf-steps__item__step">2</span>
                                    <span className="pf-steps__item__title">Shipping</span>
                                </div>
                            </a>
                            <a href="#" className="pf-steps__item ">
                                <div className="pf-steps__item__inner">
                                    <span className="pf-steps__item__step">3</span>
                                    <span className="pf-steps__item__title">Review Order</span>
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
);

function TestMultiShipping() {
    const history = useHistory();

    // Info buyer
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        country: '',
        note: '',
    });
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedValue, setSelectedValue] = useState('a');
    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
        setActiveClass(activeIndex);
    }, []);

    const handleCountryChange = (event, newValue) => {
        setState({
            ...state,
            country: newValue ? newValue.code : '',
        });
    };

    const handleChange = (event) => {
        const { name } = event.target;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleChangeRadio = (event) => {
        setSelectedValue(event.target.value);
    };


    const handleSetInfo = () => {
        dispatch(SetInfoShipping(state));
        history.push('/orders/review');
    };

    const handleClick = (index) => {
        setActiveIndex(index);
        setActiveClass(index);
    };

    const setActiveClass = (index) => {
        const items = document.querySelectorAll('.recipient-picker__item');
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };


    return (
        <>
            <div className="container-fluid dashboard__container clearfix">
                <Step />
                <div className="container order-container ">
                    <div className="row">
                        <div className="col-12">
                            <div id="order-shipping">
                                <div className="order-shipping">
                                    <div className="white-block pf-px-12 pf-py-24 pf-p-sm-32 pf-mb-12">
                                        <div className='order-head'>
                                            <h5>Shipping Address</h5>
                                            <div className='order-book1'>
                                                <a href='#' className='Address-order'>Address book (0)</a>
                                            </div>
                                        </div>
                                        <div className='multi-Tab'>
                                            <div class="recipient-picker recipient-picker--items-overflow">
                                                <a href="javascript:" class="recipient-picker__item recipient-picker__item--disabled" onClick={() => handleClick(0)}>
                                                    <div class="recipient-picker__img">
                                                    </div>
                                                    <div class="recipient-picker__name">Add sample recipient 01</div>
                                                </a>
                                                <a href="javascript:" class="recipient-picker__item recipient-picker__item--disabled" onClick={() => handleClick(1)}>
                                                    <div class="recipient-picker__img">
                                                    </div>
                                                    <div class="recipient-picker__name">Add sample recipient 02</div>
                                                </a>
                                                <a href="javascript:" class="recipient-picker__item recipient-picker__item--disabled" onClick={() => handleClick(2)}>
                                                    <div class="recipient-picker__img">
                                                    </div>
                                                    <div class="recipient-picker__name">Add sample recipient 03</div>
                                                </a>
                                                <div class="clearfix">
                                                </div>
                                            </div>
                                        </div>

                                        <div className='sample orders'>
                                            <p style={{ fontSize: 14 }}>You can only send sample orders to
                                                <b> 3 registered addresses</b>. Once you've continued to review, the address used will be locked and you won't be able to change it.
                                            </p>
                                        </div>

                                        {activeIndex === 0 && <div className="row">
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
                                            <div className=" no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="pf-form-group pf-mt-24 ">
                                                            <label
                                                                htmlFor="pf-form-input-1"
                                                                className="pf-h5"
                                                            >
                                                                Order number (optional)
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
                                                                Retail shipping price
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
                                                            <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="form-group pf-mb-24">
                                                            <label htmlFor="zip" className="control-label pf-h5">
                                                                State
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
                                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="pf-form-group pf-mt-24">
                                                            <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="pf-form-group pf-mt-24">
                                                            <p style={{ fontSize: 14, textAlign: "end" }}><Checkbox {...label} />Save this address for later use</p>
                                                            <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}

                                        {activeIndex === 1 && <div className="row">
                                            <div className=" no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="pf-form-group pf-mt-24 ">
                                                            <label
                                                                htmlFor="pf-form-input-1"
                                                                className="pf-h5"
                                                            >
                                                                Full Name 1
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
                                            <div className=" no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="pf-form-group pf-mt-24 ">
                                                            <label
                                                                htmlFor="pf-form-input-1"
                                                                className="pf-h5"
                                                            >
                                                                Order number (optional)
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
                                                                Retail shipping price
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
                                                            <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="form-group pf-mb-24">
                                                            <label htmlFor="zip" className="control-label pf-h5">
                                                                State
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
                                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="pf-form-group pf-mt-24">
                                                            <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="pf-form-group pf-mt-24">
                                                            <p style={{ fontSize: 14, textAlign: "end" }}><Checkbox {...label} />Save this address for later use</p>
                                                            <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}

                                        {activeIndex === 2 && <div className="row">
                                            <div className=" no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="pf-form-group pf-mt-24 ">
                                                            <label
                                                                htmlFor="pf-form-input-1"
                                                                className="pf-h5"
                                                            >
                                                                Full Name 2
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
                                            <div className=" no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="pf-form-group pf-mt-24 ">
                                                            <label
                                                                htmlFor="pf-form-input-1"
                                                                className="pf-h5"
                                                            >
                                                                Order number (optional)
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
                                                                Retail shipping price
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
                                                            <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="form-group pf-mb-24">
                                                            <label htmlFor="zip" className="control-label pf-h5">
                                                                State
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
                                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="pf-form-group pf-mt-24">
                                                            <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-2 order-flow-mobile-2 no-gutters col-sm-6 col-xs-12">
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-sm-12 col-xs-12">
                                                        <div className="pf-form-group pf-mt-24">
                                                            <p style={{ fontSize: 14, textAlign: "end" }}><Checkbox {...label} />Save this address for later use</p>
                                                            <div className="pf-custom-control-error-message pf-mt-4 pf-ui-caption" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        <br />
                                        <br />
                                        <br />
                                    </div>

                                    <div className="white-block pf-px-12 pf-py-24 pf-p-sm-32 pf-mb-12">
                                        <div className='order-head'>
                                            <h5>Shipping method</h5>
                                        </div>

                                        <div className='flat-btn'>
                                            <div className='btn-flat'>
                                                <Radio
                                                    checked={selectedValue === 'a'}
                                                    onChange={handleChangeRadio}
                                                    value="a"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'A' }}
                                                />
                                            </div>
                                            <div className='flat-rate'>
                                                <p>$49.99 - Flat Rate (Estimated delivery: Mar 27⁠–Apr 8)</p>
                                            </div>
                                        </div>
                                        <div className='flat-btn'>
                                            <div className='btn-flat'>
                                                <Radio
                                                    checked={selectedValue === 'b'}
                                                    onChange={handleChangeRadio}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                />
                                            </div>
                                            <div className='flat-rate'>
                                                <p>$50.10 - Standard rate with  CO2 offsetting (Estimated delivery: Mar 27⁠–Apr 8)</p>
                                            </div>
                                        </div>

                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                    <div className="white-block pf-px-12 pf-py-24 pf-p-sm-32 pf-mb-12 ">
                                        <div className="row">
                                            <div className='continue-review'>
                                                <p style={{ fontSize: 14, color: "#bd7417" }}>Please double-check the address you entered. If everything's correct, continue to <i>Review</i> order.</p>
                                            </div>
                                            <div className='continue-review1'>
                                                <p style={{ fontSize: 14 }}>This order is shipping from an international location. You might have to pay handling and/or customs fees upon delivery.</p>
                                            </div>
                                            <div className="col-xs-11 col-sm-8 col-md-6 col-lg-4 center-block">
                                                <div className='order-break'>
                                                    <h5>Order breakdown</h5>
                                                </div>
                                                <div className='fulfilment'>
                                                    <Accordion>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel2-content"
                                                            id="panel2-header"
                                                        >
                                                            <div className='head-ful'>
                                                                <div className='text-ful'>
                                                                    <h6>Fulfillment</h6>
                                                                </div>
                                                                <div className='price-ful'>
                                                                    <div className='price-del'>
                                                                        <del>$16.50</del>
                                                                    </div>
                                                                    <h6>$13.20</h6>
                                                                </div>
                                                            </div>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <div class="row no-gutters">
                                                                <div class="col-12 pf-bg-lighter">
                                                                    <div class="row no-gutters">
                                                                        <div class="col-12 pf-h5 pf-pt-8 pf-pb-8 pf-pl-12 pf-pt-16 pf-pl-12">
                                                                            Fulfilled in Europe
                                                                        </div>
                                                                        <div class="col-12 pf-mb-12">
                                                                            <div class="col-12 pf-d-flex pf-justify-content-between pf-ui-body text-muted  pf-pl-24 pf-pr-12">
                                                                                <div class="pf-pr-8">
                                                                                    Products and fulfillment
                                                                                </div>
                                                                                <div class="text-nowrap">
                                                                                    $16.50
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-12 pf-mb-12">
                                                                            <div class="col-12 pf-d-flex pf-justify-content-between pf-ui-body pf-text-green pf-pl-24 pf-pr-12">
                                                                                <div class="pf-pr-8">
                                                                                    Discount
                                                                                </div>
                                                                                <div class="text-nowrap">
                                                                                    -$3.30
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12 text-right pf-h5 text-muted pf-pr-12 pf-py-8">
                                                                    $13.20
                                                                </div></div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                                <div class="col-12 pf-d-flex pf-justify-content-between pf-ui-body pf-pb-16 pf-h5 pf-p-0">
                                                    <div class="pf-pr-8">
                                                        Shipping
                                                    </div>
                                                    <div class="text-nowrap">
                                                        $49.99
                                                    </div>
                                                </div>
                                                <hr />
                                                <div data-v-3976c76a="" class="col-12 pf-d-flex pf-justify-content-between order-review-breakdown__grandtotal">
                                                    <h3 data-v-3976c76a="" class="pf-h3 pf-mt-16 pf-mb-8">
                                                        Total
                                                    </h3>
                                                    <h3 data-v-3976c76a="" class="pf-h3 pf-mt-16 pf-mb-8">
                                                        $63.19
                                                    </h3>
                                                </div>
                                                <div data-v-3976c76a="" class="col-12 pf-d-flex pf-justify-content-between">
                                                    <div data-v-3976c76a="" class="pf-ui-body pf-text-muted">
                                                        You saved
                                                    </div>
                                                    <div data-v-3976c76a="" class="pf-ui-body pf-text-muted">
                                                        $3.30
                                                    </div>
                                                </div>
                                                <div>
                                                    <a
                                                        className="pf-btn pf-btn-primary pf-btn-lg pf-mt-8 pf-px-8 pf-btn-block order-flow__button"
                                                        onClick={handleSetInfo}
                                                    >
                                                        Continue to review
                                                    </a>
                                                </div>
                                                <p style={{ fontSize: 14, marginTop: 15, textAlign: "center" }}>Wanna finish this later? <a>Save as draft</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestMultiShipping