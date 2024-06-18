const oMyMusic = document.getElementsByClassName("my")[0];
oMyMusic.addEventListener(
  "click",
  function (e) {
    if (cookie) {
    } else {
      e.preventDefault();
      alert("请先登录！");
    }
  },
  false
);

// loading
let loading = document.getElementsByClassName("loading__wrap")[0];

/**
 * 搜索相关处理
 */
const searchBtn = document.getElementsByClassName("searchBtn")[0];
const searchInp = document.getElementsByClassName("searchText")[0];

// 搜索事件
searchBtn.onclick = function () {
  if (!searchInp.value) {
    return;
  }
  // 服务器加/余音
  // window.location.replace(window.location.protocol + `/search/search.html?searchData=${searchInp.value}`)
  // 本地
  window.location.replace(
    window.location.href + `/search/search.html?searchData=${searchInp.value}`
  );
};
// 回车搜索
searchInp.onfocus = function () {
  document.onkeydown = function (e) {
    if (e.code == "Enter") {
      searchBtn.onclick();
    }
  };
};
/**
 * 登录相关处理
 */
const oLogin = document.getElementsByClassName("notLogin")[0];
const oUser = document.getElementsByClassName("userInfo")[0];
if (cookie) {
  oLogin.style.display = "none";
  oUser.style.display = "block";
} else {
  oLogin.style.display = "block";
  oUser.style.display = "none";
}
/**
 * 退出登录
 */
const oSignOut = document.getElementsByClassName("signOut")[0];
oSignOut.onclick = () => {
  signOut();
  sessionStorage.setItem("music_cookie", "");
  oLogin.style.display = "block";
  oUser.style.display = "none";
};
