const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const jsdoc2md = require('jsdoc-to-markdown')

const config = require('../docs-config')
const sourcePath = path.resolve(__dirname, '../src')
const outputPath = path.resolve(__dirname, '../docs')
const tmplPath = path.resolve(__dirname, '../', config.templatePath)


const partial = []
const partialPath = path.resolve(__dirname, './partial')
fs.readdirSync(partialPath).forEach(file => {
  partial.push(`${partialPath}/${file}`)
})

const makeDocsData = function({files, partial}) {
  const datas = files.map(({id, title, file}) => {
    const templateData = jsdoc2md.getTemplateDataSync({ files: file })
    const index =  jsdoc2md.renderSync({ data: templateData, partial: partial,  template: `{{>main-index~}}` })
    const intro =  jsdoc2md.renderSync({ data: templateData, partial: partial,  template: `{{>all-docs~}}` })
    
    return {
      id,
      title,
      index,
      intro,
    }
  })

  return datas
}

// main
const docs = config.docs
for(let i = 0; i < docs.length; i++) {
  const { dir, template, sources } = docs[i]

  const files = sources.map(({id, title, file}) => {
    const f = path.resolve(sourcePath, dir, file)
    
    return {
      id,
      title,
      file: f
    }
  })

  console.log(files)

  const docsData = makeDocsData({
    files,
    partial: partial
  })

  const tmpl = fs.readFileSync(path.resolve(tmplPath, template), 'utf-8')
  const tmplEngine = Handlebars.compile(tmpl)

  const data = tmplEngine({ docs: docsData })
  fs.writeFileSync(path.resolve(outputPath, `${dir}.md`), data)
}
