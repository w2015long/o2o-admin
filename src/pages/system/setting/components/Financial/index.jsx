/**
 *@Author: JasonWang
 *@CreateTime: 2020-06-01 11:47
 *@Description: Ant Design Pro
 * 财务设置
 */


import React, {useRef, useState, useEffect} from 'react';
import {Form, Input, Row, Col, Button, Switch, Radio, Tooltip} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import {connect} from 'umi';


const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 12,
    },
};


//财务设置
const Financial = props => {

    const {
        history,
        dispatch,
        submitting,
        finacialSetting
    } = props;
    const [form] = Form.useForm();

    const [minute, Setminute] = useState();


    /**
     * 提交表单
     * @param values
     */
    const onFinish = values => {
        console.log(values);
        if (finacialSetting.id)  values.id = finacialSetting.id;
        dispatch({
            type: 'setting/fetchUpdateFinacialSetting',
            payload: {...values}
        })
    };


    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'setting/fetchFinacialSetting',
            })
        }

    }, []);


    useEffect(() => {
        //回填表单数据
        form.setFieldsValue(finacialSetting);
    }, [finacialSetting]);

    return (

        <Form
            {...layout}
            name="financial"
            form={form}
            onFinish={onFinish}
        >
            <Tooltip title={"开启自动结算，则到结算日期后自动结算给商家"}>
                <Form.Item
                    name="settlementStatus"
                    label="自动结算"
                    valuePropName='checked'
                >
                    <Switch checkedChildren="开启" unCheckedChildren="关闭"/>
                </Form.Item>
            </Tooltip>
            <Form.Item
                label="结算周期"
                name={['settlementInterval']}
                rules={[
                    {required: true, message: '请输入MCHID!'},
                ]}
            >
                <Input
                    type="number"
                    suffix="天"
                />
            </Form.Item>
            <Form.Item
                label="提现方式"
                name={['withdrawPayId']}
                rules={[
                    {required: true, message: '请输入MCHID!'},
                ]}
            >
                <Radio.Group onChange={() => {
                }} value={1}>
                    <Radio value={1}>支付宝</Radio>
                    <Radio value={2}>微信</Radio>
                </Radio.Group>
            </Form.Item>
            <Tooltip title={"开启后，则商家提现不需要审核"}>
                <Form.Item
                    name="withdrawStatus"
                    label="提现自动审核"
                    valuePropName='checked'
                >
                    <Switch checkedChildren="开启" unCheckedChildren="关闭"/>
                </Form.Item>
            </Tooltip>

            <Form.Item
                label="最低提现金额"
                name={['minWithdrawMoney']}
                rules={[
                    {required: true, message: '请输入MCHID!'},
                ]}
            >
                <Input
                    type="number"
                    suffix="元"
                />
            </Form.Item>
            <Form.Item
                label="提现手续费（商家）"
                name={['merWithdrawCharge']}
                rules={[
                    {required: true, message: '请输入提现手续费!'},
                ]}
            >
                <Input
                    type="number"
                    suffix="%"
                />
            </Form.Item>
            <Form.Item
                label="提现手续费（用户）"
                name={['userWithdrawCharge']}
                rules={[
                    {required: true, message: '请输入提现手续费!'},
                ]}
            >
                <Input
                    type="number"
                    suffix="%"
                />
            </Form.Item>
            <Row>
                <Col lg={{span: 10, offset: 4}}>
                    <Button type="primary"
                            style={{width: '100%'}}
                            loading={submitting}
                            htmlType="submit">
                        保存
                    </Button>
                </Col>
            </Row>
        </Form>
    )
};


export default connect(({setting, loading}) => ({
    finacialSetting: setting.finacialSetting,
    submitting: loading.effects['setting/fetchUpdateFinacialSetting']
}))(Financial);
