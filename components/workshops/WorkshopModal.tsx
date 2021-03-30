import React, { useEffect } from "react";
import { Form, Input, message, Modal, ModalProps } from "antd";
import { IWorkshop } from "../../models/workshop.model";

interface IWorkshopModal extends ModalProps {
  initialData: IWorkshop;
  loading: boolean;
  onCreate: (values?: unknown) => void;
  onFinishFailed?: (values?: unknown) => void;
  onUpdate: (values?: unknown) => void;
}

const WorkshopModal = ({
  initialData,
  loading,
  visible = false,
  onUpdate,
  onCreate,
  onCancel,
  ...rest
}: IWorkshopModal): JSX.Element => {
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
        "No se puede crear el workshop, por favor verifique los valores"
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
      title={!initialData ? "Crear workshop" : "Actualizar workshop"}
      visible={visible}
      okText={!initialData ? "Crear" : "Actualizar"}
      onOk={onSubmit}
      onCancel={(e) => !loading && onCancel(e)}
      okButtonProps={{ loading }}
      cancelButtonProps={{ disabled: loading }}
      {...rest}
    >
      <Form form={form} name="workshop-form" layout="inline">
        <Form.Item
          label="Titulo"
          name="title"
          rules={[
            {
              required: true,
              message: "El titulo del workshop es requerido!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WorkshopModal;
