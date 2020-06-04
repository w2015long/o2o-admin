import {parse} from 'querystring';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
const ls = window.localStorage;


export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
    if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
        return true;
    }

    return window.location.hostname === 'preview.pro.ant.design'
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
    const {NODE_ENV} = process.env;

    if (NODE_ENV === 'development') {
        return true;
    }

    return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {

    const authority = router.find(
        ({routes, path = '/'}) => {

            return (path && pathRegexp(path).exec(pathname)) ||
                (routes && getAuthorityFromRouter(routes, pathname))
        }
    );
    if (authority) return authority;
    return undefined;
};
export const getRouteAuthority = (path, routeData) => {
    let authorities;
    routeData.forEach(route => {
        // match prefix
        if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
            if (route.authority) {
                authorities = route.authority;
            } // exact match

            if (route.path === path) {
                authorities = route.authority || authorities;
            } // get children authority recursively

            if (route.routes) {
                authorities = getRouteAuthority(path, route.routes) || authorities;
            }
        }
    });
    return authorities;
};


export const PAGE_SIZE = 10;


export const setLS = (key, value) => {
    if (value === undefined) return;
    let v = value;
    if (typeof v == 'object') {
        v = JSON.stringify(v);
        v = 'obj-' + v;
    } else {
        v = 'str-' + v;
    }
    if (ls) {
        ls.setItem(key, v);
    }
};


export const getLS = (key) => {
    if (ls) {
        let v = ls.getItem(key);
        if (!v) return;
        if (v.indexOf('obj-') === 0) {
            v = v.slice(4);
            return JSON.parse(v);
        } else if (v.indexOf('str-') === 0) {
            return v.slice(4);
        }
    }
};


export const rmLS = key => {
    if (ls && key) ls.removeItem(key);
};

export const clearLS = () => {
    if (ls) ls.clear();
};


