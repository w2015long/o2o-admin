import React, {Component, useState, useEffect} from 'react';
import {connect, FormattedMessage} from 'umi';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    DatePicker,
    Card,
    Table,
    Modal,
    Divider,
    Radio,
    Avatar,
} from 'antd';
import {PAGE_SIZE} from '@/utils/utils';

import style from './style.less'
import OperateForm from "./components/OperateForm";
import {reduce} from "lodash";

const {RangePicker} = DatePicker;
const {Option} = Select;

const layout = {
    labelCol: {span: 5},
    // wrapperCol: { span: 22 },
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};


const GoodsManageIndex = props => {
    const {
        dispatch,
        history,
        submitting,
        goodsList,
        total,
        goodsCategory
    } = props;

    const initColumns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            render: (_, record) => (<>
                <Avatar src={record.listPicUrl} size={24}/>
                <span>{record.name}</span>
            </>)
        },
        {
            title: '商品类型',
            dataIndex: 'categoryName',
        },
        {
            title: '所属商家',
            dataIndex: 'merchantName',
        },
        {
            title: '状态',
            dataIndex: 'putawayStatus',
        },
        {
            title: '上架时间',
            dataIndex: 'addTime',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <>
                    <a
                        onClick={() => {
                            //console.log(record);
                            history.push({
                                pathname:"/goods/detail",
                                query: {id:record.id,specificationType:record.specificationType},
                            });
                        }}
                    >
                        详情
                    </a>
                    <Divider type="vertical"/>
                    <a
                        onClick={() => {
                            //console.log(record);
                            setIsShowModal(true);
                            SetselectedIds([record.id]);
                        }}
                    >下架</a>
                </>
            ),
        },
    ];


    const [form] = Form.useForm();
    const [selectAll, setSelect] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedIds, SetselectedIds] = useState([]);
    const [modalForm, SetmodalForm] = useState(undefined);
    const [pagination, Setpagination] = useState({
        current: 1,
        pageSize: PAGE_SIZE,
        total: 0
    });

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (!!selectedRows.length) {
                setSelect(true);
                const ids = selectedRows.map(item => item.id);
                SetselectedIds(ids);
            } else {
                setSelect(false)
            }
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    /**
     * 表头操作 筛选数据
     * @param target
     */
    const handleFilterData = ({target}) => {
        //console.log(target);
        //0-已下架 1-上架中 2-平台下架
        let formData = {};
        const switchFn = {
            a: () => {
                formData = null
            },
            b: () => {
                formData.putawayStatus = 1
            },
            c: () => {
                formData.putawayStatus = 0
            },
            d: () => {
                formData.putawayStatus = 2
            },
        };

        switchFn[target.value] && switchFn[target.value]();

        Setpagination(pre => ({...pre, current: 1, pageSize: PAGE_SIZE}));

        dispatch({
            type: 'goods/fetchGoodsList',
            payload: {pageNum: 1, pageSize: PAGE_SIZE, ...formData}
        });
    };


    //提交表单 进行查询
    const onFinish = values => {
        console.log('finish>>>>', values);
        const submitData = reduce(values, (pre, cur, key) => {
            if (values[key] !== undefined) {
                pre[key] = cur;
            }
            return pre
        }, {});

        Setpagination(pre => ({...pre, current: 1, pageSize: PAGE_SIZE}));

        if (dispatch) {
            dispatch({
                type: 'goods/fetchGoodsList',
                payload: {pageNum: 1, pageSize: PAGE_SIZE, ...submitData},
            });
        }
    };

    /**
     * 点击下一页
     * @param pagination
     */
    const handleNextPage = pagination => {
        const {current, pageSize} = pagination;
        Setpagination(pagination);
        dispatch({
            type: 'goods/fetchGoodsList',
            payload: {pageNum: current, pageSize},
        });
    };

    //处理下架
    const handlePutaway = async () => {
        const valuse = await modalForm.getFieldsValue();

        dispatch({
            type: 'goods/fetchUpdatePutaway',
            payload: {ids: selectedIds, ...valuse},
        });

        setTimeout(() => {
            setIsShowModal(false)
        }, 300)
    };

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'goods/fetchGoodsList',
                payload: {pageNum: 1, pageSize: PAGE_SIZE},
            });

            dispatch({type: 'goods/fetchGoodsCate'});
        }
    }, []);

    useEffect(() => {
        Setpagination(pre => ({...pre, total}));
    }, [total]);


    const cardTilte = (<>
        <Radio.Group defaultValue="a" size="large" onChange={handleFilterData}>
            <Radio.Button value="a">全部</Radio.Button>
            <Radio.Button value="b">上架中</Radio.Button>
            <Radio.Button value="c">已下架</Radio.Button>
            <Radio.Button value="d">平台下架</Radio.Button>
        </Radio.Group>
    </>);


    return (
        <PageHeaderWrapper content={false}>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Row>
                    <Col span={6}>
                        <Form.Item name="goodsName" label="商品名称">
                            <Input/>
                        </Form.Item>
                        <Form.Item name="merchantName" label="所属商家">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={2}>
                        <Form.Item name="categoryId" label="商品类型">
                            <Select
                                onChange={() => {}}
                            >
                                {goodsCategory.map(cate => (<Option key={cate.id}>{cate.name}</Option>))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="timeRange" label="上架时间">
                            <RangePicker
                                format={'YYYY-MM-DD'}
                            />
                        </Form.Item>
                    </Col>
                    <Col offset={1}>
                        <Form.Item></Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>

                    </Col>
                </Row>
            </Form>


            <Card title={cardTilte}>
                <Button
                    type="primary"
                    disabled={!selectAll}
                    onClick={() => {
                        setIsShowModal(true);
                    }}
                >
                    批量下架
                </Button>

                <Table
                    bordered
                    rowKey='id'
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    //表格数据
                    dataSource={goodsList}
                    columns={initColumns}
                    loading={submitting}
                    pagination={pagination}
                    onChange={handleNextPage}
                />
            </Card>
            <Modal
                title="商品下架"
                visible={isShowModal}
                onOk={handlePutaway}
                onCancel={() => {
                    setIsShowModal(false)
                }}
                okText="确认"
                cancelText="取消"
            >
                <OperateForm getForm={o => SetmodalForm(o)}/>

            </Modal>
        </PageHeaderWrapper>
    )

}


export default connect(({goods, loading}) => ({
    goodsList: goods.goodsList,
    total: goods.total,
    goodsCategory: goods.goodsCategory,
    submitting: loading.effects['goods/fetchGoodsList'],
}))(GoodsManageIndex);



