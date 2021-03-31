import React, { useMemo } from "react";
import Head from "next/head";
import { Col, Row, Image, Space, Typography } from "antd";
import Link from "next/link";
import { NextPageContext } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import { IWorkshop } from "../../models/workshop.model";
import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledTitle,
} from "../../components/Styled";

const logo = "/WICC-logo.png";

const routes = [
  {
    path: "/",
    name: "Inicio",
  },
];

const Workshops = ({
  initialWorkshops,
}: {
  initialWorkshops: IWorkshop[];
}): JSX.Element => {
  const dataGrouped = useMemo<Array<Array<IWorkshop>>>(
    () =>
      initialWorkshops.reduce((acc, workshop, index) => {
        if (index % 3 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(workshop);

        return acc;
      }, []),
    [initialWorkshops]
  );

  return (
    <>
      <Head>
        <title>WICC 2021 | Lista de workshops</title>
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
        <StyledContent color="red">
          <Breadcrumbs routes={routes} />
          <Space size="large" direction="vertical" style={{ width: "100%" }}>
            <StyledTitle>Workshops</StyledTitle>
            {dataGrouped.map((group, i) => (
              <Row gutter={[32, 32]} key={i}>
                {group.map((post, i2) => (
                  <Col lg={8} key={i + i2} style={{ width: "100%" }}>
                    <StyledLinkCard>
                      <Link href={`workshop/${post._id}`}>
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

Workshops.getInitialProps = async ({
  res,
}: NextPageContext): Promise<{ initialWorkshops: IWorkshop[] } | unknown> => {
  const response = await fetch(`${process.env.URL || ""}/api/workshop`);

  if (response.ok) {
    const responseJSON: {
      workshops: IWorkshop[];
    } = await response.json();
    const { workshops } = responseJSON;
    return {
      initialWorkshops: workshops.filter(
        (workshop) => workshop.posts.length > 0
      ),
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

export default Workshops;
