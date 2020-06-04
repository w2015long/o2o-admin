import request ,{baseUrl} from '@/utils/request';


export async function reqCategoryList() {
    return request(baseUrl + '/admin/category/list');
}

export async function reqCreateCate(params) {
    return request(baseUrl + '/admin/category/create',{
        method: 'post',
        data:params,
    });
}

export async function reqUpdateCate(params) {
    const data = {...params};
    delete data.id;
    return request(baseUrl + '/admin/category/update/' + params.id,{
        method: 'PUT',
        data,
    });
}


export async function reqDeleteCate(params) {
    return request(baseUrl + '/admin/category/delete/' + params.id,{
        method: 'delete',
    });
}
