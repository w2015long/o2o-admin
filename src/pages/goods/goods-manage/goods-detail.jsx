import React, {Component, useState, useEffect} from 'react';
import {connect, FormattedMessage} from 'umi';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Descriptions, Divider, Avatar, Card, Table} from 'antd';


const GoodsDetail = props => {

    const {
        history,
        dispatch,
        fetching,
        goodsDetailMulti
    } = props;

    const {query} = history.location;

    const initColumns = [
        {
            title: '商品重量',
            dataIndex: 'weight',
            render: (_, {weight}) => (<>
                <span>{weight.toFixed(2) + 'kg'}</span>
            </>)
        },
        {
            title: '市场价',
            dataIndex: 'marketPrice',
            render: (_, {marketPrice}) => (<>
                <span>{'￥' + (marketPrice / 10 / 10).toFixed(2)}</span>
            </>)
        },
        {
            title: '销售价',
            dataIndex: 'retailPrice',
            render: (_, {retailPrice}) => (<>
                <span>{'￥' + (retailPrice / 10 / 10).toFixed(2)}</span>
            </>)
        },
        {
            title: '库存',
            dataIndex: 'stock',
        },
    ];

    //商品规格
    const renderTabel = () => {

        if (query.specificationType === 1) {//多规格才显示

            const {goodsSkusTable} = goodsDetailMulti;


            if (goodsSkusTable && goodsSkusTable.length) {
                return <Card title={'商品规格'}>
                    <Table
                        bordered
                        rowKey='id'
                        //表格数据
                        dataSource={goodsSkusTable}
                        columns={initColumns}
                        loading={fetching}
                        // onChange={handleNextPage}
                    />
                </Card>
            }
        }


    };

    //商品图片
    const renderGoodsImgs = () => {
        const {otoGoodsGalleries} = goodsDetailMulti;
        const style = {
            width: '180px',
            height: '180px',
            marginRight: '20px'
        };
        if (otoGoodsGalleries && otoGoodsGalleries.length) {
            return <Card title={'商品图片'}>
                {otoGoodsGalleries.map(item => <img key={item.id} src={item.imgUrl} style={style}/>)}
            </Card>
        }
    };

    //商品详情
    const renderGoodsDetail = () => {
        const {otoGoodsDetail} = goodsDetailMulti;
        const details = otoGoodsDetail && JSON.parse(otoGoodsDetail.detail);
        if (details && details.length) {
            return (
                <Descriptions title="商品详情" column={1} style={{background: '#fff', padding: '10px', marginBottom: '20px'}}>
                    {details.map(item=><Descriptions.Item label={item.name} key={item.name}>{item.value}</Descriptions.Item>)}
                </Descriptions>
            )
        }
    };

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'goods/fetchGoodsDetailMulti',
                payload: {id: query.id, specificationType: query.specificationType},
            });
        }
    }, [query]);


    return (
        <PageHeaderWrapper content={false}>
            <Descriptions title="基本信息" column={1} style={{background: '#fff', padding: '10px', marginBottom: '20px'}}>
                <Descriptions.Item label="商品名称">{goodsDetailMulti.name}</Descriptions.Item>
                <Descriptions.Item
                    label="商品分类">{goodsDetailMulti.category && goodsDetailMulti.category.name}</Descriptions.Item>
                <Descriptions.Item label="商品规格">
                    {
                        goodsDetailMulti.specificationType === 1 ? '多规格' : '统一规格'
                    }
                </Descriptions.Item>
            </Descriptions>
            {renderTabel()}
            {renderGoodsImgs()}
            {renderGoodsDetail()}
        </PageHeaderWrapper>
    )
};

export default connect(({goods, loading}) => ({
    goodsDetailMulti: goods.goodsDetailMulti,
    fetching: loading.effects['goods/fetchGoodsDetailMulti'],
}))(GoodsDetail);
