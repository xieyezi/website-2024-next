import glob from 'fast-glob'
import * as path from 'path'

async function importArticle(articleFilename) {
  let { meta, default: component } = await import(
    `../pages/articles/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllArticles() {
  console.log('process.cwd():', process.cwd())
  let articleFilenames = await glob(['*.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  })
  console.log('articleFilenames:', articleFilenames)

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => new Date(z.date) - new Date(a.date))
}
