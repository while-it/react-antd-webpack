import dynamic from 'dva/dynamic';

const dynamicWrapper = (app, models, component) =>
  dynamic({
    app,
    models: () => models.map(m => import(`models/${m}.js`)),
    component
  });

export default app => [
  {
    component: dynamicWrapper(app, [], () => import('layouts/basic-layout')),
    layout: 'basic',
    children: [
      {
        name: '主页',
        icon: 'home',
        path: '/',
        component: dynamicWrapper(app, [], () => import('pages/basic/home'))
      },
      {
        name: '测试',
        icon: 'bars',
        path: '/404',
        component: dynamicWrapper(app, [], () => import('pages/basic/404'))
      }
    ]
  }
];
