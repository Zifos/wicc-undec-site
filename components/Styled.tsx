import { Card, Typography } from "antd";
import styled from "styled-components";
import Content from "./Content";

const StyledWrapper = styled.div`
  background: white;
  min-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  background: white;
  display: flex;
  justify-content: center;
`;

interface IStyledContentProps {
  color?: "red" | "blue" | "purple";
  link?: boolean;
  fullRounded?: boolean;
}

const StyledContent = styled(Content)<IStyledContentProps>`
  height: unset;
  background-position: top;
  background-attachment: fixed;
  overflow: hidden;
  background: hsla(247, 79%, 22%, 1);
  background: linear-gradient(
    180deg,
    hsla(247, 79%, 22%, 1) 0%,
    hsla(298, 84%, 17%, 1) 100%
  );
  background-image: ${({ color }) =>
    `url("/background-${color || "blue"}.svg")`};
  background-size: cover;
  margin: 0 2rem;
  padding: 3rem;
  border-radius: ${({ fullRounded }) =>
    fullRounded ? "2rem" : "2rem 2rem 0 0"};
  box-shadow: 0 1rem 2rem 1rem rgb(11 6 47 / 30%),
    0 0 6rem -6rem rgb(11 6 47 / 50%);
  z-index: 2;
  position: relative;

  ${({ link }) =>
    link &&
    `
    transition: transform 0.3s ease;
    cursor: pointer;

    .ant-card-body > * {
      transition: color 0.3s ease;
    }
    &:hover {
      transform: scale(1.025);

  `}
`;

const StyledLinkCard = styled(Card)`
  transition: transform 0.3s ease;
  cursor: pointer;

  .ant-card-body > * {
    transition: color 0.3s ease;
  }
  &:hover {
    transform: scale(1.025);

    .ant-card-body > * {
      color: ${({ theme }) => theme.default.primaryColor};
    }
  }
`;

const StyledWrappedTitle = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 2rem;

  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 50%;
    transform: scale(3) translate(-16.6%, 2.5%);
    font-weight: 600;
    font-size: 38px;
    line-height: 1.23;
    color: rgba(255, 255, 255, 0.1);
    filter: blur(2px);
  }

  > .ant-typography {
    color: white;
    font-size: 3rem;
    margin: 0;
  }
`;

const StyledTitle = ({ children }) => (
  <StyledWrappedTitle data-text={children}>
    <Typography.Title level={1}>{children}</Typography.Title>
  </StyledWrappedTitle>
);

export {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledTitle,
};
