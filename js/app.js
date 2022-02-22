const container = document.querySelector('.container');
const resultContent = document.querySelector('#resultado');
const form = document.querySelector('#formulario');

window.addEventListener('load', () => {
    form.addEventListener('submit', searchWeather);
});


function searchWeather(e) {
    e.preventDefault();

    const city = document.querySelector('#ciudad').value;
    const country = document.querySelector('#pais').value;

    if (city === '' || country === '') {
        showAlert('Empty fields');
        return;
    }

    requestAPI(city, country);
}

function showAlert(msg) {

    const alert = document.querySelector('.msg-alert');

    if (!alert) {
        
        const alert = document.createElement('div');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'msg-alert');
    
        alert.innerHTML = `
            <strong class='font-bold'>Error</strong>
            <span class='block'>${msg}</span>
        `;
    
        container.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 2500);
    }
    
}

function requestAPI(city, country) {
    
    const appID = '64514ca0666d0ba24aaa812ee6a8cd93';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`;

    showSpinner();
    fetch(url)
        .then( response => response.json() )
        .then( data => {

            cleanHTML();
            if (data.cod === '404') {
                showAlert(data.message);
                return;
            }

            showWeather(data);
        });
}

function showWeather(data) {
    
    const { name, main: { temp, temp_max, temp_min } } = data;

    const celsius = kelvinToCelsius(temp);
    const temp_celsius_max = kelvinToCelsius(temp_max);
    const temp_celsius_min = kelvinToCelsius(temp_min);

    const nameCity = document.createElement('p');
    nameCity.textContent = `Clima en ${name}`;
    nameCity.classList.add('font-bold', 'text-2xl');

    const currentCelsius = document.createElement('p');
    currentCelsius.innerHTML = `${celsius} &#8451;`;
    currentCelsius.classList.add('font-bold', 'text-6xl');

    const maxCelsius = document.createElement('p');
    maxCelsius.innerHTML = `Max: ${temp_celsius_max} &#8451;`;
    maxCelsius.classList.add('text-xl');

    const minCelsius = document.createElement('p');
    minCelsius.innerHTML = `Min: ${temp_celsius_min} &#8451;`;
    minCelsius.classList.add('text-xl');

    const resulDiv = document.createElement('div');
    resulDiv.classList.add('text-center', 'text-white');
    resulDiv.appendChild(nameCity);
    resulDiv.appendChild(currentCelsius);
    resulDiv.appendChild(maxCelsius);
    resulDiv.appendChild(minCelsius);

    resultContent.appendChild(resulDiv);
    
}

const kelvinToCelsius = temp => parseInt(temp - 273.15);

function cleanHTML() {
    while (resultContent.firstChild) {
        resultContent.removeChild(resultContent.firstChild);
    }
}

function showSpinner() {

    cleanHTML();
    
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultContent.appendChild(divSpinner);
}