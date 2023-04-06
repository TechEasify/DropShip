import getConfig from 'next/config';
import axios from 'axios';

export class PlanService {
    constructor() {
        this.contextPath = 'https://shopifyapp.iihtsrt.com/public';
    }

    async getPlans() {
        const res = await axios.get(this.contextPath + '/plan/naturescure-api/v1/getAll');
        return res.data;
    }

    async savePlan(plan) {
        var res = null;
        if (plan.package_id != null) {
            res = await axios.post(this.contextPath + '/plan/naturescure-api/v1/update/' + plan.package_id, plan);
        } else {
            res = await axios.post(this.contextPath + '/plan/naturescure-api/v1/insertplan', plan);
        }
        return res.data;
    }

    async deletePlan(id) {
        const res = await axios.post(this.contextPath + '/plan/naturescure-api/v1/deleteplan/' + id);
        return res.data;
    }
}
