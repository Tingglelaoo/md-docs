module.exports = {
  templatePath: './template',
  docs: [
    {
      dir: "test",
      template: "demo-template.hbs",
      sources: [
        {
          id: "demo1",
          title: "示例脚本1",
          file: "demo1.js",
        },
        {
          id: "demo2",
          title: "示例脚本2",
          file: "demo2.js",
        }
      ]
    }
  ]
}