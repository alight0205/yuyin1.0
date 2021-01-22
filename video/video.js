const search = window.location.search;
const searchObj = getSearch(search);
const videoId = searchObj.videoId;
const video = document.getElementsByClassName("video")[0];

async function initVideoData(videoId) {
    const data = await getMvUrl(videoId);
    console.log(data)
        video.src = data.url;
}
initVideoData(videoId)