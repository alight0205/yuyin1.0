const domMusicList = document.getElementsByClassName('music__list')[0];

getLikeMusicList(callback = async (MusicList) => {
    console.log(MusicList)
    let musicIdList = MusicList;
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
        console.log(musicData)
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
        // if (index == 3) {
        //     // loading隐藏
        //     loading.style.opacity = 0;
        //     setTimeout(() => {
        //         loading.style.display = 'none'
        //     }, 500)
        // }
        // if (index == 20) {
        //     return;
        // }
    }
})