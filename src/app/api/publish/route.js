import { NextResponse } from 'next/server'
import { commitToGitHub } from '@/lib/github'

export async function POST(req) {
  try {
    const { drafts } = await req.json()

    if (!drafts || drafts.length === 0) {
      return NextResponse.json({ error: 'No drafts provided' }, { status: 400 })
    }

    const results = []

    for (const draft of drafts) {
      // Sanitize filename
      const filename = `content/${draft.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}.md`
      const content = `# ${draft.title}\n\n${draft.body}`

      try {
        const result = await commitToGitHub(filename, content)

        results.push({ title: draft.title, success: true })
      } catch (err) {
        console.error(`[ERROR] Failed to commit "${filename}":`, err)
        results.push({ title: draft.title, success: false, error: err.message })
      }
    }

    const failed = results.filter((r) => !r.success)
    if (failed.length > 0) {
      return NextResponse.json(
        { error: 'Some drafts failed to publish', details: failed },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, published: results })
  } catch (err) {
    console.error('[ERROR] Unexpected error in publishing drafts:', err)
    return NextResponse.json(
      { error: 'Unexpected server error', details: err.message },
      { status: 500 }
    )
  }
}
