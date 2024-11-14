window.electronAPI = {
    getImages: getImages,
    // imgPath: '/var/www/memes/'
    imgPath: './memes/'
}

async function getImages(searchWord) {
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let url='http://server.com:12345/search';
    if (searchWord != '') {
        url += '?search_word=' + searchWord;
    }
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {  // 请求已完成
            if (xhr.status === 200) {
                resolve(xhr.responseText);  // 成功时返回结果
            } else {
                reject(new Error('Request failed: ' + xhr.status));  // 请求失败时抛出错误
            }
        }
    };
    xhr.send();
    });
}
