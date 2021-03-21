import React from "react";
import { Form, Button, Input, Modal, ModalProps } from "antd";

interface ICategoriesModal extends ModalProps {
  onFinish: (values?: unknown) => void;
  onFinishFailed?: (values?: unknown) => void;
}

const CategoriesModal = ({
  visible = false,
  onFinish,
  onFinishFailed,
  ...rest
}: ICategoriesModal): JSX.Element => (
  <Modal title="Crear categoría" visible={visible} okText="Crear" {...rest}>
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
  </Modal>
);

export default CategoriesModal;
