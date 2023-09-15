const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("suggestionFile"), (req, res) => {
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.status(400).send("No file uploaded.");
  }

  // 在这里处理上传文件的逻辑，例如将文件信息存储到数据库

  res.render("upload-success", { fileName: uploadedFile.filename });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
