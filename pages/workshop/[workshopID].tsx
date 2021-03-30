import React from "react";
import Head from "next/head";
import { Col, Row, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledTitle,
  StyledLogo,
} from "../../components/Styled";
import { IWorkshop } from "../../models/workshop.model";

const logo = "/WICC-logo.png";

const routes = [
  {
    path: "/",
    name: "Inicio",
  },
  {
    path: "/workshops",
    name: "Workshops",
  },
];

const Workshop = ({
  initialWorkshop,
}: {
  initialWorkshop: IWorkshop;
}): JSX.Element => {
  const router = useRouter();
  const { workshopID } = router.query;

  const dataGrouped = initialWorkshop.posts.reduce((acc, post, index) => {
    if (index % 3 === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(post);

    return acc;
  }, []);

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
            <StyledTitle>{initialWorkshop.title}</StyledTitle>
            {dataGrouped.map((group, i) => (
              <Row gutter={[32, 32]} key={i}>
                {group.map((post, i2) => (
                  <Col lg={8} key={i + i2} style={{ width: "100%" }}>
                    <StyledLinkCard>
                      <Link href={`${workshopID}/post/${post._id}`}>
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

Workshop.getInitialProps = async ({
  res,
  query,
}: NextPageContext): Promise<{ initialWorkshop: IWorkshop } | unknown> => {
  const { workshopID } = query;

  const response = await fetch(
    `${process.env.URL || ""}/api/workshop/${workshopID}`
  );

  if (response.ok) {
    const responseJSON: {
      workshop: IWorkshop;
    } = await response.json();
    const { workshop } = responseJSON;
    return {
      initialWorkshop: workshop,
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

export default Workshop;
