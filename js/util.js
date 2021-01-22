// cookie
const cookie = sessionStorage.getItem("user_cookie");

// 返回歌手信息
async function getSingerInfo(id) {
  const url = `http://47.97.6.61:11148/artists?id=${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

// 返回歌单信息
async function getMusicListInfo(id) {
  const url = `http://47.97.6.61:11148/playlist/detail?id=${id}&limit=20`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.playlist;
}
// 返回歌单中歌曲id
async function getMusicListId(id) {
  const url = `http://47.97.6.61:11148/playlist/detail?id=${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  const musicList = Array.from(data.playlist.trackIds).map(function (item) {
    return item.id;
  });
  return musicList;
}
// 返回歌曲信息
async function getMusicInfo(id) {
  const url = `http://47.97.6.61:11148/song/detail?ids=${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.songs[0];
}
// 返回歌曲mp3地址
async function getMusic(id) {
  const url = `http://47.97.6.61:11148/song/url?id=${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.data[0];
}
//返回歌词信息
async function getMusicLyrics(id) {
  const url = `http://47.97.6.61:11148/lyric?id=${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.lrc && data.lrc.lyric;
}
//返回mv信息
async function getMvData(id) {
  const url = `http://47.97.6.61:11148/mv/detail?mvid=${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.data;
}
//返回mvurl
async function getMvUrl(id) {
  const url = `http://47.97.6.61:11148/mv/url?id=${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.data;
}
// 新碟上架
async function getNewMusicList() {
  const url = `http://47.97.6.61:11148/top/song?type=0`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.data;
}
//发送验证码
async function setCaptcha(phone) {
  const url = `http://47.97.6.61:11148/captcha/sent?phone=${phone}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}
// 注册账号
async function setRegistered(phone, pass, captcha, name) {
  const url = `http://47.97.6.61:11148/register/cellphone?phone=${phone}&password=${pass}&captcha=${captcha}&nickname=${name}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}
// 登录状态
async function getLoginStatus() {
  const url = `http://47.97.6.61:11148/login/status`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

// 用户登录
async function getLogin(phone, pass) {
  const url = `http://47.97.6.61:11148/login/cellphone?phone=${phone}&password=${pass}`;
  const resp = await fetch(url);
  const data = await resp.json();
  debugger;
  return data;
}
// 退出登录
async function signOut() {
  const url = `http://47.97.6.61:11148/logout`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}
// 喜欢音乐
async function setLikeMusic(MusicId, callback) {
  axios
    .post(`http://47.97.6.61:11148/like?id=${MusicId}`, {
      cookie: cookie,
    })
    .then(function (res) {
      if (res.data.code === 200) {
        callback(true);
      } else {
        alert(res.data.msg);
      }
    });
}
// 获取喜欢音乐列表
async function getLikeMusicList(callback) {
  const id = sessionStorage.getItem("user_id");
  await axios
    .post(
      `http://47.97.6.61:11148/likelist?uid=${id}&random=${new Date().getTime()}`,
      {
        cookie: cookie,
      }
    )
    .then(function (res) {
      if (res.data.code == 200) {
        callback(res.data.ids);
      } else {
        alert(res.data.msg);
      }
    });
}

/*返回搜索信息
type=1           单曲
type=10         专辑
type=100        歌手
type=1000      歌单
type=1002      用户
type=1004      MV
type=1006      歌词
type=1009      主播电台
*/
async function getSearchData(Keyword, type) {
  const url = `http://47.97.6.61:11148/search?keywords=${Keyword}&type=${type}&limit=20`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

// 计算时间
function getDate(date, type) {
  if (type == "second") {
  } else {
    date = date / 1000;
  }
  let minute = Math.floor(date / 60);
  let second = Math.floor(date % 60);

  minute < 10 ? (minute = "0" + minute) : "";
  second < 10 ? (second = "0" + second) : "";

  return minute + ":" + second;
}
// 获取search参数
function getSearch(str) {
  if (!str) {
    return;
  }
  str = decodeURI(str);
  str = str.slice(1);
  let obj = {};
  let arr = str.split("&");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split("=");
    obj[arr[i][0]] = arr[i][1];
  }
  return obj;
}
