'use strict';

//時間
function recalc() {
    let now = new Date();
    let month = now.getMonth();
    let day = now.getDay();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let sec = now.getSeconds();

    document.getElementById('month').textContent = month + 1;
    document.getElementById('day').textContent = day;
    document.getElementById('hour').textContent = hour;
    document.getElementById('minute').textContent = String(minute).padStart(2, '0');
    document.getElementById('sec').textContent = String(sec).padStart(2, '0');
}

setInterval(recalc, 1000);




//天気
// geolocation
navigator.geolocation.getCurrentPosition(success, fail);

function success(pos) {
    ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
    alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
}

// データ取得
function ajaxRequest(lat, long) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const appId = '153973abdd7dd547d28c63804d2c051f';

    $.ajax({
        url: url,
        data: {
            appid: appId,
            lat: lat,
            lon: long,
            units: 'metric',
            lang: 'ja'
        }
    })
        .done(function (data) {
            console.log(data);

            // 都市名、国名
            // $('#place').text(data.city.name);

            // 天気予報データ
            data.list.forEach(function (forecast, index) {
                const temperature = Math.round(forecast.main.temp);
                const description = forecast.weather[0].description;
                const iconPath = `images/${forecast.weather[0].icon}.svg`;

                if (index === 1) {
                    const currentWeather = `
                <div class="info">
                 <p>
                   <span class="description">3時間後の天気：<img src="${iconPath}">${description}<span><br>
                   <span class="temp">気温：${temperature}<span>℃
                 </p>
                </div>`;
                    $('#weather').html(currentWeather);
                } else {
                    return;
                }
            });
        })
        .fail(function () {
            console.log('$.ajax failed!');
        })
}

// todoリスト
const addButton = document.querySelector('.addButton');
var input = document.querySelector('.input');
const container = document.querySelector('.container');

class item{
    constructor(itemName) {           //item(itemName)
        //div itemを作る
        this.createDiv(itemName);
    }

    createDiv(itemName) {
        let input = document.createElement('input');  //<input class="item_input" type"text" value="itemName">
        input.value = itemName;
        input.disabled = true;                         //disabled:要素を無効にする
        input.classList.add('item_input');
        input.type = "text";

        let itemBox = document.createElement('div'); //<div class="item"></div>
        itemBox.classList.add('item');

        let editButton = document.createElement('button'); //<button class="editButton">編集</button> 
        editButton.innerHTML = "編集";
        editButton.classList.add('editButton');

        let removeButton = document.createElement('button'); //<button class="removeButton">削除</button>
        removeButton.innerHTML = "削除";
        removeButton.classList.add('removeButton');

        container.appendChild(itemBox);  //セレクタ.appendChild(挿入するHTML):取得した要素の中にHTMLを挿入

        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);

        editButton.addEventListener('click',() => this.edit(input));
        
        removeButton.addEventListener('click', () => this.remove(itemBox));
    }
    edit(input){
        input.disabled = !input.disabled;
    }
    remove(item) {
        container.removeChild(item);
    }

}



function check() {
    if (input.value != "") {
        new item(input.value);
        input.value = "";
    }
}

addButton.addEventListener('click', check);

window.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        check();
    }
})
