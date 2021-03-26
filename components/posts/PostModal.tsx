import { Button, Form, Input, Modal, ModalProps, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { IFile } from "../../models/post.model";
import useCategories from "../../hooks/useCategories";

interface IPostModalProps extends ModalProps {
  initialData: {
    _id: string;
    title: string;
    description?: string;
    category: string;
    audio: IFile;
    pdf: IFile;
  };
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
  const [selectedCategoryId, setSelectedCategoryId] = useState(undefined);
  const [pdfFile, setPdfFile] = useState(undefined);
  const [audioFile, setAudioFile] = useState(undefined);
  const { categories, getCategories } = useCategories();

  const onOk = async () => {
    await form.validateFields();
    const title = form.getFieldValue("title");
    if (!initialData) {
      onCreate({
        title,
        pdf: pdfFile,
        audio: audioFile,
        category_id: selectedCategoryId,
      });
      return;
    }
    onUpdate({
      title,
      pdf: pdfFile,
      audio: audioFile,
      category_id: selectedCategoryId,
    });
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({ title: initialData.title });
      form.setFieldsValue({ category: initialData.category });
    }
  }, [form, initialData]);

  useEffect(() => {
    if (!visible) {
      setPdfFile(undefined);
      setAudioFile(undefined);
      form.resetFields();
    }
  }, [form, visible]);

  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
  }, [categories, getCategories]);

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
        <Form.Item name="category">
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Selecciona una categoria"
            optionFilterProp="children"
            onChange={(val) => setSelectedCategoryId(val)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {categories?.length &&
              categories.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat.title}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Upload
            name="logo"
            multiple={false}
            onChange={(e) => {
              setPdfFile(e?.fileList[0]?.originFileObj);
            }}
            defaultFileList={[
              {
                name: initialData?.pdf?.fileName,
                url: initialData?.pdf.fileLocation,
              } as UploadFile,
            ]}
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
