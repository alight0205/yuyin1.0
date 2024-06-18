const search = window.location.search;
const searchObj = getSearch(search)

// loading
let loading = document.getElementsByClassName("loading__wrap")[0];

const domMusicList = document.getElementsByClassName("music__list")[0];
const bg = document.querySelector(".singer__bg");
const name = document.querySelector(".singer__name");
const name2 = document.querySelector(".singer__name2");
const data = document.querySelector(".singer__data");
const img = document.querySelector(".singer__img");

async function initListInfo() {
    console.log(searchObj.singerId)
    let singerInfo = await getSingerInfo(searchObj.singerId);

    //歌手信息
    let singerData = singerInfo.artist;
    name.innerText = singerData.name;
    name2.innerText = singerData.alias[0] || '';
    data.innerText = singerData.briefDesc;
    img.src = singerData.picUrl;
    bg.style.backgroundImage = `url(${singerData.picUrl})`

    // 歌曲信息
    let musicList = singerInfo.hotSongs;
    console.log(musicList)
    let index = 1;
    for (let i = 0; i < musicList.length; i++) {
        let singer = '';
        for (let j = 0; j < musicList[i].ar.length; j++) {
            singer += '/' + musicList[i].ar[j].name
        }
        singer = singer.substr(1)
        let str = `<li class="title">
        <span>${index}</span>
        <span class="name">
        <a href="#"><span> ${musicList[i].name}</span></a>
        <div class="icon">
        <a href="../player/player.html?musicId=${musicList[i].id}"><i class="iconfont icon-iconfontplay"></i></a>
        </div>
        </span>
        <span class="time">${getDate(musicList[i].dt)}</span>
        <span><a href="#">${singer}</a></span>
        <span><a href="#">${musicList[i].al.name}</a></span>
    </li>`
        domMusicList.innerHTML += str;
        if (index == 10) {
            // loading隐藏
            loading.style.opacity = 0;
            setTimeout(() => {
                loading.style.display = 'none'
            }, 500)
        }
        if (index == 20) {
            return;
        }
        index++;
    }
}

initListInfo();