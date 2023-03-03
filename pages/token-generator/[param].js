import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const TokenGenerator = () => {
    const router = useRouter();
    const param = router.query;

    useEffect(() => {
        param.shop && console.log(param.shop.toString().split('.')[0]);

        /*
        get the params and send it to php 
        php will create the access token and store it in database
        php will send a success or failure response
        next js (generate token will redirect to home page)
        
        */
        // param.shop && router.push('https://admin.shopify.com/store/' + param.shop.toString().split('.')[0] + '/apps/dropship-32/dashboard');
        param.shop && router.push('/dashboard');
    }, [param]);

    return <></>;
};

TokenGenerator.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};
export default TokenGenerator;
