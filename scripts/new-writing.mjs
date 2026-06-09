import fs from "fs"
import path from "path"
import readline from "readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = (prompt) =>
  new Promise((resolve) => rl.question(prompt, resolve))

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")

const today = new Date().toISOString().split("T")[0]

console.log("\n📒 New Writing\n")

const title = await question("Title: ")
const description = await question("Description (optional): ")
const tags = await question("Tags (comma separated, optional): ")

rl.close()

const slug = slugify(title)
const tagList = tags
  ? tags
      .split(",")
      .map((t) => `"${t.trim()}"`)
      .join(", ")
  : ""

const frontmatter = `---
title: "${title}"
description: "${description}"
date: ${today}
tags: [${tagList}]
draft: true
---

`

const filePath = path.join("src", "content", "writings", `${slug}.mdx`)

if (fs.existsSync(filePath)) {
  console.error(`\n❌ File already exists: ${filePath}\n`)
  process.exit(1)
}

fs.writeFileSync(filePath, frontmatter)
console.log(`\n👍 Created: ${filePath}\n`)
