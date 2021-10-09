"use strict";

const input = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchButton");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const country = input.value;
  input.value = "";
  fetch(`https://restcountries.com/v2/name/${country}?fullText=true`)
    .then((response) => {
      if (!response.ok) throw new Error(`${country} is not a country.`);
      return response.json();
    })
    .then((data) => {
      renderHtml(data[0]);
    })
    .catch((err) => console.log(`${err.message}`));
});

const renderHtml = function (country) {
  const html = `
<div class="container info">
    <div class="row  mt-4 d-flex justify-content-center">
        <div class="flag col-lg-4 col-md-5 col-sm-12 d-flex justify-content-center">
            <img src="${country.flag}" class="img-fluid" alt="Flag"/>     
        </div>
        <div class="col-lg-5 col-md-7 offset-lg-1 col-sm-12">
            <div class="table-responsive">    
                <table class="table table-borderless table-sm">
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
                        <td>${country.area} sq Kms</td>
                    </tr>
                    <tr>
                        <td class="font1">Population:</td>
                        <td>${country.population}</td>
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
</div>
<br>
    `;
  document.querySelector(".container").insertAdjacentHTML("afterend", html);
};

const splash = document.querySelector(".splash");
document.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    splash.classList.add("hidden-splash");
  }, 2000);
});
