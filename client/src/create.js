AOS.init();

const title = document.querySelector("#title");
const msg = document.querySelector("#msg");
const submitBtn = document.querySelector("#submitBtn");
const changeBtn = document.querySelector("#changeBtn");
const heading = document.querySelector("#heading");
const popdiv = document.querySelector(".popdiv");
const loader3 = document.querySelector(".loader3");

document.addEventListener("DOMContentLoaded", checkCookie2());

async function checkCookie2() {
  const cookiedata = await axios.get(
    "https://blogify-03ew.onrender.com/home/getcookieData",
    {
      withCredentials: true,
    }
  );
  // console.log(cookiedata.data);
  if (!cookiedata.data) {
    window.location = "index.html";
  } else {
    rawUserdata = await cookiedata.data.CookieData.userdata;
    // console.log(rawUserdata);
    // setImageinfe(rawUserdata.profileno);
    await setnamefromdb();
    urlparam();
    editdataop();
    loading(loader3, (isLoading = false));
  }
}

var editid;
var urldata;
function urlparam() {
  urldata = window.location.search;
  if (urldata) {
    const urlParams = new URLSearchParams(urldata);
    // console.log(urlParams);
    editid = urlParams.get("id");
    checkedit(editid);
    // console.log(editid);
  } else {
  }
}

async function checkedit(editid) {
  const rawdata = await axios.post(
    "https://blogify-03ew.onrender.com/home/checkEdit",
    {
      id: rawUserdata.id,
      blogId: editid,
    }
  );
  const resdata = rawdata.data;
  // console.log(resdata.status);
  if (resdata.status === "err") window.location = "userBlogs.html";
  else loading(loader3, (isLoading = false));
}

async function editdataop() {
  if (urldata) {
    // console.log(urldata);
    submitBtn.classList.add("hidden");
    changeBtn.classList.remove("hidden");
    heading.innerText = "Edit Your Blog";
    const blogdata = await getdataByblogid();
    // console.log(blogdata);
    title.value = blogdata.title;
    msg.value = blogdata.msg;
  } else return;
}

function resetData() {
  title.value = "";
  msg.value = "";
}

// let id = 1;

async function getDataById(id) {
  const rawdata = await axios.post(
    "https://blogify-03ew.onrender.com/home/getDataById",
    {
      id: id,
    }
  );
  const resdata = rawdata.data;
  return resdata.result;
}

async function submitData() {
  const vtitle = title.value;
  const vmsg = msg.value;
  if (!vtitle || !vmsg) {
    return dispop("Enter Something");
  }
  const userdata = await getDataById(rawUserdata.id);
  const rawdata = await axios.post(
    "https://blogify-03ew.onrender.com/home/createBlog",
    {
      id: rawUserdata.id,
      title: vtitle,
      msg: vmsg,
      name: userdata.name,
    }
  );
  // console.log(rawdata);
  resetData();
  dispop(rawdata.data.msg);
}

async function changeData() {
  const vtitle = title.value;
  const vmsg = msg.value;
  if (!vtitle || !vmsg) {
    return dispop("Enter Something");
  }
  // console.log(vtitle, vmsg);
  // const userdata = await getDataById(id);
  const rawdata = await axios.put(
    `https://blogify-03ew.onrender.com/home/changeData/${editid}`,
    {
      title: vtitle,
      msg: vmsg,
    }
  );
  // console.log(rawdata.data);
  resetData();
  dispop(rawdata.data.msg);
}

async function getdataByblogid() {
  const rawdata = await axios.get(
    `https://blogify-03ew.onrender.com/home/getdataByblogid/${editid}`
  );
  const resdata = rawdata.data.result;
  return resdata;
}
