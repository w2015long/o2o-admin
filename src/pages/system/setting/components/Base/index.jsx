import React, {useState, useEffect} from 'react';
import {connect} from 'umi';
import {Form, Switch, Input, Button, Row, Col} from 'antd';


const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 12,
    },
};


const Base = props => {

    const {
        dispatch,
        baseSetting,
        submitting
    } = props;

    const [form] = Form.useForm();

    const onFinish = values => {
        //console.log('finished>>', values);
        if (baseSetting.id) {//更新
            values.id = baseSetting.id;
        }//添加不传id 或者传null

        dispatch({
            type: 'setting/fetchUpdateBaseSetting',
            payload: {...values}
        });
    };

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: "setting/fetchBaseSetting"
            });
        }
    }, []);


    useEffect(() => {
        //servicePhone
        if (Object.keys(baseSetting).length) {
            form.setFieldsValue(baseSetting);
        }
    }, [baseSetting]);

    return (
        <Form {...layout}
              name="base"
              form={form}
              onFinish={onFinish}
        >
            <Form.Item
                name="servicePhone"
                label="客服电话"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="commentStatus"
                label="评论功能"
                valuePropName='checked'
            >
                <Switch checkedChildren="开启" unCheckedChildren="关闭"/>
            </Form.Item>
            <Form.Item
                label="评论审核"
                name={['commentCheck']}
                valuePropName='checked'
            >
                <Switch checkedChildren="开启" unCheckedChildren="关闭"/>
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
    baseSetting: setting.baseSetting,
    submitting: loading.effects['setting/fetchUpdateBaseSetting']
}))(Base);
