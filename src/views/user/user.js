/**
 * Created by acer on 2018/2/24.
 */
import http from '../api/http';

export const userlist = params => {
    return http.post('user/list', params).then(res => res.data);
};

export const login = params => {
    return http.post('user/login', params).then(res => res.data);
};

export const logout = params => {
    return http.get('user/logout', params).then(res => res.data);
};
