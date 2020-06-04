import request ,{baseUrl} from '@/utils/request';

export async function reqCommentList(params) {
    const data = {...params};
    delete data.pageNum;
    delete data.pageSize;
    return request(baseUrl + `/admin/merchantcomment/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, {
    method: 'POST',
    data,
  });
}

//admin/goodscomment/updateType?ids=65465465&type=true
export async function reqUpdatePassComment(params) {
    return request(baseUrl + `/admin/merchantcomment/updateType?ids=${params.ids}&type=${params.type}`);
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
