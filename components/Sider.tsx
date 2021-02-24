import styled from "styled-components";
import { Menu, Layout } from "antd";

import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { SiderProps } from "antd/lib/layout";

const ANTDSider = Layout.Sider;

const StyledSider = styled(ANTDSider)<SiderProps>``;
const DefaultMenu = styled(Menu)``;

const Sider = () => (
  <StyledSider collapsible>
    <DefaultMenu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
    >
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<HomeOutlined />}>
        <Link href="/sections">Sections</Link>
      </Menu.Item>
    </DefaultMenu>
  </StyledSider>
);

export default Sider;
