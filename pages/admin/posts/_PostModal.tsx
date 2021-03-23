import { Button, Form, Input, Modal, ModalProps, Upload } from "antd";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { UploadOutlined } from "@ant-design/icons";
import { IPost } from "../../../models/post.model";

interface IPostModalProps extends ModalProps {
  initialData: IPost;
  onCreate: (values?: unknown) => void;
  // onFinishFailed?: (values?: unknown) => void;
  onUpdate: (values?: unknown) => void;
  onCancel: () => void;
}

const PostModal = ({
  initialData,
  visible,
  onCreate,
  onUpdate,
  onCancel,
  ...rest
}: IPostModalProps): JSX.Element => {
  const [form] = Form.useForm();
  const [pdfFile, setPdfFile] = useState(undefined);
  const [audioFile, setAudioFile] = useState(undefined);

  const onOk = async () => {
    await form.validateFields();
    const title = form.getFieldValue("title");
    if (!initialData) {
      onCreate({
        title,
        pdf: pdfFile,
        audio: audioFile,
      });
      return;
    }
    onUpdate({
      title,
      pdf: pdfFile,
      audio: audioFile,
    });
  };

  useEffect(() => {
    if (!visible) {
      setPdfFile(undefined);
      setAudioFile(undefined);
      form.resetFields();
    }
  }, [form, visible]);

  return (
    <Modal
      title={!initialData ? "Crear publicacion" : "Actualizar publicacion"}
      visible={visible}
      okText={!initialData ? "Crear" : "Actualizar"}
      onOk={onOk}
      onCancel={onCancel}
      {...rest}
    >
      <Form form={form} name="post-form" layout="vertical">
        <Form.Item
          label="Titulo"
          name="title"
          rules={[
            {
              required: true,
              message: "El titulo de la publicacion es requerido!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Upload
            name="logo"
            multiple={false}
            onChange={(e) => {
              setPdfFile(e?.fileList[0]?.originFileObj);
            }}
          >
            <Button disabled={!!pdfFile} icon={<UploadOutlined />}>
              Click to upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Upload
            name="logo"
            onChange={(e) => setAudioFile(e?.fileList[0]?.originFileObj)}
          >
            <Button disabled={!!audioFile} icon={<UploadOutlined />}>
              Click to upload
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostModal;
