import { useRouter } from "next/router";
import { PageHeader } from "antd";
import styled from "styled-components";

const StyledHeader = styled.div`
  background: ${({ theme }) => theme.colors.neutrals[0]};
  border-bottom: 1px solid ${({ theme }) => theme.default.borderColorBase};
`;

const StyledPageHeader = styled(PageHeader)`
  padding: ${({ theme }) => theme.spaces[8]}rem;
  .ant-page-header-heading-title:first-letter {
    text-transform: uppercase;
  }
`;

const Header = (): JSX.Element => {
  const router = useRouter();
  const routerName = () => {
    if (router.pathname === "/") return "Home";
    return router.pathname.slice(1, router.pathname.length);
  };

  return (
    <StyledHeader>
      <StyledPageHeader title={routerName()} subTitle="This is a subtitle" />
    </StyledHeader>
  );
};

export default Header;
