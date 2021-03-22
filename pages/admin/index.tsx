import Head from "next/head";
import { Image } from "antd";
import styled from "styled-components";

const logo = "/WICC-logo-2.png";
const backoffice = "/backoffice-01.svg";

const StyledContent = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;

const Home = (): JSX.Element => (
  <>
    <Head>
      <title>Inicio - WICC</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <StyledContent>
      <Image src={logo} preview={false} />
      <Image src={backoffice} preview={false} width="80%" />
    </StyledContent>
  </>
);

export default Home;
