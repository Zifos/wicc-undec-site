import React from "react";
import Head from "next/head";
import { Col, Row, Space, Typography, Button } from "antd";
import NextLink from "next/link";
import { BarsOutlined, SnippetsOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";
import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledFooterLink,
  StyledTitle1,
  StyledTitle2,
  StyledTitle3,
  StyledLogo,
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
          <StyledLogo src={logo} preview={false} />
        </StyledHeader>
        <Space size={64} direction="vertical" style={{ width: "100%" }}>
          <StyledContent color="purple" fullRounded>
            <Row align="middle" gutter={[32, 32]} justify="center">
              <Col>
                <StyledTitle2 level={2}>XXIII</StyledTitle2>
              </Col>
              <Col>
                <StyledTitle1 level={1} className="ant-typography">
                  <span style={{ textTransform: "uppercase" }}>
                    Workshop de Investigadores{" "}
                  </span>
                  <br />
                  <span style={{ fontWeight: 300 }}>
                    en Ciencias de la Computación
                  </span>
                </StyledTitle1>
              </Col>
            </Row>
          </StyledContent>
          <Row gutter={[0, 32]}>
            <Col lg={12}>
              <NextLink href="posts">
                <StyledContent link fullRounded>
                  <Row justify="space-between" align="middle">
                    <div>
                      <Typography.Title
                        level={1}
                        style={{
                          margin: "0",
                          color: "white",
                          fontWeight: 300,
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
              </NextLink>
            </Col>
            <Col lg={12}>
              <NextLink href="categories">
                <StyledContent link color="red" fullRounded>
                  <Row justify="space-between" align="middle">
                    <div>
                      <Typography.Title
                        level={1}
                        style={{
                          margin: "0",
                          color: "white",
                          fontWeight: 300,
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
              </NextLink>
            </Col>
          </Row>
          <StyledContent fullRounded>
            <Space size="large" direction="vertical" style={{ width: "100%" }}>
              <StyledTitle3
                level={3}
                style={{ color: "white", textAlign: "center" }}
              >
                <span style={{ fontWeight: 300 }}>Publicaciones</span>{" "}
                relevantes
              </StyledTitle3>
              <Row gutter={[32, 32]}>
                {posts.map((post, i) => (
                  <Col lg={8} key={i}>
                    <StyledLinkCard>
                      <NextLink
                        href={`category/${post.categoryID}/post/${post._id}`}
                      >
                        <Typography.Title
                          type="secondary"
                          level={4}
                          style={{ margin: "0" }}
                        >
                          {post.title}
                        </Typography.Title>
                      </NextLink>
                    </StyledLinkCard>
                  </Col>
                ))}
              </Row>
            </Space>
          </StyledContent>
          <StyledContent color="red" fullRounded>
            <Space size="large" direction="vertical" style={{ width: "100%" }}>
              <StyledTitle3
                level={3}
                style={{ color: "white", textAlign: "center" }}
              >
                <span style={{ fontWeight: 300 }}>Categorías</span> buscadas
              </StyledTitle3>
              <Row gutter={[32, 32]}>
                {categories.map((category, i) => (
                  <Col lg={8} key={i}>
                    <StyledLinkCard>
                      <NextLink href={`category/${category._id}`}>
                        <Typography.Title
                          type="secondary"
                          level={4}
                          style={{ margin: "0" }}
                        >
                          {category.title}
                        </Typography.Title>
                      </NextLink>
                    </StyledLinkCard>
                  </Col>
                ))}
              </Row>
            </Space>
          </StyledContent>
          <Footer />
          <StyledFooterLink justify="center">
            <Col lg={8}>
              <Button
                type="link"
                href="https://wicc2021.undec.edu.ar/"
                target="_blank"
              >
                WICC2021.undec.edu.ar/
              </Button>
            </Col>
            <Col lg={8}>
              <NextLink href="/admin">
                <Button type="link">Admin</Button>
              </NextLink>
            </Col>
          </StyledFooterLink>
        </Space>
      </StyledWrapper>
    </>
  );
};

export default Home;
