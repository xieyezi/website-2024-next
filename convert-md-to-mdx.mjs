import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import mdx from 'remark-mdx'

// 传入的目录路径
const inputDirectory = '/Users/xieyezi/github/website-2024/src/pages/articles'

// 读取目录中的所有文件
fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error(err)
    return
  }

  // 遍历目录中的每个文件
  files.forEach((file) => {
    // 检查文件扩展名是否为.md
    if (path.extname(file) === '.md') {
      // 构建Markdown文件的完整路径
      const mdFilePath = path.join(inputDirectory, file)
      console.log('mdFilePath:', mdFilePath)

      // 读取Markdown文件内容
      const mdContent = fs.readFileSync(mdFilePath, 'utf-8')

      // 转换Markdown为MDX
      remark()
        .use(mdx)
        .process(mdContent, (err, convertedFile) => {
          if (err) {
            console.error(err)
            return
          }

          // 生成MDX文件路径
          const mdxFilePath = mdFilePath.replace('.md', '.mdx')

          // 将转换后的内容写入MDX文件
          fs.writeFileSync(mdxFilePath, convertedFile.value, 'utf-8')
          fs.rmSync(mdFilePath)

          console.log(`Conversion complete. MDX file saved at: ${mdxFilePath}`)
        })
    }
  })
})
