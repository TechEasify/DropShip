import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Home = () => {
    const router = useRouter();
    const param = router.query;

    useEffect(() => {
        console.log(param);
        if (param.shop && !param.code) {
            router.push('/installer/install');
        } else if (param.code) {
            /*
            Home page will send request to check if access token is valid
            php response (token found / token not found)
            if token is found redirect to dashboard
            else redirect to installer
            */
            router.push('/dashboard');
        }else{
            router.push('/login');
        }
    }, [param]);

    return <></>;
};

Home.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};
export default Home;
