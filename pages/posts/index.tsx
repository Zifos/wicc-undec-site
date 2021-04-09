import React, { useState } from "react";
import Head from "next/head";
import { Col, Input, Row, Space, Typography } from "antd";
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

const logo = "/WICC-logo.png";

const routes = [
  {
    path: "/",
    name: "Inicio",
  },
];

const Posts = ({ initialPosts }: { initialPosts: IPost[] }): JSX.Element => {
  const [filteredPosts, filterPost] = useState(initialPosts);

  const onSearch = (e) => {
    if (e) filterPost(initialPosts);
    filterPost(() =>
      initialPosts.filter((val) =>
        val.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .match(e?.target?.value.toLowerCase())
      )
    );
  };

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
            <Input placeholder="input search text" onChange={onSearch} />
            <Row gutter={[32, 32]}>
              {filteredPosts?.map((post, i) => (
                <Col lg={8} key={i} style={{ width: "100%" }}>
                  <StyledLinkCard>
                    <Link href={`workshop/${post.workshop}/post/${post._id}`}>
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
