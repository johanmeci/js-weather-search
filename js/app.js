const container = document.querySelector('.container');
const result = document.querySelector('#resultado');
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

    fetch(url)
        .then( response => response.json() )
        .then( data => {
            console.log(data);
            if (data.cod === '404') {
                showAlert(data.message);    
            }

        } );
}