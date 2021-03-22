import { AppProps } from "next/app";
import "antd/dist/antd.less";
import { ThemeProvider } from "styled-components";
import { Layout } from "antd";
import { theme } from "../constants/theme";
import Sider from "../components/Sider";
import Footer from "../components/Footer";
import "isomorphic-unfetch";

const MyApp = ({ Component, pageProps }: AppProps): React.ReactNode => (
  <ThemeProvider theme={{ ...theme }}>
    <Layout style={{ height: "100vh" }}>
      <Sider />
      <Layout>
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </Layout>
  </ThemeProvider>
);

export default MyApp;
