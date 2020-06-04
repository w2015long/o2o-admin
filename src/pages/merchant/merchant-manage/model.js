import {
    reqMerchantList,
    reqMerchantCate,
    reqMerchantInfo,
    updateMerchantDetailInfo,
    updateRecommend,
    reqMerchantDetail
} from './service';
import moment from 'moment';
import {message} from 'antd';
import {PAGE_SIZE} from '@/utils/utils';

const formatStoreStatus = ['营业中','休息中','已关闭'];
const formatPayMerch = ['免费商家','付费商家','续费商家','过期商家'];
const page = {
    /**
     * 格式化商家数据
     * @param list
     * @returns {*}
     */
    formatMerchantList: list => {
        return list.reduce((pre,cur)=>{
            const item = {...cur};
            item.storeStatus = formatStoreStatus[item.storeStatus];//营业状态
            item.payMerch = formatPayMerch[item.payMerch];//付费类别
            item.createTime = moment(item.createTime).format("YYYY-MM-DD");
            const {name} = item['categoryInfo'];
            item.marageCate = name;//经营品类
            //moment().add(7, 'days');到期时间 = 创建时间 + 版本时间
            item.endTime = moment(item.createTime).add(item.merchantVersion.validity,'years').format("YYYY-MM-DD");
            pre.push(item);
            return pre;
        },[]);
    },
    //编辑商家信息
    formatInfo: data => {
        const targetData = {...data};
        const {name,province,city,county,street,address,mobile,categoryInfo,merchantGalleries,bizLicence,notice} = targetData;
        const openTimeArr = targetData.openTime.split('-');
        return {
            name,
            fullAddress: province + city + county + street + address,
            mobile,
            categoryInfoName:categoryInfo.name,
            openTime:[moment(openTimeArr[0],'HH-mm'),moment(openTimeArr[1],'HH-mm')],
            merchantGalleries: merchantGalleries.map(item=>item.imgUrl),
            bizLicence:bizLicence.split(','),
            notice
        }
    },

};

const MerchantModel = {
    namespace: 'merchant',
    state: {
        merchantList: [],//商家列表数据
        total:0,
        categories:[],//经营品类
        merchantInfo:{},//商家信息
        merchantDetail:{},//商家信息详情
    },
    effects: {
        //查询商家信息
        *fetchMerchantList({payload}, {call, put}) {
            //查询分类
            if (payload.hasOwnProperty('levelSecond') && payload.hasOwnProperty('levelOne')) {
                payload.category = payload.levelSecond;
                delete payload.levelOne;
                delete payload.levelSecond;
            } else if (payload.hasOwnProperty('levelOne')) {
                payload.category = payload.levelOne;
                delete payload.levelOne;
            }

            const response = yield call(reqMerchantList, {...payload});
            let res,total;

            if (response.code === 200) {
                res = page.formatMerchantList(response.data.records);
                total = response.data.total;
            } else {
                message.warning(response.message);
                res = [];
                total = 0
            }
            yield put({
                type: 'saveMerchantList',
                payload: {res,total},
            });

        },
        //查询商家分类
        *fetchMerchantCate({_},{call, put}) {
            const response = yield  call(reqMerchantCate);
            if (response.code === 200) {
                yield put({
                    type: 'saveMerchantCate',
                    payload: [...response.data]
                })
            }

        },
        //获取商家信息
        *fetchMerchantInfo({payload},{call, put}) {
            const response = yield  call(reqMerchantInfo,payload);
            if (response.code === 200) {
                const data = page.formatInfo(response.data);
                yield put({
                    type: 'saveMerchantInfo',
                    payload: data
                })
            }

        },
        //更新商家详情信息
        *fetchUpdateMerchantDetailInfo({payload},{call}) {
            const response = yield  call(updateMerchantDetailInfo,payload);
            if (response.code === 200) {
                message.success(response.message);
            } else {
                message.warning(response.message);
            }
        },
        //推荐该商家
        *fetchUpdateRecommend({payload},{call, put, take}) {
            const response = yield  call(updateRecommend,payload);
            if (response.code === 200) {
                message.success(response.message);
                yield put({type: 'fetchMerchantList',payload: {pageNum: 1, pageSize: PAGE_SIZE}}); //触发action
                //console.log("fetchMerchantList");
                yield take('fetchMerchantList/@@end') //直到监听到b结束才继续执行
                //console.log(88888);
            } else {
                message.warning(response.message);
            }
        },
        //商家详情
        *fetchMerchantDetail({payload},{call, put}) {
            const response = yield  call(reqMerchantDetail,payload);
            if (response.code === 200) {
                yield put({
                    type: 'saveMerchantDetail',
                    payload: response.data
                })
            } else {
                message.warning(response.message);
            }

        },
    },
    reducers: {
        saveMerchantList(state, action) {
            return {...state, merchantList: action.payload.res || [],total:action.payload.total}
        },
        saveMerchantCate(state,action) {
            return {...state,categories:action.payload || []}
        },
        saveMerchantInfo(state,action) {
            return {...state,merchantInfo:action.payload || {}}
        },
        saveMerchantDetail(state,action) {
            return {...state,merchantDetail:action.payload || {}}
        }
    },
};
export default MerchantModel;
