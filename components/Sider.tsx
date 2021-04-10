import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Menu, Layout } from "antd";
import {
  HomeOutlined,
  BarsOutlined,
  SnippetsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { SiderProps } from "antd/lib/layout";

const ANTDSider = Layout.Sider;

const StyledSider = styled(ANTDSider)<SiderProps>``;
const DefaultMenu = styled(Menu)``;

type Route = {
  name: string;
  icon: React.ReactNode;
  url: string;
};

const Routes: Route[] = [
  {
    name: "Inicio",
    icon: <HomeOutlined />,
    url: "/admin",
  },
  {
    name: "Workshops",
    icon: <BarsOutlined />,
    url: "/admin/workshops",
  },
  {
    name: "Publicaciones",
    icon: <SnippetsOutlined />,
    url: "/admin/posts",
  },
];

const Sider = (): JSX.Element => {
  const currentRoute = useRouter().pathname;

  return (
    <StyledSider collapsible defaultCollapsed>
      <DefaultMenu
        defaultSelectedKeys={[currentRoute]}
        mode="inline"
        theme="dark"
      >
        {Routes.map((route: Route) => (
          <Menu.Item key={route.url} icon={route.icon}>
            <Link href={route.url}>{route.name}</Link>
          </Menu.Item>
        ))}
        <Menu.Item
          icon={<LogoutOutlined />}
          style={{ position: "absolute", bottom: "48px" }}
        >
          <Link href="/logout">Cerrar sesión</Link>
        </Menu.Item>
      </DefaultMenu>
    </StyledSider>
  );
};

export default Sider;
