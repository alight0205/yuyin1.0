// 歌单推荐
const musicList = [4990330086, 3204486765, 2916346957, 2717493873, 4869164805, 3232240174, 4879799554, 3131035907];
/*
id=19723756，云音乐飙升榜

id=3779629，云音乐新歌榜

id=3778678，云音乐热歌榜

id=2250011882，抖音排行榜
 */
const recom__listWrap = document.getElementsByClassName("recom__list")[0];
async function init_recom_list() {
    let str = '';
    for (let i = 0; i < musicList.length; i++) {
        let data = await getMusicListInfo(musicList[i]);
        const imgUrl = data.coverImgUrl;
        const name = data.name;
        let playCount = data.playCount;
        playCount = playCount > 10000 ? (playCount / 10000).toFixed(2) + '万' : playCount;
        const nickname = data.creator.nickname;
        str += `<li class="card">
                <div class="card__img">
                    <img src="${imgUrl}" alt="">
                    <a href="./songList/songList.html?listId=${musicList[i]}">
                        <div class="play"><i class="iconfont icon-iconfontplay"></i></div>
                    </a>
                </div>
                <p class="title">${name}</p>
                <p class="user">by ${nickname}</p>
                <p class="num">播放量：${playCount}</p>
            </li>`
    }
    recom__listWrap.innerHTML = str;
    // loading隐藏
    loading.style.opacity = 0;
    setTimeout(() => {
        loading.style.display = 'none'
    }, 500)
}
init_recom_list();

// 歌单小圆点事件
const dots = document.getElementsByClassName("recom__dots")[0];
dots.addEventListener("mouseenter", function (e) {
    if (e.target.tagName == 'SPAN') {
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.className = '';
            recom__listWrap.style.left = '0';
        } else {
            e.target.previousElementSibling.className = '';
            recom__listWrap.style.left = '-100%';
        }
        e.target.className = 'active'
    }
}, true)

/**
 * 今日精选
 */

const todayMusicId = 19723756; //云音乐新歌榜
const domDoday = document.getElementsByClassName('todayMusic__list')[0];
//  加载音乐
async function inittodayMusic() {
    let todayMusicData = await getMusicListId(todayMusicId);
    let index = 1;
    for (let i = 0; i < todayMusicData.length; i++) {
        let musicData = await getMusicInfo(todayMusicData[i])

        let singer = '';
        for (let j = 0; j < musicData.ar.length; j++) {
            singer += '/' + musicData.ar[j].name
        }
        singer = singer.substr(1)

        let str = `<li>
    <div class="music_info">
    <a href="./player/player.html?musicId=${musicData.id}">
        <img src="${musicData.al.picUrl}" alt="">
        </a>
        <div class="info">
        <a href="./player/player.html?musicId=${musicData.id}">
            <p class="name">${musicData.name}</p>
        </a>
            <p class="singer">${singer}</p>
        </div>
    </div>
    <i class="iconfont icon-heart"></i>
    <a href="./player/player.html?musicId=${musicData.id}">
        <i class="iconfont icon-iconfontplay"></i>
    </a>
</li>`
        domDoday.innerHTML += str;
        if (index > 8) {
            return;
        }
        index++;
    }
}
inittodayMusic();


/**
 * 新碟上架
 * */
const newMusicId = 3779629; //云音乐新歌榜
const domMusicList = document.getElementsByClassName('newMusic__list')[0];
//  加载音乐
async function initMusicList() {
    let newMusicList = await getNewMusicList();
    for (let i = 0; i < 5; i++) {
        let singer = '';
        for (let j = 0; j < newMusicList[i].artists.length; j++) {
            singer += '/' + newMusicList[i].artists[j].name
        }
        singer = singer.substr(1)
        let str = `<li class="card">
        <div class="card__img">
            <img src="${newMusicList[i].album.blurPicUrl}" alt="">
            <a href="./player/player.html?musicId=${newMusicList[i].id}">
                <div class="play"><i class="iconfont icon-iconfontplay"></i></div>
            </a>
        </div>
        <a href="./player/player.html?musicId=${newMusicList[i].id}"><p class="title">${newMusicList[i].name}</p></a>
        <p class="user">by ${singer}</p>
    </li>`
        domMusicList.innerHTML += str;
    }
}
initMusicList();