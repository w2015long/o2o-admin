import {
    reqCategoryList,
    reqUpdateCate,
    reqCreateCate,
    reqDeleteCate
} from './service';
import {message} from 'antd';

const CategoryModel = {
    namespace: 'category',
    state: {
        categories: [],//经营品类
    },
    effects: {
        //查询商家分类
        * fetchCategoryList({_}, {call, put}) {
            const response = yield  call(reqCategoryList);
            if (response.code === 200) {
                const payload = response.data.reduce((pre,cur)=>{
                    if (cur.categoryList.length) {
                        cur.children = cur.categoryList;
                        delete cur.categoryList;
                    }
                    pre.push(cur);
                    return pre;
                },[]);
                yield put({
                    type: 'saveMerchantCate',
                    payload
                })
            } else {
                message.warning(response.message);
            }
        },
        * fetchUpdateCate({payload}, {call, put}) {
            const response = yield  call(reqUpdateCate, payload);
            if (response.code === 200) {
                message.success(response.message);
                yield put({type: 'fetchCategoryList'}); //触发action
            } else {
                message.warning(response.message);
            }
        },
        * fetchCreateCate({payload}, {call, put}) {
            const response = yield  call(reqCreateCate, payload);
            if (response.code === 200) {
                message.success(response.message);
                yield put({type: 'fetchCategoryList'}); //触发action
            } else {
                message.warning(response.message);
            }
        },
        //reqDeleteCate
        * fetchDeleteCate({payload}, {call, put}) {
            const response = yield  call(reqDeleteCate, payload);
            if (response.code === 200) {
                message.success(response.message);
                yield put({type: 'fetchCategoryList'}); //触发action
            } else {
                message.warning(response.message);
            }
        },
    },
    reducers: {
        saveMerchantCate(state, action) {
            return {...state, categories: action.payload || []}
        },
    },
};
export default CategoryModel;
