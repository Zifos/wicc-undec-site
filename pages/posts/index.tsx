import React from "react";
import Head from "next/head";
import { Col, Row, Image, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledTitle,
} from "../../components/Styled";

const logo = "/WICC-logo-2.png";

const Posts = (): JSX.Element => {
  const router = useRouter();
  const { categoryID } = router.query;

  const data = [
    {
      _id: "1231",
      title: "Solución a grandes problemas aplicando hpc multi-tecnología",
    },
    {
      _id: "1232",
      title: "Solución a grandes problemas aplicando hpc multi-tecnología",
    },
    {
      _id: "1233",
      title: "Solución a grandes problemas aplicando hpc multi-tecnología",
    },
    {
      _id: "1234",
      title: "Solución a grandes problemas aplicando hpc multi-tecnología",
    },
    {
      _id: "1231",
      title: "Solución a grandes problemas aplicando hpc multi-tecnología",
    },
    {
      _id: "1232",
      title: "Solución a grandes problemas aplicando hpc multi-tecnología",
    },
    {
      _id: "1233",
      title: "Solución a grandes problemas aplicando hpc multi-tecnología",
    },
    {
      _id: "1234",
      title: "Solución a grandes problemas aplicando hpc multi-tecnología",
    },
    {
      _id: "1231",
      title: "Solución a grandes problemas aplicando hpc multi-tecnología",
    },
    {
      _id: "1232",
      title: "Solución a grandes problemas aplicando hpc multi-tecnología",
    },
    {
      _id: "1233",
      title: "Solución a grandes problemas aplicando hpc multi-tecnología",
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
      <StyledWrapper>
        <StyledHeader>
          <Image
            src={logo}
            height="14rem"
            style={{ width: "auto" }}
            preview={false}
          />
        </StyledHeader>
        <StyledContent>
          <Space size="large" direction="vertical">
            <StyledTitle>Publicaciones</StyledTitle>
            {dataGrouped.map((group, i) => (
              <Row gutter={32} key={i}>
                {group.map((post, i2) => (
                  <Col lg={8} key={i + i2}>
                    <StyledLinkCard>
                      <Link href={`${categoryID}/post/${post._id}`}>
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
      </StyledWrapper>
    </>
  );
};

export default Posts;
