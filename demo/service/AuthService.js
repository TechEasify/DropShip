import getConfig from 'next/config';

export class AuthService {
    constructor() {
        this.contextPath = 'https://apidropshipping';
    }
    async validateAccessToken(token) {
        const res = await fetch(this.contextPath + '/auth?token=' + token, { headers: { 'Cache-Control': 'no-cache' } });
        return res;
    }
}
