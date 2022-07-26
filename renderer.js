// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const fs = require("fs");
const { isNumberObject } = require("util/types");
console.log(fs);

fs.writeFile("input.txt", "将和咯world啊啊", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("写入完毕");
  }
});

let btn = document.querySelector("button");
let i = 0;
btn.onclick = function () {
  i++;
  fs.writeFile(`input${i}.txt`, `nice${i}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("写入完毕");
    }
  });
};

// 拖动
let holder = document.querySelector("#holder");
let readList = document.querySelector("#readList");
holder.addEventListener("drop", (e) => {
  e.preventDefault(); // 取消默认
  e.stopPropagation(); // 阻止冒泡

  for (const file of e.dataTransfer.files) {
    console.log(file);
    console.log("文件路劲", file.path);
    fs.readFile(file.path, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let newDiv = document.createElement("div");
        newDiv.className = "readFile";
        newDiv.innerHTML = `
                    <h3>${file.name}</h3>
                    <pre>${data}</pre>
                `;

        readList.appendChild(newDiv);
      }
    });
  }
});

holder.addEventListener("dragover", (e) => {
  e.preventDefault(); // 取消默认
  e.stopPropagation(); // 阻止冒泡
});

// webview
const webView = document.querySelector("#wv");

webView.addEventListener("did-start-loading", () => {
  console.log("正在加载....");
});

webView.addEventListener("did-stop-loading", () => {
  console.log("加载完毕....");
  console.log([webView]);
  webView.insertCSS(`#su{background:red!important}`);


  webView.executeJavaScript(`setTimeout(() => {
    let input = document.querySelector("#kw");
    let btn = document.querySelector("#su");
    input.value = "查找书籍";
    btn.click();
  }, 2000);`);
});
