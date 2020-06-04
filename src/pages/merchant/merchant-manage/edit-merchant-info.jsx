import React, {useRef, useState, useEffect} from 'react';
import {Form, Input, Row, Col, Button, TimePicker} from 'antd';

import {connect, FormattedMessage} from 'umi';
import {PageHeaderWrapper} from '@ant-design/pro-layout';

import PicturesWall from '../../../components/PicturesWall'

const {RangePicker} = TimePicker;


const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 12,
    },
};


const EditMerchantInfo = props => {

    const {
        history,
        dispatch,
        submitting,
        merchantInfo
    } = props;
    const {query} = history.location;
    const [form] = Form.useForm();

    const merchantGalleriesPW = useRef(null);
    const bizLicencePW = useRef(null);
    /**
     * 提交表单
     * @param values
     */
    const onFinish = values => {
       // console.log(values);
        const bizLicences = bizLicencePW.current.getImgs();
        const merchantGalleries = merchantGalleriesPW.current.getImgs();
        const data = {...values};
        delete data.categoryInfoName;
        delete data.fullAddress;
        data['openTime'] = values['openTime'][0].format('HH:mm') + '-' + values['openTime'][1].format('HH:mm');

        if (!bizLicences.length) {
            message.warning('请上传营业执照!');
            return;
        }
        if (!merchantGalleries.length) {
            message.warning('请上传店铺照片!');
            return;
        }
        data.bizLicences = bizLicences;
        data.merchantGalleries = merchantGalleries;

        if (dispatch) {
            dispatch({
                type: 'merchant/fetchUpdateMerchantDetailInfo',
                payload: {id: query.id, ...data}
            });
        }
    };

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'merchant/fetchMerchantInfo',
                payload: {id: query.id}
            });
        }
    }, [query]);

    useEffect(() => {
        const data = {...merchantInfo};
        delete data.merchantGalleries;
        delete data.bizLicence;
        form.setFieldsValue(data);
    }, [merchantInfo]);

    return (
        <PageHeaderWrapper content={false}>
            <Form {...layout}
                  name="nest"
                  form={form}
                  onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    label="店铺名称"
                    rules={[
                        {required: true, message: '请输入店铺名称!'},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="营业时间"
                    name={['openTime']}
                    rules={[
                        {required: true, message: '请选择营业时间!'},
                    ]}
                >
                    <RangePicker format={'HH-mm'}/>
                </Form.Item>
                <Form.Item
                    name={['mobile']}
                    label="联系电话"
                    rules={[
                        {required: true, message: '请输入联系电话!'},
                        // {pattern: /^1[3456789]\d{9}$/, message: '请输入正确格式的手机号'}
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['categoryInfoName']}
                    label="商家类别"
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item name={['fullAddress']} label="店铺地址">
                    <Input disabled/>
                </Form.Item>

                <Form.Item label="店铺照片">
                    <PicturesWall ref={merchantGalleriesPW} imgs={merchantInfo.merchantGalleries} maxLength={4} />
                </Form.Item>
                <Form.Item label="营业执照">
                    <PicturesWall ref={bizLicencePW} imgs={merchantInfo.bizLicence} maxLength={4} />
                </Form.Item>
                <Form.Item name={['notice']} label="店铺公告" rules={[
                    {required: true, message: '请输入店铺公告!'}
                ]}>
                    <Input.TextArea/>
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
        </PageHeaderWrapper>
    )

}


export default connect(({merchant, loading}) => ({
    merchantInfo: merchant.merchantInfo,
    submitting: loading.effects['merchant/fetchUpdateMerchantDetailInfo']
}))(EditMerchantInfo);
