import React from "react"
import Head from "next/head"
import { Button } from "antd"
import PageLayout from "../layouts/PageLayout"

/* 最終的に消すページ */
export default function Home() {
  return (
    <PageLayout>
      <Head>
        <title>{"Hello"}</title>
      </Head>
      <div>
        <Button>{"Click me"}</Button>
      </div>
    </PageLayout>
  )
}
