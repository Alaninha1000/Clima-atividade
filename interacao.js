const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

async function BuscarInformacoes(city) {
    try {
        const apiKey = "6e56034ba730449599e124136251508";
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=pt-BR`;

        const resultado = await fetch(url);

        if (!resultado.ok) {
            throw new Error('Erro ao buscar dados do clima');
        }

        const dadosClima = await resultado.json();
        console.log(dadosClima);

        mostrarDados(dadosClima);

        weatherResult.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    } catch (error) {
        weatherResult.classList.add("hidden");
        errorMessage.classList.remove("hidden");
        console.error('ERRO!', error.message);
    }
}

async function mostrarDados(dadosClima) {
    const data = new Date(dadosClima.location.localtime.replace(" ", "T"));
    const dataFormatada = `${data.toLocaleDateString('pt-BR')} ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    console.log(dataFormatada);

    weatherResult.innerHTML = `
        <h2 id="city-name">${dadosClima.location.name}, ${dadosClima.location.country}</h2>
        <p id="local-time" class="local-time">Hora local: ${dataFormatada}</p>
        <div class="weather-main">
            <img id="weather-icon" src="${dadosClima.current.condition.icon}" alt="${dadosClima.current.condition.text}">
            <p id="temperature">${dadosClima.current.temp_c}°C</p>
        </div>
        <p id="condition">${dadosClima.current.condition.text}</p>
        <div class="weather-details">
            <div class="detail-item"><span>Sensação</span><strong id="feels-like">${dadosClima.current.feelslike_c}°C</strong></div>
            <div class="detail-item"><span>Umidade</span><strong id="humidity">${dadosClima.current.humidity}%</strong></div>
            <div class="detail-item"><span>Vento</span><strong id="wind-speed">${dadosClima.current.wind_kph} km/h</strong></div>
            <div class="detail-item"><span>Pressão</span><strong id="pressure">${dadosClima.current.pressure_mb} mb</strong></div>
            <div class="detail-item"><span>Visibilidade</span><strong id="visibility">${dadosClima.current.vis_km} km</strong></div>
            <div class="detail-item"><span>Índice UV</span><strong id="uv-index">${dadosClima.current.uv}</strong></div>
        </div>
    `;
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.toLowerCase().trim();
    if (city) {
        BuscarInformacoes(city);
    }
});