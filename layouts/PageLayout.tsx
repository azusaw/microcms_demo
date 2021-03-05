import React from "react"
import { motion } from "framer-motion"
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
      </motion.div>
      <div className={style.footer} />
    </>
  )
}
