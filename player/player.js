const search = window.location.search;
const searchObj = getSearch(search)
let audio = document.getElementById("music");

// loading
let loading = document.getElementsByClassName("loading__wrap")[0];
// 歌词信息
let oLyrics = document.querySelector(".music__info .text");
let lyrObjs = [];
let lyrObjsPlus = [];
let weitiao = 0; //歌词微调
// 当前时间
let oNowTime = document.querySelector(".player__progBar .now");
// 进度
let oMusicBar = document.querySelector(".player__progBar .bar div");
let oBar = document.querySelector(".player__btnListR .bar div");
//播放按钮
let playBtn = document.querySelector(".play .playMusicBtn");
// 播放/暂停
let isPlay = true;
// 喜欢音乐
let oHeart = document.querySelector(".icon-heart");

async function setMusicInfo(id) {
    let oImg = document.querySelector(".music__card img");
    let oName = document.querySelector(".music__info .name");
    let oPlayName = document.querySelector(".player__progBar .name");
    let oSinger = document.querySelector(".music__info .singer");
    let oPlaySinger = document.querySelector(".player__progBar .singer");
    let oAlbum = document.querySelector(".music__info .album");
    let oTimeMax = document.querySelector(".player__progBar .max");
    // 初始化歌曲MP3
    let musicUrl = await getMusic(id);

    if (musicUrl.url) {
        audio.src = musicUrl.url;
    } else {
        audio.setAttribute("data", "null");
    }
    // 初始化基本信息
    let data = await getMusicInfo(id);
    oImg.src = data.al.picUrl;
    oName.innerText = data.name;
    oPlayName.innerText = data.name;
    oAlbum.innerText = data.al.name;
    oTimeMax.innerText = getDate(data.dt);

    let singer = '';
    for (let j = 0; j < data.ar.length; j++) {
        singer += '/' + data.ar[j].name
    }
    singer = singer.substr(1)


    oSinger.innerText = singer;
    oPlaySinger.innerText = singer;

    // 初始化歌词
    /**
     * 思路：
     */
    let lyricsData = await getMusicLyrics(id);

    lyricsData = lyricsData || "[00:00.00]暂无歌词"
    let lyrics = lyricsData.split('\n'); //每句歌词

    lyrObjs = getLrcObjList(lyrics);

    let str = '';
    str += `<span class="blank"></span>`;
    for (let item of lyrObjs) {
        str += `<p>${item.words}</p>`;
    }
    str += `<span class="blank"></span>`;
    oLyrics.innerHTML = str;

    // loading隐藏
    loading.style.opacity = 0;
    setTimeout(() => {
        loading.style.display = 'none'
    }, 500)

}
/**
 * 传入每句歌词组成的数组，返回歌词对象数组
 * 将存储重复歌词的数组合并
 * 将undefined过滤
 * 通过歌词time进行排序
 */

function getLrcObjList(lyrics) {
    let ObjList = lyrics
        .map(function (item) {
            return getLrcObj(item);
        })
        .concat(lyrObjsPlus)
        .filter(function (item) {
            if (item) {
                return true;
            }
            return false;
        })
        .sort(function (a, b) {
            return a.time - b.time;
        });
    return ObjList;
}

/**
 * 返回单个歌词对象
 * 思路：如果是两次重复的歌词，则额外创建一个对象并加入另一个数组存储起来
 */
function getLrcObj(data) {

    let reg = /^\[[\w\W]*\]/;
    let words = data.replace(reg, '');

    if (!data.match(reg)) {
        return;
    }
    let timeStr = data.match(reg)[0];

    let time,
        minute,
        seconds;
    if (timeStr.length > 10) {
        time = timeStr.slice(11, 19);
        timeParts = time.split(":");
        minute = +timeParts[0];
        seconds = +timeParts[1];
        time = minute * 60 + seconds;
        lyrObjsPlus.push({
            time,
            words
        })

    }
    time = timeStr.slice(1, 9);
    timeParts = time.split(":");
    minute = +timeParts[0];
    seconds = +timeParts[1];
    time = minute * 60 + seconds;

    return {
        time,
        words
    }
}
/**
 * 只要一调用这个函数，就把歌词滚动到最合适的位置
 */
function setPositioin() {
    // 更新时间
    oNowTime.innerHTML = getDate(audio.currentTime, 'second');
    //更新bar
    oMusicBar.style.width = audio.currentTime / audio.duration * 100 + '%';
    //判断是否结束
    if (audio.currentTime >= audio.duration) {
        playBtn.classList.remove("icon-pause-circle");
        playBtn.classList.add("icon-play-circle");
        isPlay = !isPlay;
    }

    // 更新歌词
    let i = getLrcIndex();
    if (i === -1) {
        return; //最开始的情况，没有命中任何一句歌词，不管它
    }
    // 假设当前播放的是第 i 句歌词
    let top = 30 * (i + 1);
    oLyrics.scrollTop = top;
    // 高亮显示当前歌词
    // 先去掉ul元素中带有active样式的元素
    let acLi = oLyrics.querySelector("p.active"); //查找ul元素中，带有类样式active的元素
    if (acLi) {
        acLi.className = "";
    }
    oLyrics.getElementsByTagName('p')[i].className = 'active';
}

/**
 * 根据当前播放的时间，匹配到对应的歌词，得到该歌词的下标
 */
function getLrcIndex() {
    let time = audio.currentTime + weitiao; //当前播放的时间+微调
    for (let i = 0; i < lyrObjs.length; i++) {
        if (time < lyrObjs[i].time) {
            return i - 1;
        }
    }
    return -1;
}

// 添加事件
function setEvent() {
    // 播放音乐
    playBtn.onclick = function () {
        if (audio.getAttribute("data") == 'null') {
            alert('此歌曲为VIP，暂时无法播放')
            return;
        }
        if (isPlay) {
            playBtn.classList.remove("icon-play-circle");
            playBtn.classList.add("icon-pause-circle");
            audio.play();
        } else {
            playBtn.classList.remove("icon-pause-circle");
            playBtn.classList.add("icon-play-circle");
            audio.pause();
        }
        isPlay = !isPlay;
    }

    // 进度条点击事件
    oMusicBar.parentElement.onclick = function (e) {
        e.preventDefault;
        if (e.target.tagName == 'I') {

        } else {
            oMusicBar.style.width = e.offsetX + 'px';
            let time = e.offsetX / oMusicBar.parentElement.offsetWidth * audio.duration;
            audio.currentTime = time;
        }
    };
    oBar.parentElement.onclick = function (e) {
        e.preventDefault;
        if (e.target.tagName == 'I') {

        } else {
            oBar.style.width = e.offsetX + 'px';
            let volume = e.offsetX / oBar.parentElement.offsetWidth;
            audio.volume = volume;
        }
    };

    // 小圆点拖动事件
    oMusicBar.children[0].onmousedown = function () {
        document.onmousemove = function (e) {
            let width = oMusicBar.clientWidth + e.movementX;
            if (width > oMusicBar.parentElement.clientWidth) {
                width = oMusicBar.parentElement.clientWidth;
            } else if (width < 0) {
                width = 0;
            }
            oMusicBar.style.width = width + 'px';
            let time = width / oMusicBar.parentElement.offsetWidth * audio.duration;
            audio.currentTime = time;
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
    oBar.children[0].onmousedown = function () {
        document.onmousemove = function (e) {
            let width = oBar.clientWidth + e.movementX;

            if (width > oBar.parentElement.clientWidth) {
                width = oBar.parentElement.clientWidth;
            } else if (width < 0) {
                width = 0;
            }

            oBar.style.width = width + 'px';
            let volume = width / oBar.parentElement.offsetWidth;
            audio.volume = volume;
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
    // 空格键播放/暂停
    document.onkeydown = function (e) {
        if (e.code == 'Space') {
            playBtn.onclick();
        }
    }
    // 喜欢音乐
    oHeart.onclick = (e) => {
        const cookie = sessionStorage.getItem('user_cookie');
        if (cookie) {
            setLikeMusic(searchObj.musicId, callback = (isHeart) => {
                if (isHeart) {
                    e.target.classList.add('active')
                }
            })
        } else {
            alert('请先登录')
        }
    }
}


audio.ontimeupdate = setPositioin;


// 初始化歌曲信息
setMusicInfo(searchObj.musicId);
// 添加事件
setEvent();