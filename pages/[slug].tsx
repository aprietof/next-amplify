/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { getPostBySlug } from '../lib/api';
import PostBody from '../src/components/post-body';
import styles from '../styles/Home.module.css';

export default function Post({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <article>
        <Head>
          <title>{post?.title} | Futurism</title>
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
            <span>🤣</span>
          </a>
        </Link>
      </footer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { post } = await getPostBySlug(params.slug);

  return {
    props: { post },
    revalidate: 60,
  };
};
