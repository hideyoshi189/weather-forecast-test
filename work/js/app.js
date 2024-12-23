const selectElement = document.getElementById('city-select');
const getWeatherButton = document.getElementById('get-weather');
getWeatherButton.addEventListener('click',()=>{
  const selectCity = selectElement.value;
  if (selectCity === '') {
    alert('都市を選択してください。');
    return;
  }
  fetchWeatherData(selectCity);
});
function fetchWeatherData(cityCode) {
  let url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityCode}.json`;

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (weather) {
    console.log(weather);
    // 特定の地域(今回は東京)だけ選択して変数に詰め直す
    let area = weather[0].timeSeries[0].areas[0];
    let tempsArea = weather[1].tempAverage.areas[0];
    console.log(area);
    // 発表者と報告日時の情報を画面に書き出す
    document.getElementById("publishingOffice").lastElementChild.textContent = weather[0].publishingOffice;
    document.getElementById("reportDatetime").lastElementChild.textContent = weather[0].reportDatetime;
    // 特定地域の情報を画面に書き出す
    document.getElementById("targetArea").lastElementChild.textContent = area.area.name;
    document.getElementById("today").lastElementChild.textContent = area.weathers[0];
    document.getElementById("tomorrow").lastElementChild.textContent = area.weathers[1];
    document.getElementById("dayAfterTomorrow").lastElementChild.textContent = area.weathers[2];
    document.getElementById("todayHighTemperature").lastElementChild.textContent = tempsArea.max + "℃";
    document.getElementById("todayLowTemperature").lastElementChild.textContent = tempsArea.min + "℃";
  });
}
