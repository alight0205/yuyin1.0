const search = window.location.search;
const searchObj = getSearch(search);
const Keyword = searchObj.searchData;
const oKeyword = document.getElementsByClassName("Keyword")[0];
oKeyword.innerText = Keyword;
searchInp.value = Keyword;
const domMusicList = document.getElementsByClassName('music__list')[0];

async function initSearchData(Keyword) {
    const data = await getSearchData(Keyword, 1);
    if (data.code != 200) {
        domMusicList.innerHTML += '<li>暂无搜索结果...</li>';
        return;
    }
    const musicData = data.result.songs;
    let index = 1;
    for (let i = 0; i < musicData.length; i++) {
        let singer = '';
        for (let j = 0; j < musicData[i].artists.length; j++) {
            singer += '/' + musicData[i].artists[j].name
        }
        singer = singer.substr(1)

        let str = ` <li class="title">
        <span>${index}</span>
        <span class="name">
        <a href="#"><span> ${musicData[i].name}</span></a>
        <div class="icon">
        <a href="../player/player.html?musicId=${musicData[i].id}"><i class="iconfont icon-iconfontplay"></i></a>
        </div>
        </span>
        <span class="time">${getDate(musicData[i].duration)}</span>
        <span><a href="#">${singer}</a></span>
        <span><a href="#">${musicData[i].album.name}</a></span>
    </li>`
        index++;
        domMusicList.innerHTML += str;
    }
}
console.log(Keyword)
initSearchData(Keyword)