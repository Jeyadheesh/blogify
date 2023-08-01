AOS.init();

const blogContainerHome = document.querySelector("#blogContainerHome");
const empImg = document.querySelector(".empImg");
const loaderA = document.querySelector(".loaderA");

document.addEventListener("DOMContentLoaded", checkCookie2());

async function checkCookie2() {
  const cookiedata = await axios.get(
    "http://127.0.0.1:9000/home/getcookieData",
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
    setdataforHome();
  }
}

async function setdataforHome() {
  blogContainerHome.innerHTML = "";
  const rawdata = await axios.get("http://127.0.0.1:9000/home/allUserdata");
  const resdata = await rawdata.data.result;
  // console.log(resdata);

  if (resdata) {
    // console.log(resdata);
    empImg.classList.add("hidden");
    blogContainerHome.classList.add("last:mb-16");
    resdata.forEach((data) => {
      // updateUrLikes(data.blogId);
      createBlogHome(data);
    });
  } else {
    empImg.classList.remove("hidden");
    blogContainerHome.classList.remove("last:mb-16");
  }
  loading(loaderA, (isLoading = false));
}

function createBlogHome(data) {
  // console.log(i);
  const li = document.createElement("li");
  li.innerHTML = ` <div data-aos="fade-left" 
  class="relative flex w-[90vw] flex-col gap-2 rounded-md bg-white p-2 md:w-[40vw] lg:w-[40vw] "
>
  <div
    class="flex gap-1 rounded-sm bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 px-3 text-center text-[1.3rem] font-bold text-pink-600"
  >
    <div class="my-aut pointer-events-none cursor-none py-1">
      <img
        class="h-14 w-14 rounded-full border-2 border-white"
        src="./img/profile${data.profileno}.jpg"
        alt=""
      />
    </div>
    <div class="tit m-auto w-5/6 cursor-pointer text-center">
      ${data.title}
    </div>
  </div>
  <div
    class="msg cursor-pointer text-justify text-sm md:text-sm lg:text-base"
  >
    ${data.msg}
  </div>

  <div
    class="flex justify-between font-semibold md:text-sm lg:text-[1.1rem] "
  >
    <div class="flex gap-2">
      <button data-id=${data.id} class="likeBtn text-gray-500 likeBlink transition-all duration-200" onclick="likePressed(${data.id},${data.blogId},this,this.nextElementSibling)">
        <i
          class=" fa-solid fa-heart transtion-all my-auto scale-100 text-2xl  duration-200 hover:scale-105 active:scale-100"
        ></i>
      </button>
      <p class="my-auto text-lg">${data.likes}</p>
    </div>
    <div class="italic">- ${data.name}</div>
  </div>
  <div
    class="triangle  absolute  bottom-[-3rem] right-[1rem] h-[3.5rem] w-[3.5rem] bg-white md:bottom-[-3.1rem] md:right-[2rem] md:h-[4rem] md:w-[4rem]"
  ></div>
</div>`;
  //   console.log(li);
  notAllowed(li, data);
  blogContainerHome.appendChild(li);
}

async function notAllowed(li, data) {
  const likeBtn = li.querySelector(".likeBtn");
  if (data.id == rawUserdata.id) {
    likeBtn.classList.add("text-orange-300", "pointer-events-none");
    likeBtn.classList.remove("likeBlink");
  } else {
    likesData.forEach((likesdata) => {
      if (
        likesdata.blogId == data.blogId &&
        likesdata.likerId == rawUserdata.id
      ) {
        likeBtn.classList.add("active");
        likeBtn.classList.remove("likeBlink");
      }
    });
  }
}

async function likePressed(id, blogId, currEle, nextEle) {
  // console.log();
  let noLikes = parseInt(nextEle.innerHTML);

  if (currEle.classList.contains("active")) {
    // Remove Like
    currEle.classList.remove("active");
    nextEle.innerText = noLikes - 1;
    const rawdata = await axios.post("http://127.0.0.1:9000/home/removeLike", {
      likerId: rawUserdata.id,
      blogId: blogId,
    });
    const resdata = await rawdata.data;
    // console.log(resdata);
    currEle.classList.add("likeBlink");
    updateUrLikes(blogId);
  } else {
    // Add Like
    currEle.classList.add("active");
    nextEle.innerText = noLikes + 1;
    const rawdata = await axios.post("http://127.0.0.1:9000/home/addLike", {
      userId: id,
      likerId: rawUserdata.id,
      blogId: blogId,
    });
    const resdata = rawdata.data;
    currEle.classList.remove("likeBlink");
    // console.log(resdata);
    updateUrLikes(blogId);
  }
}

async function updateUrLikes(blogId) {
  const rawdata = await axios.post("http://127.0.0.1:9000/home/updateUrLikes", {
    blogId: blogId,
  });
  const resdata = rawdata.data;
  // console.log(resdata);
}
