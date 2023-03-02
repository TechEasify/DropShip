import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Store = () => {
    const router = useRouter();
    const param = router.query;

    useEffect(() => {
        console.log(param.shop);
        if (param.shop) {
            let shop = param.shop;
            let api_key = '24e08c2eb20b126105d9056f24bcf486';
            let scopes = 'read_orders,write_products';
            let redirect_uri = 'https://techeasifyreactapp.netlify.app/token-generator/generate';

            // Build install/approval URL to redirect to
            let install_url = 'https://' + shop + '/admin/oauth/authorize?client_id=' + api_key + '&scope=' + scopes + '&redirect_uri=' + encodeURIComponent(redirect_uri);

            router.push(install_url);
        }
    }, [param]);

    return <></>;
};

Store.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};
export default Store;
