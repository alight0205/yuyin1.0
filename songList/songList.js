const search = window.location.search;
const searchObj = getSearch(search)

// loading
let loading = document.getElementsByClassName("loading__wrap")[0];

const domMusicList = document.getElementsByClassName("music__list")[0];
const bg = document.querySelector(".songList__bg");
const name = document.querySelector(".songList__name");
const number = document.querySelector(".songList__number");
const data = document.querySelector(".songList__data");
const img = document.querySelector(".songList__img");

async function initListInfo() {
    let musicListInfo = await getMusicListInfo(searchObj.listId);
    name.innerText = musicListInfo.name;
    data.innerText = musicListInfo.description;
    number.innerText = musicListInfo.trackCount + '首歌';
    img.src = musicListInfo.coverImgUrl;
    console.log(bg)
    bg.style.backgroundImage = `url(${musicListInfo.coverImgUrl})`
}


async function initMusicList() {
    let musicIdList = await getMusicListId(searchObj.listId);
    let index = 1;
    for (let i = 0; i < musicIdList.length; i++) {
        let musicData = await getMusicInfo(musicIdList[i])
        let singer = '';
        for (let j = 0; j < musicData.ar.length; j++) {
            singer += '/' + musicData.ar[j].name;
        }
        singer = singer.substr(1)

        let str = `<li class="title">
        <span>${index}</span>
        <span class="name">
        <a href="#"><span> ${musicData.name}</span></a>
        <div class="icon">
        <a href="../player/player.html?musicId=${musicIdList[i]}"><i class="iconfont icon-iconfontplay"></i></a>
        </div>
        </span>
        <span class="time">${getDate(musicData.dt)}</span>
        <span><a href="#">${singer}</a></span>
        <span><a href="#">${musicData.al.name}</a></span>
    </li>`
        domMusicList.innerHTML += str;
        if (index == 1) {
            // loading隐藏
            loading.style.opacity = 0;
            setTimeout(() => {
                loading.style.display = 'none'
            }, 500)
        }
        index++;
    }
}
initListInfo();
initMusicList();