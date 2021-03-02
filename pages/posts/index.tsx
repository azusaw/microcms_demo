import React from "react"
import Link from "next/link"
import { Card, Select, Col, Row } from "antd"
import style from "./index.module.css"

export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  }
  const data = await fetch(
    "https://microcms-demo.microcms.io/api/v1/language-posts",
    key
  )
    .then((res) => res.json())
    .catch(() => null)
  return {
    props: {
      posts: data.contents,
    },
  }
}

export default function Posts({ columns }) {
  return (
    <div className={style.container}>
      <Link href="/sample/">{"< 前の画面に戻る"}</Link>
      <Row justify="center">
        {columns.map((column, idx) => (
          <Link href={"/sample/columns/" + `${column.id}` + "/"}>
            <Col span={6} className={style.card}>
              <Card
                style={{ width: 280 }}
                cover={
                  <img
                    height="180"
                    alt={column.title}
                    src={column.eyecatch.url}
                  />
                }
              >
                <div className={style.date}>{column.date.slice(0, 10)}</div>
                <div>{column.title}</div>
              </Card>
            </Col>
          </Link>
        ))}
      </Row>
    </div>
  )
}
