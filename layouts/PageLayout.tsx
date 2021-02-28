import React from "react"
import style from "./page-layout.module.css"

export default function PageLayout({ children }) {
  return (
    <>
      <div className={style.headerBg} />
      <h1 className={`${style.headerTitle} `}>
        {"Various Programming"}
        <br />
        {"Languages"}
      </h1>
      <div className={style.children}>{children}</div>
      <div className={style.footer} />
    </>
  )
}
