const newMusicId = 3779629; //云音乐新歌榜
const domMusicList = document.getElementsByClassName('list__body')[0];
//  加载音乐
async function initMusicList() {
    let musicIdList = await getMusicListId(newMusicId);
    let index = 1;
    for (let i = 0; i < musicIdList.length; i++) {
        let musicData = await getMusicInfo(musicIdList[i])
        let singer = '';
        for (let j = 0; j < musicData.ar.length; j++) {
            singer += '/' + musicData.ar[j].name
        }
        singer = singer.substr(1)
        let str = `<li class="card">
        <div class="card__img">
            <img src="${musicData.al.picUrl}" alt="">
            <a href="../player/player.html?musicId=${musicData.id}">
                <div class="play"><i class="iconfont icon-iconfontplay"></i></div>
            </a>
        </div>
        <a href="../player/player.html?musicId=${musicData.id}">
            <p class="title">${musicData.name}</p>
        </a>
        <p class="user">by ${singer}</p>
    </li>`
        index++;
        domMusicList.innerHTML += str;
        if (index == 10) {
            // loading隐藏
            loading.style.opacity = 0;
            setTimeout(() => {
                loading.style.display = 'none'
            }, 500)
        }
        if (index > 20) {
            return;
        }
    }
}
initMusicList();