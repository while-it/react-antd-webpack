import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import { RouterToUrlQuery } from 'react-url-query';
import getNavData from 'app/nav';
import cloneDeep from 'lodash/cloneDeep';

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

function getRouteData(navData, path) {
  if (
    !navData.some(item => item.layout === path) ||
    !navData.filter(item => item.layout === path)[0].children
  ) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (
    !navData.some(item => item.layout === path) ||
    !navData.filter(item => item.layout === path)[0].children
  ) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path
  };
}

export default function({ history, app }) {
  const navData = getNavData(app);
  const BasicLayout = getLayout(navData, 'basic').component;
  const passProps = path => ({
    app,
    getRouteData,
    navData: getRouteData(navData, path)
  });

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <RouterToUrlQuery>
          <Switch>
            <Route
              path="/"
              render={props => (
                <BasicLayout {...props} {...passProps('basic')} />
              )}
            />
          </Switch>
        </RouterToUrlQuery>
      </Router>
    </LocaleProvider>
  );
}
