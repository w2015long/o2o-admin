/**
*@Author: JasonWang
*@CreateTime: 2020-06-01 10:37:36
*@Description: Ant Design Pro
*/
import React, {Suspense} from 'react';
import { FormattedMessage} from 'umi';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Tabs} from 'antd';
import PageLoading from '../components/PageLoading';

const BaseView = React.lazy(() => import("./components/base"));
const PaymentView = React.lazy(() => import("./components/payment"));
const DealView = React.lazy(() => import("./components/deal"));
const FinancialView = React.lazy(() => import("./components/financial"));
const DeliveryView = React.lazy(() => import("./components/delivery"));

const { TabPane } = Tabs;

const SystemHome = () => {
    return (
        <PageHeaderWrapper content={false}>
            <Tabs
                defaultActiveKey={0}
                onChange={()=>{}}
                style={{backgroundColor:"white",padding:10}}
            >
                <TabPane tab="基础设置" key={0}>
                    <Suspense fallback={<PageLoading />}>
                        <BaseView />
                    </Suspense>
                </TabPane>
                <TabPane tab="支付设置" key={1} >
                    <Suspense fallback={<PageLoading />}>
                        <PaymentView />
                    </Suspense>
                </TabPane>
                <TabPane tab="交易设置" key={2} >
                    <Suspense fallback={<PageLoading />}>
                        <DealView />
                    </Suspense>
                </TabPane>
                <TabPane tab="财务设置" key={3} >
                    <Suspense fallback={<PageLoading />}>
                        <FinancialView />
                    </Suspense>
                </TabPane>
                <TabPane tab="配送设置" key={4} >
                    <Suspense fallback={<PageLoading />}>
                        <DeliveryView />
                    </Suspense>
                </TabPane>
            </Tabs>
        </PageHeaderWrapper>
    )
};

export default SystemHome;
