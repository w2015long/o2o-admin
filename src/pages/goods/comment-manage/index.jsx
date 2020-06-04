import React, {Component, useState, useEffect} from 'react';
import {connect, FormattedMessage} from 'umi';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Form, Input, Button, Row, Col, DatePicker, Card, Table, Divider, Radio, Avatar, Popconfirm} from 'antd';

import {PAGE_SIZE} from '@/utils/utils';
import {reduce} from "lodash";

const {RangePicker} = DatePicker;



const CommentManageIndex = props => {

    const {
        dispatch,
        commentList,
        total,
        fetching,
    } = props;

    const [form] = Form.useForm();
    const [selectAll, setSelect] = useState(false);
    const [selectedIds, SetselectedIds] = useState([]);
    const [pagination, Setpagination] = useState({
        current: 1,
        pageSize: PAGE_SIZE,
        total: 0
    });


    const initColumns = [
        {
            title: '用户',
            dataIndex: 'username',
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
        },
        {
            title: '评分',
            dataIndex: 'rate',
        },
        {
            title: '评论内容',
            dataIndex: 'content',
            render: (_, record) => (
                <>
                    {record.picture.map(item => <Avatar shape="square" src={item.picUrl} size={24} key={item.id}/>)}
                    <div>{record.content}</div>
                </>
            )
        },
        {
            title: '店铺',
            dataIndex: 'merchantName',
        },
        {
            title: '评论时间',
            dataIndex: 'createTime',
        },
        {
            title: '状态',
            dataIndex: 'applyStatus',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (<>
                {
                    record.deleted === 2 && <>
                        <a
                            onClick={() => {
                                dispatch({
                                    type: 'comment/fetchUpdatePassComment',
                                    payload: {ids: [record.id], type: true}
                                });
                            }}
                        >
                            审核通过
                        </a>
                        <Divider type="vertical"/>
                        <Popconfirm
                            placement="topRight"
                            title={`确认审核不通过吗！`}
                            onConfirm={() => {
                                dispatch({
                                    type: 'comment/fetchUpdatePassComment',
                                    payload: {ids: [record.id], type: false}
                                });
                            }}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a>审核不通过</a>
                        </Popconfirm>
                    </>}

            </>),
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
            type: 'comment/fetchCommentList',
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
                type: 'comment/fetchCommentList',
                payload: {pageNum: 1, pageSize: PAGE_SIZE, ...submitData},
            });
        }

    };

    /**
     * 表头操作 筛选数据
     * @param target
     */
    const handleFilterData = ({target}) => {
        //console.log(target.value);
        //0-正常 1-已删除 2-待审核 3-不通过
        let formData = {};
        const switchFn = {
            a: () => {
                formData = null
            },
            b: () => {//待审核
                formData.typeId = 2
            },
            c: () => {//审核通过
                formData.typeId = 0
            },
            d: () => {//审核不通过
                formData.typeId = 3
            },
        };

        switchFn[target.value] && switchFn[target.value]();

        Setpagination(pre => ({...pre, current: 1, pageSize: PAGE_SIZE}));

        dispatch({
            type: 'comment/fetchCommentList',
            payload: {pageNum: 1, pageSize: PAGE_SIZE, ...formData}
        });

    };

    /**
     * 处理审核
     * @param isPass
     */
    const handlePassComment = (isPass) => {
        //console.log(111, selectedIds);
        setTimeout(() => {
            dispatch({
                type: 'comment/fetchUpdatePassComment',
                payload: {ids: selectedIds, type: isPass}
            });
        }, 500);

    };

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


    useEffect(() => {
        if (dispatch) {
            if (pagination.total) return;
            dispatch({
                type: 'comment/fetchCommentList',
                payload: {pageNum: 1, pageSize: PAGE_SIZE},
            });
        }
    }, []);


    useEffect(() => {
        //console.log(333, selectedIds);
    }, [selectedIds]);

    useEffect(() => {
        Setpagination(pre => ({...pre, total}));
    }, [total]);


    const cardTilte = (<>
        <Radio.Group defaultValue="a" size="large" onChange={handleFilterData}>
            <Radio.Button value="a">全部</Radio.Button>
            <Radio.Button value="b">待审核</Radio.Button>
            <Radio.Button value="c">审核通过</Radio.Button>
            <Radio.Button value="d">审核不通过</Radio.Button>
        </Radio.Group>
    </>);


    return (
        <PageHeaderWrapper content={false}>
            <Form
                form={form}
                onFinish={onFinish}
                name="control-hooks">
                <Row>
                    <Col lg={{span: 6}}>
                        <Form.Item name="nickname" label="用户">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col lg={{span: 6, offset: 2}}>
                        <Form.Item name="mobile" label="手机号">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col lg={{span: 6, offset: 2}}>
                        <Form.Item name="comment" label="评论内容">
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{span: 6}}>
                        <Form.Item name="merchantName" label="商家店铺">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col lg={{span: 6, offset: 2}}>
                        <Form.Item name="timeRange" label="评论时间">
                            <RangePicker
                                format={'YYYY-MM-DD'}
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={{span: 6, offset: 2}}>
                        <Button type="primary"
                            // loading={submitting}
                                htmlType="submit" style={{width: "80%"}}>
                            查询
                        </Button>
                    </Col>
                </Row>
            </Form>


            <Card title={cardTilte}>
                <span>
                     <Button
                         type="primary"
                         disabled={!selectAll}
                         onClick={() => {
                             handlePassComment(true)
                         }}
                     >
                        批量通过
                    </Button>
                    <Divider type="vertical"/>
                    <Popconfirm
                        placement="topRight"
                        title={`确认批量审核不通过吗！`}
                        onConfirm={() => {
                            handlePassComment(false)
                        }
                        }
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button disabled={!selectAll} type="primary">批量不通过</Button>
                    </Popconfirm>
                </span>

                <Table
                    bordered
                    rowKey='id'
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    loading={fetching}
                    //表格数据
                    dataSource={commentList}
                    columns={initColumns}
                    pagination={pagination}
                    onChange={handleNextPage}
                />
            </Card>
        </PageHeaderWrapper>
    )

}


export default connect(({comment, loading}) => ({
    commentList: comment.commentList,
    total: comment.total,
    fetching: loading.effects['comment/fetchCommentList'],
}))(CommentManageIndex);



