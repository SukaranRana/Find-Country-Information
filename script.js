"use strict";

const input = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchButton");
const voiceBtn = document.querySelector(".voiceButton");

const renderCountry = (country) => {
  if (input.value == "") {
    input.placeholder = "Enter a country eg:india";
    input.style.borderBottom = "2px solid #f0ad4e";
  }
  input.value = "";
  fetch(`https://restcountries.com/v2/name/${country}?fullText=true`)
    .then((response) => {
      if (!response.ok) throw new Error(`${country} is not a country.`);
      return response.json();
    })
    .then((data) => {
      if (data.status != 200) {
        input.style.borderBottom = "solid 2px #d9534f";
        input.placeholder = "Enter correct country eg:india";
      }
      renderCovid(data[0].alpha2Code);
      renderHtml(data[0]);
      input.style.borderBottom = "solid 2px rgb(228, 228, 228)";
      input.placeholder = "Search for a country eg:india";
    })
    .catch((err) => console.log(`${err.message}`));
};

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const country = input.value;
  renderCountry(country);
});

const renderCovid = function (countryCode) {
  const code = countryCode.toLowerCase();
  fetch(
    `https://covid-19-data.p.rapidapi.com/country/code?code=${code}&format=json`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "772acdeb52mshc5fd4623b67ebfcp1092c5jsn4a00c8b1fcf5",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => renderCovidHtml(data[0]))
    .catch((err) => {
      console.error(err);
    });
};
const renderCovidHtml = function (covid) {
  const html = `
  <div class="offset-lg-1 col-lg-2 text-light bg-dark">Covid Updates</div>
  <div class="col-lg-2 text-light bg-primary">Confirmed:${covid.confirmed
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
  <div class="col-lg-2 text-light bg-success">Recovered:${covid.recovered
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
  <div class="col-lg-2 text-light bg-warning">Critical:${covid.critical
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
  <div class="col-lg-2 text-light bg-danger">Deaths:${covid.deaths
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
  `;
  document.querySelector(".coronavirus").insertAdjacentHTML("beforeend", html);
};

const renderHtml = function (country) {
  //prettier-ignore
  const html = `
<div class="container info">
    <div class="row  mt-4 d-flex justify-content-center">
        <div class="flag col-lg-4 col-md-5 col-sm-12 d-flex justify-content-center">
            <img src="${country.flag}" class="img-fluid" alt="Flag"/>     
        </div>
        <div class="col-lg-5 col-md-7 offset-lg-1 col-sm-12">
            <div class="table-responsive">    
                <table class="table table-borderless table-hover table-sm">
                    <tr>
                        <td class="font1">Name:</td>
                        <td>${country.name} (${country.nativeName})</td>
                    </tr> 
                    <tr>
                        <td class="font1">Capital:</td>
                        <td>${country.capital}</td>
                    </tr>
                    <tr>
                        <td class="font1">Area:</td>
                        <td>${country.area
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} sq Kms</td>
                    </tr>
                    <tr>
                        <td class="font1">Population:</td>
                        <td>${country.population
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr>
                        <td class="font1">Currency:</td>
                        <td>${country.currencies[0].name} (${country.currencies[0].symbol})</td>
                    </tr>

                    <tr>
                        <td class="font1">Calling Code:</td>
                        <td>+${country.callingCodes[0]}</td>
                    </tr>
                    <tr>
                        <td class="font1">Time Zone:</td>
                        <td>${country.timezones[0]}</td>
                    </tr>
                </table>
            </div>  
        </div>
    </div>
    <div class="row coronavirus">

    </div>
</div>
    `;
  document.querySelector(".container").insertAdjacentHTML("afterend", html);
};

const splash = document.querySelector(".splash");
document.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    splash.classList.add("hidden-splash");
  }, 1200);
});

voiceBtn.addEventListener("click", runSpeechRecognition);

function runSpeechRecognition() {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  recognition.onstart = function () {
    input.style.borderBottom = "solid 2px #4CAF50";
    input.placeholder = "Listening...";
  };

  recognition.onspeechend = function () {
    input.style.borderBottom = "solid 2px rgb(228, 228, 228)";
    input.placeholder = "Search for a country eg:india";
    recognition.stop();
  };

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    renderCountry(transcript);
  };

  // start recognition
  recognition.start();
}
