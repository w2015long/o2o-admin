export default {
  '/api/auth_routes': {
    '/form/advanced-form': {
      authority: ['admin', 'user'],
    },
  },


  'GET /api/menu/routes_' : (req,res) => {
    res.send({
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
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              // dynamic:true,
              routes: [
                {
                  name: 'analysis',
                  icon: 'smile',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                  // dynamic:true,
                },
                {
                  name: 'monitor',
                  icon: 'smile',
                  path: '/dashboard/monitor',
                  component: './dashboard/monitor',
                  // dynamic:true,
                },
                {
                  name: 'workplace',
                  icon: 'smile',
                  path: '/dashboard/workplace',
                  component: './dashboard/workplace',
                  // dynamic:true,
                },
              ],
            },
            {
              path: '/form',
              icon: 'form',
              name: 'form',
              // dynamic:true,
              routes: [
                {
                  name: 'basic-form',
                  icon: 'PicLeftOutlined',
                  path: '/form/basic-form',
                  component: './form/basic-form',
                  dynamic:true,
                },
                {
                  name: 'step-form',
                  icon: 'smile',
                  path: '/form/step-form',
                  component: './form/step-form',
                },
                {
                  name: 'advanced-form',
                  icon: 'smile',
                  path: '/form/advanced-form',
                  component: './form/advanced-form',
                  dynamic:true,
                },
              ],
            },
            {
              path: '/list',
              icon: 'table',
              name: 'list',
              dynamic:true,
              routes: [
                {
                  path: '/list/search',
                  name: 'search-list',
                  component: './list/search',
                  dynamic:true,
                  routes: [
                    {
                      path: '/list/search',
                      redirect: '/list/search/articles',
                    },
                    {
                      name: 'articles',
                      icon: 'smile',
                      path: '/list/search/articles',
                      component: './list/search/articles',
                      dynamic:true,
                    },
                    {
                      name: 'projects',
                      icon: 'smile',
                      path: '/list/search/projects',
                      component: './list/search/projects',
                      dynamic:true,
                    },
                    {
                      name: 'applications',
                      icon: 'smile',
                      path: '/list/search/applications',
                      component: './list/search/applications',
                      dynamic:true,
                    },
                  ],
                },
                {
                  name: 'table-list',
                  icon: 'smile',
                  path: '/list/table-list',
                  component: './list/table-list',
                  dynamic:true,
                },
                {
                  name: 'basic-list',
                  icon: 'smile',
                  path: '/list/basic-list',
                  component: './list/basic-list',
                  dynamic:true,
                },
                {
                  name: 'card-list',
                  icon: 'smile',
                  path: '/list/card-list',
                  component: './list/card-list',
                  dynamic:true,
                },
              ],
            },
            {
              path: '/profile',
              name: 'profile',
              icon: 'profile',
              dynamic:true,
              routes: [
                {
                  name: 'basic',
                  icon: 'smile',
                  path: '/profile/basic',
                  component: './profile/basic',
                  dynamic:true,
                },
                {
                  name: 'advanced',
                  icon: 'smile',
                  path: '/profile/advanced',
                  component: './profile/advanced',
                  dynamic:true,
                },
              ],
            },
            {
              name: 'result',
              icon: 'CheckCircleOutlined',
              path: '/result',
              dynamic:true,
              routes: [
                {
                  name: 'success',
                  icon: 'smile',
                  path: '/result/success',
                  component: './result/success',
                  dynamic:true,
                },
                {
                  name: 'fail',
                  icon: 'smile',
                  path: '/result/fail',
                  component: './result/fail',
                  dynamic:true,
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              dynamic:true,
              routes: [
                {
                  name: '403',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                  dynamic:true,
                },
                {
                  name: '404',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                  dynamic:true,
                },
                {
                  name: '500',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                  dynamic:true,
                },
              ],
            },
            {
              name: 'account',
              icon: 'user',
              path: '/account',
              dynamic:true,
              routes: [
                {
                  name: 'center',
                  icon: 'smile',
                  path: '/account/center',
                  component: './account/center',
                  dynamic:true,
                },
                {
                  name: 'settings',
                  icon: 'smile',
                  path: '/account/settings',
                  component: './account/settings',
                  dynamic:true,
                },
              ],
            },
            {
              name: 'editor',
              icon: 'highlight',
              path: '/editor',
              dynamic:true,
              routes: [
                {
                  name: 'flow',
                  icon: 'smile',
                  path: '/editor/flow',
                  component: './editor/flow',
                  dynamic:true,
                },
                {
                  name: 'mind',
                  icon: 'smile',
                  path: '/editor/mind',
                  component: './editor/mind',
                  dynamic:true,
                },
                {
                  name: 'koni',
                  icon: 'smile',
                  path: '/editor/koni',
                  component: './editor/koni',
                  dynamic:true,
                },
              ],
            },
            {
              path: '/',
              redirect: '/dashboard/analysis',
              authority: ['admin', 'user'],
              dynamic:true,
            },
            {
              component: '404',
            },
          ],
        },
      ],

    })
  },

  'GET /api/menu/routes' : (req,res) => {
    res.send({
      routes:
        [
          {
            path: '/dashboard',
            name: 'dashboard',
            icon: 'TrophyOutlined',
            authority: ['admin', 'user'],
            routes: [
              {
                name: 'dashboard',
                icon: 'smile',
                path: '/dashboard/analysis',
                component: './dashboard/analysis',
                authority: ['admin', 'user'],
              },
              {
                name: 'monitor',
                icon: 'smile',
                path: '/dashboard/monitor',
                component: './dashboard/monitor',
              },
              {
                name: 'workplace',
                icon: 'TrophyOutlined',
                path: '/dashboard/workplace',
                component: './dashboard/workplace',
              },
            ],
          },
          {
            path: '/form',
            icon: 'form',
            name: 'form',
            authority: ['admin', 'user'],
            routes: [
              {
                name: 'basic-form',
                icon: 'PicLeftOutlined',
                path: '/form/basic-form',
                component: './form/basic-form',
              },
              {
                name: 'step-form',
                icon: 'smile',
                path: '/form/step-form',
                component: './form/step-form',
              },
              {
                name: 'advanced-form',
                icon: 'TrophyOutlined',
                path: '/form/advanced-form',
                component: './form/advanced-form',
              },
            ],
          },
          {
            path: '/',
            redirect: '/dashboard/analysis',
            // authority: ['admin', 'user'],
          },
          {
            path: '/list',
            icon: 'table',
            name: 'list',
            dynamic:true,
            routes: [
              {
                path: '/list/search',
                name: 'search-list',
                component: './list/search',
                dynamic:true,
                routes: [
                  {
                    path: '/list/search',
                    redirect: '/list/search/articles',
                  },
                  {
                    name: 'articles',
                    icon: 'smile',
                    path: '/list/search/articles',
                    component: './list/search/articles',
                    dynamic:true,
                  },
                  {
                    name: 'projects',
                    icon: 'smile',
                    path: '/list/search/projects',
                    component: './list/search/projects',
                    dynamic:true,
                  },
                  {
                    name: 'applications',
                    icon: 'smile',
                    path: '/list/search/applications',
                    component: './list/search/applications',
                    dynamic:true,
                  },
                ],
              },
              {
                name: 'table-list',
                icon: 'smile',
                path: '/list/table-list',
                component: './list/table-list',
                dynamic:true,
              },
              {
                name: 'basic-list',
                icon: 'smile',
                path: '/list/basic-list',
                component: './list/basic-list',
                dynamic:true,
              },
              {
                name: 'card-list',
                icon: 'smile',
                path: '/list/card-list',
                component: './list/card-list',
                dynamic:true,
              },
            ],
          },
          {
            component: '404',
          },
        ]
    })
  }
};
