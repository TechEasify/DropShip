import getConfig from 'next/config';

export class PlanService {
    constructor() {
        this.contextPath = 'https://shopifyapp.iihtsrt.com/public/';
    }

    getPlansSmall() {
        return fetch(this.contextPath + '/plan/naturescure-api/v1/getAll', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d);
    }

    getPlans() {
        return fetch(this.contextPath + '/plan/naturescure-api/v1/getAll', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d);
    }
}
