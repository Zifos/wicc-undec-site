import React from "react";
import Head from "next/head";
import { Col, Row, Image, Space, Typography } from "antd";
import Link from "next/link";
import { BarsOutlined, SnippetsOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";
import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
} from "../components/Styled";

const logo = "/WICC-logo-2.png";

const Home = (): JSX.Element => {
  const posts = [
    {
      _id: "1231",
      title:
        "Rendimiento de Cloud Computin para HPC en IasS privados y públicos",
      categoryID: "111",
    },
    {
      _id: "1232",
      title:
        "Rendimiento de Cloud Computin para HPC en IasS privados y públicos",
      categoryID: "222",
    },
    {
      _id: "1233",
      title:
        "Rendimiento de Cloud Computin para HPC en IasS privados y públicos",
      categoryID: "333",
    },
  ];

  const categories = [
    {
      _id: "1231",
      title: "Agentes y sistemas inteligentes",
    },
    {
      _id: "1232",
      title: "Agentes y sistemas inteligentes",
    },
    {
      _id: "1233",
      title: "Agentes y sistemas inteligentes",
    },
  ];

  return (
    <>
      <Head>
        <title>WICC 2021 | Lista de publicaciones</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledWrapper>
        <StyledHeader>
          <Image
            src={logo}
            height="14rem"
            style={{ width: "auto" }}
            preview={false}
          />
        </StyledHeader>
        <Space
          size={64}
          direction="vertical"
          style={{ width: "100%", marginBottom: "2rem" }}
        >
          <StyledContent color="purple" fullRounded>
            <Row align="middle" gutter={32} justify="center">
              <Col>
                <Typography.Title
                  level={2}
                  style={{ margin: "0", color: "white", fontSize: "8rem" }}
                >
                  XXIII
                </Typography.Title>
              </Col>
              <Col>
                <Typography.Title
                  level={1}
                  className="ant-typography"
                  style={{ margin: "0", color: "white", fontSize: "3rem" }}
                >
                  <span style={{ textTransform: "uppercase" }}>
                    Workshop de Investigadores{" "}
                  </span>
                  <br />
                  <span style={{ fontWeight: "300" }}>
                    en Ciencias de la Computación
                  </span>
                </Typography.Title>
              </Col>
            </Row>
          </StyledContent>
          <Row gutter={0}>
            <Col lg={12}>
              <Link href="posts">
                <StyledContent link fullRounded>
                  <Row justify="space-between" align="middle">
                    <div>
                      <Typography.Title
                        level={1}
                        style={{
                          margin: "0",
                          color: "white",
                          fontWeight: "300",
                        }}
                      >
                        Publicaciones
                      </Typography.Title>
                      <Typography.Title
                        level={2}
                        style={{
                          margin: "0",
                          color: "white",
                          fontSize: "4rem",
                        }}
                      >
                        78
                      </Typography.Title>
                    </div>
                    <SnippetsOutlined
                      style={{ fontSize: "6rem", color: "white" }}
                    />
                  </Row>
                </StyledContent>
              </Link>
            </Col>
            <Col lg={12}>
              <Link href="categories">
                <StyledContent link color="red" fullRounded>
                  <Row justify="space-between" align="middle">
                    <div>
                      <Typography.Title
                        level={1}
                        style={{
                          margin: "0",
                          color: "white",
                          fontWeight: "300",
                        }}
                      >
                        Categorías
                      </Typography.Title>
                      <Typography.Title
                        level={2}
                        style={{
                          margin: "0",
                          color: "white",
                          fontSize: "4rem",
                        }}
                      >
                        24
                      </Typography.Title>
                    </div>
                    <BarsOutlined
                      style={{ fontSize: "6rem", color: "white" }}
                    />
                  </Row>
                </StyledContent>
              </Link>
            </Col>
          </Row>
          <StyledContent fullRounded>
            <Space size="large" direction="vertical" style={{ width: "100%" }}>
              <Typography.Title
                level={1}
                style={{ color: "white", textAlign: "center" }}
              >
                <span style={{ fontWeight: "300" }}>Publicaciones</span>{" "}
                relevantes
              </Typography.Title>
              <Row gutter={32}>
                {posts.map((post, i) => (
                  <Col lg={8} key={i}>
                    <StyledLinkCard>
                      <Link
                        href={`category/${post.categoryID}/post/${post._id}`}
                      >
                        <Typography.Title
                          type="secondary"
                          level={4}
                          style={{ margin: "0" }}
                        >
                          {post.title}
                        </Typography.Title>
                      </Link>
                    </StyledLinkCard>
                  </Col>
                ))}
              </Row>
            </Space>
          </StyledContent>
          <StyledContent color="red" fullRounded>
            <Space size="large" direction="vertical" style={{ width: "100%" }}>
              <Typography.Title
                level={1}
                style={{ color: "white", textAlign: "center" }}
              >
                <span style={{ fontWeight: "300" }}>Categorías</span> buscadas
              </Typography.Title>
              <Row gutter={32}>
                {categories.map((category, i) => (
                  <Col lg={8} key={i}>
                    <StyledLinkCard>
                      <Link href={`category/${category._id}`}>
                        <Typography.Title
                          type="secondary"
                          level={4}
                          style={{ margin: "0" }}
                        >
                          {category.title}
                        </Typography.Title>
                      </Link>
                    </StyledLinkCard>
                  </Col>
                ))}
              </Row>
            </Space>
          </StyledContent>
          <Footer />
        </Space>
      </StyledWrapper>
    </>
  );
};

export default Home;
