const API_URL = 'https://wordpress-cached.futurism.com/graphql'

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
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
  `,
  )

  return data?.posts
}