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
      const discord_link = form.getFieldValue("discord_url");
      const mozhubs_link = form.getFieldValue("mozhubs_url");
      if (initialData?._id && title !== initialData.title) {
        onUpdate({ _id: initialData?._id, title, discord_link, mozhubs_link });
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
      form.setFieldsValue({ discord_url: initialData.discord_link });
      form.setFieldsValue({ mozhubs_url: initialData.mozhubs_link });
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
        <Form.Item
          label="Discord url"
          name="discord_link"
          rules={[
            {
              // eslint-disable-next-line no-useless-escape
              pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
              message: "Ingresá una url valida",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mozilla hubs URL"
          name="mozhubs_url"
          rules={[
            {
              // eslint-disable-next-line no-useless-escape
              pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
              message: "Ingresá una url valida",
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
