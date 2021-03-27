import React, { useEffect } from "react";
import { Form, Input, message, Modal, ModalProps } from "antd";
import { ICategory } from "../../models/category.model";

interface ICategoriesModal extends ModalProps {
  initialData: ICategory;
  loading: boolean;
  onCreate: (values?: unknown) => void;
  onFinishFailed?: (values?: unknown) => void;
  onUpdate: (values?: unknown) => void;
}

const CategoriesModal = ({
  initialData,
  loading,
  visible = false,
  onUpdate,
  onCreate,
  onCancel,
  ...rest
}: ICategoriesModal): JSX.Element => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      await form.validateFields();
      const title = form.getFieldValue("title");
      if (initialData?._id && title !== initialData.title) {
        onUpdate({ _id: initialData?._id, title });
        return;
      }
      onCreate({ title });
    } catch (error) {
      message.error(
        "No se puede crear la categoria, por favor verifique los valores"
      );
    }
  };

  useEffect(() => {
    if (!visible && form?.resetFields) {
      form.resetFields();
    }
  }, [form, visible]);

  useEffect(() => {
    if (initialData?._id && form?.setFieldsValue) {
      form.setFieldsValue({ title: initialData.title });
    }
  }, [form, initialData]);

  return (
    <Modal
      title={!initialData ? "Crear categoría" : "Actualizar categoría"}
      visible={visible}
      okText={!initialData ? "Crear" : "Actualizar"}
      onOk={onSubmit}
      onCancel={(e) => !loading && onCancel(e)}
      okButtonProps={{ loading }}
      cancelButtonProps={{ disabled: loading }}
      {...rest}
    >
      <Form form={form} name="category-form" layout="inline">
        <Form.Item
          label="Titulo"
          name="title"
          rules={[
            {
              required: true,
              message: "El titulo de la categoria es requerido!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoriesModal;
