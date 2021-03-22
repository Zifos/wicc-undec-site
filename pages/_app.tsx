import { AppProps } from "next/app";
import "antd/dist/antd.less";
import { ThemeProvider } from "styled-components";
import { Layout } from "antd";
import { useRouter } from "next/router";
import { theme } from "../constants/theme";
import Sider from "../components/Sider";
import Footer from "../components/Footer";
import "isomorphic-unfetch";

const MyApp = ({ Component, pageProps }: AppProps): React.ReactNode => {
  const currentRoute = useRouter().pathname;

  return (
    <ThemeProvider theme={{ ...theme }}>
      {currentRoute === "/home" || currentRoute === "/post/[...]" ? (
        <Layout style={{ height: "100vh", overflow: "hidden" }}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Layout style={{ height: "100vh" }}>
          <Sider />
          <Layout>
            <Component {...pageProps} />
            <Footer />
          </Layout>
        </Layout>
      )}
    </ThemeProvider>
  );
};

export default MyApp;
