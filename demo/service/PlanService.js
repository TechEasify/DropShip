import getConfig from 'next/config';
import axios from 'axios';

export class PlanService {
    constructor() {
        this.contextPath = 'https://shopifyapp.iihtsrt.com/public/naturescure-api/plan/v1/';
    }

    async getPlans() {
        const res = await axios.get(this.contextPath + 'all');
        return res.data;
    }

    async savePlan(plan) {
        var res = null;
        if (plan.package_id != null) {
            res = await axios.post(this.contextPath + 'update/' + plan.package_id, plan);
        } else {
            res = await axios.post(this.contextPath + 'add', plan);
        }
        return res.data;
    }

    async deletePlan(id) {
        const res = await axios.get(this.contextPath + 'delete' + id);
        return res.data;
    }
}
