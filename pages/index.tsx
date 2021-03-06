import React from "react"
import Link from "next/link"
import Head from "next/head"
import { Card, Col, Row, Tag } from "antd"
import PageLayout from "../layouts/PageLayout"
import style from "./index.module.css"
import { BlockOutlined } from "@ant-design/icons"
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
    let color = "#888"
    switch (type) {
      case "Language":
        color = "#de4600"
        break
      case "Framework":
        color = "#1d8354"
        break
      case "Service":
        color = "#1936be"
        break
    }
    return (
      <span style={{ color: color }}>
        <BlockOutlined />
        {type}
      </span>
    )
  }
  return (
    <PageLayout>
      <Head>
        <title>{"Various Programming Technologies"}</title>
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
            <Link href={"/posts/" + `${post.slug}` + "/"}>
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
