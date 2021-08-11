import React from 'react'

export default function PostBody({ content }) {
  console.log(content);
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  )
}