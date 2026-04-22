import { GoogleGenerativeAI } from '@google/generative-ai';
import { writeFileSync } from 'fs';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const topic = process.env.TOPIC;
const category = process.env.CATEGORY || 'artificial-intelligence';

const validCategories = [
  'computer-science',
  'space-technology',
  'artificial-intelligence',
  'quantum-physics',
  'nature',
];

const resolvedCategory = validCategories.includes(category) ? category : 'artificial-intelligence';

const prompt = `You are a world-class science and technology writer. Write engaging, accurate, and well-structured blog posts that make complex topics accessible to a curious general audience.

Your writing style:
- Clear, engaging, and informative
- Use analogies and real-world examples to explain complex concepts
- Include fascinating facts and recent developments
- Structure with clear headings (## for sections)
- Include a compelling introduction and thoughtful conclusion
- Aim for 800-1200 words
- Be scientifically accurate but accessible
- NO fluff or filler content — every paragraph should add value

Write a comprehensive blog post about: "${topic}"
Category: ${resolvedCategory}

Return ONLY a valid JSON object (no markdown code fences, no extra text) with this exact structure:
{
  "title": "An engaging, specific title",
  "description": "A compelling 1-2 sentence summary (max 160 chars)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "content": "The full markdown content of the blog post (use ## for headings, regular markdown)"
}`;

const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b'];

async function tryGenerate(modelName) {
  console.log(`Trying model: ${modelName}`);
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
  });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function main() {
  console.log(`Generating post about: "${topic}" in category: ${resolvedCategory}`);

  let responseText;
  for (const modelName of models) {
    try {
      responseText = await tryGenerate(modelName);
      console.log(`Success with model: ${modelName}`);
      break;
    } catch (err) {
      console.warn(`Model ${modelName} failed: ${err.message}`);
      if (modelName === models[models.length - 1]) throw err;
      console.log('Trying next model...');
    }
  }

  const post = JSON.parse(responseText);

  // Generate slug from title
  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

  const date = new Date().toISOString().split('T')[0];

  // Build frontmatter
  const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
description: "${post.description.replace(/"/g, '\\"')}"
date: ${date}
category: ${resolvedCategory}
tags: [${post.tags.map(t => `"${t}"`).join(', ')}]
featured: false
draft: false
---`;

  const fullContent = `${frontmatter}\n\n${post.content}\n`;
  const filePath = `src/content/blog/${slug}.md`;

  writeFileSync(filePath, fullContent, 'utf-8');
  console.log(`Post generated: ${filePath}`);
  console.log(`Title: ${post.title}`);
}

main().catch((err) => {
  console.error('Failed to generate post:', err.message);
  process.exit(1);
});
