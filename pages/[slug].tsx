/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { getPostBySlug } from '../lib/api';
import Head from 'next/head'
import PostBody from '../src/components/post-body'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Post({ post }) {

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
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
      <footer className={styles.footer}>
        <Link href="/">
          <a>
            Not Powered by{' '}
            <span className={styles.logo}>
              <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
            &nbsp;
            <span>
              🤣
            </span>
          </a>
        </Link>
      </footer>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { post } = await getPostBySlug(params.slug)

  return {
    props: { post },
  }
}
