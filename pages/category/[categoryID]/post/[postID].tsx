import React, { useEffect, useState, createRef } from "react";
import Head from "next/head";
import styled from "styled-components";
import { Card, Col, Row, Image, Space, Typography, Tag, Button } from "antd";
import { FilePdfOutlined, SoundOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import Content from "../../../../components/Content";
import AudioPlayer from "./AudioPlayer";

const PdfViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

const logo = "/WICC-logo-2.png";

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

const Post = (): JSX.Element => {
  const router = useRouter();
  const { categoryID } = router.query;

  const [PDFHeight, setPDFHeight] = useState(0);
  const PDFRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setPDFHeight(PDFRef.current.offsetHeight);
  }, [PDFRef]);

  const data = {
    _id: "605661b209cc58127b1e9add",
    title: "dasdsadsa",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: {
      _id: "605135bb4fa0173e3cb775bb",
      title: "mi primera categoria 7",
    },
    pdf: {
      fileName: "Jose Nicolas Frati CV.pdf",
      fileLocation:
        "https://firebasestorage.googleapis.com/v0/b/tests-frati.appspot.com/o/Jose%20Nicolas%20Frati%20CV.pdf?alt=media",
    },
    audio: {
      fileName: "poster01.mp3",
      fileLocation:
        "https://firebasestorage.googleapis.com/v0/b/tests-frati.appspot.com/o/poster01.mp3?alt=media",
    },
    __v: 0,
  };

  return (
    <>
      <Head>
        <title>WICC 2021 | Lista de publicaciones</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Image src={logo} width="24rem" preview={false} /> */}
      <StyledContent>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col lg={20} style={{ height: "100%", display: "flex" }}>
            <StyledCard>
              <Row gutter={64} style={{ height: "100%" }}>
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
                      <Link href={`/category/${categoryID}`}>
                        <Tag color="purple" style={{ cursor: "pointer" }}>
                          {data.category?.title}
                        </Tag>
                      </Link>
                      <Typography.Title level={2} style={{ margin: 0 }}>
                        {data.title}
                      </Typography.Title>
                    </Space>
                    <Typography.Text type="secondary">
                      {data.description}
                    </Typography.Text>
                    <AudioPlayer
                      src={data.audio?.fileLocation}
                      downloadFileName={data.audio?.fileName}
                    />
                    <StyledLinkCard>
                      <Button
                        type="link"
                        href={data.pdf?.fileLocation}
                        target="_blank"
                      >
                        <FilePdfOutlined />
                        {data.pdf?.fileName}
                      </Button>
                    </StyledLinkCard>
                  </Space>
                </Col>
                <Col lg={12}>
                  <div ref={PDFRef} style={{ height: "100%" }}>
                    <PdfViewer
                      url={String(data.pdf?.fileLocation)}
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

export default Post;
