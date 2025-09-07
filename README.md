#  GitHub Markdown Publisher

A minimalist **Next.js (App Router)** app that lets you **create**, **save**, and **publish** Markdown drafts directly to a GitHub repository. Drafts are stored locally (via `localStorage`) until you publish them with a click.

---

##  Live Demo & Source

- **Live Site:** [https://github-markdown-publisher.vercel.app/](https://github-markdown-publisher.vercel.app/)  
- **GitHub Repository:** [jumpetron/github-markdown-publisher](https://github.com/jumpetron/github-markdown-publisher)

---

##  Features

-  Fetches and sanitizes Markdown from GitHub and renders it as HTML.
-  Create and save drafts (title + content).
-  List, edit, and delete drafts easily.
-  Publish all drafts at once—committed as `.md` files directly into your repo.
-  Uses `react-hot-toast` for user-friendly notifications.

---

##  Tech Stack

- **Next.js (App Router)** – framework  
- **Tailwind CSS** – styling  
- **markdown-it** – Markdown → HTML conversion  
- **DOMPurify** – sanitization to prevent XSS  
- **react-hot-toast** – toast notifications  
- GitHub REST API – for publishing Markdown files

---

##  Getting Started

### Installation

```bash
git clone https://github.com/jumpetron/github-markdown-publisher.git
cd github-markdown-publisher
npm install
```

### Environment Variables

Create a .env file at the project root and add:
```bash
GITHUB_REPO=your-username/your-repo
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Important: Ensure your GitHub token has permission to write to the repository (e.g., contents:write or full repo scope).
Never commit your token—.env is gitignored by default.

### Running Locally
```bash
npm run dev
```

Then open your browser at http://localhost:3000.

### Usage Flow

View existing content: The top of the page displays Markdown fetched from GitHub (e.g., hello.md).

Create drafts: Use the "Save Draft" form to enter a title and body.

Manage drafts: Edit or delete saved drafts in the list.

Publish drafts: Click "Publish All" to commit each draft as a .md file to your GitHub repo.

### Project Structure
```bash
├── app/
│   ├── page.js                # Main UI (Markdown display, Editor, DraftList, Publish)
│   └── api/publish/route.js   # Server API for committing drafts to GitHub
├── components/
│   ├── Editor.js              # Draft creation form
│   └── DraftList.js           # Draft listing with edit/delete
├── lib/
│   └── github.js              # GitHub commit helper
├── styles/                    # (if using custom styles)
├── .env                       # Environment variables (not committed)
└── README.md
```
### Future Improvements

- Add per-draft publish controls (not just bulk).
- Real-time Markdown preview in the editor.
- Better handling of filename collisions (e.g. appending timestamps).
- Optional authentication (e.g., GitHub OAuth) for user-specific publishing.
- Add accessibility enhancements (ARIA attributes, focus indicators, etc.).

### Final Notes

This tool is perfect for quick staging of markdown posts, notes, or content drafts with seamless GitHub integration—no backend hassle required.