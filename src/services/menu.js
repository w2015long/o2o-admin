import request,{baseUrl} from '@/utils/request';


export async function reqMenuRoutes() {
  // return request('/api/menu/routes');
  return request(baseUrl + '/admin/sysmenu/list');
}
