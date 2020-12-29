const search = window.location.search;
const searchObj = getSearch(search);
const videoId = searchObj.videoId;
const video = document.getElementsByClassName("video")[0];

async function initVideoData(videoId) {
    const data = await getMvData(videoId);
    console.log(data);
    if (data.brs[1080]) {
        video.src = data.brs[1080];
    } else if (data.brs[720]) {
        video.src = data.brs[720];
    } else if (data.brs[480]) {
        video.src = data.brs[480];
    } else if (data.brs[240]) {
        video.src = data.brs[240];
    }
}
initVideoData(videoId)