/**
 * Created by acer on 2018/2/24.
 */
import axios from 'axios';
import Cookies from 'js-cookie';
import global from '../../libs/globals';

let instance = axios.create({
    baseURL: global.baseURL,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    responseType: 'json'
});
// http request 拦截器
instance.interceptors.request.use(function (config) {
    if (Cookies.get('accessTokenSession')) {
        config.headers.xaccesstokensession = Cookies.get('accessTokenSession');
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
// http response 拦截器
instance.interceptors.response.use(response => {
    let res = response.data;
    if (res) {
        if (res.code === '02') {
            throw new Error(res.msg);
        } else if (res.code === '0003') {
            Cookies.remove('user');
            Cookies.remove('accessTokenSession');
            this.$router.push({
                name: 'login'
            });
        }
    }
    return response;
}, function (error) {
    Cookies.remove('user');
    Cookies.remove('accessTokenSession');
    this.$router.push({
        name: 'login'
    });
    return Promise.reject(error.response);
});
export default {
    get: function (url, data) {
        let config = {
                url: url,
                method: 'get'
            },
            get = function (url, data) {
                if (data || data === 0) {
                    url = url + '/' + JSON.stringify(data);
                }
                return instance.get(url);
            };
        return get(url, data);
    },
    post: function (url, data) {
        let config = {
            url: url,
            method: 'post',
            transformRequest: [function (data) {
                return JSON.stringify(data);
            }],
            data: data
        };
        return instance.post(url, data);
    }
};
