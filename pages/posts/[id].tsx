import React from "react"
import Link from "next/link"
import { Divider, Tag } from "antd"
import style from "./[id].module.css"
import PageLayout from "../../layouts/PageLayout"

export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  }
  const data = await fetch(
    "https://microcms-demo.microcms.io/api/v1/language-posts",
    key
  )
    .then((res) => res.json())
    .catch((err) => console.log(err))
  const paths = data?.contents?.map((content) => `/posts/${content.id}`) ?? []
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  }
  const data = await fetch(
    `https://microcms-demo.microcms.io/api/v1/language-posts/${context.params.id}`,
    key
  )
    .then((res) => res.json())
    .catch((err) => console.log(err))
  return {
    props: {
      post: data,
    },
  }
}

export default function Posts({ post }) {
  return (
    <PageLayout>
      <div className={style.container}>
        <div className={style.sheet}>
          <Link href="/">{"< BACK"}</Link>
          <div className={style.header}>
            <h2>{post.name}</h2>
            <h3>{post.type}</h3>
            {post.tags?.map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </div>
          <img alt={post.name} src={post.icon.url} className={style.img} />
          <Divider />
          <div
            dangerouslySetInnerHTML={{
              __html: `${post.description}`,
            }}
            className={style.body}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: `${post.feelings}`,
            }}
            className={style.body}
          />
        </div>
      </div>
    </PageLayout>
  )
}
