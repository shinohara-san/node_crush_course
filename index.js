const http = require("http");
const path = require("path");
const fs = require("fs");
// const { restart } = require("nodemon");

const server = http.createServer((req, res) => {
  // console.log(req.url);
  // if (req.url === "/") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "index.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //     res.writeHead(200, { "Content-Type": "text/html" }); //html用
  //   //headに記載する 200 = Everything is ok, head部分に種類を記載
  //   // res.end("<h1>HomepagE</h1>")
  //     res.end(content);
  //     })
  //   // fs.readFileで読み込む→読み込むファイルのpath→エラーハンドリングor通信
  // }
  // if (req.url === "/api/users") {
  //   const users = [
  //     {name: "yuki", age: 32},
  //     {name: "shino", age: 13}
  //   ];
  //   res.writeHead(200, { "Content-Type": "application/json" }); //json用
  //   res.end(JSON.stringify(users));
  // } 
  let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
  //Extension of file
  let extname = path.extname(filePath);
  //Initial content type
  let contentType = "text/html";
  //check ext and set cntent type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "text/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // if (contentType == "text/html" && extname == "") filePath += ".html";
  
  //Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") { //エラーコードがENOENTだったら404.htmlを表示
        //Page Not Found
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content)
        });
      } else {
        //Some server error 500
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      //Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  })

});

const PORT = process.env.PORT || 5000;
//ポート番号はホストが状況によって決める or 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
