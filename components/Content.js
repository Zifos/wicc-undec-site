import styled from "styled-components";
import { Layout } from 'antd';

const ANTDContent = Layout.Content;

const StyledContent = styled(ANTDContent)`
  padding: ${({ theme }) => theme.spaces[8] * 2}rem;
  height: 100%;
`;

const Content = (props) => <StyledContent {...props} />;

export default Content;