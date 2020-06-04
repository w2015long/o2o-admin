import React, {useState, useEffect} from 'react';
import {Form, Input, Radio} from 'antd';


const OperateForm = props => {
    const {getForm} = props;
    const [form] = Form.useForm();
    //可再上架传2 或者不传 不可再上架传3


    useEffect(()=>{
        getForm(form);
        return ()=>{
            form.resetFields();
        }
    },[form,getForm]);

    return (
        <Form
            form={form}
        >
            <Form.Item name={['reason']} label="下架原因">
                <Input.TextArea/>
            </Form.Item>
            <Form.Item
                name={['status']}
                label="商家再上架"
            >
                <Radio.Group name="status">
                    <Radio value={3}>不可再上架</Radio>
                    <Radio value={2}>可再上架</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
};


export default OperateForm;
