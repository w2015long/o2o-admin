import request, {baseUrl} from '@/utils/request';

export async function fakeAccountLogin(params) {
    return request(baseUrl + '/admin/sysuser/login', {
        method: 'POST',
        data: params,
    });
}

