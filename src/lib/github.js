const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const BRANCH = 'main'

if (!GITHUB_REPO || !GITHUB_TOKEN) {
  throw new Error(
    'GITHUB_REPO or GITHUB_TOKEN is not defined in environment variables'
  )
}

export async function commitToGitHub(path, content) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Add ${path}`,
      content: Buffer.from(content).toString('base64'),
      branch: BRANCH
    })
  })

  const text = await res.text()
  if (!res.ok) {
    throw new Error(
      `GitHub API error: ${res.status} ${res.statusText} - ${text}`
    )
  }

  return JSON.parse(text)
}
