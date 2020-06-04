import { Descriptions, Button ,Card ,Table,Avatar } from 'antd';

import React, {Component,useState,useEffect} from 'react';


import {connect , FormattedMessage} from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';


const columns = [
    {
        title: '付费项目',
        dataIndex: 'name',
        key: 'name',
        // width: '30%',
    },
    {
        title: '付费金额',
        dataIndex: 'age',
        key: 'age',
        // width: '20%',
    },
    {
            title: '有效期',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '付费类型',
        dataIndex: 'type',
        key: 'type',
    },
]

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        type:'首费'
    },
    {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
        type:'续费'
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        type:'首费'
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        type:'首费'
    },
];

const MerchantInfoDetail = props => {

    const {
        history,
        dispatch,
        submitting,
        merchantDetail
    } = props;
    const {query} = history.location;
    // const [form] = Form.useForm();



    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'merchant/fetchMerchantDetail',
                payload: {id: query.id}
            });
        }
    }, [query]);


    const renderDetail = merchantDetail => {
        if (Object.keys(merchantDetail).length) {
            const {bizLicence,categoryInfo,province,city,county,street,address,merchantGalleries} = merchantDetail;
            const bizLicences = bizLicence.split(',');
            return (<>
                <Descriptions title="经营信息" column={1} style={{background:'#fff',padding:'10px',marginBottom:'20px'}}>
                    <Descriptions.Item label="入驻时间">{merchantDetail.id}</Descriptions.Item>
                    <Descriptions.Item label="销售额" >{merchantDetail.totalSaleAcount}</Descriptions.Item>
                    <Descriptions.Item label="订单数" >{merchantDetail.totalOrder}<Button type="link" size='middle'>查看订单</Button></Descriptions.Item>
                    <Descriptions.Item label="商品数" >{merchantDetail.totalSaleNum} <Button type="link" size='middle'>查看商品</Button></Descriptions.Item>
                </Descriptions>

                <Descriptions title="店铺信息" column={1} style={{background:'#fff',padding:'10px',marginBottom:'20px'}}>
                    <Descriptions.Item label="店铺名称" >{merchantDetail.name}</Descriptions.Item>
                    <Descriptions.Item label="营业时间" >{merchantDetail.openTime}</Descriptions.Item>
                    <Descriptions.Item label="联系电话" >{merchantDetail.mobile}</Descriptions.Item>
                    <Descriptions.Item label="商家类别" >{categoryInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="店铺地址" >
                        {province + city + county + street + address}
                    </Descriptions.Item>
                    <Descriptions.Item label="店铺照片" >
                        {merchantGalleries.map(item=><Avatar shape="square" key={item.id} size={64} src={item.imgUrl} style={{marginRight:"20px"}} />)}
                    </Descriptions.Item>
                    <Descriptions.Item label="营业执照" >
                        {bizLicences.map(url=><Avatar shape="square" key={url} size={64} src={url} style={{marginRight:"20px"}} />)}
                    </Descriptions.Item>
                    <Descriptions.Item label="店铺公告" >
                        {merchantDetail.notice}
                    </Descriptions.Item>
                </Descriptions>
                <Card title="付费信息" bordered={false}>
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </Card>
            </>)

        }
    };


    return (
        <PageHeaderWrapper content={false}>
            {renderDetail(merchantDetail)}
        </PageHeaderWrapper>
    )
}



export default connect(({merchant,loading}) => ({
    merchantDetail: merchant.merchantDetail,
    submitting: loading.effects['merchant/fetchMerchantDetail']
}))(MerchantInfoDetail);
