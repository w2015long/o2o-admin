import {Form, Input, Button, Select, Row, Col, DatePicker, Card, Table, Divider, Radio,Popconfirm} from 'antd';

import React, {useState, useEffect} from 'react';

import {connect, FormattedMessage, history} from 'umi';
import {reduce} from 'lodash';
import {PageHeaderWrapper} from '@ant-design/pro-layout';

import {PAGE_SIZE} from '@/utils/utils';

const {Option} = Select;

const {RangePicker} = DatePicker;

const payMerchOpts = [
    {val: 0, text: '免费商家'},
    {val: 1, text: '付费商家'},
    {val: 2, text: '续费商家'},
    {val: 3, text: '过期商家'}
];



const MerchantIndex = props => {

    const {
        dispatch,
        merchantList,
        total,
        submitting,
        categories
    } = props;


    const [form] = Form.useForm();
    //初始化state
    const [levelOne, SetlevelOne] = useState();
    const [levelSecond, SetlevelSecond] = useState();
    const [levelOneChildern, SetlevelOneChildern] = useState([]);
    const [payMerch, SetPayMerch] = useState();
    // const [pageNum, SetPageNum] = useState(1);
    const [pagination, Setpagination] = useState({
        current: 1,
        pageSize: PAGE_SIZE,
        total: 0
    });


    const onReset = () => {
        form.resetFields();
    };

    //列表列数据
    const initColumns = [
        {
            title: '商家名称',
            dataIndex: 'name',
        },
        {
            title: '付费类别',
            dataIndex: 'payMerch',
        },
        {
            title: '到期时间',
            dataIndex: 'endTime',
        },
        {
            title: '经营品类',
            dataIndex: 'marageCate',
        },
        {
            title: '入驻时间',
            dataIndex: 'createTime',
        },
        {
            title: '营业状态',
            dataIndex: 'storeStatus',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <>
                    <a
                        onClick={() => {
                            // console.log(record);
                            history.push({
                                pathname: '/merchant/edit',
                                query: {id:record.id},
                            });
                        }}
                    >
                        编辑
                    </a>
                    <Divider type="vertical"/>
                    <Popconfirm
                        placement="topRight"
                        title={`确认${!record.recommend ? '推荐' : '取消推荐'}该商家`}
                        onConfirm={()=>{
                            //console.log(record);
                            dispatch({
                                type: 'merchant/fetchUpdateRecommend',
                                payload: {ids:[record.id],recommend:!record.recommend},
                            });
                        }}
                        okText="确定"
                        cancelText="取消"
                    >
                        <a>{ !record.recommend ? '推荐' : '取消推荐' }</a>
                    </Popconfirm>

                    <Divider type="vertical"/>
                    <a
                        onClick={() => {
                            history.push({
                                pathname: '/merchant/detail',
                                query: {id:record.id},
                            });
                        }}
                    >详情</a>
                </>
            ),
        },
    ];


    /**
     * 表头操作 筛选数据
     * @param target
     */
    const handleFilterData = ({target}) => {
        //console.log(target.value);
        //a全部 b营业中 c已停业 d已推荐
        //storeStatus 0-营业中 1-休息中 2-已关闭
        //Recommend 是否是推荐商家0-否;1-是
        let formData = {};
        const switchFn = {
            a:()=>{formData = null},
            b:()=>{formData.storeStatus = 0},
            c:()=>{formData.storeStatus = 2},
            d:()=>{formData.Recommend = 1},
        }

        switchFn[target.value] && switchFn[target.value]();

        Setpagination(pre => ({...pre, current: 1, pageSize: PAGE_SIZE}));

        dispatch({
            type: 'merchant/fetchMerchantList',
            payload: {pageNum: 1, pageSize: PAGE_SIZE,...formData}
        });

    }

    /**
     * 下拉框 一级
     * @param id
     */
    const handleLevelOne = id => {
        const target = categories.find(item => item.id === +id);
        //console.log(target);
        SetlevelOne(id);
        SetlevelOneChildern(target.categoryList);
    };
    /**
     * 下拉框 二级
     * @param id
     */
    const onSecondaryChange = id => {
        SetlevelSecond(id);
    };

    /**
     * 点击下一页
     * @param pageNum
     */
    const handleNextPage = pagination => {
        const {current, pageSize} = pagination;
        Setpagination(pagination);
        dispatch({
            type: 'merchant/fetchMerchantList',
            payload: {pageNum: current, pageSize},
        });
    }

    /**
     *提交表单进行赛选
     */
    const onFinish = values => {
        console.log('Success:', values);
        const submitData = reduce(values, (pre, cur, key) => {
            if (values[key] !== undefined) {
                pre[key] = cur;
            }
            return pre
        }, {});

        Setpagination(pre => ({...pre, current: 1, pageSize: PAGE_SIZE}));

        if (dispatch) {
            dispatch({
                type: 'merchant/fetchMerchantList',
                payload: {pageNum: 1, pageSize: PAGE_SIZE, ...submitData},
            });
        }

    };
    useEffect(()=>{
        console.log("测试副作用---");
    },[merchantList]);

    useEffect(() => {
        if (dispatch) {
            if (pagination.total) return;
            dispatch({
                type: 'merchant/fetchMerchantList',
                payload: {pageNum: 1, pageSize: PAGE_SIZE},
            });
            dispatch({
                type: 'merchant/fetchMerchantCate',
            });
        }
    }, []);

    useEffect(()=>{
        Setpagination(pre => ({...pre, total}));
    },[total]);

    const cardTilte = (<>
        <Radio.Group defaultValue="a" size="large" onChange={handleFilterData}>
            <Radio.Button value="a">全部</Radio.Button>
            <Radio.Button value="b">营业中</Radio.Button>
            <Radio.Button value="c">已停业</Radio.Button>
            <Radio.Button value="d">已推荐</Radio.Button>
        </Radio.Group>
    </>);


    return (
        <PageHeaderWrapper content={false}>
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
            >
                <Row>
                    <Col lg={{span: 5}}>
                        <Form.Item name="name" label="商家名称">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col lg={{span: 5, offset: 1}}>
                        <Form.Item name="payMerch" label="付费类别">
                            <Select
                                value={payMerch}
                                onChange={val => {
                                    SetPayMerch(val)
                                }}
                            >
                                {payMerchOpts.map(item => <Option value={item.val} key={item.val}>{item.text}</Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={{span: 5, offset: 1}}>
                        <Form.Item name="levelOne" label="经营品类">
                            <Select
                                value={levelOne}
                                onChange={handleLevelOne}
                            >
                                {categories.map(item => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    {
                        levelOneChildern.length > 0 && <Col lg={{span: 3, offset: .5}}>
                            <Form.Item
                                name="levelSecond"
                            >
                                <Select
                                    value={levelSecond}
                                    onChange={onSecondaryChange}
                                >
                                    {levelOneChildern.map(item => (
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    }
                </Row>
                <Row>
                    <Col lg={{span: 6}}>
                        <Form.Item name="timeRange" label="入驻时间">
                            <RangePicker
                                format={'YYYY-MM-DD'}
                            />
                        </Form.Item>

                    </Col>
                    <Col lg={{span: 6, offset: 2}}>
                        <Button type="primary"
                                loading={submitting}
                                htmlType="submit" style={{width: "80%"}}>
                            查询
                        </Button>
                    </Col>
                </Row>
            </Form>
            {/*    数据展示开始    */}
            <Card title={cardTilte}>
                <Table
                    bordered
                    rowKey='id'
                    loading={submitting}
                    //表格数据
                    dataSource={merchantList}
                    columns={initColumns}
                    pagination={pagination}
                    onChange={handleNextPage}
                />
            </Card>
        </PageHeaderWrapper>
    )

}

export default connect(({merchant, loading}) => ({
    merchantList: merchant.merchantList,
    total: merchant.total,
    categories: merchant.categories,
    submitting: loading.effects['merchant/fetchMerchantList'],
}))(MerchantIndex);
