const musicList = [
    [4879799554, 3201532058, 3212113629, 3194482794, 4944138426],
    [3194597807, 2341823700, 4860715377, 4876701785, 3168423108],
    [4956037794, 3188681931, 4981959875, 4980255627, 3193966364],
    [4867903424, 4891546330, 4897217048, 3110222208, 4975466366]
];
/*
id=19723756，云音乐飙升榜
id=3779629，云音乐新歌榜
id=3778678，云音乐热歌榜
id=2250011882，抖音排行榜
991319590 云音乐说唱榜
71384707 古典音乐榜
1978921795 电音榜
 */


//  加载歌单
const list__body = document.getElementsByClassName("list__body")[0];
async function init_recom_list() {
    let str = '';
    for (let i = 0; i < musicList.length; i++) {
        for (let j = 0; j < musicList[i].length; j++) {
            let data = await getMusicListInfo(musicList[i][j]);
            const imgUrl = data.coverImgUrl;
            const name = data.name;
            let playCount = data.playCount;
            playCount = playCount > 10000 ? (playCount / 10000).toFixed(2) + '万' : playCount;
            const nickname = data.creator.nickname;
            str += `<li class="card">
                <div class="card__img">
                    <img src="${imgUrl}" alt="">
                    <a href="../songList/songList.html?listId=${musicList[i][j]}">
                        <div class="play"><i class="iconfont icon-iconfontplay"></i></div>
                    </a>
                </div>
                <a href="../songList/songList.html?listId=${musicList[i][j]}"><p class="title">${name}</p></a>
                <p class="user">by ${nickname}</p>
                <p class="num">播放量：${playCount}</p>
            </li>`
        }
        list__body.innerHTML = str;
        if (i == 1) {
            // loading隐藏
            loading.style.opacity = 0;
            setTimeout(() => {
                loading.style.display = 'none'
            }, 500)
        }
    }

}
init_recom_list();