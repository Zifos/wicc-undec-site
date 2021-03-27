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
  const [isPDFButtonDisabled, setPDFButtonDisabled] = useState(false);
  const [isAudioButtonDisabled, setAudioButtonDisabled] = useState(false);

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
      setPDFButtonDisabled(Boolean(initialData.pdf));
      setAudioButtonDisabled(Boolean(initialData.audio));
    }
  }, [form, initialData]);

  useEffect(() => {
    if (!visible) {
      setPdfFile(undefined);
      setAudioFile(undefined);
      setPDFButtonDisabled(false);
      setAudioButtonDisabled(false);
      form.resetFields();
    }
  }, [form, visible]);

  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
  }, [categories, getCategories]);

  return (
    visible && (
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
                message: "Ingresá un título",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Categoría"
            rules={[
              {
                required: true,
                message: "Seleccioná una categoría",
              },
            ]}
          >
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

          <Form.Item name="pdf" label="PDF">
            <Upload
              name="pdf"
              multiple={false}
              onChange={(e) => {
                setPdfFile(e?.fileList[0]?.originFileObj);
                setPDFButtonDisabled(Boolean(e?.fileList[0]?.originFileObj));
              }}
              defaultFileList={
                initialData?.pdf && [
                  {
                    name: initialData?.pdf?.fileName,
                    url: initialData?.pdf.fileLocation,
                  } as UploadFile,
                ]
              }
              accept=".pdf"
            >
              <Button
                disabled={Boolean(pdfFile) || isPDFButtonDisabled}
                icon={<UploadOutlined />}
              >
                Subir PDF
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item name="audio" label="Audio">
            <Upload
              name="audio"
              onChange={(e) => {
                setAudioFile(e?.fileList[0]?.originFileObj);
                setAudioButtonDisabled(Boolean(e?.fileList[0]?.originFileObj));
              }}
              defaultFileList={
                initialData?.audio && [
                  {
                    name: initialData?.audio?.fileName,
                    url: initialData?.audio.fileLocation,
                  } as UploadFile,
                ]
              }
              accept=".mp3"
            >
              <Button
                disabled={Boolean(audioFile) || isAudioButtonDisabled}
                icon={<UploadOutlined />}
              >
                Subir audio
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    )
  );
};

export default PostModal;
