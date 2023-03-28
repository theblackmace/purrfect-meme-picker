import {catsData} from './data.js';

const emotionEl = document.querySelector('#emotion-radios');
const getImageBtn = document.querySelector('#get-image-btn');
const gifsOnly = document.querySelector('#gifs-only-option');
const modal = document.querySelector('#meme-modal');
const modalInner = document.querySelector('#meme-modal-inner');
const closeModal = document.querySelector('#meme-modal-close-btn');

function getEmotionsArray(cats) {
    const emotionArr = [];
    for(let cat of cats){
        for(let emotion of cat.emotionTags) {
            if(!emotionArr.includes(emotion)){
                emotionArr.push(emotion);
            }
        }
    }
    return emotionArr;
}

function renderEmotionsRadios(cats) {
    let htmlString = "";
    const emotions = getEmotionsArray(cats);
    for(let emotion of emotions){
        htmlString += 
        `
        <div class="radio">
            <input type="radio" id="${emotion}" value="${emotion}" name="emotion-group">
            <label for="${emotion}">${emotion}</label>
        </div>
        `
    }
    emotionEl.innerHTML = htmlString;
}


renderEmotionsRadios(catsData);

emotionEl.addEventListener('change', highLightCheckedOption);


function highLightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio');
    for(let radio of radios) {
        radio.classList.remove('highlight');
    }

    e.target.parentElement.classList.add('highlight');
}

getImageBtn.addEventListener('click', function() {
    if(document.getElementsByClassName('highlight').length != 0){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
        // console.log(selectedEmotion);
        const gifsCheck = gifsOnly.checked;
        // console.log(gifsCheck);
        // const catMemeArr = matchingCats(selectedEmotion, gifsCheck);
        // console.log(catMemeArr);
        // getSingleCatObject(catMemeArr);
        renderCat(selectedEmotion, gifsCheck);
    } else {
        console.log("No radio selected");
    }
})


closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
})


function matchingCats(emotion, check) {
    return catsData.filter(function(cat) {
        if(check === true) {
            return cat.emotionTags.includes(emotion) && cat.isGif;
        } else {
            return cat.emotionTags.includes(emotion);
        }
    });
}


function getSingleCatObject(catMemeArr) {
    const randIndex = Math.floor(Math.random()*catMemeArr.length);
    return catMemeArr[randIndex];
}

function renderCat(selectedEmotion, gifsCheck) {
    const catsArr = matchingCats(selectedEmotion, gifsCheck);
    const singleCat = getSingleCatObject(catsArr);

    modalInner.innerHTML = `
    <img 
    class="cat-img" 
    src="./images/${singleCat.image}"
    alt="${singleCat.alt}"
    >
    `

    modal.style.display = 'flex';
}