import {
    reqCommentList,
    reqUpdatePassComment
} from './service';
import moment from 'moment';
import {message} from 'antd';
import {PAGE_SIZE} from '@/utils/utils';

//0-正常 1-已删除 2-待审核 3-不通过
const formatStatus = ['正常','已删除','待审核','不通过'];//0-正常 1-已删除 2-待审核 3-不通过
const page = {
    /**
     * 格式化评论数据
     * @param list
     * @returns {*}
     */
    formatCommentList: list => {
        return list.reduce((pre,cur)=>{
            const item = {...cur};
            item.username = item.user && item.user.nickname;
            item.mobile = item.user && item.user.mobile;
            item.merchantName = item.merchant && item.merchant.name;
            item.createTime = moment(item.createTime).format("YYYY-MM-DD");
            item.applyStatus = formatStatus[item.deleted];
            pre.push(item);
            return pre;
        },[]);
    },

};

const MerchantModel = {
    namespace: 'comment',
    state: {
        commentList: [],//评论列表数据
        total:0,
    },
    effects: {
        //查询评论列表
        *fetchCommentList({payload}, {call, put}) {
            const response = yield call(reqCommentList, payload);
            let res,total;

            if (response.code === 200) {
                res = page.formatCommentList(response.data.records);
                total = response.data.total;
            } else {
                message.warning(response.message);
                res = [];
                total = 0
            }
            yield put({
                type: 'saveCommentList',
                payload: {res,total},
            });

        },

        //更新评论审核
        *fetchUpdatePassComment({payload},{call,put}) {
            const response = yield  call(reqUpdatePassComment,payload);
            if (response.code === 200) {
                message.success(response.message);
                yield put({type: 'fetchCommentList',payload: {pageNum: 1, pageSize: PAGE_SIZE}});
            } else {
                message.warning(response.message);
            }
        },

    },
    reducers: {
        saveCommentList(state, action) {
            return {...state, commentList: action.payload.res || [],total:action.payload.total}
        },
    },
};
export default MerchantModel;
