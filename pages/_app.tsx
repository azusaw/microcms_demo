import React from "react"
import "../styles/antd.less"
import { AnimateSharedLayout } from "framer-motion"

function App({ Component, pageProps }) {
  return (
    <AnimateSharedLayout>
      <Component {...pageProps} />
    </AnimateSharedLayout>
  )
}

export default App
