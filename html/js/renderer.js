const imgContainer = document.getElementById('img-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const downloadImgButton = document.getElementById('download-img');

let lastDivSelected = null;

let filterTextsBuffer = [];

update();

async function update(filterTexts = '') {
    // 清除选择
    lastDivSelected = null;

    // 删除所有图片
    const imgDivs = imgContainer.querySelectorAll('.img-div');
    imgDivs.forEach(imgDiv => {
        imgDiv.remove();
    });

    // 获取图片列表
    const imgListStr = await window.electronAPI.getImages(filterTexts);
    const imgList = JSON.parse(imgListStr);
    console.log(imgList);

    // 获取图片目录
    const imgPath = window.electronAPI.imgPath;

    // 显示图片
    let idCounter = 0;
    imgList.forEach(img => {
        // 获取图片名称
        const imgName = img.slice(0, img.lastIndexOf('.'));

        // 创建图片元素并添加到容器中
        const imgDivElement = document.createElement('div');
        imgDivElement.classList.add('img-div');
        imgDivElement.id = 'img-div-' + idCounter;
        imgDivElement.addEventListener('click', imgSelect);

        const imgOuterElement = imgDivElement.appendChild(document.createElement('div'));
        imgOuterElement.classList.add('img-outer');

        const imgElement = imgOuterElement.appendChild(document.createElement('img'));
        imgElement.src = imgPath + img;
        imgElement.alt = img;

        const titleElement = imgDivElement.appendChild(document.createElement('p'));
        titleElement.textContent = imgName;

        imgContainer.appendChild(imgDivElement);

        idCounter++;
    });
}

function imgSelect() {
    // 获取当前div
    console.log(this.classList);
    if (lastDivSelected) {
        lastDivSelected.classList.remove('selected');
    }
    lastDivSelected = this;
    this.classList.add('selected');
}

searchButton.addEventListener('click', () => {
    const searchText = searchInput.value;
    update(searchText);
});

searchInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        searchButton.click();
    }
});

downloadImgButton.addEventListener('click', async () => {
    const selectedImg = lastDivSelected.querySelector('img');

    const downloadLink = document.createElement('a');
    downloadLink.href = selectedImg.src;
    downloadLink.download = selectedImg.alt;
    downloadLink.click();
    downloadLink.remove();
});
