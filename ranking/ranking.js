/*
id=19723756，云音乐飙升榜
id=3779629，云音乐新歌榜
id=3778678，云音乐热歌榜
id=2250011882，抖音排行榜
991319590 云音乐说唱榜
71384707 古典音乐榜
1978921795 电音榜
 */
const ranking__listId = ['3778678', '3779629', '19723756', '2250011882', '991319590', '1978921795', '71384707']
const ranking__name = document.getElementsByClassName("ranking__name")[0];
const ranking__more = document.querySelector(".ranking__more a");
const ranking__nameLi = ranking__name.getElementsByTagName("li");
const domMusicList = document.getElementsByClassName("music__list")[0];

// 列表点击事件
ranking__name.onclick = function (e) {
    if (e.target.tagName == "LI") {
        const i = [].indexOf.call(ranking__nameLi, e.target);
        ranking__more.href = `../songList/songList.html?Listid=${ranking__listId[i]}`
        ranking__name.querySelector(".active").className = ''
        ranking__nameLi[i].className = 'active'
        initMusicList(ranking__listId[i])
    }
}


async function initMusicList(id) {
    let musicIdList = await getMusicListId(id);
    console.log(musicIdList)
    domMusicList.innerHTML = `<li class="title">
    <span>序号</span>
    <span class="name">歌曲标题
    </span>
    <span class="time">时长</span>
    <span>歌手名</span>
    <span>专辑</span>
</li>`
    let index = 0;
    for (let i = 0; i < musicIdList.length; i++) {
        let musicData = await getMusicInfo(musicIdList[i])
        let str = `<li class="title">
        <span>${index + 1}</span>
        <span class="name">
        <a href="#"><span> ${musicData.name}</span></a>
        <div class="icon">
        <a href="../player/player.html?musicId=${musicData.id}"><i class="iconfont icon-iconfontplay"></i></a>
        </div>
        </span>
        <span class="time">${getDate(musicData.dt)}</span>
        <span><a href="#">${musicData.ar[0].name}</a></span>
        <span><a href="#">${musicData.al.name}</a></span>
    </li>`
        index++;
        domMusicList.innerHTML += str;
        if (index == 3) {
            // loading隐藏
            loading.style.opacity = 0;
            setTimeout(() => {
                loading.style.display = 'none'
            }, 500)
        }
        if (index == 20) {
            return;
        }
    }
}
initMusicList('19723756');