const msgs = document.querySelectorAll(".msg");
const titles = document.querySelectorAll(".tit");
const dots = document.querySelector("#dots");

const filename = window.location.href.split("/").slice(-1);
// console.log(filename);

if (filename == "userBlogs.html") {
  var titleLimit = 50;
} else if (filename == "home.html") {
  var titleLimit = 50;
}

const msgLimit = 300;

msgs.forEach((msg) => {
  const realtext = msg.textContent;
  if (realtext.length > msgLimit) {
    msg.textContent = `${realtext.substring(0, msgLimit - 8)}   .....`;
    // console.log(msg.textContent.length);
    msg.addEventListener("click", () => {
      // console.log(msg.textContent.length); // 308
      if (msg.textContent.length <= msgLimit) {
        msg.textContent = realtext;
      } else {
        msg.textContent = `${realtext.slice(0, msgLimit - 8)}   .....`;
      }
    });
  }
});

titles.forEach((tit) => {
  const realtext = tit.textContent;
  // console.log(realtext.length);
  if (realtext.length > titleLimit) {
    tit.textContent = `${realtext.substring(0, titleLimit - 5)} ....`;

    tit.addEventListener("click", () => {
      // console.log(tit.textContent.length); // 55
      if (tit.textContent.length <= titleLimit) {
        tit.textContent = realtext;
      } else {
        tit.textContent = `${realtext.slice(0, titleLimit - 5)} ....`;
      }
    });
  }
});

// const jei = "   .....";
// console.log(jei.length);
