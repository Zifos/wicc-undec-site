import { AppProps } from "next/app";
import "antd/dist/antd.less";
import { ThemeProvider } from "styled-components";
import { Layout } from "antd";
import { theme } from "../constants/theme";
import Sider from "../components/Sider";
import Content from "../components/Content";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyApp = ({ Component, pageProps }: AppProps): React.ReactNode => (
  <ThemeProvider theme={{ ...theme }}>
    <Layout style={{ height: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Content>
          <Component {...pageProps} />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  </ThemeProvider>
);

export default MyApp;
