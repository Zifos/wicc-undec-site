import { Layout } from "antd";
import styled from "styled-components";

const ANTDFooter = Layout.Footer;

const StyledFooter = styled(ANTDFooter)`
  padding: ${({ theme }) => theme.spaces[4]}rem
    ${({ theme }) => theme.spaces[4] * 3}rem;
  font-size: ${({ theme }) => theme.spaces[6]}rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.purple[7]};
`;

const Footer = (): JSX.Element => (
  <StyledFooter>
    With lots of coffee by <b>Zifos Team</b>
  </StyledFooter>
);

export default Footer;
