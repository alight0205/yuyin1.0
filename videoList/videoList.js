const videoList = [
    [10751510, 10882518, 10912991, 5808147],
    [10923551, 5359554, 5810766, 290244],
    [503273, 10901714, 10832055, 5308148],
    [10912991, 10861596, 5622072, 5841179],
    [5404646, 5841026, 5323557, 5855012]
];


//  加载歌单
const list__body = document.getElementsByClassName("list__body")[0];
async function init_recom_list() {
    let str = '';
    for (let i = 0; i < videoList.length; i++) {
        for (let j = 0; j < videoList[i].length; j++) {
            let data = await getMvData(videoList[i][j]);
            const imgUrl = data.cover;
            const name = data.name;
            const nickname = data.artistName;
            str += `<li class="card">
                <div class="card__img">
                    <img src="${imgUrl}" alt="">
                    <a href="../video/video.html?videoId=${videoList[i][j]}">
                        <div class="play"><i class="iconfont icon-iconfontplay"></i></div>
                    </a>
                </div>
                <a href="../video/video.html?videoId=${videoList[i][j]}"><p class="title">${name}</p></a>
                <p class="user">by ${nickname}</p>
            </li>`
        }
        list__body.innerHTML = str;
        if (i == 2) {
            // loading隐藏
            loading.style.opacity = 0;
            setTimeout(() => {
                loading.style.display = 'none'
            }, 500)

        }
    }

}
init_recom_list();