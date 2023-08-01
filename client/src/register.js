// checkCookie1();

// Register
const rfullname = document.querySelector("#rfullname");
const remail = document.querySelector("#remail");
const lemail = document.querySelector("#lemail");
const rpassword = document.querySelector("#rpassword");
const lpassword = document.querySelector("#lpassword");
const rconpassword = document.querySelector("#rconpassword");
const raltbox = document.querySelector("#raltbox");
const laltbox = document.querySelector("#laltbox");
const loaderA = document.querySelector(".loaderA");
const subloader = document.querySelector(".subloader");

document.addEventListener("DOMContentLoaded", checkCookie1());
async function checkCookie1() {
  const cookiedata = await getCookie();
  // console.log(cookiedata);
  if (cookiedata) {
    window.location = "home.html";
    console.log("Cookie Found");
  } else {
    // window.location = "login.html";
    loading(loaderA, (isLoading = false));
    console.log("Cookie Not Found");
  }
}

var rinfo = {
  status: "",
  msg: "",
  class: "",
};

async function registerData() {
  loading(subloader, (isLoading = true));
  const [vfname, vemail, vpassword, vconpassword] = [
    rfullname.value,
    remail.value,
    rpassword.value,
    rconpassword.value,
  ];
  //   console.log(vfname, vemail, vpassword, vconpassword);
  if (!vfname || !vemail || !vpassword || !vconpassword) {
    rinfo.msg = "Enter Valid Information !!!";
    rinfo.class = "err";
    console.log(rinfo);
  } else if (vpassword != vconpassword) {
    rinfo.msg = "Password didn't Match !!!";
    rinfo.class = "err";
    console.log(rinfo);
  } else {
    const rawdata = await axios.post(
      "https://blogify-03ew.onrender.com/auth/register",
      {
        fullname: vfname,
        email: vemail,
        password: vpassword,
      }
    );
    const resdata = rawdata.data;
    rinfo.msg = resdata.msg;
    rinfo.class = resdata.class;
    // console.log(rinfo);
  }
  loading(subloader, (isLoading = false));

  raltbox.textContent = `${rinfo.msg}`;
  raltbox.classList = `${rinfo.class}`;

  setTimeout(() => {
    // raltbox.textContent = `${rinfo.msg}`;
    raltbox.classList = "hidden";
  }, 3000);
  // console.log(altbox);
}

var linfo = {
  status: "",
  msg: "",
  class: "",
};

async function loginData() {
  loading(subloader, (isLoading = true));
  try {
    const [vlemail, vlpassword] = [lemail.value, lpassword.value];
    // console.log(vlemail, vlpassword);

    if (!vlemail || !vlpassword) {
      linfo.msg = "Enter Valid Information !!!";
      linfo.class = "err";
    } else {
      const rawdata = await axios.post(
        "https://blogify-03ew.onrender.com/auth/login",
        {
          email: vlemail,
          password: vlpassword,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(rawdata.data);
      const resdata = rawdata.data;
      linfo.msg = `${resdata.msg}`;
      linfo.class = `${resdata.class}`;

      if (resdata.status == "noerr") {
        window.location = "home.html";
      }
    }
    loading(subloader, (isLoading = false));

    laltbox.textContent = `${linfo.msg}`;
    laltbox.classList = `${linfo.class}`;

    setTimeout(() => {
      laltbox.classList = "hidden";
    }, 3000);
  } catch (error) {
    console.log(error);
  }
}
