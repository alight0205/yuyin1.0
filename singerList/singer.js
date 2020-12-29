const musicList = [
    ['周杰伦', '林俊杰', '华晨宇', '薛之谦', '陈奕迅'],
    ['李荣浩', '毛不易', '隔壁老樊', '许嵩', '周深'],
    ['米津玄师', '神山羊', '凛冽时雨', 'mafumafu', 'Sou'],
    ['邓紫棋', '花粥', '司南', '任然', '花泽香菜'],
    ['房东的猫', '群星', '五月天', 'BIGBANG', 'V.A.']
    // [3194597807, 2341823700, 4860715377, 4876701785, 3168423108],
    // [4956037794, 3188681931, 4981959875, 4980255627, 3193966364],
    // [4867903424, 4891546330, 4897217048, 3110222208, 4975466366]
];


//  加载歌单
const list__body = document.getElementsByClassName("list__body")[0];
async function init_recom_list() {
    let str = '';
    for (let i = 0; i < musicList.length; i++) {
        for (let j = 0; j < musicList[i].length; j++) {
            let data = await getSearchData(musicList[i][j], 100);
            data = data.result.artists[0];
            const id = data.id;
            const imgUrl = data.picUrl;
            const name = data.name;
            str += `<li class="card">
                <div class="card__img">
                    <img src="${imgUrl}" alt="">
                    <a href="../singer/singer.html?singerId=${data.id}">
                        <div class="play"><i class="iconfont icon-iconfontplay"></i></div>
                    </a>
                </div>
                <a href="../singer/singer.html?singerId=${data.id}"><p class="title">${name}</p>  </a>
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