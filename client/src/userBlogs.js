const blogContainerub = document.querySelector("#blogContainerub");
const blogCount = document.querySelector("#blogCount");
const empImg = document.querySelector(".empImg");
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
    disdata();
  }
}

async function disdata() {
  blogContainerub.innerHTML = "";
  const rawdata = await axios.post(
    "https://blogify-03ew.onrender.com/home/sinUserdata",
    {
      id: rawUserdata.id,
    }
  );
  const resdata = await rawdata.data.result;
  // console.log(resdata);
  if (resdata) {
    empImg.classList.add("hidden");
    blogContainerub.classList.add("last:mb-16");
    blogCount.innerHTML = resdata.length;
    resdata.forEach((data) => {
      createBlogub(data);
    });
  } else {
    blogCount.innerHTML = 0;
    empImg.classList.remove("hidden");
    blogContainerub.classList.remove("last:mb-16");
  }
  loading(loader3, (isLoading = false));
  ready();
}

function createBlogub(data) {
  const li = document.createElement("li");
  li.innerHTML = ` <div data-aos="fade-left" 
    class="relative flex w-[90vw] flex-col gap-2 rounded-md bg-white p-2 md:w-[40vw] lg:w-[40vw]" data-id=${data.blogId} id="sinBlog"
  >
    <div
      class="flex rounded-sm bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 p-1 text-lg font-bold"
    >
      <div
        class="borde tit mx-auto my-auto cursor-pointer border-black px-2 text-[1.3rem] text-pink-600 md:text-[1.3rem]"
      >
        ${data.title}
      </div>
      <div class="my-auto mr-5 flex gap-5 text-xl md:gap-10">
        <div
          onclick="editBlog(${data.blogId})"
          title="Edit"
          class="cursor-pointer rounded-md bg-green-600 px-1.5 py-0.5 text-white transition-all duration-200 hover:scale-105 active:scale-100"
        >
          <i class="fa-solid fa-pen-to-square"></i>
        </div>
        <div
          onclick="deleteBlog(${data.blogId},'${data.title}')"
          title="Delete"
          class="cursor-pointer rounded-md bg-red-500 px-1.5 py-0.5 text-white transition-all duration-200 hover:scale-105 active:scale-100"
        >
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
    <div
      class="msg cursor-pointer text-justify text-sm md:text-sm lg:text-base"
    >
     ${data.msg}
    </div>
    <div class="flex gap-2">
      <i
        class="fa-solid fa-heart pointer-events-none my-auto text-2xl text-orange-400"
      ></i>
  
      <p class="my-auto text-lg">${data.likes}</p>
    </div>
  
    <div
      class="triangle  absolute  bottom-[-3rem] right-[1rem] h-[3.5rem] w-[3.5rem] bg-white md:bottom-[-3.1rem] md:right-[2rem] md:h-[4rem] md:w-[4rem]"
    ></div>
  </div>`;
  //   console.log(li);
  blogContainerub.appendChild(li);
}

function ready() {
  const blogs = document.querySelectorAll("#sinBlog");
  //   console.log(blogs);
  blogs.forEach((blog) => {
    var id = blog.getAttribute("data-id");
    // console.log(id);
  });
}

function editBlog(id) {
  // console.log(id);
  window.location = `./create.html?id=${id}`;
  // popdiv.classList.add("popup");
}

async function deleteBlog(id, title) {
  // console.log(title);
  var yes = confirm(`Are You Sure to delete  ' ${title} ' ?`);
  if (yes) {
    // console.log(id);
    const rawdata = await axios.delete(
      `https://blogify-03ew.onrender.com/home/deleteBlog/${id}`
    );
    const resdata = rawdata.data;
    // console.log(resdata);
    dispop(resdata.msg);
    disdata();
  }
}

AOS.init();
