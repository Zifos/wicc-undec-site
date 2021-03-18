import { Button, Card, Col, Form, Input, Row } from "antd";
import useCategories from "hooks/useCategories";
import Head from "next/head";
import React, { useState } from "react";
import Content from "../../components/Content";
import Header from "../../components/Header";

type CategoriesFormProps = {
  onFinish?: ({ title }: { title: string }) => void;
  onFinishFailed?: () => void;
};
const CategoriesForm: React.FC<CategoriesFormProps> = ({
  onFinish,
  onFinishFailed,
}): JSX.Element => (
  <Form
    name="category-form"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    layout="inline"
  >
    <Form.Item
      label="Titulo"
      name="title"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

const Categories = (): JSX.Element => {
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const { categories, createCategory } = useCategories();
  const openCategoryForm = () => setIsCategoryFormOpen(true);

  const onSubmit = ({ title }: { title: string }) => {
    createCategory(title);
  };

  return (
    <>
      <Head>
        <title>Categorías - WICC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Categorías" />
      <Content>
        <Row justify="center">
          <Col lg={20}>
            <Card
              title="Listado de categorías"
              bordered
              extra={
                <Button
                  type="primary"
                  shape="round"
                  size="middle"
                  onClick={openCategoryForm}
                >
                  Nueva categoria
                </Button>
              }
            >
              {isCategoryFormOpen && (
                <Card>
                  <CategoriesForm onFinish={onSubmit} />
                </Card>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Categories;
