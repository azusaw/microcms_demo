import React from "react"
import Link from "next/link"
import Head from "next/head"
import { Card, Col, Row, Tag } from "antd"
import PageLayout from "../layouts/PageLayout"
import style from "./index.module.css"
import {
  BlockOutlined,
  CloudOutlined,
  FieldBinaryOutlined,
} from "@ant-design/icons"
const { Meta } = Card

export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  }
  const data = await fetch(
    "https://microcms-demo.microcms.io/api/v1/language-posts",
    key
  )
    .then((res) => res.json())
    .catch((err) => console.log(err))
  return {
    props: {
      posts: data.contents.sort((v1, v2) =>
        v1.createdAt > v2.createdAt ? 1 : -1
      ),
    },
  }
}

export default function Index({ posts }) {
  const typeGenerator = (type: string) => {
    switch (type) {
      case "Language":
        return (
          <span style={{ color: "#de8500" }}>
            <FieldBinaryOutlined />
            {"Language"}
          </span>
        )
        break
      case "Framework":
        return (
          <span style={{ color: "#1d8354" }}>
            <BlockOutlined />
            {"Framework"}
          </span>
        )
        break
      case "Service":
        return (
          <span style={{ color: "#1936be" }}>
            <CloudOutlined />
            {"Service"}
          </span>
        )
    }
  }
  return (
    <PageLayout>
      <Head>
        <title>{"Various Programming Languages"}</title>
      </Head>
      <Row>
        {posts.map((post, idx) => (
          <Col
            key={idx}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            xl={{ span: 6 }}
          >
            <Link href={"/posts/" + `${post.id}` + "/"}>
              <Card
                title={post.name}
                extra={typeGenerator(post.type[0])}
                className={style.card}
                hoverable
              >
                <img
                  src={post.icon.url}
                  width={250}
                  height={(post.icon.height / post.icon.width) * 250}
                />
                <Meta
                  title={post.tags.map((tag) => (
                    <Tag key={tag} style={{ marginTop: "10px" }}>
                      {tag}
                    </Tag>
                  ))}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
