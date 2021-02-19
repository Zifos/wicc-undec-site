import { Menu } from "antd";
import { Layout } from 'antd';
import {
  HomeOutlined,
} from '@ant-design/icons';
import styled from "styled-components";
import Link from 'next/link'

const ANTDSider = Layout.Sider;

const StyledSider = styled(ANTDSider)`

`;

const Sider = () => {
  return (
    <StyledSider collapsible>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link href="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<HomeOutlined />}>
        <Link href="/sections">
            Sections
          </Link>
        </Menu.Item>
      </Menu>
    </StyledSider>
  )
};

export default Sider;