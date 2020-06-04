import React, {useState, useEffect} from 'react';
import {connect, FormattedMessage} from 'umi';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Form, Input, Button, Row, Col, DatePicker, Card, Table, Modal, Divider, Select, Cascader} from 'antd';

import {PAGE_SIZE} from '@/utils/utils';
import {reduce} from "lodash";

const {RangePicker} = DatePicker;
const {Option} = Select;

const imgStyle = {
    width: 100,
    height: 100,
    marginRight: 10
};

//0-待支付,1-待接单,2-待发货(已接单),3-待收货(已发货),4-售后退款,5-已完成,6-取消
//'待支付','待接单','待发货(已接单)','待收货(已发货)','售后退款','已完成','取消'
const selectOrderStatus = [
    {id: 0, name: '待支付'},
    {id: 1, name: '待接单'},
    {id: 2, name: '待发货(已接单)'},
    {id: 3, name: '待收货(已发货)'},
    {id: 4, name: '售后退款'},
    {id: 5, name: '已完成'},
    {id: 6, name: '取消'}
];

const OrderIndex = props => {

    const {
        dispatch,
        history,
        orderList,
        total,
        fetching,
        categories
    } = props;

    const [form] = Form.useForm();

    const [options, Setoptions] = useState([]);
    const [pagination, Setpagination] = useState({
        current: 1,
        pageSize: PAGE_SIZE,
        total: 0
    });


    const initColumns = [
        {
            title: '订单号',
            dataIndex: 'orderSn',
        },
        {
            title: '商品信息',
            dataIndex: 'orderDetails',
            render: (_, {orderDetails}) => (
                <>
                    <img src={orderDetails[0].picUrl} key={orderDetails[0].id} style={imgStyle} alt=''/>
                    <div>{orderDetails[0].goodsName}</div>
                </>
            )
        },
        {
            title: '支付信息',
            dataIndex: 'paymentMethod',
            render: (_, record) => (
                <>
                    <div>{record.paymentMethod}</div>
                    <div>实付金额：￥{record.useCash.toFixed(2)}</div>
                </>
            )
        },
        {
            title: '买家信息',
            dataIndex: 'user',
            render: (_, {user}) => (
                <>
                    <div>{user.realName}</div>
                    <div>{user.mobile}</div>
                </>
            )
        },
        {
            title: '下单时间',
            dataIndex: 'createTime',
        },
        {
            title: '订单状态',
            dataIndex: 'orderStatus',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <>
                    <div>{record.category.name + "订单"}</div>
                    <Divider type="vertical"/>
                    <a
                        onClick={() => {
                            history.push({
                                pathname: '/order/detail',
                                query: {id: record.id},
                            });
                        }}
                    >订单详情</a>
                </>
            ),
        },
    ];


    /**
     * 点击下一页
     * @param pagination
     */
    const handleNextPage = pagination => {
        const {current, pageSize} = pagination;
        Setpagination(pagination);
        dispatch({
            type: 'order/fetchOrderList',
            payload: {pageNum: current, pageSize},
        });
    };

    /**
     *提交表单进行赛选
     */
    const onFinish = values => {
        //console.log('Success:', values);
        const submitData = reduce(values, (pre, cur, key) => {
            if (values[key] !== undefined) {
                pre[key] = cur;
            }
            return pre
        }, {});

        Setpagination(pre => ({...pre, current: 1, pageSize: PAGE_SIZE}));

        if (dispatch) {
            dispatch({
                type: 'order/fetchOrderList',
                payload: {pageNum: 1, pageSize: PAGE_SIZE, ...submitData},
            });
        }

    };

    const formatCate = list => {
        return list.map(item => {
            return {
                value: item.id,
                label: item.name,
                children: item.children && item.children.length ? formatCate(item.children) : []
            };
        });
    };


    useEffect(() => {
        if (dispatch) {
            if (pagination.total) return;
            dispatch({
                type: 'order/fetchOrderList',
                payload: {pageNum: 1, pageSize: PAGE_SIZE},
            });
            //获取行业分类
            dispatch({
                type: 'category/fetchCategoryList',
            });
        }
    }, []);

    useEffect(() => {
        Setpagination(pre => ({...pre, total}));
    }, [total]);

    useEffect(() => {
        const opts = formatCate(categories);
        Setoptions(opts);
    }, [categories])


    return (
        <PageHeaderWrapper content={false}>
            <Form
                form={form}
                onFinish={onFinish}
                name="control-hooks">
                <Row>
                    <Col lg={{span: 6}}>
                        <Form.Item name="orderSn" label="订单编号">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col lg={{span: 6, offset: 2}}>
                        <Form.Item name="categoryId" label="订单类型">
                            <Cascader
                                options={options}
                                changeOnSelect
                                onChange={() => {
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={{span: 6, offset: 2}}>
                        <Form.Item name="orderStatus" label="订单状态">
                            <Select>
                                {selectOrderStatus.map(status => (<Option key={status.id}>{status.name}</Option>))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{span: 6}}>
                        <Form.Item name="merchantName" label="所属商家">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col lg={{span: 6, offset: 2}}>
                        <Form.Item name="mobile" label="手机号">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col lg={{span: 6, offset: 2}}>
                        <Button type="primary"
                                loading={fetching}
                                htmlType="submit" style={{width: "80%"}}>
                            查询
                        </Button>
                    </Col>
                </Row>
            </Form>


            <Card title={''}>
                <Table
                    bordered
                    rowKey='id'
                    loading={fetching}
                    //表格数据
                    dataSource={orderList}
                    columns={initColumns}
                    pagination={pagination}
                    onChange={handleNextPage}
                />
            </Card>
        </PageHeaderWrapper>
    )

}


export default connect(({order, loading, category}) => ({
    orderList: order.orderList,
    total: order.total,
    categories: category.categories,
    fetching: loading.effects['order/fetchOrderList'],
}))(OrderIndex);



