import getConfig from 'next/config';
import axios from 'axios';

export class CollectionService {
    constructor() {
        this.contextPath = 'https://shopifyapp.iihtsrt.com/public/naturescure-api/collection/v1/';
    }

    async getCollections() {
        const res = await axios.get(this.contextPath + 'all');
        return res.data;
    }

    async saveCollection(collection) {
        var res = null;
        if (collection.collection_id != null) {
            res = await axios.post(this.contextPath + 'update/' + collection.collection_id, collection);
        } else {
            res = await axios.post(this.contextPath + 'add', collection);
        }
        return res.data;
    }

    async deleteCollection(id) {
        const res = await axios.get(this.contextPath + 'delete/' + id);
        return res.data;
    }
}
