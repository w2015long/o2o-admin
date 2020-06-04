import {history} from 'umi';
import {message} from 'antd';
import {fakeAccountLogin} from './service';
import {getPageQuery, setAuthority} from './utils/utils';

import {setLS,clearLS} from '@/utils/utils'
import memory from '@/utils/memory'

const Model = {
    namespace: 'userAndlogin',
    state: {
        userInfo: {},
    },
    effects: {
        * login({payload}, {call, put}) {
            const response = yield call(fakeAccountLogin, payload);
            // Login successfully
            if (response.code === 200) {
                yield put({
                    type: 'changeLoginStatus',
                    payload: response,
                });

                const {token,tokenHead} =  response.data;
                memory.UserInfo = response.data.sysUser;
                setLS('Authorization',tokenHead+ " " + token);
                message.success('登录成功！');
                history.replace('/');
            }
        },
        * logout({_},{put}) {
            yield put({
                type: 'changeLoginStatus',
                payload: {},
            });

            clearLS();
            memory.UserInfo = null;
            setTimeout(()=>{
                history.replace('/user/login');
            },100)
        }

    },
    reducers: {
        changeLoginStatus(state, {payload}) {
            //setAuthority(payload.currentAuthority);
            return {...state, userInfo: payload};
        },
    },
};
export default Model;
