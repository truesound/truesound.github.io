import React, { createRef, useEffect } from "react"

const src = "https://utteranc.es/client.js"
const repo = "truesound/truesound.github.io"

type UtteranceAttributesType = {
  src: string
  repo: string
  "issue-term": string
  label: string
  theme: string
  crossorigin: string
  async: string
}

const CommentWidget: React.FC = function () {
  const element = createRef<HTMLDivElement>()

  useEffect(() => {
    if (element.current === null) return

    const utterances: HTMLScriptElement = document.createElement("script")

    const attributes: UtteranceAttributesType = {
      src,
      repo,
      "issue-term": "pathname",
      label: "Comment",
      theme: `github-dark`,
      crossorigin: "anonymous",
      async: "true",
    }

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })

    element.current.appendChild(utterances)
  }, [])

  return <div ref={element} />
}

export default CommentWidget
