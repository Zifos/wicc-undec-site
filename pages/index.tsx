import Head from "next/head";
import { Button, Card } from "antd";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dragondrop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Card>
        <Button type="primary">Test</Button>
      </Card>
    </>
  );
}
