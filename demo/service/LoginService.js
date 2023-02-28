import getConfig from 'next/config';

export class LoginService {
    constructor() {
        // this.contextPath = getConfig().publicRuntimeConfig.contextPath;
        this.contextPath = 'https://62e1182cfa99731d75cdd699.mockapi.io';
    }

    validateLogin(email, password) {
        return fetch(this.contextPath + '/User?email=' + email + '&password=' + password, { headers: { 'Cache-Control': 'no-cache' } }).then((res) => res);
    }

    getCustomersLarge() {
        return fetch(this.contextPath + '/demo/data/customers-large.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
