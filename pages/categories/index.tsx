import { Card, Col, Row } from "antd";
import Head from "next/head";
import React from "react";
import Content from "../../components/Content";
import Header from "../../components/Header";

const Categories = (): JSX.Element => (
  <>
    <Head>
      <title>Categorías - WICC</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header title="Categorías" />
    <Content>
      <Row justify="center">
        <Col lg={20}>
          <Card title="Listado de categorías" bordered />
        </Col>
      </Row>
    </Content>
  </>
);

export default Categories;
