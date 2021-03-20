import React, { useState } from "react";
import Head from "next/head";
import { Button, Card, Col, message, Row } from "antd";
import useCategories from "../../hooks/useCategories";
import Content from "../../components/Content";
import Header from "../../components/Header";
import CategoriesModal from "./CategoriesModal";
import { ICategory } from "../../models/category.model";
import CategoriesTable from "./CategoriesTable";

const data: ICategory[] = [
  {
    title: "Test",
    _id: "123123",
    posts: [
      {
        _id: "123",
        title: "Test Posts",
      },
      {
        _id: "321",
        title: "Test Posts 2",
      },
    ],
  },
  {
    title: "Test 2",
    _id: "123124",
    posts: [
      {
        _id: "123",
        title: "Test Posts",
      },
    ],
  },
];

const Categories = (): JSX.Element => {
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const openCategoryForm = () => setIsCategoryFormOpen(true);
  const { categories, createCategory } = useCategories();

  const onSubmit = ({ title }) => {
    createCategory(title);
    message.success("Categoría Creada");
  };

  const onCancel = () => {
    setIsCategoryFormOpen(false);
  };

  const onUpdate = (_id: Pick<ICategory, "_id">) => {
    console.log(`TODO: Update category ${_id}`);
    // open the modal
  };

  const onDelete = (_id: Pick<ICategory, "_id">) => {
    message.success("Categoría eliminada");
    console.log(`TODO: Delete category ${_id}`);
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
              <CategoriesTable
                data={data}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            </Card>
          </Col>
        </Row>
        <CategoriesModal
          visible={isCategoryFormOpen}
          onFinish={onSubmit}
          onCancel={onCancel}
        />
      </Content>
    </>
  );
};

export default Categories;
