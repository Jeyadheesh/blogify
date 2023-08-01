// let rawUserdata = {
//   id: 1,
//   name: "jeisd",
//   email: "21uad@gmail.com",
//   password: "$2a$10$qQXSpqB7amd.VbqwHxakceJkxCCIX1qH2Pn2uW30C0w97H0CSd4Ja",
//   profileno: 5,
// };

// let rawUserdata;

var likesData;
async function getlikesData() {
  const rawdata = await axios.get("http://127.0.0.1:9000/home/getlikesData");
  likesData = rawdata.data.result;
  // console.log(likesData);
}
getlikesData();

var currpage = window.location.href.split("/").slice(-1);
console.log(currpage);

//SideBar
const menuBtn = document.querySelector("#menuBtn");
const sidebar = document.querySelector("#sidebar");
const sidebarBox = document.querySelector("#sidebarBox");
const sidebarCls = document.querySelector("#sidebarCls");
const currNameBox = document.querySelector(".currNameBox");
const editNameBox = document.querySelector(".editNameBox");
const currName = document.querySelector(".currName");
const nameIn = document.querySelector(".nameIn");

menuBtn.addEventListener("click", () => {
  sidebar.classList.remove("translate-x-[100vw]");
  sidebar.classList.add("bg-[rgba(0,0,0,0.5)]");
  //   sidebarBox.classList.add("translate-x-[15rem]");
});

sidebarCls.addEventListener("click", () => {
  //   sidebarBox.classList.add("translate-x-[15rem]");
  sidebar.classList.remove("bg-[rgba(0,0,0,0.5)]");
  sidebar.classList.add("translate-x-[100vw]");
});

// Change Profile
const profileImg = document.querySelector("#profileImg");
const profileImgSibr = document.querySelector("#profileImgSibr");
const profiles = document.querySelector("#profiles");
const profilesSibr = document.querySelector("#profilesSibr");

profileImg.addEventListener("click", () => {
  profiles.classList.toggle("scale-y-0");
  profiles.classList.toggle("scale-y-100");
});
profileImgSibr.addEventListener("click", () => {
  profilesSibr.classList.toggle("scale-y-0");
  profilesSibr.classList.toggle("scale-y-100");
});

document.addEventListener("click", (e) => {
  // console.log(e.target.classList.contains("prfImgs"));
  if (e.target.classList.contains("prfImgs")) {
    profilesSibr.classList.toggle("scale-y-0");
    profilesSibr.classList.toggle("scale-y-100");
    profiles.classList.toggle("scale-y-0");
    profiles.classList.toggle("scale-y-100");
  }
});

async function logout() {
  try {
    const rawdata = await axios.get("http://127.0.0.1:9000/auth/logout", {
      withCredentials: true,
    });
    // console.log(rawdata.data);
    window.location = "index.html";
  } catch (error) {
    console.log(error);
  }
}

async function getdataFromCookie() {
  // const cookiedata = await getCookie();
  // console.log(cookiedata);
  await axios.get("http://127.0.0.1:9000/home/getcookieData", {
    withCredentials: true,
  });
  // console.log(rawdata.data);
}

async function setImage(imgno) {
  await setImageinfe(imgno);
  const rawdata = await axios.post("http://127.0.0.1:9000/home/changeImg", {
    imgno: imgno,
    id: rawUserdata.id,
  });
  const resdata = rawdata.data;
  // console.log(resdata);
  if (currpage == "home.html") setdataforHome();
}

async function setImageinfe(imgno) {
  const currImg = document.querySelectorAll(".currImg");
  // console.log(imgno);
  currImg.forEach((curr) => {
    curr.src = `./img/profile${imgno}.jpg`;
  });
}

const scurrNameBox = document.querySelector(".scurrNameBox");
const seditNameBox = document.querySelector(".seditNameBox");
const scurrName = document.querySelector(".scurrName");
const snameIn = document.querySelector(".snameIn");

async function setnamefromdb() {
  const rawdata = await axios.post("http://127.0.0.1:9000/home/setnamefromdb", {
    id: rawUserdata.id,
  });
  const resdata = rawdata.data.result;
  // console.log(resdata);
  currName.textContent = resdata.name;
  scurrName.textContent = resdata.name;
  const currImg = document.querySelectorAll(".currImg");
  console.log(resdata.profileno);
  currImg.forEach((curr) => {
    curr.src = `./img/profile${resdata.profileno}.jpg`;
  });
}

async function editName() {
  currNameBox.classList.toggle("hidden");
  editNameBox.classList.toggle("hidden");
  nameIn.value = currName.textContent;
}

async function seditName() {
  scurrNameBox.classList.toggle("hidden");
  seditNameBox.classList.toggle("hidden");
  snameIn.value = scurrName.textContent;
}

async function saveName() {
  currNameBox.classList.toggle("hidden");
  editNameBox.classList.toggle("hidden");
  const newname = nameIn.value;
  if (newname) {
    currName.textContent = newname;
    const rawdata = await axios.post("http://127.0.0.1:9000/home/changeName", {
      name: newname,
      id: rawUserdata.id,
    });
    const resdata = rawdata.data;
    setnamefromdb();
    if (currpage == "home.html") {
      setdataforHome();
    }
    // console.log(resdata);
  }
}

async function ssaveName() {
  scurrNameBox.classList.toggle("hidden");
  seditNameBox.classList.toggle("hidden");
  const newname = snameIn.value;
  if (newname) {
    scurrName.textContent = newname;
    const rawdata = await axios.post("http://127.0.0.1:9000/home/changeName", {
      name: newname,
      id: rawUserdata.id,
    });
    const resdata = rawdata.data;
    setnamefromdb();
    if (currpage == "home.html") setdataforHome();
    // console.log(resdata);
  }
}

// console.log(rawUserdata);

// Popup
async function dispop(msg) {
  // console.log("in");
  const popblk = document.querySelector(".popblk");
  const popdiv = document.querySelector(".popdiv");
  popdiv.textContent = msg;
  popblk.classList.remove("hidden");
  setTimeout(() => {
    popblk.classList.add("hidden");
  }, 1600);
  // popdiv.classList.remove("popup");
  // popdiv.classList.add("popup");
}

// loader

function stopLoading(loader) {
  loader.classList.remove("scale-100");
  loader.classList.add("scale-0");
}

function startLoading(loader) {
  loader.classList.remove("scale-0");
  loader.classList.add("scale-100");
}
