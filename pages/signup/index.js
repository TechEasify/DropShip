import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { LoginService } from '../../demo/service/LoginService';
import Link from 'next/link';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const loginService = new LoginService();

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center w-full md:w-8 lg:w-5">
                <div style={{ borderRadius: '36px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-5 px-5 sm:px-8" style={{ borderRadius: '33px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Sign Up</div>
                            <span className="text-600 font-medium">Create your new account</span>
                        </div>

                        <div>
                            <InputText inputid="firstName" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="First Name" className="w-full mb-4 p-3" />
                            <InputText inputid="lastName" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Last Name" className="w-full mb-4 p-3" />
                            <InputText inputid="phoneNo" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Phone No" className="w-full mb-4 p-3" />
                            <InputText inputid="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full mb-4 p-3" />

                            <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-4" inputClassName="w-full p-3"></Password>
                            <Password inputid="repeatPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Repeat Password" toggleMask className="w-full mb-4" inputClassName="w-full p-3"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <Button
                                    label="Login"
                                    className="p-3 text-xl w-5"
                                    onClick={() => {
                                        loginService.validateLogin(email, password).then((data) => {
                                            console.log(data);
                                            router.push('/dashboard');
                                        });
                                    }}
                                ></Button>
                            </div>
                            <div className="font-medium text-center">
                                Have An Account?
                                <Link href={'/'}>
                                    <a className="no-underline ml-2 text-center cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                        Sign In
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SignUpPage.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};
export default SignUpPage;
