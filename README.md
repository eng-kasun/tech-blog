# TechVerse — AI-Powered Science & Tech Blog

An automated blog about Computer Science, Space Technology, AI, Quantum Physics, and Nature. Powered by Astro, Tailwind CSS, Google Gemini (free), and GitHub Actions.

## 🚀 How It Works

1. **Create a GitHub Issue** with a topic title and add the label `generate-post`
2. **GitHub Actions triggers** → calls Google Gemini 2.0 Flash (free) to write a full blog post
3. **Post is committed** to the repo automatically
4. **Site rebuilds** and deploys to GitHub Pages

That's it. From idea to published article — fully automated.

## 📋 Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/tech-blog.git
cd tech-blog
npm install
```

### 2. Configure for Your GitHub

Edit `astro.config.mjs`:
```js
site: 'https://YOUR_USERNAME.github.io',
base: '/tech-blog',  // your repo name
```

### 3. Get a Free Gemini API Key

1. Go to https://aistudio.google.com/apikey
2. Click **Create API Key** (completely free — 15 req/min, 1M tokens/day)
3. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key

### 4. Enable GitHub Pages

Go to repo **Settings** → **Pages** → Set source to **GitHub Actions**

### 5. Push & Deploy

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

The deploy workflow runs automatically on push to `main`.

## ✍️ Creating Posts

### Automated (via GitHub Issues)

1. Go to your repo's **Issues** tab
2. Create a new issue:
   - **Title**: Your topic (e.g., "Latest breakthroughs in quantum error correction")
   - **Body** (optional): Add `category: quantum-physics` (or any valid category)
3. Add the label `generate-post`
4. Wait ~2 minutes → post is generated, committed, and deployed!

**Valid categories**: `computer-science`, `space-technology`, `artificial-intelligence`, `quantum-physics`, `nature`

### Automated (via Manual Workflow Trigger)

1. Go to **Actions** → **Generate AI Blog Post** → **Run workflow**
2. Enter topic and select category
3. Click **Run workflow**

### Manual

Create a `.md` file in `src/content/blog/` with this frontmatter:

```markdown
---
title: "Your Post Title"
description: "A brief description"
date: 2026-04-22
category: artificial-intelligence
tags: ["tag1", "tag2"]
featured: false
draft: false
---

Your markdown content here...
```

## 🛠 Local Development

```bash
npm run dev        # Start dev server at localhost:4321
npm run build      # Build for production
npm run preview    # Preview production build
```

## 📁 Project Structure

```
tech-blog/
├── .github/workflows/
│   ├── deploy.yml           # Auto-deploy to GitHub Pages
│   └── generate-post.yml    # AI content generation pipeline
├── scripts/
│   └── generate-post.mjs    # OpenAI post generation script
├── src/
│   ├── components/          # Astro components
│   ├── content/blog/        # Blog posts (markdown)
│   ├── layouts/             # Page layouts
│   └── pages/               # Routes
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 💰 Cost

- **Hosting**: Free (GitHub Pages)
- **CI/CD**: Free (GitHub Actions — 2000 min/month)
- **AI Generation**: FREE (Gemini 2.0 Flash — 15 req/min, 1M tokens/day)
- **Domain**: Free (username.github.io) or use a custom domain

## 📄 License

MIT
