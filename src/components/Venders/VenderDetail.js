import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import MuiPhoneNumber from 'material-ui-phone-number';
import { CheckCircleIcon, ProfileIcon } from '@shopify/polaris-icons';
import { Icon } from '@shopify/polaris';

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

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'product',
    headerName: 'Product',
    width: 130,
    renderCell: (params) => <ProductWithImage {...params} />,
  },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'price', headerName: 'Price', width: 130 },
  {
    field: 'action',
    headerName: 'Action',
    width: 130,
    renderCell: (params) => <DownloadButton id={params.row.id} />,
  },
];

const rows = [
  { id: 1, product: 'Snow', name: 'Jon', price: 30, action: 35 },
  { id: 2, product: 'Lannister', name: 'Cersei', price: 30, action: 42 },
  { id: 3, product: 'Lannister', name: 'Jaime', price: 30, action: 45 },
  { id: 4, product: 'Stark', name: 'Arya', price: 30, action: 16 },
  { id: 5, product: 'Targaryen', name: 'Daenerys', price: 30, action: null },
];

function ProductWithImage(params) {
  return (
    <img
      src={getImageForProduct(params.row.product)}
      alt={params.row.product}
      style={{ width: 40, height: 40 }}
    />
  );
}

function getImageForProduct(product) {
  const productImages = {
    Snow: 'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
    Lannister:
      'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
    Stark:
      'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
    Targaryen:
      'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
  };

  return productImages[product];
}

function DownloadButton({ id }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadImage = () => {
    console.log('Download image for ID:', id);
    handleClose();
  };

  const handleDownloadLogo = () => {
    console.log('Download logo for ID:', id);
    handleClose();
  };

  return (
    <>
      <Button
        className="download-btn"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Download
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleDownloadImage}>Download Image</MenuItem>
        <MenuItem onClick={handleDownloadLogo}>Download Logo</MenuItem>
      </Menu>
    </>
  );
}

function VenderDetail() {
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [active, setActive] = useState(false);
  const [state, setState] = useState({
    name: '',
    companyname: '',
    Reginumber: '',
    status: '',
    postal_code: '',
    address1: '',
    country: 'US',
    city: '',
    phone: '',
    address2: '',
  });

  const [error, setError] = useState({
    name: '',
    companyname: '',
    Reginumber: '',
    status: '',
    postal_code: '',
    address1: '',
    city: '',
    phone: '',
    address2: '',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: event.target.value,
    });
    setError((prevError) => ({
      ...prevError,
      [name]: '', // Clear error when user starts typing
    }));
  };

  const handleCountryChange = (event, newValue) => {
    setState({
      ...state,
      country: newValue ? newValue.code : '',
    });
  };

  const handlephone = (value) => {
    setState({ ...state, phone: value });
  };

  const handleSubmit = () => {
    let hasError = false;
    const newError = { ...error };

    // Validate Full name
    if (state.name.trim() === '') {
      newError.name = 'Full name is required';
      hasError = true;
    } else {
      newError.name = '';
    }

    // Validate Company name
    if (state.companyname.trim() === '') {
      newError.companyname = 'Company cannot be blank.';
      hasError = true;
    } else {
      newError.companyname = '';
    }

    // Validate Registration number
    if (state.Reginumber.trim() === '') {
      newError.Reginumber = 'Registration No. cannot be blank.';
      hasError = true;
    } else {
      newError.Reginumber = '';
    }

    // Validate Address line 1
    if (state.address1.trim() === '') {
      newError.address1 = 'Address line 1 cannot be blank.';
      hasError = true;
    } else {
      newError.address1 = '';
    }

    // Validate Country
    if (state.country.trim() === '') {
      newError.country = 'Country cannot be blank.';
      hasError = true;
    } else {
      newError.country = '';
    }

    // Validate postalcode
    if (state.postal_code.trim() === '') {
      newError.postal_code = 'Postal/Zip code cannot be blank.';
      hasError = true;
    } else {
      newError.postal_code = '';
    }

    // Validate City
    if (state.city.trim() === '') {
      newError.city = 'City cannot be blank.';
      hasError = true;
    } else {
      newError.city = '';
    }

    // If there's any error, update the error state and prevent form submission
    if (hasError) {
      setError(newError);
      return;
    }

    // If there are no errors, proceed with form submission
    console.log(state, 'Form submitted successfully');
  };

  const handleChanged = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="vender-detail">
        {/* <div className="product-templates-view-header__breadcrumbs">
                    <ul className="pf-breadcrumbs pf-p-0 vender-breadcrumbs">
                        <li onClick={() => history.push('/venders')}>
                            Profile
                        </li>
                        <li>
                            Products
                        </li>
                        <span className="nav-arrow left hidden" />
                        <span className="nav-arrow right hidden" />
                    </ul>
                </div> */}
        <div className="venderdetail-head">
          <h2 className="category-heading">Vender Detail</h2>
        </div>
        <div className="vender-product">
          <div className="card-vender">
            <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png"
                title="green iguana"
                className="card-venderImg"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Name
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Company Name
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Social Site Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="plans-member">
            <div className="heading-member">
              <Box sx={{ width: '40%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChanged}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      style={{
                        fontSize: '12px',
                        background: value === 0 ? '#232323' : 'inherit',
                        color: value === 0 ? 'white' : 'inherit',
                      }}
                      label="Profile"
                      {...a11yProps(0)}
                    />
                    <Tab
                      style={{
                        fontSize: '12px',
                        background: value === 1 ? '#232323' : 'inherit',
                        color: value === 1 ? 'white' : 'inherit',
                      }}
                      label="Products"
                      {...a11yProps(1)}
                    />
                    <Tab
                      style={{
                        fontSize: '12px',
                        background: value === 2 ? '#232323' : 'inherit',
                        color: value === 2 ? 'white' : 'inherit',
                      }}
                      label="Plan"
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </Box>
              </Box>
              <h4>Change Plan</h4>
            </div>

            <CustomTabPanel value={value} index={0}>
              <div className="col-sm-12">
                <div className="billing__legal-info">
                  <p className="billing__description pf-mb-24 pf-mt-8">
                    Here you can add or update your legal information. We will
                    use these details on all your invoices that you can find
                    under
                    <Link to="/billing/payments" className="pf-link">
                      Billing → Payments.
                    </Link>
                  </p>
                  <div>
                    <div className="row" style={{ display: 'none' }}>
                      <div className="form-group pf-mb-24 col-xs-12">
                        <div className="pf-ui-body">
                          <div
                            className="pf-d-inline-block pf-link--pointer"
                            style={{ cursor: 'pointer' }}
                          >
                            <input
                              type="radio"
                              className="pf-mr-4"
                              defaultValue={-1}
                            />
                            <span className="pf-mr-16">Add manually</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {state.status === 'business' ? (
                      <div className="row">
                        <div className=" no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="fullName"
                                  className="control-label pf-h5"
                                >
                                  Full name
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="fullName"
                                  name="name"
                                  disabled={!active}
                                  maxLength={35}
                                  className="form-control inspectletIgnore"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-1 no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label className="control-label pf-h5">
                                  Status
                                </label>
                                <div className="pf-ui-body">
                                  <div className="pf-d-inline-block">
                                    <input
                                      onChange={handleChange}
                                      disabled={!active}
                                      type="radio"
                                      name="status"
                                      defaultValue="business"
                                      className="pf-mr-4"
                                    />
                                    <span className="pf-mr-24">
                                      Registered business
                                    </span>
                                  </div>
                                  <div className="pf-d-inline-block">
                                    <input
                                      disabled={!active}
                                      onChange={handleChange}
                                      type="radio"
                                      name="status"
                                      defaultValue="personal"
                                      className="pf-mr-4"
                                    />
                                    <span className="pf-mr-24">
                                      An individual
                                    </span>
                                  </div>
                                </div>
                                {/**/}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-4 no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="companyname"
                                  className="control-label pf-h5"
                                >
                                  Company name (required)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="companyname"
                                  name="companyname"
                                  disabled={!active}
                                  maxLength={80}
                                  className="form-control inspectletIgnore"
                                />
                                {error.companyname && (
                                  <div className="error-message">
                                    {error.companyname}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-4 no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="Reginumber"
                                  className="control-label pf-h5"
                                >
                                  Registration number (required)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="Reginumber"
                                  name="Reginumber"
                                  disabled={!active}
                                  maxLength={80}
                                  className="form-control inspectletIgnore"
                                />
                                {error.Reginumber && (
                                  <div className="error-message">
                                    {error.Reginumber}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-4 no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="address1"
                                  className="control-label pf-h5"
                                >
                                  Address line 1 (required)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="address1"
                                  name="address1"
                                  disabled={!active}
                                  maxLength={80}
                                  className="form-control inspectletIgnore"
                                />
                                {error.address1 && (
                                  <div className="error-message">
                                    {error.address1}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-5 no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="address2"
                                  className="control-label pf-h5"
                                >
                                  Address line 2 (optional)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="address2"
                                  name="address2"
                                  disabled={!active}
                                  maxLength={35}
                                  className="form-control inspectletIgnore"
                                />
                                {/**/}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-5 no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="zip"
                                  className="control-label pf-h5"
                                >
                                  Country (required)
                                </label>
                                <Autocomplete
                                  id="country-select-demo"
                                  name="country"
                                  sx={{ width: 340 }}
                                  options={countries}
                                  autoHighlight
                                  disabled={!active}
                                  value={
                                    countries.find(
                                      (c) => c.code === state.country
                                    ) || null
                                  }
                                  onChange={handleCountryChange}
                                  getOptionLabel={(option) => option.label}
                                  renderOption={(props, option) => (
                                    <Box
                                      component="li"
                                      sx={{
                                        '& > img': { mr: 2, flexShrink: 0 },
                                      }}
                                      {...props}
                                    >
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
                        <div className="order-7 no-gutters col-sm-3 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="zip"
                                  className="control-label pf-h5"
                                >
                                  ZIP/Postal code (required)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="zip"
                                  name="postal_code"
                                  disabled={!active}
                                  maxLength={32}
                                  className="form-control inspectletIgnore"
                                />
                                {error.postal_code && (
                                  <div className="error-message">
                                    {error.postal_code}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-8 no-gutters col-sm-3 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="city"
                                  className="control-label pf-h5"
                                >
                                  City (required)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="city"
                                  name="city"
                                  disabled={!active}
                                  maxLength={32}
                                  className="form-control inspectletIgnore"
                                />
                                {error.city && (
                                  <div className="error-message">
                                    {error.city}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-8 no-gutters col-sm-3 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="city"
                                  className="control-label pf-h5"
                                >
                                  Phone (optional)
                                </label>
                                <MuiPhoneNumber
                                  disabled={!active}
                                  defaultCountry={'us'}
                                  name="phone"
                                  value={state.phone}
                                  onChange={handlephone}
                                />
                                {error.phone && (
                                  <div className="error-message">
                                    {error.phone}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        <div className=" no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="fullName"
                                  className="control-label pf-h5"
                                >
                                  Full name (required)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="fullName"
                                  name="name"
                                  disabled={!active}
                                  maxLength={35}
                                  className="form-control inspectletIgnore"
                                />
                                {error.name && (
                                  <div className="error-message">
                                    {error.name}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-1 no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label className="control-label pf-h5">
                                  Status
                                </label>
                                <div className="pf-ui-body">
                                  <div className="pf-d-inline-block">
                                    <input
                                      onChange={handleChange}
                                      disabled={!active}
                                      type="radio"
                                      name="status"
                                      defaultValue="business"
                                      className="pf-mr-4"
                                    />
                                    <span className="pf-mr-24">
                                      Registered business
                                    </span>
                                  </div>
                                  <div className="pf-d-inline-block">
                                    <input
                                      disabled={!active}
                                      onChange={handleChange}
                                      type="radio"
                                      name="status"
                                      defaultValue="personal"
                                      className="pf-mr-4"
                                    />
                                    <span className="pf-mr-24">
                                      An individual
                                    </span>
                                  </div>
                                </div>
                                {/**/}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="order-4 no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="Reginumber"
                                  className="control-label pf-h5"
                                >
                                  Registration number (optional)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="Reginumber"
                                  name="Reginumber"
                                  disabled={!active}
                                  maxLength={80}
                                  className="form-control inspectletIgnore"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-4 no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="address1"
                                  className="control-label pf-h5"
                                >
                                  Address line 1 (required)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="address1"
                                  name="address1"
                                  disabled={!active}
                                  maxLength={80}
                                  className="form-control inspectletIgnore"
                                />
                                {error.address1 && (
                                  <div className="error-message">
                                    {error.address1}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-5 no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="address2"
                                  className="control-label pf-h5"
                                >
                                  Address line 2 (optional)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="address2"
                                  name="address2"
                                  disabled={!active}
                                  maxLength={35}
                                  className="form-control inspectletIgnore"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-5 no-gutters col-sm-6 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="zip"
                                  className="control-label pf-h5"
                                >
                                  Country (required)
                                </label>
                                <Autocomplete
                                  id="country-select-demo"
                                  name="country"
                                  sx={{ width: 340 }}
                                  options={countries}
                                  autoHighlight
                                  disabled={!active}
                                  value={
                                    countries.find(
                                      (c) => c.code === state.country
                                    ) || null
                                  }
                                  onChange={handleCountryChange}
                                  getOptionLabel={(option) => option.label}
                                  renderOption={(props, option) => (
                                    <Box
                                      component="li"
                                      sx={{
                                        '& > img': { mr: 2, flexShrink: 0 },
                                      }}
                                      {...props}
                                    >
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
                        <div className="order-7 no-gutters col-sm-3 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="zip"
                                  className="control-label pf-h5"
                                >
                                  ZIP/Postal code (required)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="zip"
                                  name="postal_code"
                                  disabled={!active}
                                  maxLength={32}
                                  className="form-control inspectletIgnore"
                                />
                                {error.postal_code && (
                                  <div className="error-message">
                                    {error.postal_code}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-8 no-gutters col-sm-3 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="city"
                                  className="control-label pf-h5"
                                >
                                  City (required)
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  id="city"
                                  name="city"
                                  disabled={!active}
                                  maxLength={32}
                                  className="form-control inspectletIgnore"
                                />
                                {error.city && (
                                  <div className="error-message">
                                    {error.city}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-8 no-gutters col-sm-3 col-xs-12">
                          <div className="row">
                            <div className="col-sm-12 col-xs-12">
                              <div className="form-group pf-mb-24">
                                <label
                                  htmlFor="city"
                                  className="control-label pf-h5"
                                >
                                  Phone (optional)
                                </label>
                                <MuiPhoneNumber
                                  disabled={!active}
                                  defaultCountry={'us'}
                                  name="phone"
                                  value={state.phone}
                                  onChange={handlephone}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    {!active ? (
                      <div className="col-xs-12">
                        <div className="form-group pf-mt-8 pf-mb-0">
                          {/**/}
                          <input
                            type="button"
                            onClick={() => {
                              setActive(true);
                              console.log(active);
                            }}
                            defaultValue="Edit"
                            className="pf-btn pf-btn-secondary"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="col-xs-12">
                        <div className="form-group pf-mt-8 pf-mb-0">
                          <div>
                            <input
                              type="button"
                              onClick={handleSubmit}
                              defaultValue="Save"
                              className=" pf-mr-12 pf-btn pf-btn-primary"
                            />
                            <input
                              type="button"
                              onClick={() => setActive(false)}
                              defaultValue="Cancel"
                              className="pf-btn pf-btn-secondary"
                            />
                          </div>
                          {/**/}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="pf-border-bottom pf-mb-64" />
                </div>
              </div>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <div className="table-product">
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                  />
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div className="Membership-information">
                <div className="inner-Membership">
                  <h6>Membership Information</h6>
                  <p>
                    This section contains information about your membership with
                    Jubilee.
                  </p>
                </div>
                <div className="main-join">
                  <div className="inner-planer">
                    <div className="plan-membership">
                      <h6>Your Plan</h6>
                      <p>Basic</p>
                    </div>
                    <div className="plan-membership">
                      <h6>Joined on</h6>
                      <p>05/12/2023</p>
                    </div>
                  </div>
                  <div className="sell-more">
                    <h6>
                      Sell more with <span>Pro Plan</span>
                    </h6>
                    <div className="selling">
                      <div className="write-icon">
                        <Icon source={ProfileIcon} tone="base" />
                      </div>
                      <p>This plan was recommended by top selling merchants</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="member-card">
                <Card sx={{ maxWidth: 345 }} className="plan-card">
                  <div className="mem-head">
                    <h6 className="text-mem">Pro</h6>
                    <div className="amount">
                      <h5 className="price-plan">$49</h5>
                      <p>/month</p>
                    </div>
                  </div>
                  <p className="plan-text">Cost of goods sold</p>
                  <hr />
                  <div className="plan-inner">
                    <Button className="purchase-free">Try for free</Button>
                  </div>
                  <div className="plan-li">
                    <div className="inner-plan">
                      <div className="write-icon">
                        <Icon source={CheckCircleIcon} tone="base" />
                      </div>
                      <p className="inner-pro">100 Unique products</p>
                    </div>
                    <div className="inner-plan">
                      <div className="write-icon">
                        <Icon source={CheckCircleIcon} tone="base" />
                      </div>
                      <p className="inner-pro">25 Premium products</p>
                    </div>
                    <div className="inner-plan">
                      <div className="write-icon">
                        <Icon source={CheckCircleIcon} tone="base" />
                      </div>
                      <p className="inner-pro">Personalized branding</p>
                    </div>
                    <div className="inner-plan">
                      <div className="write-icon">
                        <Icon source={CheckCircleIcon} tone="base" />
                      </div>
                      <p className="inner-pro">Branded Invoicing</p>
                    </div>
                    <div className="inner-plan">
                      <div className="write-icon">
                        <Icon source={CheckCircleIcon} tone="base" />
                      </div>
                      <p className="inner-pro">Customize product image</p>
                    </div>
                  </div>
                </Card>
                <Card sx={{ maxWidth: 345 }} className="plan-card">
                  <div className="mem-head">
                    <h6 className="text-mem">Pro</h6>
                    <div className="amount">
                      <h5 className="price-plan">$49</h5>
                      <p>/month</p>
                    </div>
                  </div>
                  <p className="plan-text">Cost of goods sold</p>
                  <hr />
                  <div className="plan-inner">
                    <Button className="purchase-free">Try for free</Button>
                  </div>
                  <div className="plan-li">
                    <div className="inner-plan">
                      <div className="write-icon">
                        <Icon source={CheckCircleIcon} tone="base" />
                      </div>
                      <p className="inner-pro">100 Unique products</p>
                    </div>
                    <div className="inner-plan">
                      <div className="write-icon">
                        <Icon source={CheckCircleIcon} tone="base" />
                      </div>
                      <p className="inner-pro">25 Premium products</p>
                    </div>
                    <div className="inner-plan">
                      <div className="write-icon">
                        <Icon source={CheckCircleIcon} tone="base" />
                      </div>
                      <p className="inner-pro">Personalized branding</p>
                    </div>
                    <div className="inner-plan">
                      <div className="write-icon">
                        <Icon source={CheckCircleIcon} tone="base" />
                      </div>
                      <p className="inner-pro">Branded Invoicing</p>
                    </div>
                    <div className="inner-plan">
                      <div className="write-icon">
                        <Icon source={CheckCircleIcon} tone="base" />
                      </div>
                      <p className="inner-pro">Customize product image</p>
                    </div>
                  </div>
                </Card>
              </div>
            </CustomTabPanel>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default VenderDetail;
