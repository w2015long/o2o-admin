import React, {useState, useEffect} from 'react';
import {connect} from 'umi';
import {Table,Switch,Avatar,Modal} from 'antd';
import {PAGE_SIZE} from '@/utils/utils';

import PayConfig from '../PayConfig';

const Payment = props => {

    const {
        dispatch,
        paymentSettingList,
    } = props;

    const [visible , Setvisible] = useState(false);
    const [current , Setcurrent] = useState({});

    const initColumns = [
        {
            title: '支付方式',
            dataIndex: 'name',
            render: (_, {name,logoUrl}) => (
                <>
                    <Avatar shape="square" size={36} src={logoUrl} style={{marginRight:10}} />
                    <span>{name}</span>
                </>
            ),
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (_, {status}) => <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={status}/>,
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => <a
                onClick={() => {
                    //console.log(record);
                    Setcurrent(record);
                    Setvisible(true)
                }}
            >配置</a>,
        }
    ];



    const operationModal = {
        visible,
        current,
        onSubmit: values => {
            console.log(values);
            dispatch({
                type: "setting/fetchUpdatePaymentSet",
                payload: {id:current.id,...values}
            });

            setTimeout(()=>{
                Setvisible(false);
            },300);
        },
        onCancel: () => {
            Setvisible(false);
        }
    };


    useEffect(()=>{
        if (dispatch) {
            dispatch({
                type: "setting/fetchPaymentList",
                payload: {pageNum:1,pageSize: PAGE_SIZE}
            });
        }
    },[]);

    return (
        <>
            <Table
                bordered
                pagination={false}
                dataSource={paymentSettingList}
                columns={initColumns}
                rowKey="id"

            />

            <PayConfig {...operationModal}/>
        </>

    )
};

export default connect(({setting}) => ({
    paymentSettingList: setting.paymentSettingList,
}))(Payment);
