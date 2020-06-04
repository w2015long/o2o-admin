import React, {useState, useEffect} from 'react';
import {connect, FormattedMessage} from 'umi';
import {Avatar, Table, Divider, Modal, Popconfirm} from 'antd';

import {PageHeaderWrapper} from '@ant-design/pro-layout';

import AddAndEditCategory from './addAndEdit-category'


const merchantCategoryIndex = props => {

    const {
        categories,
        dispatch
    } = props;

    const [modalStatus, setModalStatus] = useState(0);// 0隐藏 1编辑 2添加
    const [form, Setform] = useState(undefined);
    const [current, Setcurrent] = useState(undefined);


    const columns = [
        {
            title: '排序',
            dataIndex: 'sortOrder',
        },
        {
            title: '品类名称',
            dataIndex: 'name',
            render: (_, record) => (<>
                <Avatar src={record.iconUrl} size={24}/>
                <span>{record.name}</span>
            </>)
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <>
                    {
                        !record.parentId ? <a
                                onClick={() => {
                                    // console.log(record);
                                    if (!record.parentId) {//添加子品类
                                        Setcurrent(record);
                                        setModalStatus(2);
                                    }
                                }}
                            >
                                添加子品类
                            </a> :
                            <Popconfirm title="是否要删除此分类？" onConfirm={()=>{handleDeleteCate(record.id)}}>
                                <a>删除</a>
                            </Popconfirm>
                    }

                    <Divider type="vertical"/>
                    <a
                        onClick={() => {
                            Setcurrent(record);
                            setModalStatus(1);
                        }}
                    >编辑</a>
                </>
            ),
        },
    ];

    //模态框点击确定
    const handleAddAndEditCate = async () => {
        const values = await form.getFieldsValue();
        const images = form.getImages();
        const iconUrl = images.join();
        let type, queryId;
        if (modalStatus === 1) {
            type = 'category/fetchUpdateCate';
            queryId = 'id';
        } else {
            type = 'category/fetchCreateCate';
            queryId = 'parentId';
        }
        dispatch({
            type,
            payload: {[queryId]: current.id, ...values, iconUrl}
        });
        setTimeout(() => {
            setModalStatus(0)
        }, 300);
    };


    //confirm
    const handleDeleteCate = id => {
        dispatch({
            type: 'category/fetchDeleteCate',
            payload: {id}
        });
    };

    // rowSelection objects indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };


    useEffect(() => {
        dispatch({
            type: 'category/fetchCategoryList',
        });
    }, []);

    return (
        <PageHeaderWrapper content={false}>
            <Table
                rowKey='id'
                columns={columns}
                rowSelection={rowSelection}
                dataSource={categories}
            />
            <Modal
                title={`${modalStatus === 1 ? '编辑' : '添加'}品类`}
                visible={modalStatus !== 0}
                onOk={handleAddAndEditCate}
                onCancel={() => {
                    setModalStatus(0)
                }}
            >
                <AddAndEditCategory
                    operateType={modalStatus}
                    getForm={o => {
                        Setform(o)
                    }}
                    currentData={current}
                />
            </Modal>
        </PageHeaderWrapper>
    )
}


export default connect(({category, loading}) => ({
    categories: category.categories,
    submitting: loading.effects['category/fetchCategoryList'],
}))(merchantCategoryIndex);
