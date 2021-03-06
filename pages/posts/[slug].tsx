import React from "react"
import Link from "next/link"
import { Divider, Tag } from "antd"
import { TagOutlined } from "@ant-design/icons"
import PageLayout from "../../layouts/PageLayout"
import style from "./[slug].module.css"

export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  }
  const allPosts = await fetch(
    "https://microcms-demo.microcms.io/api/v1/language-posts",
    key
  )
    .then((res) => res.json())
    .catch((err) => console.log(err))
  const paths =
    allPosts?.contents?.map((content) => `/posts/${content.slug}`) ?? []
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  }
  const allPosts = await fetch(
    "https://microcms-demo.microcms.io/api/v1/language-posts",
    key
  )
    .then((res) => res.json())
    .catch((err) => console.log(err))
  const post = allPosts?.contents?.find(
    (content) => content.slug === context.params.slug
  )
  return {
    props: {
      post: post,
    },
  }
}

export default function Posts({ post }) {
  return (
    <PageLayout>
      <div className={style.container}>
        <div className={style.sheet}>
          <div className={style.header}>
            <a href={post.url} target="blank" rel="noopener noreferrer">
              <h2 className={style.link}>{post.name}</h2>
            </a>
            <h3>
              <TagOutlined style={{ marginRight: "5px" }} />
              {post.type}
              {post.tags?.map((tag, idx) => (
                <Tag key={idx} style={{ marginLeft: "10px" }}>
                  {tag}
                </Tag>
              ))}
            </h3>
          </div>
          <img alt={post.name} src={post.icon?.url} />
          <Divider />
          <div
            dangerouslySetInnerHTML={{
              __html: `${post.description}`,
            }}
            className={style.body}
          />
          <Divider />
          <h3>{"MY EXPERIENCE"}</h3>
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
