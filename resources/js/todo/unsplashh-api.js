let getBackgroundImage = async ()=>{

    let clientId = 'KPvG4BuzXzA4MZmlSfydNYeQmjKeGYjXK9hFcVR0b_k'; 
    let url = 'https://api.unsplash.com/photos/random?';

    let params={
        client_id : clientId,
        'orientation':'landscape',
        query : 'landscape'
    }

    let res = await fetch(url+getQueryString(params));
    let imgData = res.json();

    console.dir(imgData);
    return imgData;
}

let createInsplashToken = (async () =>{
    let imgData =  await getBackgroundImage();
    let imgURL = imgData.urls.regular;
    let location = imgData.location.name?imgData.location.name:'in multicampus...';

    let expirationDate = new Date();
    console.dir(expirationDate);
    expirationDate.setDate(expirationDate.getDate()+1);
    console.dir(expirationDate);

    let unSplashToken ={
        url : imgURL,
        'location': location,
        expiresOn : expirationDate.getTime()
    }

    localStorage.setItem('unSplashToken',JSON.stringify(unSplashToken));
    return unSplashToken;



});

let getUnsplashToken=async()=>{
    let token = JSON.parse(localStorage.getItem('unSplashToken'));

    // token이 있고 token이 만료되지 않았으면 기존 token을 반환
    let now = new Date().getTime();
    if(token&&token.expiresOn>now) return token;

    // token이 없거나 token이 만료되었으면 api호출을 통해 토큰을 생성
    return await createInsplashToken();
}

(async()=>{
    let unSplashToken = await getUnsplashToken();
    
    $('body').style.backgroundImage = `url(${unSplashToken.url})`;
    let bgSpan = createElement('span',{text:unSplashToken.location});
    $('.bg-location').append(bgSpan);
})();
