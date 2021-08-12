const API_URL = 'https://wordpress-cached.futurism.com/graphql';

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title(format: RENDERED)
            excerpt
            slug
            date
            featuredImage {
              sourceUrl
            }
          }
        }
      }
    }
  `
  );

  return data?.posts;
}

export async function getPostBySlug(slug) {
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title(format: RENDERED)
      excerpt
      slug
      date
      featuredImage {
        sourceUrl
      }
      author {
        ...AuthorFields
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: 'SLUG',
      },
    }
  );

  return data;
}
