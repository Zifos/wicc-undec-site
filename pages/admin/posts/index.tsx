import { Card, Col, Row, Button, message } from "antd";
import Head from "next/head";
import React, { useState } from "react";
import { NextPageContext } from "next";
import { IPost } from "../../../models/post.model";
import Content from "../../../components/Content";
import Header from "../../../components/Header";
import PostsTable from "./_PostsTable";

const Posts = ({ initialPosts }: { initialPosts: IPost[] }): JSX.Element => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Head>
        <title>Publicaciones - WICC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Publicaciones" />
      <Content>
        <Row justify="center">
          <Col lg={20}>
            <Card
              title="Listado de categorías"
              bordered
              extra={
                <Button
                  type="primary"
                  shape="round"
                  size="middle"
                  onClick={() => setShowForm((prevValue) => !prevValue)}
                >
                  Nuevo post
                </Button>
              }
            >
              <PostsTable
                data={initialPosts}
                onUpdate={() => message.success("Updated")}
                onDelete={() => message.success("Deleted")}
              />
            </Card>
          </Col>
        </Row>
        {/* <PostModal
        initialData={categoryForUpdate}
        visible={isCategoryFormOpen}
        onCreate={onSubmit}
        onUpdate={onUpdate}
        onCancel={onCancel}
      /> */}
      </Content>
    </>
  );
};

Posts.getInitialProps = async ({
  res,
}: NextPageContext): Promise<{ initialPosts: IPost[] } | unknown> => {
  const response = await fetch(`${process.env.URL || ""}/api/post`);

  if (response.ok) {
    const responseJSON: {
      posts: IPost[];
    } = await response.json();
    const { posts } = responseJSON;
    return {
      initialPosts: posts,
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

export default Posts;
