import request ,{baseUrl} from '@/utils/request';

export async function reqMerchantList(params) {
    const data = {...params};
    delete data.pageNum;
    delete data.pageSize
    return request(baseUrl + `/admin/merchant/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, {
    method: 'POST',
    data,
  });
}

export async function reqMerchantCate() {
    return request(baseUrl + '/admin/category/list');
}

export async function reqMerchantInfo(params) {
    return request(baseUrl + '/admin/merchant/getInfo/' + params.id );
}

export async function updateMerchantDetailInfo(params) {
    const data = {...params};
    delete data.id;
    return request(baseUrl + '/admin/merchant/update/' + params.id,{
        method: 'PUT',
        data,
    });
}

export async function updateRecommend(params) {
    return request(baseUrl + `/admin/merchant/updateRecommend?ids=${params.ids}&recommend=${params.recommend}`,{
        method: 'PUT',
    });
}

export async function reqMerchantDetail(params) {
    return request(baseUrl + '/admin/merchant/detail/' + params.id );
}
