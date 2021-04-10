import React from "react";
import Head from "next/head";
import { Button, Col, Row, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { SearchOutlined } from "@ant-design/icons";
import useFilter from "../../hooks/useFilter";
import { IPost } from "../../models/post.model";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledTitle,
  StyledLogo,
  StyledSearchInput,
} from "../../components/Styled";
import { IWorkshop } from "../../models/workshop.model";

const logo = "/WICC-logo.png";
const VRIcon = (
  <svg
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      marginRight: "0.5rem",
      fill: "#d82068",
      verticalAlign: "middle",
    }}
  >
    <path d="M10.95 19.65a.75.75 0 00-1.2.6v.686a32.828 32.828 0 01-1.783-.142C3.092 20.292 1.5 19.104 1.5 18.75a.75.75 0 00-1.5 0c0 2.466 5.464 3.294 7.808 3.536.62.068 1.271.118 1.942.154v.81c0 .618.707.968 1.2.6l2-1.5a.753.753 0 000-1.2zM23.25 18a.75.75 0 00-.75.75c0 .443-2.057 1.678-7.148 2.103a.75.75 0 00.124 1.496C18.039 22.133 24 21.354 24 18.75a.75.75 0 00-.75-.75zM20 5.75a1 1 0 01-1-1V3c0-.551-.449-1-1-1H6c-.551 0-1 .449-1 1v1.75a1 1 0 01-2 0V3c0-1.654 1.346-3 3-3h12c1.654 0 3 1.346 3 3v1.75a1 1 0 01-1 1zM13.5 9.125a.625.625 0 00-.625-.625H12.5v1.25h.375c.345 0 .625-.28.625-.625z" />
    <path d="M21.25 4H2.75A2.752 2.752 0 000 6.75v7.5A2.752 2.752 0 002.75 17h6.08a.75.75 0 00.711-.513l.438-1.316a.252.252 0 01.238-.171h3.565a.25.25 0 01.237.17l.438 1.316c.104.307.39.514.713.514h6.08A2.752 2.752 0 0024 14.25v-7.5A2.752 2.752 0 0021.25 4zM9.211 7.987l-1.5 4.5a.75.75 0 01-1.422 0l-1.5-4.5c-.131-.393.081-.818.474-.948s.818.082.949.474L7 9.878l.789-2.366a.75.75 0 011.422.475zm5.569 3.733a.75.75 0 11-1.061 1.061l-1.22-1.22v.689a.75.75 0 01-1.499 0v-4.5a.75.75 0 01.75-.75h1.125a2.119 2.119 0 011.113 3.927zM18.5 10a1.5 1.5 0 11.001-3.001A1.5 1.5 0 0118.5 10z" />
  </svg>
);
const DiscordIcon = (
  <svg
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      marginRight: "0.5rem",
      fill: "#d82068",
      verticalAlign: "middle",
    }}
  >
    <g>
      <path d="M3.58 21.196h14.259l-.681-2.205C17.259 19.079 23 24 23 24V2.475C22.932 1.137 21.78 0 20.352 0L3.585.003C2.158.003 1 1.142 1 2.48v16.24c0 1.411 1.156 2.476 2.58 2.476zM14.128 5.683l-.033.012.012-.012zM6.497 6.952c1.833-1.334 3.532-1.27 3.532-1.27l.137.135c-2.243.535-3.26 1.537-3.26 1.537.104-.022 4.633-2.635 10.121.066 0 0-1.019-.937-3.124-1.537l.186-.183c.291.001 1.831.055 3.479 1.26 0 0 1.844 3.15 1.844 7.02-.061-.074-1.144 1.666-3.931 1.726 0 0-.472-.534-.808-1 1.63-.468 2.24-1.404 2.24-1.404-3.173 1.998-5.954 1.686-9.281.336-.031 0-.045-.014-.061-.03v-.006c-.016-.015-.03-.03-.061-.03h-.06c-.204-.134-.34-.2-.34-.2s.609.936 2.174 1.404a22.262 22.262 0 00-.818 1.002c-2.786-.066-3.802-1.806-3.802-1.806 0-3.876 1.833-7.02 1.833-7.02z" />
      <path d="M14.308 12.771c.711 0 1.29-.6 1.29-1.34 0-.735-.576-1.335-1.29-1.335v.003c-.708 0-1.288.598-1.29 1.338 0 .734.579 1.334 1.29 1.334zM9.69 12.771c.711 0 1.29-.6 1.29-1.34 0-.735-.575-1.335-1.286-1.335l-.004.003c-.711 0-1.29.598-1.29 1.338 0 .734.579 1.334 1.29 1.334z" />
    </g>
  </svg>
);

const routes = [
  {
    path: "/",
    name: "Inicio",
  },
  {
    path: "/workshops",
    name: "Workshops",
  },
];

const Workshop = ({
  initialWorkshop,
}: {
  initialWorkshop: IWorkshop;
}): JSX.Element => {
  const router = useRouter();
  const { workshopID } = router.query;

  const [filteredPosts, filterPost] = useFilter<IPost>(initialWorkshop.posts, [
    "title",
    "article_id",
    "author.name",
  ]);

  const onSearch = (e) => {
    filterPost(e?.target?.value);
  };
  return (
    <>
      <Head>
        <title>WICC 2021 | Lista de publicaciones</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledWrapper>
        <StyledHeader>
          <StyledLogo src={logo} preview={false} />
        </StyledHeader>
        <StyledContent>
          <Breadcrumbs routes={routes} />
          <Space size="large" direction="vertical" style={{ width: "100%" }}>
            <div style={{ marginBottom: "1rem" }}>
              <StyledTitle noMargin>{initialWorkshop.title}</StyledTitle>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <Space
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  {initialWorkshop?.mozhubs_link && (
                    <Button
                      type="link"
                      href={initialWorkshop?.mozhubs_link}
                      target="_blank"
                      style={{ color: "#d82068" }}
                      icon={VRIcon}
                    >
                      Ingresar a la sala virtual
                    </Button>
                  )}
                  {initialWorkshop?.discord_link && (
                    <Button
                      type="link"
                      href={initialWorkshop?.discord_link}
                      target="_blank"
                      style={{ color: "#d82068" }}
                      icon={DiscordIcon}
                    >
                      Acceder al canal de Discord
                    </Button>
                  )}
                </Space>
                <Row justify="center">
                  <Col lg={8}>
                    <StyledSearchInput
                      placeholder="Buscar"
                      onChange={onSearch}
                      suffix={<SearchOutlined />}
                    />
                  </Col>
                </Row>
              </Space>
            </div>
            <Row gutter={[32, 32]}>
              {filteredPosts.map((post, i) => (
                <Col lg={8} key={i} style={{ width: "100%" }}>
                  <StyledLinkCard>
                    <Link href={`${workshopID}/post/${post._id}`}>
                      <Typography.Title
                        type="secondary"
                        level={4}
                        style={{ margin: "0" }}
                      >
                        {post.title}
                      </Typography.Title>
                    </Link>
                  </StyledLinkCard>
                </Col>
              ))}
            </Row>
          </Space>
        </StyledContent>
      </StyledWrapper>
    </>
  );
};

Workshop.getInitialProps = async ({
  res,
  query,
}: NextPageContext): Promise<{ initialWorkshop: IWorkshop } | unknown> => {
  const { workshopID } = query;

  const response = await fetch(
    `${process.env.URL || ""}/api/workshop/${workshopID}`
  );

  if (response.ok) {
    const responseJSON: {
      workshop: IWorkshop;
    } = await response.json();
    const { workshop } = responseJSON;
    return {
      initialWorkshop: workshop,
    };
  }
  if (res) {
    // On the server, we'll use an HTTP response to
    // redirect with the status code of our choice.
    // 307 is for temporary redirects.
    res.writeHead(307, { Location: "/" });
    res.end();
  }
  return {};
};

export default Workshop;
