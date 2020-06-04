import {
    reqOrderList,
    reqOrderDetail
} from './service';
import moment from 'moment';
import {message} from 'antd';

const page = {
    /**
     * 格式化评论数据
     * @param list
     * @returns {*}
     */
    formatOrderList: list => {
        return list.reduce((pre,cur)=>{
            const item = {...cur};
            item.createTime = moment(item.createTime).format("YYYY-MM-DD");
            pre.push(item);
            return pre;
        },[]);
    },

};

const Model = {
    namespace: 'order',
    state: {
        orderList: [],//订单列表数据
        total:0,
        orderDetail:{}
    },
    effects: {
        //查询列表
        *fetchOrderList({payload}, {call, put}) {
            if (payload.hasOwnProperty('categoryId') && Array.isArray(payload.categoryId)) {
                if (payload.categoryId.length === 1) {//只选择一级分类
                    payload.categoryId = payload.categoryId[0]
                } else if (payload.categoryId.length === 2) {//选择二级分类
                    payload.categoryId = payload.categoryId[1]
                }
            }
            const response = yield call(reqOrderList, payload);
            let res,total;

            if (response.code === 200) {
                res = page.formatOrderList(response.data.records);
                total = response.data.total;
            } else {
                message.warning(response.message);
                res = [];
                total = 0
            }
            yield put({
                type: 'saveOrderList',
                payload: {res,total},
            });

        },


        *fetchOrderDetail({payload},{call,put}) {
            const response = yield  call(reqOrderDetail,payload);
            if (response.code === 200) {
                yield put({
                    type: 'saveOrderDetail',
                    payload: response.data,
                });
            } else {
                message.warning(response.message);
            }
        },

    },
    reducers: {
        saveOrderList(state, action) {
            return {...state, orderList: action.payload.res || [],total:action.payload.total}
        },
        saveOrderDetail(state,action) {
            return {...state,orderDetail:action.payload || {}}
        }
    },
};
export default Model;
