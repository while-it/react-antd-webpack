import React from 'react';
import { Layout } from 'antd';
import { Route } from 'dva/router';
const { Content } = Layout;

const PageContent = ({ navData }) => {
  return (
    <Content>
      {navData.map((item, index) => (
        <Route
          exact={item.exact}
          key={`item.path_${index}`}
          path={item.path}
          component={item.component}
        />
      ))}
    </Content>
  );
};

export default PageContent;
