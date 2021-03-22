import React, { useState } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import { Button, Card, Col, message, Row } from "antd";
import useCategories from "../../hooks/useCategories";
import Content from "../../components/Content";
import Header from "../../components/Header";
import CategoriesModal from "./CategoriesModal";
import { ICategory } from "../../models/category.model";
import CategoriesTable from "./CategoriesTable";

const Categories = ({
  initialCategories,
}: {
  initialCategories: ICategory[];
}): JSX.Element => {
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const openCategoryForm = () => setIsCategoryFormOpen(true);
  const {
    categories,
    createCategory,
    updateCategoryTitle,
    deleteCategory,
  } = useCategories(initialCategories);

  const [categoryForUpdate, setCategoryForUpdate] = useState(undefined);

  const onSubmit = ({ title }) => {
    createCategory(title);
    message.success(`Categoría Creada ${title}`);
  };

  const onCancel = () => {
    setIsCategoryFormOpen(false);
  };

  const openUpdateForm = (_id: string) => {
    setCategoryForUpdate(categories.find((cat) => cat._id === _id));
    setIsCategoryFormOpen(true);
    // open the modal
  };

  const onUpdate = (updatedCategory: ICategory) => {
    updateCategoryTitle(updatedCategory);
    setIsCategoryFormOpen(false);
    setCategoryForUpdate(undefined);
    message.success("Categoria actualizada");
  };

  const onDelete = async (_id: string) => {
    const { success } = await deleteCategory(_id);
    if (success) {
      message.success("Categoría eliminada");
    }
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
                data={categories}
                onUpdate={openUpdateForm}
                onDelete={onDelete}
              />
            </Card>
          </Col>
        </Row>
        <CategoriesModal
          initialData={categoryForUpdate}
          visible={isCategoryFormOpen}
          onCreate={onSubmit}
          onUpdate={onUpdate}
          onCancel={onCancel}
        />
      </Content>
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
