import { Card } from "antd";
import React from "react";
import { Document, Page } from "react-pdf";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

const StyledWrapper = styled(Card)`
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2), 0 3rem 20rem -2rem rgba(0, 0, 0, 0.4);
  overflow: hidden;
  border: unset;
  height: 100%;

  .ant-card-body {
    padding: 0;
  }
  .react-pdf {
    &__Document,
    &__message--loading {
      height: 100%;
    }
    &__Page {
      display: flex;
      justify-content: center;
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

const PdfViewer = ({
  url,
  pageNumber = 1,
  height = undefined,
}: {
  url: string;
  pageNumber?: number;
  height?: unknown | undefined;
}): JSX.Element => (
  <StyledWrapper>
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
      />
    </Document>
  </StyledWrapper>
);

export default PdfViewer;
