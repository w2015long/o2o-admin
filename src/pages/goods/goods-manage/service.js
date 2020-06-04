import request, {baseUrl} from '@/utils/request';

export async function reqGoodsList(params) {
    const data = {...params};
    delete data.pageNum;
    delete data.pageSize;
    return request(baseUrl + `/admin/goods/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, {
        method: 'POST',
        data,
    });
}


export const reqUpdatePutaway = params => {
    const data = {...params};
    delete data.ids;
    return request(baseUrl + `/admin/goods/updatePutaway?ids=${params.ids}`, {
        method: 'POST',
        data,
    });
};

export const reqGoodsCate = () => request(baseUrl + '/admin/goodscategory');

export const reqGoodsDetailMulti = params => request(baseUrl + `/admin/goods/detail/${params.id}?specificationType=${params.specificationType}`);
