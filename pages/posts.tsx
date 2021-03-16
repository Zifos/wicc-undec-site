import { Card, Col, Row } from "antd";
import Head from "next/head";
import Content from "../components/Content";
import Header from "../components/Header";

const Categories = (): JSX.Element => (
  <>
    <Head>
      <title>Publicaciones - WICC</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header title="Publicaciones" />
    <Content>
      <Row justify="center">
        <Col lg={20}>
          <Card title="Listado de publicaciones" />
        </Col>
      </Row>
    </Content>
  </>
);

export default Categories;
