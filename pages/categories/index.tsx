import React, { useMemo } from "react";
import Head from "next/head";
import { Col, Row, Image, Space, Typography } from "antd";
import Link from "next/link";
import { NextPageContext } from "next";
import { ICategory } from "../../models/category.model";
import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledTitle,
} from "../../components/Styled";

const logo = "/WICC-logo-2.png";

const Categories = ({
  initialCategories,
}: {
  initialCategories: ICategory[];
}): JSX.Element => {
  const dataGrouped = useMemo<Array<Array<ICategory>>>(
    () =>
      initialCategories.reduce((acc, category, index) => {
        if (index % 3 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(category);

        return acc;
      }, []),
    [initialCategories]
  );

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
        <StyledContent color="red">
          <Space size="large" direction="vertical" style={{ width: "100%" }}>
            <StyledTitle>Categorías</StyledTitle>
            {dataGrouped.map((group, i) => (
              <Row gutter={32} key={i}>
                {group.map((post, i2) => (
                  <Col lg={8} key={i + i2}>
                    <StyledLinkCard>
                      <Link href={`category/${post._id}`}>
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

Categories.getInitialProps = async ({
  res,
}: NextPageContext): Promise<{ initialCategories: ICategory[] } | unknown> => {
  const response = await fetch(`${process.env.URL || ""}/api/category`);

  if (response.ok) {
    const responseJSON: {
      categories: ICategory[];
    } = await response.json();
    const { categories } = responseJSON;
    return {
      initialCategories: categories,
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

export default Categories;
