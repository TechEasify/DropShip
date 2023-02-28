import getConfig from 'next/config';

export class ProductService {
    constructor() {
        // this.contextPath = getConfig().publicRuntimeConfig.contextPath;
        this.contextPath = 'https://62e1182cfa99731d75cdd699.mockapi.io';
    }

    // getProductsSmall() {
    //     return fetch(this.contextPath + '/demo/data/products-small.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data);
    // }

    // getProducts() {
    //     return fetch(this.contextPath + '/demo/data/products.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data);
    // }

    getProductsSmall() {
        return fetch(this.contextPath + '/Products', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d);
    }

    getProducts() {
        return fetch(this.contextPath + '/Products', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d);
    }

    getProductsWithOrdersSmall() {
        return fetch(this.contextPath + '/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
