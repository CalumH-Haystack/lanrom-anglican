import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import App from "../components/App/App";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <App />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Anglican Parish of Lancefield with Romsey</title>
