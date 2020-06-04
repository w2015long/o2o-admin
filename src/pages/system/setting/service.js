import request, {baseUrl} from '@/utils/request';

export async function reqUpdateBaseSetting(data) {
    return request(baseUrl + '/admin/setting/base', {
        method: 'put',
        data,
    });
}

export async function reqBaseSetting() {
    return request(baseUrl + '/admin/setting/base');
}


export async function reqPaymentList(params) {
    return request(baseUrl + `/admin/setting/pay?pageNum=${params.pageNum}&pageSize=${params.pageSize}`);
}

//reqPaymentSetting
export async function reqPaymentSet(params) {
    return request(baseUrl + `/admin/setting/pay/${params.id}`);
}

export async function reqUpdatePaymentSet(params) {
    const data = {...params};
    delete data.id;
    return request(baseUrl + `/admin/setting/pay/${params.id}`,{
        method: 'put',
        data
    });
}

//admin/setting/deal
export async function reqDealSetting() {
    return request(baseUrl + '/admin/setting/deal');
}


export async function reqUpdateDealSetting(data) {
    return request(baseUrl + '/admin/setting/deal',{
        method: 'put',
        data
    });
}


export async function reqFinacialSetting() {
    return request(baseUrl + '/admin/setting/finacial');
}


export async function reqUpdateFinacialSetting(data) {
    return request(baseUrl + '/admin/setting/finacial',{
        method: 'post',
        data
    });
}

export async function reqDeliveryList(params) {
    return request(baseUrl + `/admin/setting/delivery?pageNum=${params.pageNum}&pageSize=${params.pageSize}`);
}

export async function reqDeliverySet(params) {
    return request(baseUrl + `/admin/setting/delivery/${params.id}`);
}

export async function reqUpdateDeliverySet(params) {
    const data = {...params};
    delete data.id;
    return request(baseUrl + `/admin/setting/delivery/${params.id}`,{
        method: 'put',
        data
    });
}
