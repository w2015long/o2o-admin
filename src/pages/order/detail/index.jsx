import React, {Component, useState, useEffect} from 'react';
import {connect, FormattedMessage} from 'umi';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Descriptions, Divider, Avatar, Card, Col, Row} from 'antd';


const imgStyle = {
    width: 150,
    height: 150,
    marginRight: 10
};

const GoodsDetail = props => {

    const {
        history,
        dispatch,
        orderDetail
    } = props;

    const {query} = history.location;


    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'order/fetchOrderDetail',
                payload: {id: query.id},
            });
        }
    }, [query]);


    return (
        <PageHeaderWrapper content={false}>
            {/*{售后订单才显示售后信息}*/}
            {

            }
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="售后信息" bordered={false}>
                        <p>退款状态 ：{orderDetail.user && orderDetail.user.realName}</p>
                        <p>退款金额: {orderDetail.user && orderDetail.user.mobile}</p>
                        <p>退款方式: {orderDetail.user && orderDetail.user.mobile}</p>
                        <p>退款原因: {orderDetail.user && orderDetail.user.mobile}</p>
                    </Card>
                </Col>
                <Col span={12}>
                    {/*{售后订单才显示售后信息}*/}
                    <Card title="协商记录" bordered={false}>
                        <p>用户: {orderDetail.user && orderDetail.user.mobile}</p>
                        <p>商家: {orderDetail.user && orderDetail.user.mobile}</p>
                        <p>拒绝原因: {orderDetail.user && orderDetail.user.mobile}</p>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card title="商家信息" bordered={false}>
                        <img src={orderDetail.merchant && orderDetail.merchant.logoUrl} alt="" style={imgStyle}/>
                        <p>商家名称 ：{orderDetail.merchant && orderDetail.merchant.address}</p>
                        <p>商家品类 ：{orderDetail.merchant && orderDetail.merchant.address}</p>
                        <p>营业时间: {orderDetail.merchant && orderDetail.merchant.openTime}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户信息" bordered={false}>
                        <p>用户名 ：{orderDetail.user && orderDetail.user.realName}</p>
                        <p>手机号: {orderDetail.user && orderDetail.user.mobile}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="商品信息" bordered={false}>
                        <img src={orderDetail.orderDetails && orderDetail.orderDetails[0].picUrl} alt=""
                             style={imgStyle}/>
                        <p>商品名 ：{orderDetail.orderDetails && orderDetail.orderDetails.goodsName}</p>
                        <p>商品规格: {orderDetail.orderDetails && orderDetail.orderDetails.goodsSpecifitionNameValue}</p>
                        <p>销售价格: {orderDetail.orderDetails && orderDetail.orderDetails.retailPrice && orderDetail.orderDetails.retailPrice.toFixed(2)}</p>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="订单信息" bordered={false}>
                        <p>订单编号: {orderDetail.orderSn}</p>
                        <p>下单时间: {orderDetail.createTime}</p>
                        <p>支付方式: {orderDetail.paymentMethod}</p>
                        <p>实付金额: {orderDetail.useCash}</p>
                        <p>订单金额: {orderDetail.orderPrice}</p>
                        <p>优惠金额: {orderDetail.discountPrice}</p>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="配送信息" bordered={false}>
                        <p>配送方式 ：{orderDetail.shipType}</p>
                        {
                            <>
                                <span>
                                      <p>收货地址: {orderDetail.address}</p>
                                        <p>收货人: {orderDetail.consignee}</p>
                                    <p>手机号: {orderDetail.mobile}</p>
                                </span>
                                <span>
                                         <p>自提地址: {orderDetail.user && orderDetail.user.mobile}</p>
                                        <p>自提时间: {orderDetail.user && orderDetail.user.mobile}</p>
                                </span>
                            </>
                        }

                    </Card>
                </Col>

            </Row>
        </PageHeaderWrapper>
    )
};

export default connect(({order}) => ({
    orderDetail: order.orderDetail,
}))(GoodsDetail);
