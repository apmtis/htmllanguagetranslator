const FileHound = require("filehound");
const fs = require("fs");
var express = require("express");
const jsdom = require("jsdom");
const { convert } = require("html-to-text");
const cors = require("cors");
const editJsonFile = require("edit-json-file");
const config = require("config");
const { JSDOM } = jsdom;
var stringlist = require("stringlist");
const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();
const traverse = require("json-schema-traverse");

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

var app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

async function getFiles() {
  return await FileHound.create()
    .paths("C:\\Code\\APS\\UI\\003_inlandnet\\src\\app\\module\\APS")
    .ext("html")
    .find();
}

app.get("/getHtmlFiles", async (req, res, next) => {
  let files = await getFiles();
  let jsonFiles = {};
  for (let index = 0; index < files.length; index++) {
    const key = files[index].split("\\").pop();
    jsonFiles[key] = files[index];
  }
  res.json(jsonFiles);
});

app.post("/getHtmlFileContent", async (req, res, next) => {
  console.log("filename " + req.body.fileName);
  var htmlName = req.body.fileName;
  const content = fs.readFileSync(htmlName);
  var contentString = content.toString();
  // console.log(contentString);
  const data = convert(contentString).split(/\n/);

  const translocoModuleData = data.filter((con) => {
    return con.includes("{{trsl");
  });
  const bindedProperties = data.filter((con) => {
    if (con.includes("{{") && !con.includes("{{trsl")) {
      return con;
    }
  });

  const NeedToConvert = data.filter((con) => {
    if (!con.includes("{{") && !con.includes("{{trsl")) {
      return con;
    }
  });

  res.json({
    translocoModuleData: translocoModuleData,
    bindedProperties: bindedProperties,
    NeedToConvert: NeedToConvert,
  });
});

app.get("/getHtmlData", async (req, res, next) => {
  let files = await getFiles();
  let htmlFiles = {};
  for (let index = 0; index < files.length; index++) {
    const key = files[index].split("\\").pop();
    htmlFiles[key] = { path: files[index] };
  }

  console.log(htmlFiles);
  var htmlFilePath = Object.keys(htmlFiles);
  var htmlCompleteData = {};

  console.log(htmlFilePath);

  htmlFilePath.forEach((htmlName) => {
    console.log(htmlFiles[htmlName].path);
    const content = fs.readFileSync(htmlFiles[htmlName].path);
    var contentString = content.toString();

    const data = convert(contentString).split(/\n/);
    const translocoModuleData = data.filter((con) => {
      return con.includes("{{trsl");
    });
    const bindedProperties = data.filter((con) => {
      if (con.includes("{{") && !con.includes("{{trsl")) {
        return con;
      }
    });
    const NeedToConvert = data.filter((con) => {
      if (!con.includes("{{") && !con.includes("{{trsl")) {
        return con;
      }
    });
    htmlFiles[htmlName].translocoModuleData = translocoModuleData;
    htmlFiles[htmlName].bindedProperties = bindedProperties;
    htmlFiles[htmlName].NeedToConvert = NeedToConvert;
  });
  res.json(htmlFiles);
});

app.post("/updateJsonFile", async (req, res, next) => {
  try {
    let jsonContent = req.body.jsonContent;
    console.log(jsonContent);
    fs.writeFileSync(
      "C:\\Users\\ABS069\\Code\\HtmlMultiLanguageTranslator\\aps\\en.json",
      jsonContent
    );
  } catch (error) {
    console.log("error thrown :" + error);
  }
});

app.post("/updateJsonContent", async (req, res, next) => {
  try {
    let moduleName = req.body.moduleName;
    let htmlName = req.body.htmlName;
    let jsonKey = req.body.jsonKey;
    let englishContent = req.body.englishContent;
    let language = req.body.language;

    let jsonKeyPath = config.get("modulePaths." + language + "." + moduleName);

    console.log(jsonKeyPath);
    let file = editJsonFile(jsonKeyPath, { autosave: true });
    console.log(jsonKey);
    console.log(englishContent);
    file.set(jsonKey, englishContent);
    console.log("file set");
    file.save();
    // var data = file.save().toObject();
    res.json({ status: "updated successfully" });
  } catch (ex) {
    console.log(ex);
  }
});

app.post("/updateHtmlContent", async (req, res, next) => {
  try {
    let htmlFilePath = req.body.htmlFilePath;
    let htmlPrevious = req.body.jsonPrevious;
    let jsonNext = req.body.jsonNext;
    console.log(htmlFilePath);

    fs.readFile(htmlFilePath, function (err, data) {
      if (err) {
        return console.log(err);
      }
      var result = data.toString().replace(htmlPrevious, jsonNext);
      // console.log(result);
      console.log("translated");

      fs.writeFile(htmlFilePath, result, "utf8", function (err) {
        if (err) return console.log(err);
      });
      console.log("replaced");
      res.json({ status: "updated successfully" });
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/generateJSON", async (req, res, next) => {
  try {
    const projectId = "cloudtranslation-344104";
    const translate = new Translate({
      projectId: projectId,
      credentials: CREDENTIALS,
    });
    let content = req.body.jsonData;
    let newContent = content;
    let languageCode = req.body.languageCode;

    traverse(content, (schema, jsonPtr, rootSchema, keyIndex) => {
      console.log("schema ");
      console.log(schema);
      console.log("JsonPTR ");
      console.log(keyIndex);
      // console.log(rootSchema);
    });

    for (const key in content) {
      if (Object.hasOwnProperty.call(content, key)) {
        //console.log(content[key]);
        // const [translation] = await translate.translate(
        //   content[key],
        //   languageCode
        // );
        // newContent[key] = translation;
      }
    }
    res.json(newContent);
  } catch (ex) {
    console.log(ex);
  }
});

// app.get("/getTypescriptContent", async (req, res, next) => {
//   try {
//     let typeScriptPath =
//       "C:\\Code\\APS\\UI\\003_inlandnet\\src\\app\\module\\APS\\aps.coreService.ts";

//     fs.readFile(typeScriptPath, function (err, data) {
//       if (err) {
//         return console.log(err);
//       }
//       console.log("hitting");
//       console.log(stringlist.parse(data));
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });
