import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import style from "./page-layout.module.css"
import { Button } from "antd"

export default function PageLayout({ children }) {
  return (
    <>
      <Link href="/">
        <div className={style.headerBg} />
      </Link>
      <div className={style.headerText}>
        <span
          style={{ marginBottom: "10px", fontWeight: 400, fontSize: "18px" }}
        >
          {"* Click Header and Back to Home"}
        </span>
        <br />
        {"Various Programming"}
        <br />
        {"Technologies"}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className={style.children}>{children}</div>
      </motion.div>
      <div className={style.footer} />
    </>
  )
}
