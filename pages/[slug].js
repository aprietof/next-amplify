import React from 'react'
import { getPostBySlug } from '../lib/api';

export default function Post({ post }) {
  return (
    <div>
      <pre>
        <code>{JSON.stringify(post, null, 2)}</code>
      </pre>
    </div>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug)

  return {
    props: { post },
  }
}
