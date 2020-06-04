import request ,{baseUrl} from '@/utils/request';

export async function reqOrderList(params) {
    const data = {...params};
    delete data.pageNum;
    delete data.pageSize;
    return request(baseUrl + `/admin/order/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, {
    method: 'POST',
    data,
  });
}
//order/detail/{id}
export async function reqOrderDetail(params) {
    return request(baseUrl + '/admin/order/detail/' + params.id);
}

