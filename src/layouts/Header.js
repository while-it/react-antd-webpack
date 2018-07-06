import { Menu, Icon } from 'antd';
import Link from 'umi/link';

function Header({ location }) {
  return (
    <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="home" />翻转类动画
        </Link>
      </Menu.Item>
      <Menu.Item key="/waiting">
        <Link to="/waiting">
          <Icon type="bars" />待定动画
        </Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know">
          <Icon type="frown-circle" />404
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
