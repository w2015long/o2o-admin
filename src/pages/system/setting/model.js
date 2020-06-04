import {
    reqUpdateBaseSetting,
    reqBaseSetting,
    reqPaymentList,
    reqPaymentSet,
    reqUpdatePaymentSet,
    reqDealSetting,
    reqUpdateDealSetting,
    reqFinacialSetting,
    reqUpdateFinacialSetting,
    reqDeliveryList,
    reqDeliverySet,
    reqUpdateDeliverySet
} from './service';
import {message} from 'antd';


const Model = {
    namespace: 'setting',
    state: {
        baseSetting: {},//基础设置
        paymentSettingList:[],//支付设置列表
        paymentSet:{},//支付配置
        dealSetting:{},//交易设置
        finacialSetting:{},//财务设置
        deliverySettingList:[],//物流设置表
        deliverySet:{},//物流配置
    },
    effects: {
        //查询基础设置
        *fetchBaseSetting({_}, {call, put}) {

            const response = yield call(reqBaseSetting);

            if (response.code === 200) {
                yield put({
                    type: 'saveBaseSetting',
                    payload: response.data,
                });
            } else {
                message.warning(response.message);
            }
        },
        //更新基础设置
        *fetchUpdateBaseSetting({payload}, {call, put}) {

            const response = yield call(reqUpdateBaseSetting,payload);

            if (response.code === 200) {
                message.success(response.message);
                yield put({type: 'fetchBaseSetting'});
            } else {
                message.warning(response.message);
            }
        },
        //查询支付设置列表
        *fetchPaymentList({payload}, {call, put}) {
            const response = yield call(reqPaymentList,payload);

            if (response.code === 200) {
                yield put({
                    type: 'savePaymentSettingList',
                    payload: response.data.records,
                });
            } else {
                message.warning(response.message);
            }
        },
        //查询支付配置
        *fetchPaymentSet({payload}, {call, put}) {
            const response = yield call(reqPaymentSet,payload);

            if (response.code === 200) {
                const payload = response.data ? JSON.parse(response.data) : {};
                yield put({
                    type: 'savePaymentSet',
                    payload
                });
            } else {
                message.warning(response.message);
            }
        },
        //更新支付设置
        *fetchUpdatePaymentSet({payload}, {call, put}) {
            const response = yield call(reqUpdatePaymentSet,payload);
            if (response.code === 200) {
                message.success(response.message);
                yield put({type: 'fetchPaymentSet'});
            } else {
                message.warning(response.message);
            }
        },
        //查询交易设置
        *fetchDealSetting({_}, {call, put}) {

            const response = yield call(reqDealSetting);

            if (response.code === 200) {
                yield put({
                    type: 'saveDealSetting',
                    payload: response.data,
                });
            } else {
                message.warning(response.message);
            }
        },
        //更新交易设置
        *fetchUpdateDealSetting({payload}, {call, put}) {

            const response = yield call(reqUpdateDealSetting,payload);

            if (response.code === 200) {
                message.success(response.message);
                yield put({type: 'fetchDealSetting'});
            } else {
                message.warning(response.message);
            }
        },
        //查询财务设置
        *fetchFinacialSetting({_}, {call, put}) {

            const response = yield call(reqFinacialSetting);

            if (response.code === 200) {
                yield put({
                    type: 'saveFinacialSetting',
                    payload: response.data,
                });
            } else {
                message.warning(response.message);
            }
        },
        //更新财务设置
        *fetchUpdateFinacialSetting({payload}, {call, put}) {

            const response = yield call(reqUpdateFinacialSetting,payload);

            if (response.code === 200) {
                message.success(response.message);
                yield put({type: 'fetchFinacialSetting'});
            } else {
                message.warning(response.message);
            }
        },
        //查询物流设置列表哦
        *fetchDeliveryList({payload}, {call, put}) {
            const response = yield call(reqDeliveryList,payload);

            if (response.code === 200) {
                yield put({
                    type: 'saveDeliveryList',
                    payload: response.data.records,
                });
            } else {
                message.warning(response.message);
            }
        },
        //查询物流配置
        *fetchDeliverySet({payload}, {call, put}) {
            const response = yield call(reqDeliverySet,payload);

            if (response.code === 200) {
                const payload = response.data;
                yield put({
                    type: 'saveDeliverySet',
                    payload
                });
            } else {
                message.warning(response.message);
            }
        },
        //更新物流配置
        *fetchUpdateDeliverySet({payload}, {call, put}) {
            const response = yield call(reqUpdateDeliverySet,payload);
            if (response.code === 200) {
                message.success(response.message);
                yield put({type: 'fetchDeliverySet'});
            } else {
                message.warning(response.message);
            }
        },

    },
    reducers: {
        saveBaseSetting(state, action) {
            return {...state, baseSetting: action.payload || {}}
        },
        savePaymentSettingList(state, action) {
            return {...state, paymentSettingList: action.payload || []}
        },
        savePaymentSet(state, action) {
            return {...state, paymentSet: action.payload || {}}
        },
        saveDealSetting(state, action) {
            return {...state, dealSetting: action.payload || {}}
        },
        saveFinacialSetting(state, action) {
            return {...state,finacialSetting:action.payload || {}}
        },
        saveDeliveryList(state, action) {
            return {...state, deliverySettingList: action.payload || []}
        },
        saveDeliverySet(state, action) {
            return {...state, deliverySet: action.payload || {}}
        },
    },
};
export default Model;
