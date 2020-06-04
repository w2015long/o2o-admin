import {
    reqGoodsList,
    reqUpdatePutaway,
    reqGoodsCate,
    reqGoodsDetailMulti
} from './service';
import moment from 'moment';
import {message} from 'antd';
import {PAGE_SIZE} from '@/utils/utils';


const putStatusArr = ['已下架','上架中','平台下架','平台下架']; //0-已下架 1-上架中 2-平台下架

const page = {
    /**
     * 格式化商家数据
     * @param list
     * @returns {*}
     */
    formatGoodsList: list => {
        return list.reduce((pre,cur)=>{
            const item = {...cur};
            item.putawayStatus = putStatusArr[item.putawayStatus];//上架状态
            item.addTime = moment(item.addTime).format("YYYY-MM-DD");
            item.categoryName = item.category && item.category.name;
            item.merchantName = item.merchant.name;
            pre.push(item);
            return pre;
        },[]);
    },
    //编辑商家信息

};

const GoodsModel = {
    namespace: 'goods',
    state: {
        goodsList: [],//商家列表数据
        total:0,
        goodsCategory:[],
        goodsDetailMulti:{}
    },
    effects: {
        //查询商家信息
        *fetchGoodsList({payload}, {call, put}) {
            //查询分类
            const response = yield call(reqGoodsList, payload);

            let res,total;
            if (response.code === 200) {
                res = page.formatGoodsList(response.data.records);
                total = response.data.total;
            } else {
                message.warning(response.message);
                res = [];
                total = 0
            }
            yield put({
                type: 'saveGoodsList',
                payload: {res,total},
            });

        },
        //更新上下架 reqUpdatePutaway
        *fetchUpdatePutaway({payload}, {call, put}) {
            //查询分类
            const response = yield call(reqUpdatePutaway, payload);

            if (response.code === 200) {
                message.success(response.message);
                yield put({type: 'fetchGoodsList',payload: {pageNum: 1, pageSize: PAGE_SIZE}}); //触发action
            } else {
                message.warning(response.message);
            }

        },
        //reqGoodsCate
        *fetchGoodsCate({_}, {call, put}) {
            //查询分类
            const response = yield call(reqGoodsCate);

            if (response.code === 200) {
                yield put({
                    type: 'saveGoodsCate',
                    payload: response.data
                });
            } else {
                message.warning(response.message);
            }

        },
        //reqGoodsDetailMulti
        *fetchGoodsDetailMulti({payload}, {call, put}) {
            const response = yield call(reqGoodsDetailMulti,payload);

            if (response.code === 200) {
                yield put({
                    type: 'saveGoodsDetailMulti',
                    payload: response.data
                });
            } else {
                message.warning(response.message);
            }

        },
    },
    reducers: {
        saveGoodsList(state, action) {
            return {...state, goodsList: action.payload.res || [],total:action.payload.total}
        },
        saveGoodsCate (state, action) {
            return {...state,goodsCategory: action.payload || []}
        },
        saveGoodsDetailMulti(state, action) {
            return {...state,goodsDetailMulti:action.payload || {}}
        }
    },
};
export default GoodsModel;
