import React from 'react'
import { getPostBySlug } from '../lib/api';
import Head from 'next/head'
import PostBody from '../src/components/post-body'

export default function Post({ post }) {

  return (
    <div>
      <article>
        <Head>
          <title>
            {post?.title} | Futurism
          </title>
          <meta
            property="og:image"
            content={post.featuredImage?.node?.sourceUrl}
          />
        </Head>
        <h1>{post?.title}</h1>
        <PostBody content={post?.content} />
      </article>
    </div>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { post } = await getPostBySlug(params.slug)

  return {
    props: { post },
    revalidate: 60,
  }
}
