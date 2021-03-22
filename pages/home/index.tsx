import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { Card, Col, Row, Image, Space, Typography } from "antd";
import Link from "next/link";
import Content from "../../components/Content";

const logo = "/WICC-logo-2.png";

const StyledContent = styled(Content)`
  /* padding-top: 100vh; */
  min-height: 100vh;
  background-position: center;
  background-attachment: fixed;
  overflow-y: auto;
  background: hsla(247, 79%, 22%, 1);
  background: linear-gradient(
    180deg,
    hsla(247, 79%, 22%, 1) 0%,
    hsla(331, 97%, 24%, 1) 100%
  );
`;

const StyledLinkCard = styled(Card)`
  transition: transform 0.3s ease;
  cursor: pointer;

  .ant-card-body > * {
    transition: color 0.3s ease;
  }
  &:hover {
    transform: scale(1.025);

    .ant-card-body > * {
      color: ${({ theme }) => theme.default.primaryColor};
    }
  }
`;

const Home = (): JSX.Element => {
  const data = [
    {
      _id: "1231",
      title:
        "Invalid hook call. Hooks can only be called inside of the body of a function component.",
    },
    {
      _id: "1232",
      title:
        "Invalid hook call. Hooks can only be called inside of the body of a function component.",
    },
    {
      _id: "1233",
      title:
        "Invalid hook call. Hooks can only be called inside of the body of a function component.",
    },
    {
      _id: "1234",
      title:
        "Invalid hook call. Hooks can only be called inside of the body of a function component.",
    },
  ];
  let dataGrouped = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; data.length > i; i++) {
    if (i % 3 === 0) {
      dataGrouped.push([]);
    }
    dataGrouped[dataGrouped.length - 1].push(data[i]);
  }

  return (
    <>
      <Head>
        <title>WICC 2021 | Lista de publicaciones</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Image src={logo} width="24rem" preview={false} /> */}
      <StyledContent>
        <Space size="large" direction="vertical">
          {dataGrouped.map((group, i) => (
            <Row gutter={24}>
              {group.map((post, i2) => (
                <Col lg={8}>
                  <StyledLinkCard key={i + i2}>
                    <Link href={`post/${post._id}`}>
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
          ))}
        </Space>
      </StyledContent>
    </>
  );
};

export default Home;
