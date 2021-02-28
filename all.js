const body = document.querySelector('body');
const cloud = document.querySelector('.cloud');
const container = document.querySelector('.container');
const main = document.querySelector('.main');
const detail = document.querySelector('.detail');
const immediate = document.querySelector('.immediate');

(async () => {
    //google定位
    const locationUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCUgW_RxjFfBfGN6A3B1d1bSYg1IHE52dE';
    const api = await fetch(locationUrl, { method: 'post' })
        .then((response) => {
            return response.json();
        }).then((data) => {
            return data;
            
        })

    const lat = `&lat=${api.location.lat}`;
    const lng = `&lon=${api.location.lng}`;
    

    //天氣api
    const OWMUrl = `https://api.openweathermap.org/data/2.5/forecast?APPID=aaf3f615da5a79a55242701d7297ecab&lang=zh_tw&units=metric${lat}${lng}`;
    const OWM = await fetch(OWMUrl, { method: 'get' })
        .then((response) => {
            return response.json();
        }).then((data) => {
            return data;
        })


    //資料
    const country = OWM.city.country;
    const city = OWM.city.name;
    const description = OWM.list[2].weather[0].description;
    const temp = Math.round(OWM.list[2].main.temp);

    const feel_temp = Math.round(OWM.list[2].main.feels_like);
    const humidity = OWM.list[2].main.humidity;
    const rain = OWM.list[2].clouds.all;

    const time = OWM.list[3].dt_txt.slice(-14, -3);
    const time_1 = OWM.list[4].dt_txt.slice(-14, -3);
    const time_2 = OWM.list[5].dt_txt.slice(-14, -3);
    const time_3 = OWM.list[6].dt_txt.slice(-14, -3);
    const time_4 = OWM.list[7].dt_txt.slice(-14, -3);
    const time_5 = OWM.list[8].dt_txt.slice(-14, -3);
    const time_6 = OWM.list[9].dt_txt.slice(-14, -3);
    const time_7 = OWM.list[10].dt_txt.slice(-14, -3);

    const description_1 = OWM.list[3].weather[0].description;
    const description_2 = OWM.list[4].weather[0].description;
    const description_3 = OWM.list[5].weather[0].description;
    const description_4 = OWM.list[6].weather[0].description;
    const description_5 = OWM.list[7].weather[0].description;
    const description_6 = OWM.list[8].weather[0].description;
    const description_7 = OWM.list[9].weather[0].description;
    const description_8 = OWM.list[10].weather[0].description;

    const temp_1 = Math.round(OWM.list[3].main.temp);
    const temp_2 = Math.round(OWM.list[4].main.temp);
    const temp_3 = Math.round(OWM.list[5].main.temp);
    const temp_4 = Math.round(OWM.list[6].main.temp);
    const temp_5 = Math.round(OWM.list[7].main.temp);
    const temp_6 = Math.round(OWM.list[8].main.temp);
    const temp_7 = Math.round(OWM.list[9].main.temp);
    const temp_8 = Math.round(OWM.list[10].main.temp);

    const today = new Date();
    const date = `${today.getFullYear()}/${(today.getMonth() + 1)}/${today.getDate()}`;
    const day_list = ['日', '一', '二', '三', '四', '五', '六'];
    const day = today.getDay();

    //判斷
    let bg = '';
    let icon = '';
    const wId = OWM.list[2].weather[0].id;
    switch (true) {
        //雷雨
        case wId < 300:
            bg = 'thunder';
            icon = '<i class="fas fa-bolt fa-9x"></i>';
            break;
        //雨
        case wId >= 300 && wId < 600:
            bg = 'rain';
            icon = '<i class="fas fa-cloud-showers-heavy fa-9x"></i>';
            break;
        //霧
        case wId >= 701 && wId < 800:
            bg = 'fog';
            icon = '<i class="fas fa-smog fa-9x"></i>';
            break;
        //晴
        case wId === 800:
            bg = 'sun';
            icon = '<i class="fas fa-sun fa-9x"></i>';
            break;
        //雲
        case wId >= 801 && wId <= 804:
            bg = 'bg-cloud';
            icon = '<i class="fas fa-cloud-sun fa-9x"></i>';
            break;
    }
    body.classList.add(`${bg}`);

    const delay = (interval) => {
        return new Promise((resolve) => {
            setTimeout(resolve, interval);
        });
    };

    //loader切換
    await delay(3000);
    cloud.classList.add('d-none');
    container.classList.remove('d-none');



    //display
    const displayMain = () => {
        let str = '';
        str += `
        <div class="card p-3 shadow animated animatedFadeInUp fadeInUp">
            <div class="head d-flex justify-content-between align-items-end px-2">
                <span class="h1">${country}</span>
                <span class="h3">${city}</span>
            </div>
            <hr style="background-color:#000;"/>
            <div class="body">
              <div class="row">
                <div class="col-5 d-flex flex-column px-0 pl-4">
                    <span>${date}</span>
                    <span>星期${day_list[day]}</span>
                    <span class="pt-3">${description}</span>
                    <span class="big pt-3">${temp}°</span>
                </div>
                <div class="col-7 d-flex align-items-center">${icon}</div>
              </div>
            </div>
      </div>
    `;
        main.innerHTML = str;
    }
    displayMain();

    const displayDetail = () => {
        let str = '';
        str += `
        <div class="card p-3 shadow animated animatedFadeInUp fadeInUp">
            <div class="head h3">詳細預報</div>
            <hr style="background-color:#000;"/>
            <div class="body">
              <div class="row">
                <div class="col-6 d-flex flex-column">
                  <span>體感溫度</span>
                  <span>濕度</span>
                  <span>雲量</span>
                </div>
                <div class="col-6 d-flex flex-column">
                  <span>${feel_temp}°</span>
                  <span>${humidity}%</span>
                  <span>${rain}%</span>
                </div>
              </div>
            </div>
      </div>
    `;
        detail.innerHTML = str;
    }
    displayDetail();

    const displayImmediate = () => {
        let str = '';
        str += `
        <table class="table h-100 shadow animated animatedFadeInUp fadeInUp font-weight-light;">
            <tbody>
                <tr class="bg-color">
                    <td class="h3 pt-4" colspan="3">即時預報</td>
                </tr>
                <tr class="g-color">
                    <td>${time}</td>
                    <td>${description_1}</td>
                    <td>${temp_1}°</td>
                </tr>
                <tr class="bg-color">
                    <td>${time_1}</td>
                    <td>${description_2}</td>
                    <td>${temp_2}°</td>
                </tr>
                <tr class="g-color">
                    <td>${time_2}</td>
                    <td>${description_3}</td>
                    <td>${temp_3}°</td>
                </tr>
                <tr class="bg-color">
                    <td>${time_3}</td>
                    <td>${description_4}</td>
                    <td>${temp_4}°</td>
                </tr>
                <tr class="g-color">
                    <td>${time_4}</td>
                    <td>${description_5}</td>
                    <td>${temp_5}°</td>
                </tr>
                <tr class="bg-color">
                    <td>${time_5}</td>
                    <td>${description_6}</td>
                    <td>${temp_6}°</td>
                </tr>
                <tr class="g-color">
                    <td>${time_6}</td>
                    <td>${description_7}</td>
                    <td>${temp_7}°</td>
                </tr>
                <tr class="bg-color">
                    <td>${time_7}</td>
                    <td>${description_8}</td>
                    <td>${temp_8}°</td>
                </tr>
            </tbody>
        </table>
    `;
        immediate.innerHTML = str;
    }
    displayImmediate();
})();


