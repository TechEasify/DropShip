import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const TokenGenerator = () => {
    const router = useRouter();
    const param = router.query;

    useEffect(() => {
        console.log(param);
        // if (param.shop) {
        //     let shop = param.shop;
        //     let api_key = '24e08c2eb20b126105d9056f24bcf486';
        //     let scopes = 'read_orders,write_products';
        //     let redirect_uri = 'http://localhost:3000/token-generator/generate';

        //     // Build install/approval URL to redirect to
        //     let install_url = 'https://' + shop + '.myshopify.com/admin/oauth/authorize?client_id=' + api_key + '&scope=' + scopes + '&redirect_uri=' + encodeURIComponent(redirect_uri);

        //     router.push(install_url);
        // }
        param && router.push('https://admin.shopify.com/store/' + param.shop.toString().split('.')[0] + '/apps/tech-dropship');
    }, [param]);

    return <h1>Hello</h1>;
};

TokenGenerator.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};
export default TokenGenerator;
