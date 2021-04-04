import React, { useEffect, useState, createRef } from "react";
import Head from "next/head";
import styled from "styled-components";
import { Card, Col, Row, Space, Typography, Button } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import Content from "../../../../components/Content";
import AudioPlayer from "../../../../components/AudioPlayer";
import { IPost } from "../../../../models/post.model";
import Breadcrumbs from "../../../../components/Breadcrumbs";

const PdfViewer = dynamic(() => import("../../../../components/PDFViewer"), {
  ssr: false,
});

const StyledContent = styled(Content)`
  overflow-y: auto;
  background: hsla(247, 79%, 22%, 1);
`;

const StyledCard = styled(Card)`
  flex: 1;
  .ant-card-body {
    height: 100%;
  }
`;

const StyledLinkCard = styled(Card)`
  .ant-card-body {
    padding: 0.5rem;
  }
`;

const Post = ({ initialPost }: { initialPost: IPost }): JSX.Element => {
  const router = useRouter();
  const { workshopID } = router.query;

  const routes = [
    {
      path: "/",
      name: "Inicio",
    },
    {
      path: "/workshops",
      name: "Workshops",
    },
    {
      path: `/workshop/${workshopID}`,
      name: initialPost.workshop?.title,
    },
  ];

  const [PDFHeight, setPDFHeight] = useState(0);
  const PDFRef = createRef<HTMLDivElement>();

  useEffect(() => {
    let height = PDFRef.current.offsetHeight;
    if (height < 450) height = window.innerHeight * 0.9;
    setPDFHeight(height);
  }, [PDFRef]);

  return (
    <>
      <Head>
        <title>WICC 2021 | Lista de publicaciones</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Image src={logo} width="24rem" preview={false} /> */}
      <StyledContent>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col
            lg={20}
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Breadcrumbs
              routes={routes}
              style={{ padding: "1rem 0", textAlign: "left" }}
            />
            <StyledCard>
              <Row gutter={[64, 32]} style={{ height: "100%" }}>
                <Col lg={12}>
                  <Space
                    size="large"
                    direction="vertical"
                    style={{ width: "100%" }}
                  >
                    <Space
                      size="middle"
                      direction="vertical"
                      style={{ width: "100%" }}
                    >
                      <div>
                        <Typography.Title level={2}>
                          {initialPost.title}
                        </Typography.Title>
                        <Typography.Title
                          level={5}
                          style={{ margin: 0 }}
                          type="secondary"
                        >
                          {initialPost.author.name}
                        </Typography.Title>
                      </div>
                    </Space>
                    <Typography.Text type="secondary">
                      {initialPost?.description}
                    </Typography.Text>
                    <AudioPlayer
                      src={initialPost.audio?.fileLocation}
                      downloadFileName={initialPost.audio?.fileName}
                    />
                    <StyledLinkCard>
                      <Button
                        type="link"
                        href={initialPost.pdf?.fileLocation}
                        target="_blank"
                        icon={<FilePdfOutlined />}
                      >
                        <Space style={{ marginLeft: "0.5rem" }}>
                          Descargar PDF
                          <Typography.Text type="secondary">
                            {` - ${initialPost.pdf?.fileName}`}
                          </Typography.Text>
                        </Space>
                      </Button>
                    </StyledLinkCard>
                  </Space>
                </Col>
                <Col lg={12} style={{ width: "100%" }}>
                  <div ref={PDFRef} style={{ height: "100%" }}>
                    <PdfViewer
                      url={String(initialPost.pdf?.fileLocation)}
                      height={PDFHeight}
                    />
                  </div>
                </Col>
              </Row>
            </StyledCard>
          </Col>
        </Row>
      </StyledContent>
    </>
  );
};

Post.getInitialProps = async ({
  res,
  query,
}: NextPageContext): Promise<{ initialPost: IPost } | unknown> => {
  const { postID } = query;

  const response = await fetch(`${process.env.URL || ""}/api/post/${postID}`);

  if (response.ok) {
    const responseJSON: {
      post: IPost;
    } = await response.json();
    const { post } = responseJSON;
    return {
      initialPost: post,
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

export default Post;
