/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
/**
 *@Author: JasonWang
 *@CreateTime: 2020-05-20 15:20:36
 *@Description: Ant Design Pro
 */``
import ProLayout, {DefaultFooter, SettingDrawer} from '@ant-design/pro-layout';
import React, {useEffect, useState} from 'react';
import {Link, useIntl, connect} from 'umi';
import {GithubOutlined} from '@ant-design/icons';
import {Result, Button} from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import {getAuthorityFromRouter} from '@/utils/utils';
import memory from '@/utils/memory';
import logo from '../assets/logo.svg';

/**
 * 获取路由中的path
 * @param arr
 * @param prev
 * @returns {*}
 */
const pathTarget = (arr, prev = []) => {
    return arr.reduce((prev, item) => {
        if (item.path) {
            prev.push(item.path);
        }
        if (Array.isArray(item.routes) && item.routes.length > 0) {
            pathTarget(item.routes, prev)
        }
        return prev
    }, prev)
}

const noMatch = (
    <Result
        status={403}
        title="403"
        subTitle="对不起，您没有访问本页的权限!"
        extra={
            <Button type="primary">
                <Link to="/user/login">Go Login</Link>
            </Button>
        }
    />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
    menuList.map(item => {
        const localItem = {...item, children: item.children ? menuDataRender(item.children) : []};
        return Authorized.check(item.authority, localItem, null);
    });

const defaultFooterDom = (
    <DefaultFooter
        copyright="2020 华项科技体验技术部出品"
        links={[
            // {
            //   key: 'Ant Design Pro',
            //   title: 'Ant Design Pro',
            //   href: 'https://pro.ant.design',
            //   blankTarget: true,
            // },
            // {
            //   key: 'github',
            //   title: <GithubOutlined />,
            //   href: 'https://github.com/ant-design/ant-design-pro',
            //   blankTarget: true,
            // },
        ]}
    />
);


const BasicLayout = props => {

    const {
        history,
        dispatch,
        children,
        settings,
        menuRoutes,
        location = {
            pathname: '/',
        },
    } = props;

    const [authorized, setAuthorized] = useState({});

    /**
     * constructor
     */

    useEffect(() => {
        let UserInfo;
        if (memory) {
            UserInfo = memory.UserInfo;
        }

        const isLogin = UserInfo && UserInfo.realName;
        //登录校验 (只简单做了 保存用户信息)
        if (!isLogin) {
            // history.push({
            //     pathname:"/user/login"
            // })
        }
        const defaultAuthorized = getAuthorityFromRouter(props.route.routes/*menuRoutes*/, location.pathname || '/') || {
            authority: undefined,
        };
        setAuthorized(defaultAuthorized);
    }, []);


    useEffect(() => {
        if (location && menuRoutes.length) {
            const serveRoutes = pathTarget(menuRoutes);
            const baseRoutes = pathTarget(props.route.routes);

            //服务端路由没有 && 文件路由有      -->403无权限
            if (!serveRoutes.includes(location.pathname) && baseRoutes.includes(location.pathname)) {
                if (!authorized.authority) {
                    // setAuthorized(prev=>({...prev,authority:['lack']}))
                }
            }
        }
    }, [location, menuRoutes, authorized])

    /**
     * init variables
     */

    const handleMenuCollapse = payload => {
        if (dispatch) {
            dispatch({
                type: 'global/changeLayoutCollapsed',
                payload,
            });
            // dispatch({
            //   type:'menu/fetchRoutes'
            // });
        }
    }; // get children authority


    // const { formatMessage } = useIntl();
    return (
        <>
            <ProLayout
                logo={logo}
                // formatMessage={formatMessage}
                menuHeaderRender={(logoDom, titleDom) => (
                    <Link to="/">
                        {logoDom}
                        {titleDom}
                    </Link>
                )}
                onCollapse={handleMenuCollapse}
                menuItemRender={(menuItemProps, defaultDom) => {
                    if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
                        return defaultDom;
                    }

                    return <Link to={menuItemProps.path}>{defaultDom}</Link>;
                }}
                breadcrumbRender={(routers = []) => [
                    {
                        path: '/',
                        breadcrumbName: '首页',/* formatMessage({
              id: 'menu.home',
            }),*/
                    },
                    ...routers,
                ]}
                itemRender={(route, params, routes, paths) => {
                    const first = routes.indexOf(route) === 0;
                    return first ? (
                        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                    ) : (
                        <span>{route.breadcrumbName}</span>
                    );
                }}
                footerRender={() => defaultFooterDom}
                menuDataRender={menuDataRender}
                // menuDataRender={()=> menuRoutes }
                rightContentRender={() => <RightContent/>}
                {...props}
                {...settings}
            >
                <Authorized authority={authorized.authority} noMatch={noMatch}>
                    {children}
                </Authorized>
            </ProLayout>
            <SettingDrawer
                settings={settings}
                onSettingChange={config =>
                    dispatch({
                        type: 'settings/changeSetting',
                        payload: config,
                    })
                }
            />
        </>
    );
};

export default connect(({global, settings, menu}) => ({
    collapsed: global.collapsed,
    settings,
    menuRoutes: menu.menuRoutes
}))(BasicLayout);
