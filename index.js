let searchedResult = document.getElementById("searchedResult");
let mainContainer = document.getElementById("mainContainer");

var globalData;

// API: AIzaSyA2eQDFN-PFovXa9BWhv9BorJ_DL9fPKbI, AIzaSyBYo-W0gRSFplhy2WC1x8s2wLFszATD7jg, AIzaSyDppDIBLwWIeHL6RICPfthgiBrxo5AQMKE

async function ytAPICall(){
    let query = document.getElementById("searchKeyword").value;

    // https://youtube.googleapis.com/youtube/v3/search?q=${query}&type=video&key=AIzaSyA2eQDFN-PFovXa9BWhv9BorJ_DL9fPKbI&maxResults=20

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&type=video&key=AIzaSyA2eQDFN-PFovXa9BWhv9BorJ_DL9fPKbI&maxResults=20&safeSearch=strict&videoCaption=closedCaption&part=snippet&chart=mostPopular&regionCode=IN`);

    let dataFetched = await res.json();
    globalData = dataFetched.items
    console.log("fdata: ", dataFetched.items);
    return (dataFetched.items);
    // appendSearchedResult(data.items);
}

let timerId;
function debounce(keyword, delay){

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
    // searchedResult.innerHTML = null;
    searchedResult.style.display = "none";
    
    mainContainer.innerHTML = null;

    mainContainer.setAttribute("id", "mainContainerSecoundry");

    globalData.forEach(({id:{videoId}, snippet:{title}, snippet:{channelTitle}}) =>{
        let div = document.createElement("div");
        div.setAttribute("class", "videoAPIBoxSecoundry");

        let vidDiv = document.createElement("div");
        vidDiv.innerHTML = `<iframe src=https://www.youtube.com/embed/${videoId} title="YouTube video" frameBorder="0" width="380" height="220" allow="fullscreen"></iframe>`;

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
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?type=video&key=AIzaSyA2eQDFN-PFovXa9BWhv9BorJ_DL9fPKbI&maxResults=20&safeSearch=strict&videoCaption=closedCaption&part=snippet&chart=mostPopular&regionCode=IN`);

    let data = await res.json();
    showVideoInBody(data.items);
}
function showVideoInBody(data){
    
    mainContainer.innerHTML = null;

    console.log("Data: ", data)

    data.forEach( ({id:{videoId}, snippet:{title}, snippet:{channelTitle}}) => {
        let div = document.createElement("div");
        div.setAttribute("class", "videoAPIBox")

        let vidDiv = document.createElement("div");
        vidDiv.innerHTML = `<iframe src=https://www.youtube.com/embed/${videoId} title="YouTube video" frameBorder="0" width="280" height="200" allow="fullscreen"></iframe>`;

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

// -------------------------------------------------------------------------------------
// Registration/Signup form
function loginPopup(){
    let parrent = document.getElementById("mainContainer");
    // parrent.innerHTML = null;
    if(document.getElementById("loginForm") == null){
        var div = document.createElement("div");
        div.setAttribute("id", "loginForm");
    }else{
        var div = document.getElementById("loginForm");
        div.innerHTML = null;
    }

    let img = document.createElement("img");
    img.src = "https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/35/000000/external-close-banking-and-finance-kiranshastry-gradient-kiranshastry.png";
    img.style.cursor = "pointer";
    img.onclick = function(){
        removeActive();
    }
    div.append(img);

    let heading = document.createElement("h3");
    heading.textContent = "Sign-up";
    heading.style.textAlign = "center";
    heading.style.margin = "10px 0 0 0";
    div.append(heading);

    let form = document.createElement("form");
    form.setAttribute("id", "myLogInForm");
    form.onsubmit = function(){
        register(event);
    }

    let ip1 = document.createElement("input");
    ip1.type = "text";
    ip1.setAttribute("id", "name");
    ip1.placeholder = "Name";

    let ip2 = document.createElement("input");
    ip2.type = "text";
    ip2.setAttribute("id", "email");
    ip2.placeholder = "Email";

    let ip3 = document.createElement("input");
    ip3.type = "text";
    ip3.setAttribute("id", "password");
    ip3.placeholder = "Password";

    let ip4 = document.createElement("input");
    ip4.type = "text";
    ip4.setAttribute("id", "username");
    ip4.placeholder = "User_name";

    let ip5 = document.createElement("input");
    ip5.type = "text";
    ip5.setAttribute("id", "mobile");
    ip5.placeholder = "Mobile_No";

    let ip6 = document.createElement("input");
    ip6.type = "submit";
    ip6.style.cursor = "pointer";
    ip6.style.fontSize = "16px";

    form.append(ip1, ip2, ip3, ip4, ip5, ip6)

    div.append(form);

    let divLogin = document.createElement("div");
    divLogin.setAttribute("class", "divLogin");
    let opt = document.createElement("P");
    opt.textContent = "OR";

    let loginButton = document.createElement("button");
    loginButton.textContent = "Login";
    loginButton.onclick = function(){
        login(event);
    }

    divLogin.append(opt, loginButton);
    div.append(divLogin);

    parrent.append(div);

    div.classList.add("active");
}
// User Registration
function register(e){
    e.preventDefault();

    let form = document.getElementById("myLogInForm");

    let obj = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        username: form.username.value,
        mobile: form.mobile.value,
        description: "Defaul"
    }
    obj = JSON.stringify(obj);

    fetch("https://masai-api-mocker.herokuapp.com/auth/register", {

            method: "POST",

            body: obj,

            headers: {
                "Content-Type": "application/json",
            },
        })

        .then((res) => {
            return res.json();
        })

        .then((res) => {
            // console.log("Res_Suc: ", res);
            alert(res.message)
            if(res.error == false){
                login(e, res.error);
            }
        })
        .catch((err) => {
            // console.log("error: ", err);
            alert(err.message);
        })

}
// login form
function login(e, flag){

    e.preventDefault();
    let parrent = document.getElementById("mainContainer");

    if(document.getElementById("loginForm") == null){
        var div = document.createElement("div");
        div.setAttribute("id", "loginForm");
    }else{
        var div = document.getElementById("loginForm");
        div.innerHTML = null;
    }

    let img = document.createElement("img");
    img.src = "https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/35/000000/external-close-banking-and-finance-kiranshastry-gradient-kiranshastry.png";
    img.style.cursor = "pointer";
    img.onclick = function(){
        removeActive();
    }
    div.append(img);

    if(flag === false){
        let p = document.createElement("p");
        p.textContent = "Registration success, please login now."
        p.style.margin = "10px 0 0 0";
        div.append(p);

        setTimeout(() => {
            p.style.display = "none";
        },3000);
    }

    let heading = document.createElement("h3");
    heading.textContent = "Login";
    heading.style.textAlign = "center";
    heading.style.margin = "10px 0 0 0";
    div.append(heading);

    let form = document.createElement("form");
    form.setAttribute("id", "myLogInForm");
    form.onsubmit = function(){
        fetchUser(event);
    }

    let ip1 = document.createElement("input");
    ip1.type = "text";
    ip1.setAttribute("id", "username");
    ip1.placeholder = "User_name";

    let ip2 = document.createElement("input");
    ip2.type = "text";
    ip2.setAttribute("id", "password");
    ip2.placeholder = "Password";

    let ip3 = document.createElement("input");
    ip3.type = "submit";
    ip3.style.cursor = "pointer";
    ip3.style.fontSize = "16px";

    form.append(ip1, ip2, ip3)

    div.append(form);

    let divLogin = document.createElement("div");
    divLogin.setAttribute("class", "divLogin");
    let opt = document.createElement("P");
    opt.textContent = "OR";

    let loginButton = document.createElement("button");
    loginButton.textContent = "Signup";
    loginButton.onclick = function(){
        loginPopup(event);
    }

    divLogin.append(opt, loginButton);
    div.append(divLogin);

    parrent.append(div);

    div.classList.add("active");
}
// Login Authentica
function fetchUser(e){
    e.preventDefault();
    let form = document.getElementById("myLogInForm");

    let obj = {
        password: form.password.value,
        username: form.username.value,
    }
    // console.log("Data: ", obj);

    let objSend = JSON.stringify(obj);

    fetch("https://masai-api-mocker.herokuapp.com/auth/login", {

            method: "POST",

            body: objSend,

            headers: {
                "Content-type": "application/json",
            },
        })

        .then((res) => {
            return res.json();
        })

        .then((res) => {
            // console.log("Res: ", res);
            if(res.error === true){
                alert(res.message);
            }else{
                fetchUserData(obj.username, res.token);
            }
        })
        .catch((err) => {
            // console.log("error :", err);
            alert(res.message)
        })
}
// fetch login user data
function fetchUserData(username, token){
    fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`, {

            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        .then((res) => {
            return res.json();
        })

        .then((res) => {
            // console.log("Res_data: ", res, token);
            if(token !== undefined){
                showUserStatus(res.name);
            }
        })
        .catch((err) => {
            // console.log("error: ", err);
            // alert(res.message)
        })
}
// Dispaly user name in login status
function showUserStatus(name){
    let userStatus = document.getElementById("userStatus");
    userStatus.innerHTML = null;

    let p = document.createElement("p");
    p.textContent = name;

    userStatus.append(p);
    removeActive();
}

function removeActive(){
    let el = document.getElementById("loginForm");
    el.innerHTML = null;
    el.classList.remove("active");
}