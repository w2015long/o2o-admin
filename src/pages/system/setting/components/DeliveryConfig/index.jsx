import React, {useRef, useState, useEffect} from 'react';
import {Form, Input, Modal,message} from 'antd';
import {connect} from 'umi';


const { TextArea } = Input;


const PayConfig = props => {
    const {
        dispatch,
        visible,
        onSubmit,
        onCancel,
        current,
        deliverySet
    } = props;

    const [form] = Form.useForm();



    /**
     * 提交表单
     * @param values
     */
    const onFinish = values => {
        onSubmit && onSubmit(values);
    };

    const handleSubmit = () => {
        if (!form) return;
        form.submit();
    };



    //隐藏时自动清除表单
    useEffect(() => {
        if (form && !visible) {
            form.resetFields();
        }
    }, [props.visible]);

    useEffect(()=>{
        if (dispatch && current.id) {
            dispatch({
                type: "setting/fetchDeliverySet",
                payload: {id: current.id}
            });
        }
    },[current.id]);

    useEffect(()=>{
        //console.log('setValue>>>>',deliverySet);
        //回填表单数据
        form.setFieldsValue(deliverySet);
        //console.log(paymentSet);
    },[current.id,deliverySet])




    const renderSubDelivery = () => {
        return <>
            <Form.Item
                label="appKey"
                name={['appKey']}
                rules={[
                    {required: true, message: '请输入appKey!'},
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={['appSecret']}
                label="appSecret"
                rules={[
                    {required: true, message: '请输入appSecret!'},
                ]}
            >
                <Input/>
            </Form.Item>

        </>
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
                {renderSubDelivery()}
            </Form>
        </Modal>

    )
};

export default connect(({setting}) => ({
    deliverySet:setting.deliverySet
}))(PayConfig);
