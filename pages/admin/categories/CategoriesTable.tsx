/* eslint-disable react/display-name */
import React from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { ICategory } from "../../../models/category.model";

interface ICategoriesTableProps {
  data?: ICategory[];
  onUpdate: (_id: string) => void;
  onDelete: (_id: string) => void;
}

const CategoriesTable = ({
  data = [],
  onUpdate,
  onDelete,
}: ICategoriesTableProps): JSX.Element => {
  const updateCategory = (_id) => onUpdate(_id);
  const deleteCategory = (_id) => onDelete(_id);

  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: "min-content",
    },
    {
      title: "Publicaciones",
      key: "posts",
      render: (record): number => record.posts?.length || 0,
      width: "min-content",
    },
    {
      title: "Acciones",
      key: "_id",
      render: (record): JSX.Element => (
        <Space size="middle">
          <Button
            onClick={() => updateCategory(record._id)}
            type="link"
            role="button"
          >
            Actualizar
          </Button>
          <Popconfirm
            title="¿Quieres borrar la categoría?"
            onConfirm={() => deleteCategory(record._id)}
            okText="Eliminar"
            cancelText="No"
          >
            <Button type="link" role="button">
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: "min-content",
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export default CategoriesTable;
