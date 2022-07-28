'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//Getting one country's data:
//Making AJAX calls (oldschool):
// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {
//         console.log(this.responseText);
//         //'this' refers to the request object; 'responseText' is the property with the data retrieved from API
//         const [data] = JSON.parse(this.responseText); //JSON.parse returns an array containing a single object; in order to transform this array into an object, we are destructuring the array using [];
//         console.log(data)

//         const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>`;
//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
//     })
// }

// getCountryData('portugal');
// getCountryData('brazil');
// getCountryData('china');
// getCountryData('usa');


//Getting country's and neighbours's data:
const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

// //AJAX call country 1:
// const getCountryAndNeighbour = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {
//         console.log(this.responseText);
//         const [data] = JSON.parse(this.responseText);
//         console.log(data)

//         //Render country 1:
//         renderCountry(data);

//         //Get neighbour country (2):
//         const neighbour = data.borders?.[0];
//         if (!neighbour) return;
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function () {
//             const data2 = JSON.parse(this.responseText);
//             console.log(data2)

//             renderCountry(data2, 'neighbour');
//         })
//     })
// }

// getCountryAndNeighbour('argentina');

//PROMISES USING FETCH
// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v2/name/${country}`).then(function (response) {
//         console.log(response);
//         return response.json();
//     }).then(function (data) {
//         console.log(data);
//         renderCountry(data[0]);
//     })
// };
// getCountryData('portugal')

const getCountryData = function (country) {
    //Country 1:
    fetch(`https://restcountries.com/v2/name/${country}`)
        .then(response => response.json())
        .then(data => {
            renderCountry(data[0]);
            const neighbour = data[0].borders?.[0];
            if (!neighbour) return;

            //Country 2:
            return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
        })
        .then(response => response.json())
        .then(data => renderCountry(data, 'neighbour'));
        .catch(err => {
            console.error(`${err} 💥`);
            alert(`${err} 💥💥💥`)
        })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
};


btn.addEventListener('click', function () {
    getCountryData('china')
})