/**
 * Created by acer on 2018/2/25.
 */
import http from '../api/http';

export const treeMaintain = params => {
    return http.get('menu/treeMaintain', params).then(res => res.data);
};

export const treeMaintainList = params => {
    return http.get('menu/list', params).then(res => res.data);
};
