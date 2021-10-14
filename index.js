let searchedResult = document.getElementById("searchedResult");
let mainContainer = document.getElementById("mainContainer");

var globalData;

// API: AIzaSyA2eQDFN-PFovXa9BWhv9BorJ_DL9fPKbI, AIzaSyBYo-W0gRSFplhy2WC1x8s2wLFszATD7jg, AIzaSyDppDIBLwWIeHL6RICPfthgiBrxo5AQMKE

async function ytAPICall(){
    let query = document.getElementById("searchKeyword").value;
    // https://api.themoviedb.org/3/search/movie?&api_key=1229e943aec051105219f4ea7a80c817${"&query="}${query}

    // https://youtube.googleapis.com/youtube/v3/search?q=${query}&type=video&key=AIzaSyA2eQDFN-PFovXa9BWhv9BorJ_DL9fPKbI&maxResults=20

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&type=video&key=AIzaSyDppDIBLwWIeHL6RICPfthgiBrxo5AQMKE&maxResults=20&safeSearch=strict&videoCaption=closedCaption&part=snippet&chart=mostPopular&regionCode=IN`);

    let dataFetched = await res.json();
    globalData = dataFetched.items
    console.log("fdata: ", dataFetched.items);
    return (dataFetched.items);
    // appendSearchedResult(data.items);
}

let timerId;
function debounce(keyword, delay){
    // console.log(keyword, delay);

    if(timerId){
        clearTimeout(timerId);
    }

    if(keyword.length === 0){
        searchedResult.style.display = "none";
        return false;
    }

    timerId = setTimeout(function(){
        appendSearchedResult(keyword);
    }, delay)
}

async function appendSearchedResult(keyword){
    
    searchedResult.style.display = "flex";
    searchedResult.innerHTML = null;

    let res = await ytAPICall(keyword);
    // showVideoInBody(res);
    // console.log(res)

    res.forEach(({snippet:{title}, videoElement}) => {
        let div =  document.createElement("div");
        div.setAttribute("class", "searchedResultP");
        div.onclick = () => {
            showSearchedResultVideo();
        }

        let title_name = document.createElement("p");
        // title_name.setAttribute("class", "searchedResultP");
        title_name = title;

        div.append(title_name);

        searchedResult.append(div);
    });
}

function showSearchedResultVideo(){
    searchedResult.innerHTML = null;
    searchedResult.style.display = "none;"
    
    mainContainer.innerHTML = null;

    mainContainer.setAttribute("id", "mainContainerSecoundry");

    globalData.forEach(({id:{videoId}, snippet:{title}, snippet:{channelTitle}}) =>{
        let div = document.createElement("div");
        div.setAttribute("class", "videoAPIBoxSecoundry");
        // console.log(id, snippet);

        let vidDiv = document.createElement("div");
        vidDiv.innerHTML = `<iframe src=https://www.youtube.com/embed/${videoId} title="YouTube video" frameBorder="0" allow="fullscreen"></iframe>`;

        let titleWrapper = document.createElement("div");
        titleWrapper.setAttribute("class", "titleWrapper");

        let video_titleDiv = document.createElement("div");
        video_titleDiv.setAttribute("class","video_titleDiv");
        let video_title = document.createElement("p");
        video_title.innerText = title;
        video_titleDiv.append(video_title);

        let channel_titleDiv = document.createElement("div");
        channel_titleDiv.setAttribute("class", "channel_titleDiv");
        let channel_title = document.createElement("p");
        channel_title.innerText = channelTitle;

        let img = document.createElement("img");
        img.src="https://img.icons8.com/ios-glyphs/20/000000/checked--v1.png";
        channel_titleDiv.append(channel_title, img);

        titleWrapper.append(video_titleDiv, channel_titleDiv);

        div.append(vidDiv, titleWrapper);
        mainContainer.append(div);
    });
}

async function mostPopularVideo(){
    // 
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?type=video&key=AIzaSyDppDIBLwWIeHL6RICPfthgiBrxo5AQMKE&maxResults=20&safeSearch=strict&videoCaption=closedCaption&part=snippet&chart=mostPopular&regionCode=IN`);

    let data = await res.json();
    showVideoInBody(data.items);
}
function showVideoInBody(data){
    
    mainContainer.innerHTML = null;

    console.log("Data: ", data)

    data.forEach( ({id:{videoId}, snippet:{title}, snippet:{channelTitle}}) => {
        let div = document.createElement("div");
        div.setAttribute("class", "videoAPIBox")
        // console.log(id, snippet);

        let vidDiv = document.createElement("div");
        vidDiv.innerHTML = `<iframe src=https://www.youtube.com/embed/${videoId} title="YouTube video" frameBorder="0" allow="fullscreen"></iframe>`;

        let video_titleDiv = document.createElement("div");
        video_titleDiv.setAttribute("class","video_titleDiv");
        let video_title = document.createElement("p");
        video_title.innerText = title;
        video_titleDiv.append(video_title);

        let channel_titleDiv = document.createElement("div");
        channel_titleDiv.setAttribute("class", "channel_titleDiv");
        let channel_title = document.createElement("p");
        channel_title.innerText = channelTitle;

        let img = document.createElement("img");
        img.src="https://img.icons8.com/ios-glyphs/20/000000/checked--v1.png";
        channel_titleDiv.append(channel_title, img);

        div.append(vidDiv, video_titleDiv, channel_titleDiv);
        mainContainer.append(div);
    })
}

mostPopularVideo();