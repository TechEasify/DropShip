import getConfig from 'next/config';

export class LoginService {
    constructor() {
        // this.contextPath = getConfig().publicRuntimeConfig.contextPath;
        this.contextPath = 'https://62e1182cfa99731d75cdd699.mockapi.io';
    }

    async validateLogin(email, password) {
        const res = await fetch(this.contextPath + '/User?email=' + email + '&password=' + password, { headers: { 'Cache-Control': 'no-cache' } });
        return res;
    }

    async validateAccessToken(token) {
        const res = await fetch('https://apidropshipping/auth?token=' + token, { headers: { 'Cache-Control': 'no-cache' } });
        return res;
    }

    async getCustomersLarge() {
        const res = await fetch(this.contextPath + '/demo/data/customers-large.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data;
    }
}
