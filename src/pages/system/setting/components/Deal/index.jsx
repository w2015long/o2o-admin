import React, {useRef, useState, useEffect} from 'react';
import {Form, InputNumber,Button,message } from 'antd';
import {connect} from 'umi';


const layout = {
    padding:20
};



const Deal = props => {

    const {
        history,
        dispatch,
        dealSetting
    } = props;
    const [form] = Form.useForm();

    const [minute,Setminute] = useState();
    const [hour,Sethour] = useState();

    /**
     * 提交表单
     * @param values
     */
    const handleMinutes = value => {
        const isInt = parseInt(value) === value;

        if (!isInt) {
            message.warning('请输入正整数');
            return;
        }
        Setminute(value);

    };

    const handleHours = value => {
        const isInt = parseInt(value) === value;

        if (!isInt) {
            message.warning('请输入正整数');
            return
        }
        Sethour(value);
    };


    const handleSubmit = () => {
        //console.log(minute);
        if (dealSetting.id) {
            //console.log(minute);
            dispatch({
                type:'setting/fetchUpdateDealSetting',
                payload: {id: dealSetting.id,payOut: minute,receiveOut: hour}
            });
        }

    };

    useEffect(()=>{
        if (dispatch) {
            dispatch({
                type:'setting/fetchDealSetting'
            });
        }
    },[]);

    const renderDom = dealSetting => {
        // if (Object.keys(dealSetting).length) {
            return <>
                <div style={layout}>买家超过:&nbsp;&nbsp;
                    <InputNumber min={1} defaultValue={dealSetting?.payOut} onChange={handleMinutes}/>
                    分钟不支付，订单将自动关闭
                </div>
                <div style={layout}>买家超过:&nbsp;&nbsp;
                    <InputNumber min={0} defaultValue={dealSetting?.receiveOut} onChange={handleHours}/>
                    小时不确认确认收货，订单将自动确认收货
                </div>
            </>
        // }
    };

    return (
        <>
            {renderDom(dealSetting)}
            <p>
                <Button
                    type="primary"
                    style={{marginLeft:30,width:200}}
                    onClick={handleSubmit}
                >保存</Button>
            </p>
        </>
    )
};

export default connect(({setting}) => ({
    dealSetting:setting.dealSetting
}))(Deal);
