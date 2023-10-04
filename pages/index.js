/*
Home page will send request to check if access token is valid
php response (token found / token not found)
if token is found redirect to dashboard
else redirect to installer
*/

import React from 'react';
import Home from './[home]';
const Index = () => {
    return <><Home></Home></>;
};

Index.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};
export default Index;
