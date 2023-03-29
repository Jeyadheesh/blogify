async function getCookie() {
  const rawdata = await axios.get("http://127.0.0.1:9000/auth/coo", {
    withCredentials: true,
  });
  cookiedata = rawdata.data.cookiedata.jai;
  // console.log(cookiedata);
  return cookiedata;
}

function loading(loaderA, isLoading) {
  if (isLoading) {
    // loaderA.classList.remove("scale-0");
    // loaderA.classList.add("scale-100");
    loaderA.classList.remove("hidden");
  } else {
    // loaderA.classList.remove("scale-100");
    loaderA.classList.add("hidden");
  }
}

// getCookie();
