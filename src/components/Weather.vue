<template>
  <q-page class="column items-center justify-center q-pa-md bg-image">
    <div class="input-section">
      <q-input square standout bottom-slots v-model="newLocation" label="Enter Location" counter>
        <template v-slot:prepend>
          <q-icon name="place" />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="newLocation = ''" class="cursor-pointer" />
        </template>
        <template v-slot:hint>
          Masukkan Nama Kota Untuk Mengetahui Detail Cuaca Hari Ini.
        </template>
      </q-input>
      <q-btn
      size="lg"
  color="primary"
  icon="map"
  @click="addWeatherWidget"
  class="add-btn custom-btn"
  label="Tambahkan Lokasi"
      />
    </div>
    <div class="widgets-section">
      <div
        v-for="(weather, index) in weatherStore.weatherWidgets"
        :key="index"
        :class="['weather-widget', { 'flipped': weather.showDetails }]"
      >
        <div class="card-inner">
          <div class="card-front">
            <div class="header">
              <q-icon :name="getWeatherIcon(weather.weather[0].main)" size="100px" color="accent" />
              <div class="location">
                <h2>{{ weather.name }}</h2>
                <div class="country-info">
                  <p>{{ weather.sys.country }}</p>
                  <country-flag :iso="weather.sys.country.toLowerCase()" size="small" />
                </div>
              </div>
            </div>
            <div class="temperature">
              <p>{{ convertTemp(weather.main.temp) }}</p>
            </div>
            <q-btn
              class="center-button"
              @click="toggleDetails(index)"
              label="More Details"
              color="primary"
            />
          </div>
          <div class="card-back">
            <div class="details">
              <p><strong>Condition:</strong> {{ weather.weather[0].description }}</p>
              <p><strong>Wind:</strong> {{ weather.wind.speed }} m/s</p>
              <p><strong>Humidity:</strong> {{ weather.main.humidity }}%</p>
              <p><strong>Feels Like:</strong> {{ convertTemp(weather.main.feels_like) }}</p>
              <p><strong>Pressure:</strong> {{ weather.main.pressure }} hPa</p>
            </div>
            <q-btn
              class="btn-back"
              @click="toggleDetails(index)"
              label="Back"
              color="secondary"
            />
          </div>
        </div>
        <q-btn
          @click="removeWidget(index)"
          class="remove-btn"
          color="negative"
          round
          dense
          icon="delete"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { QPage, QInput, QBtn, QIcon } from "quasar";
import { useWeatherStore } from "../stores/weatherStore";
import CountryFlag from "vue-country-flag-next";

const weatherStore = useWeatherStore();

const newLocation = ref("");

const weatherIconMapping = {
  Clear: "wb_sunny",
  Clouds: "cloud",
  Rain: "grain",
  Drizzle: "grain",
  Thunderstorm: "flash_on",
  Snow: "ac_unit",
  Mist: "blur_on",
  Smoke: "blur_on",
  Haze: "blur_on",
  Dust: "blur_on",
  Fog: "blur_on",
  Sand: "blur_on",
  Ash: "blur_on",
  Squall: "blur_on",
  Tornado: "toys",
};

const convertTemp = (tempInCelsius) => {
  return `${tempInCelsius.toFixed(1)} °C / ${(
    (tempInCelsius * 9) / 5 +
    32
  ).toFixed(1)} °F`;
};

const getWeatherIcon = (weatherMain) => {
  return weatherIconMapping[weatherMain] || "wb_cloudy";
};

const addWeatherWidget = async () => {
  await weatherStore.fetchWeather(newLocation.value);
  newLocation.value = "";
};

const toggleDetails = (index) => {
  weatherStore.weatherWidgets[index].showDetails = !weatherStore.weatherWidgets[index].showDetails;
};

const removeWidget = (index) => {
  weatherStore.removeWidget(index);
};
</script>

<style scoped>
.input-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.widgets-section {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  padding: 20px;
}

.weather-widget {
  position: relative;
  width: 320px;
  height: 420px;
  background: linear-gradient(135deg, #ffecb3, #ffab91);
  border-radius: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  perspective: 1000px;
  transition: transform 0.6s, box-shadow 0.3s;
}

.weather-widget:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.weather-widget .card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.weather-widget.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-front {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #42a5f5, #A098);
  color: white;
  border-radius: 20px;
}

.card-back {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  color: #333;
  transform: rotateY(180deg);
  border-radius: 20px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
}

.location {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.location h2 {
  font-size: 1.8em;
  margin: 0;
  font-weight: bold;
}

.country-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.country-info p {
  margin: 0;
  font-size: 1.2em;
  font-weight: bold;
}

.temperature {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6em;
  font-weight: bold;
  margin: 10px 0;
}

.details p {
  font-size: 1.2em;
  margin: 8px 0;
}

.details p strong {
  color: #333;
}

.center-button {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
}

.btn-back {
  margin-top: 20px;
  width: 100%;
}

.add-btn {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border-radius: 50%;
  transition: background 0.3s, transform 0.3s;
}

.remove-btn:hover {
  background: rgba(255, 0, 0, 1);
  transform: scale(1.1);
}
</style>
