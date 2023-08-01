async function getCookie() {
  const rawdata = await axios.get(
    "https://blogify-03ew.onrender.com/auth/coo",
    {
      withCredentials: true,
    }
  );
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
