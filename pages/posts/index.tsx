import React, { useMemo } from "react";
import Head from "next/head";
import { Col, Row, Space, Typography } from "antd";
import Link from "next/link";
import { IPost } from "../../models/post.model";
import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledTitle,
  StyledLogo,
} from "../../components/Styled";
import Breadcrumbs from "../../components/Breadcrumbs";

const logo = "/WICC-logo-2.png";

const routes = [
  {
    path: "/",
    name: "Inicio",
  },
];

const Posts = ({ initialPosts }: { initialPosts: IPost[] }): JSX.Element => {
  const dataGrouped = useMemo<Array<Array<IPost>>>(
    () =>
      initialPosts.reduce((acc, post, index) => {
        if (index % 3 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(post);

        return acc;
      }, []),
    [initialPosts]
  );

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
        <StyledContent>
          <Breadcrumbs routes={routes} />
          <Space size="large" direction="vertical" style={{ width: "100%" }}>
            <StyledTitle>Publicaciones</StyledTitle>
            {dataGrouped.map((group, i) => (
              <Row gutter={[32, 32]} key={i}>
                {group.map((post, i2) => (
                  <Col lg={8} key={i + i2}>
                    <StyledLinkCard>
                      <Link href={`category/${post.category}/post/${post._id}`}>
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

Posts.getInitialProps = async (_req, res) => {
  const response = await fetch(`${process.env.URL || ""}/api/post`);

  if (response.ok) {
    const responseJSON: {
      posts: IPost[];
    } = await response.json();
    const { posts } = responseJSON;
    return {
      initialPosts: posts,
    };
  }
  if (res) {
    // On the server, we'll use an HTTP response to
    // redirect with the status code of our choice.
    // 307 is for temporary redirects.
    res.writeHead(307, { Location: "/" });
    res.end();
  }
  return {};
};

export default Posts;
