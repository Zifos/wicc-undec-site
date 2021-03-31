import { Button, Card, Space } from "antd";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";
import {
  LoadingOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const StyledWrapper = styled(Card)`
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2), 0 3rem 20rem -2rem rgba(0, 0, 0, 0.4);
  overflow: hidden;
  border: unset;
  height: ${({ height }) => `${height}px` || "100%"};
  position: relative;

  .ant-card-body {
    padding: 0;
  }
  .react-pdf {
    &__Document {
      overflow: auto;
    }

    &__Document,
    &__message--loading {
      height: 100%;
    }
    &__Page {
      display: flex;
      justify-content: center;
      height: 100%;

      &__canvas {
        @media (max-width: 768px) {
          width: 100% !important;
          height: auto !important;
        }
      }
    }
  }
`;

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledZoomControl = styled(Space)`
  position: sticky;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledZoomButton = styled(Button)`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3),
    0 0.15rem 0.25rem rgba(0, 0, 0, 0.3);
`;
interface IZoomControlProps {
  onZoomOut: () => void;
  onZoomIn: () => void;
}

const ZoomControl = ({
  onZoomOut,
  onZoomIn,
}: IZoomControlProps): JSX.Element => (
  <StyledZoomControl>
    <StyledZoomButton
      type="primary"
      shape="circle"
      icon={<MinusOutlined />}
      size="large"
      onClick={onZoomOut}
    />
    <StyledZoomButton
      type="primary"
      shape="circle"
      icon={<PlusOutlined />}
      size="large"
      onClick={onZoomIn}
    />
  </StyledZoomControl>
);

const PdfViewer = ({
  url,
  pageNumber = 1,
  height = undefined,
}: {
  url: string;
  pageNumber?: number;
  height?: unknown | undefined;
}): JSX.Element => {
  const [scale, setScale] = useState(1);
  const zoomOut = () => {
    setScale((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 0.5;
    });
  };
  const zoomIn = () => {
    setScale((prev) => prev + 0.5);
  };
  return (
    <StyledWrapper height={height}>
      <Document
        file={url}
        loading={
          <StyledLoading>
            <LoadingOutlined style={{ fontSize: 24 }} spin />
          </StyledLoading>
        }
      >
        <Page
          pageNumber={pageNumber}
          height={height}
          renderAnnotationLayer={false}
          scale={scale}
        />
      </Document>
      <ZoomControl onZoomOut={zoomOut} onZoomIn={zoomIn} />
    </StyledWrapper>
  );
};

export default PdfViewer;
