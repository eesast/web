// 这是未来可能可以实现SSR的生产环境Express服务器，网页开发暂时不需要关心
const express = require("express");
const path = require("path");
// const React = require('react');
// const ReactDOMServer = require('react-dom/server');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
