import React, {useRef, useState, useEffect} from 'react';
import {Form, Input, Modal,message} from 'antd';
import {connect} from 'umi';

import PicturesWall from "@/components/PicturesWall";

const { TextArea } = Input;


const PayConfig = props => {
    const {
        history,
        dispatch,
        visible,
        onSubmit,
        onCancel,
        current,
        paymentSet
    } = props;

    const [form] = Form.useForm();

    const keyPW = useRef(null);
    const cerPW = useRef(null);


    /**
     * 提交表单
     * @param values
     */
    const onFinish = values => {

        const next = current.name === '微信支付' ? validateCredential(values) : true;
        onSubmit && next && onSubmit(values);
    };

    const handleSubmit = () => {
        if (!form) return;
        form.submit();
    };

    ////证书上传校验
    const validateCredential = values => {
        const keyImages = keyPW.current.getImgs();
        const curImages = cerPW.current.getImgs();
        //证书上传校验
        if (!keyImages.length) {
            message.warning('请上传apiclient_key证书!');
            return false;
        }
        if (!curImages.length) {
            message.warning('请上传apiclient_cer证书!');
            return false;
        }
        values.apiclient_key = keyImages[0];
        values.apiclient_cer = curImages[0];
        return true;
    };



    //隐藏时自动清除表单
    useEffect(() => {
        if (form && !visible) {
            form.resetFields();
        }
    }, [props.visible]);

    useEffect(()=>{
        console.log(current.id);
        if (dispatch && current.id) {
            dispatch({
                type: "setting/fetchPaymentSet",
                payload: {id: current.id}
            });
        }
    },[current.id]);

    useEffect(()=>{
        //console.log('setValue>>>>',paymentSet);
        //回填表单数据
        form.setFieldsValue(paymentSet);
        //console.log(paymentSet);
    },[current.id,paymentSet])



    const WinxinDom = () => {
        const {apiclient_key,apiclient_cer} = paymentSet;
        return <>
            <Form.Item
                name="AppID"
                label="AppID"
                rules={[
                    {required: true, message: '请输入AppID!'},
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="MCHID"
                name={['MCHID']}
                rules={[
                    {required: true, message: '请输入MCHID!'},
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={['API']}
                label="API秘钥"
                rules={[
                    {required: true, message: '请输入API秘钥!'},
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item label="apiclient_key证书">
                <PicturesWall ref={keyPW} imgs={[apiclient_key]} maxLength={1}/>
            </Form.Item>
            <Form.Item label="apiclient_cer证书">
                <PicturesWall ref={cerPW} imgs={[apiclient_cer]} maxLength={1}/>
            </Form.Item>
        </>
    };

    const Ali = () => {
        return <>
            <Form.Item
                name="account"
                label="支付宝账号"
                rules={[
                    {required: true, message: '请输入支付宝账号!'},
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="PID"
                label="合作者身份（PID)"
                rules={[
                    {required: true, message: '请输入AppID!'},
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="safetyCode"
                label="安全校验码（key)"
                rules={[
                    {required: true, message: '请输入AppID!'},
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="AppID"
                label="AppID"
                rules={[
                    {required: true, message: '请输入AppID!'},
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="publicKey"
                label="支付宝公钥"
                rules={[
                    {required: true, message: '请输入支付宝公钥!'},
                ]}
            >
                <TextArea
                    style={{
                        minHeight: 32,
                    }}
                    placeholder="请输入支付宝公钥"
                    rows={4}
                />
            </Form.Item>
            <Form.Item
                name="privateKey"
                label="商家应用私钥"
                rules={[
                    {required: true, message: '请输入商家应用私钥!'},
                ]}
            >
                <TextArea
                    style={{
                        minHeight: 32,
                    }}
                    placeholder="请输入商家应用私钥"
                    rows={4}
                />
            </Form.Item>
        </>
    };

    const renderWeixinOrAliPay = () => {
        if (current.name === "支付宝") {
            return Ali();
        } else {//微信
            return WinxinDom();
        }
    };



    return (
        <Modal
            getContainer={false}
            title={ current.name + '配置'}
            visible={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
        >
            <Form
                  name="pay"
                  form={form}
                  onFinish={onFinish}
            >
                {renderWeixinOrAliPay()}
            </Form>
        </Modal>

    )
};

export default connect(({setting}) => ({
    paymentSet:setting.paymentSet
}))(PayConfig);
