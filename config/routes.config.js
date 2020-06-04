export default [
    {
        path: '/',
        component: '../layouts/BlankLayout',
        routes: [
            {
                path: '/user',
                component: '../layouts/UserLayout',
                routes: [
                    {
                        path: '/user',
                        redirect: '/user/login',
                    },
                    {
                        name: 'login',
                        icon: 'smile',
                        path: '/user/login',
                        component: './user/login',
                    },
                    {
                        component: '404',
                    },
                ],
            },
            {
                path: '/',
                component: '../layouts/BasicLayout',
                authority: ['admin', 'user'],
                // wrappers: ['../layouts/SecurityLayout'],
                routes: [
                    {
                        path:"/merchant",
                        name:"商家",
                        icon:"form",
                        dynamic: true,
                        routes:[
                            {
                                name: '商家管理',
                                icon: 'smile',
                                path: '/merchant/manage',
                                component: './merchant/merchant-manage',
                                dynamic: true,
                            },
                            {
                                name: '商家品类',
                                icon: 'smile',
                                path: '/merchant/category',
                                component: './merchant/merchant-category',
                                dynamic: true,
                            },
                            {
                                name: '商家详情',
                                icon: 'smile',
                                path: '/merchant/detail',
                                component: './merchant/merchant-manage/merchant-info-detail',
                                // dynamic: true,
                            },
                            {
                                name: '编辑商家',
                                icon: 'smile',
                                path: '/merchant/edit',
                                component: './merchant/merchant-manage/edit-merchant-info',
                                // dynamic: true,
                            },


                        ]

                    },
                    {
                        path:"/goods",
                        name:"商品",
                        icon:"smile",
                        dynamic: true,
                        routes:[
                            {
                                name: '商品管理',
                                icon: 'smile',
                                path: '/goods/manage',
                                component: './goods/goods-manage',
                                dynamic: true,
                            },
                            {
                                name: '评论管理',
                                icon: 'smile',
                                path: '/goods/comment',
                                component: './goods/comment-manage',
                                dynamic: true,
                            },
                            {
                                name: '商品详情',
                                icon: 'smile',
                                path: '/goods/detail',
                                component: './goods/goods-manage/goods-detail',
                                dynamic: true,
                            },
                        ]
                    },
                    {
                        path:"/order",
                        name:"订单",
                        icon:"list",
                        dynamic: true,
                        routes:[
                            {
                                name: '订单管理',
                                icon: 'smile',
                                path: '/order/home',
                                component: './order/home',
                                dynamic: true,
                            },
                            {
                                name: '订单详情',
                                icon: 'smile',
                                path: '/order/detail',
                                component: './order/detail',
                                dynamic: true,
                            },
                        ]
                    },
                    {
                        path:"/system",
                        name:"系统设置",
                        icon:"smile",
                        dynamic: true,
                        routes:[
                            {
                                name: '基础设置',
                                icon: 'smile',
                                path: '/system/setting',
                                component: './system/setting',
                                dynamic: true,
                            },
                        ]
                    },
                    {
                        path: '/dashboard',
                        name: 'dashboard',
                        icon: 'dashboard',
                        dynamic: true,
                        routes: [
                            {
                                name: 'analysis',
                                icon: 'smile',
                                path: '/dashboard/analysis',
                                component: './dashboard/analysis',
                                dynamic: true,
                            },
                            {
                                name: 'monitor',
                                icon: 'smile',
                                path: '/dashboard/monitor',
                                component: './dashboard/monitor',
                                dynamic: true,
                            },
                            {
                                name: 'workplace',
                                icon: 'smile',
                                path: '/dashboard/workplace',
                                component: './dashboard/workplace',
                                dynamic: true,
                            },
                        ],
                    },
                    {
                        path: '/',
                        redirect: '/dashboard/analysis',
                        // authority: ['admin', 'user'],
                        dynamic: true,
                    },
                    {
                        component: '404',
                    },
                ],
            },
        ],
    },
]
