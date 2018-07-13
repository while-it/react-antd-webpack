import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function Header({ location }) {
  return (
    <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="home" />变形动画
        </Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/404">
          <Icon type="bars" />测试
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
